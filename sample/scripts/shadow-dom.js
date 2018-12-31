(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('./dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _microtask = require('./microtask.js');

var _microtask2 = _interopRequireDefault(_microtask);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _Attr = require('./interfaces/Attr.js');

var _Attr2 = _interopRequireDefault(_Attr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://html.spec.whatwg.org/multipage/scripting.html#custom-elements

var nativeHTMLElement = window.HTMLElement;

// TODO: Remove this circular dependency by introducing a 'creating steps' hook


var htmlNamespace = 'http://www.w3.org/1999/xhtml';
var alreadyConstructedMarker = 1;
var upgradeReactionType = 1;
var callbackReactionType = 2;
var CE_STATE_FAILED = 'failed';
var CE_STATE_CUSTOM = 'custom';
var CE_STATE_UNDEFINED = 'undefined';
var CE_PROP_NAME = 'customElements';
var CE_CALLBACK_CONNECTED = 'connectedCallback';
var CE_CALLBACK_DISCONNECTED = 'disconnectedCallback';
var CE_CALLBACK_ADOPTED = 'adoptedCallback';
var CE_CALLBACK_ATTRIBUTE_CHANGED = 'attributeChangedCallback';
var DOM_CONTENT_LOADED = 'DOMContentLoaded';
var CTOR_PROP_NAME = 'constructor';
var ATTR_IS_NAME = 'is';

var nativeSupport = CE_PROP_NAME in window;
var promisesSupported = 'Promise' in window;

exports.default = {
    nativeSupport: nativeSupport,
    install: install,
    uninstall: uninstall,
    isInstalled: isInstalled,
    installTranspiledClassSupport: installTranspiledClassSupport,
    isCustom: isCustom,
    tryToUpgradeElement: tryToUpgradeElement,
    executeCEReactions: executeCEReactions,
    isValidCustomElementName: isValidCustomElementName
};


_dom2.default.registerInsertingSteps(function (node) {
    if (node.isConnected) {
        if (isCustom(node)) {
            enqueueCallbackReaction(node, CE_CALLBACK_CONNECTED, []);
        } else {
            tryToUpgradeElement(node);
        }
    }
});

_dom2.default.registerRemovingSteps(function (node, parent) {
    if (isCustom(node)) {
        enqueueCallbackReaction(node, CE_CALLBACK_DISCONNECTED, []);
    }
});

_dom2.default.registerAdoptingSteps(function (node, oldDocument, newDocument) {
    if (isCustom(node)) {
        enqueueCallbackReaction(node, CE_CALLBACK_ADOPTED, [oldDocument, newDocument]);
    }
});

_dom2.default.registerCloningSteps(function (node) {
    tryToUpgradeElement(node);
});

_dom2.default.registerAttributeChangeSteps(function (element, localName, oldValue, newValue, nameSpace) {
    if (isCustom(element)) {
        var args = [localName, oldValue, newValue, nameSpace];
        enqueueCallbackReaction(element, CE_CALLBACK_ATTRIBUTE_CHANGED, args);
    }
});

// Installation/uninstallation

function install() {
    var installation = {};

    installation.originalCreateElement = Document.prototype.createElement;
    installation.originalCreateElementNS = Document.prototype.createElementNS;
    installation.builtInElementInterfaces = installHtmlConstructors();
    installation.registry = new CustomElementRegistry();

    Object.defineProperty(window, CE_PROP_NAME, {
        value: installation.registry,
        writable: false,
        configurable: true,
        enumerable: true
    });

    Document.prototype.createElement = createElement;
    Document.prototype.createElementNS = createElementNS;

    if (window.document.readyState === 'loading') {
        window.document.addEventListener(DOM_CONTENT_LOADED, performInitialUpgrades, { once: true });
    } else {
        performInitialUpgrades();
    }

    installation.customElementsReactionStack = [];
    installation.backupElementQueue = [];
    installation.processingBackupElementQueue = false;

    setPrivateState(window, installation);
}

function uninstall() {
    var installation = getPrivateState(window);

    if (!installation) {
        return;
    }

    uninstallHtmlConstructors(installation.builtInElementInterfaces);

    delete window[CE_PROP_NAME];

    Document.prototype.createElement = installation.originalCreateElement;
    Document.prototype.createElementNS = installation.originalCreateElementNS;

    setPrivateState(window, undefined);
}

function isInstalled() {
    return getPrivateState(window) != null;
}

function gatherBuiltInElementInterfaces() {
    var builtInElementInterfaces = [];
    var windowPropertyNames = Object.getOwnPropertyNames(window);
    for (var i = 0; i < windowPropertyNames.length; i++) {
        var name = windowPropertyNames[i];
        if (/^webkit/.test(name)) {
            // This just avoids a slew of warnings.
            continue;
        }
        var object = window[name];
        if (object && object instanceof nativeHTMLElement || object === nativeHTMLElement) {
            builtInElementInterfaces.push({ name: name, object: object, constructor: object.prototype.constructor });
        }
    }
    return builtInElementInterfaces;
}

function installTranspiledClassSupport() {
    try {
        // Ensure that we are only shimming browsers that support ES2015 class syntax.
        new Function('return class {}');

        var _makeHtmlConstructor = new Function('nativeHTMLElement', 'return function(){const newTarget=new.target||this.constructor;' + 'return Reflect.construct(nativeHTMLElement, [], newTarget);}');

        var builtInElementInterfaces = gatherBuiltInElementInterfaces();
        for (var i = 0; i < builtInElementInterfaces.length; i++) {
            var _builtInElementInterf = builtInElementInterfaces[i],
                name = _builtInElementInterf.name,
                object = _builtInElementInterf.object;

            var htmlConstructor = _makeHtmlConstructor(object);
            htmlConstructor.prototype = object.prototype;
            Object.defineProperty(object.prototype, CTOR_PROP_NAME, {
                value: htmlConstructor,
                writable: true,
                configurable: true
            });
            window[name] = htmlConstructor;
        }
    } catch (error) {
        return;
    }
}

function installHtmlConstructors() {
    var builtInElementInterfaces = gatherBuiltInElementInterfaces();
    for (var i = 0; i < builtInElementInterfaces.length; i++) {
        var _builtInElementInterf2 = builtInElementInterfaces[i],
            name = _builtInElementInterf2.name,
            object = _builtInElementInterf2.object;

        var htmlConstructor = makeHtmlConstructor();
        htmlConstructor.prototype = object.prototype;
        Object.defineProperty(object.prototype, CTOR_PROP_NAME, {
            value: htmlConstructor,
            writable: true,
            configurable: true
        });
        window[name] = htmlConstructor;
    }
    return builtInElementInterfaces;
}

function uninstallHtmlConstructors(builtInElementInterfaces) {
    for (var i = 0; i < builtInElementInterfaces.length; i++) {
        var _builtInElementInterf3 = builtInElementInterfaces[i],
            name = _builtInElementInterf3.name,
            object = _builtInElementInterf3.object,
            _constructor = _builtInElementInterf3.constructor;

        Object.defineProperty(object.prototype, CTOR_PROP_NAME, {
            value: _constructor,
            writable: true,
            configurable: true
        });
        window[name] = object;
    }
}

function makeHtmlConstructor() {
    return function htmlConstructor() {
        var thisPrototype = Object.getPrototypeOf(this);

        // 1. Let registry...
        var registry = window[CE_PROP_NAME];
        var registryState = getPrivateState(registry);

        // 2. If NewTarget...
        if (thisPrototype.constructor === htmlConstructor) {
            throw new TypeError('Illegal constructor');
        }

        // 3. Let definition...
        var definition = void 0;
        for (var i = 0; i < registryState.definitions.length; i++) {
            var current = registryState.definitions[i];
            if (current.constructor === thisPrototype.constructor) {
                definition = current;
                break;
            }
        }
        if (!definition) {
            throw new TypeError();
        }

        // 4. If definition's local name is equal...
        // 5. Otherwise... (customized built-in)
        if (htmlConstructor !== definition.htmlConstructor) {
            // TODO: assert this is the correct HTML___Element
            throw new TypeError('Illegal constructor');
        }

        // 6. let prototype...
        var prototype = thisPrototype;

        // 7. if prototype is not Object...
        // in this polyfill, this should always be true

        // 8. If construction stack is empty...
        var constructionStack = definition.constructionStack;
        if (constructionStack.length === 0) {
            var originalCreateElement = getPrivateState(window).originalCreateElement;
            var _element = originalCreateElement.call(window.document, definition.localName);
            Object.setPrototypeOf(_element, prototype);
            setPrivateState(_element, {
                customElementState: CE_STATE_CUSTOM,
                customElementDefinition: definition
            });
            return _element;
        }

        var lastIndex = constructionStack.length - 1;
        // 9. Let element be the last entry
        var element = constructionStack[lastIndex];
        // 10. if alreadyConstructedMarker
        if (element === alreadyConstructedMarker) {
            throw _utils2.default.makeDOMException('InvalidStateError', 'This element instance is already constructed');
        }
        // 11. set prototype
        Object.setPrototypeOf(element, prototype);
        // 12. replace last entry
        constructionStack[lastIndex] = alreadyConstructedMarker;
        // 13. return element
        return element;
    };
}

function performInitialUpgrades() {
    // Upgrading elements initially present in the document
    var elements = [];
    _dom2.default.forEachShadowIncludingInclusiveDescendant(window.document, elements.push.bind(elements));
    elements.forEach(tryToUpgradeElementSync);
}

// DOM element creation

function createAnElement(document, qualifiedOrLocalName, nameSpace, prefix, is, synchronousCustomElements) {
    is = is || null;
    var result = null;
    var definition = lookupCustomElementDefinition(document, nameSpace, qualifiedOrLocalName, is);
    if (definition && definition.name != definition.localName) {
        result = getPrivateState(window).originalCreateElement.call(document, qualifiedOrLocalName);
        setPrivateState(result, {
            customElementState: CE_STATE_UNDEFINED,
            customElementDefinition: null,
            isValue: is
        });
        if (synchronousCustomElements) {
            upgradeElement(result, definition);
        } else {
            enqueueUpgradeReaction(result, definition);
        }
    } else if (definition) {
        if (synchronousCustomElements) {
            try {
                result = new definition.constructor();
                if (!(result instanceof HTMLElement)) {
                    throw new TypeError('Illegal constructor');
                }
                if (result.attributes.length !== 0 || result.hasChildNodes() || result.parentNode || result.ownerDocument !== document || result.namespaceURI !== htmlNamespace || result.localName !== qualifiedOrLocalName) {
                    var error = new Error('Invalid state manipulation during custom element construction');
                    error.name = 'NotSupportedError';
                    throw error;
                }
            } catch (error) {
                _utils2.default.reportError(error);
                result = getPrivateState(window).originalCreateElement.call(document, qualifiedOrLocalName);
                // should be HTMLUnknownElement already
                setPrivateState(result, {
                    customElementState: CE_STATE_FAILED
                });
            }
        } else {
            result = getPrivateState(window).originalCreateElement.call(document, qualifiedOrLocalName);
            Object.setPrototypeOf(result, HTMLElement.prototype);
            enqueueUpgradeReaction(result, definition);
        }
    } else {
        result = nameSpace ? getPrivateState(window).originalCreateElementNS.call(document, nameSpace, qualifiedOrLocalName) : getPrivateState(window).originalCreateElement.call(document, qualifiedOrLocalName);
        // PERF: forgo setting the custom element state to CE_STATE_UNDEFINED in order
        // to avoid unnecessary allocation.
    }
    return result;
}

function createElement(localName, options) {
    var nameSpace = null;
    //if (this instanceof HTMLDocument) {
    localName = localName.toLowerCase();
    nameSpace = htmlNamespace;
    //}
    var is = options ? options.is || null : null;
    var element = createAnElement(this, localName, nameSpace, null, is, true);
    if (is != null) {
        element.setAttribute(ATTR_IS_NAME, is);
    }
    return element;
}

function createElementNS(nameSpace, qualifiedName, options) {
    var is = options ? options.is || null : null;
    var element = createAnElement(this, qualifiedName, nameSpace, null, is, true);
    if (is != null) {
        element.setAttribute(ATTR_IS_NAME, is);
    }
    return element;
}

// Custom Element spec

function isCustom(node) {
    if (node.nodeType != Node.ELEMENT_NODE) {
        return false;
    }
    var nodeState = getPrivateState(node);
    if (!nodeState) {
        return false;
    }
    return nodeState.customElementState === CE_STATE_CUSTOM;
}

function isValidCustomElementName(localName) {
    // https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name
    switch (localName) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
            return false;
    }

    var nameLength = localName.length;

    if (nameLength < 2) {
        return false;
    }

    var firstCode = localName.charCodeAt(0);
    if (firstCode < 0x61 /* a */ || firstCode > 0x7A /* z */) {
            return false;
        }

    var foundHyphen = false;

    for (var i = 1; i < nameLength; i++) {
        var code = localName.charCodeAt(i);
        if (code >= 0x61 /* a */ && code <= 0x7A /* z */) {
                continue;
            }
        if (code === 0x2D /* - */) {
                foundHyphen = true;
                continue;
            }
        if (code === 0x2E /* . */ || code === 0x5F /* _ */ || code === 0xB7 /* · */) {
                continue;
            }
        if (code >= 0x30 /* 0 */ && code <= 0x39 /* 9 */) {
                continue;
            }
        if (code < 0x00C0) {
            return false;
        }
        if (code >= 0xC0 && code <= 0xD6) {
            continue;
        }
        if (code >= 0xD8 && code <= 0xF6) {
            continue;
        }
        if (code >= 0xF8 && code <= 0x37D) {
            continue;
        }
        if (code >= 0x37F && code <= 0x1FFF) {
            continue;
        }
        if (code >= 0x200C && code <= 0x200D) {
            continue;
        }
        if (code >= 0x203F && code <= 0x2040) {
            continue;
        }
        if (code >= 0x2070 && code <= 0x218F) {
            continue;
        }
        if (code >= 0x2C00 && code <= 0x2FEF) {
            continue;
        }
        if (code >= 0x3001 && code <= 0xD7FF) {
            continue;
        }
        if (code >= 0xF900 && code <= 0xFDCF) {
            continue;
        }
        if (code >= 0xFDF0 && code <= 0xFFFD) {
            continue;
        }
        if (code >= 0x10000 && code <= 0xEFFFF) {
            continue;
        }
        return false;
    }

    return foundHyphen;
}

function lookupCustomElementDefinition(document, nameSpace, localName, is) {
    if (nameSpace !== htmlNamespace) {
        return null;
    }
    if (!document.defaultView) {
        return null;
    }
    var registry = document.defaultView.customElements;
    var privateState = getPrivateState(registry);
    for (var i = 0; i < privateState.definitions.length; i++) {
        var definition = privateState.definitions[i];
        if (definition.localName === localName) {
            if (definition.name === localName || definition.name === is) {
                return definition;
            }
        }
    }
    return null;
}

function CustomElementRegistry() {
    setPrivateState(this, {
        definitions: [],
        elementDefinitionIsRunning: false,
        whenDefinedPromiseMap: {}
    });
}

CustomElementRegistry.prototype = {
    define: function define(name, constructor, options) {
        var _this = this;

        executeCEReactions(function () {
            var privateState = getPrivateState(_this);
            if (constructor !== constructor.prototype.constructor) {
                throw new TypeError('The passed argument must be a constructor');
            }
            if (!isValidCustomElementName(name)) {
                throw _utils2.default.makeDOMException('SyntaxError');
            }
            // TODO: check for already defined name
            // TODO: check for already defined constructor
            var localName = name;
            var extensionOf = options ? options.extends : null;
            var htmlConstructor = window.HTMLElement;
            if (extensionOf != null) {
                if (isValidCustomElementName(extensionOf)) {
                    throw _utils2.default.makeDOMException('NotSupportedError');
                }
                // TODO: check for HTMLUnknownElement
                localName = extensionOf;
                htmlConstructor = Object.getPrototypeOf(testElement).constructor;
            }
            if (privateState.elementDefinitionIsRunning) {
                throw _utils2.default.makeDOMException('NotSupportedError');
            }
            privateState.elementDefinitionIsRunning = true;
            var caught = null;
            var observedAttributes = [];
            var lifecycleCallbacks = void 0;
            var nativeInterface = void 0;
            try {
                var prototype = constructor.prototype;
                if (!(prototype instanceof Object)) {
                    throw new TypeError('Invalid prototype');
                }
                lifecycleCallbacks = {};
                lifecycleCallbacks[CE_CALLBACK_CONNECTED] = getCallback(prototype, CE_CALLBACK_CONNECTED);
                lifecycleCallbacks[CE_CALLBACK_DISCONNECTED] = getCallback(prototype, CE_CALLBACK_DISCONNECTED);
                lifecycleCallbacks[CE_CALLBACK_ADOPTED] = getCallback(prototype, CE_CALLBACK_ADOPTED);
                lifecycleCallbacks[CE_CALLBACK_ATTRIBUTE_CHANGED] = getCallback(prototype, CE_CALLBACK_ATTRIBUTE_CHANGED);
                if (lifecycleCallbacks[CE_CALLBACK_ATTRIBUTE_CHANGED]) {
                    var observedAttributesIterable = constructor.observedAttributes;
                    if (observedAttributesIterable) {
                        observedAttributes = observedAttributesIterable.slice();
                    }
                }
            } catch (error) {
                caught = error;
            }
            privateState.elementDefinitionIsRunning = false;
            if (caught) {
                throw caught;
            }
            var definition = {
                name: name,
                localName: localName,
                constructor: constructor,
                observedAttributes: observedAttributes,
                lifecycleCallbacks: lifecycleCallbacks,
                constructionStack: [],
                htmlConstructor: htmlConstructor
            };
            privateState.definitions.push(definition);
            var document = window.document;
            // This needs to be here because in some cases,
            // an async script can interrupt the parser
            // and any custom elements that call attachShadow
            // in their constructor will have adverse effects
            // due to the parser not yet having processed all
            // of the child nodes.
            if (document.readyState !== 'loading') {
                _dom2.default.forEachShadowIncludingInclusiveDescendant(document, function (node) {
                    if (node.nodeType === Node.ELEMENT_NODE && node.namespaceURI === htmlNamespace && node.localName === localName) {
                        if (extensionOf) {
                            var nodeState = getPrivateState(node);
                            // TODO: test upgrades to existing extended built-in custom elements
                            if (nodeState.isValue !== extensionOf) {
                                return;
                            }
                        }
                        enqueueUpgradeReaction(node, definition);
                    }
                });
            }
            var entry = privateState.whenDefinedPromiseMap[name];
            if (entry) {
                _microtask2.default.enqueue(function () {
                    entry.resolve();
                    privateState.whenDefinedPromiseMap[name] = null;
                });
            }
        });
    },
    get: function get(name) {
        var privateState = getPrivateState(this);
        for (var i = 0; i < privateState.definitions.length; i++) {
            var definition = privateState.definitions[i];
            if (definition.name === name) {
                return definition.constructor;
            }
        }
        return undefined;
    },
    whenDefined: function whenDefined(name) {
        if (!promisesSupported) {
            throw new Error('Please include a promise polyfill.');
        }
        if (!isValidCustomElementName(name)) {
            throw _utils2.default.makeDOMException('SyntaxError', 'Invalid custom element name');
        }
        var privateState = getPrivateState(this);
        for (var i = 0; i < privateState.definitions.length; i++) {
            var definition = privateState.definitions[i];
            if (name === definition.name) {
                return Promise.resolve();
            }
        }
        var entry = privateState.whenDefinedPromiseMap[name];
        if (!entry) {
            entry = { promise: null, resolve: null };
            entry.promise = new Promise(function (resolve, reject) {
                entry.resolve = resolve;
            });
            privateState.whenDefinedPromiseMap[name] = entry;
        }
        return entry.promise;
    }
};

function upgradeElement(element, definition) {
    // https://html.spec.whatwg.org/multipage/scripting.html#concept-upgrade-an-element
    var elementState = getPrivateState(element);
    if (!elementState) {
        elementState = setPrivateState(element, {
            reactionQueue: [],
            customElementDefinition: definition
        });
    } else if (shouldNotUpgrade(elementState)) {
        return;
    }
    var attributes = element.attributes;
    for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        var args = [attribute.localName, null, attribute.value, attribute.namespaceURI];
        enqueueCallbackReaction(element, CE_CALLBACK_ATTRIBUTE_CHANGED, args);
        _Attr2.default.patchAttributeNodeIfNeeded(attribute);
    }
    if (element.isConnected) {
        enqueueCallbackReaction(element, CE_CALLBACK_CONNECTED, []);
    }
    definition.constructionStack.push(element);
    var caught = null;
    try {
        var constructResult = new definition.constructor();
        if (constructResult !== element) {
            throw _utils2.default.makeDOMException('InvalidStateError');
        }
    } catch (error) {
        caught = error;
        delete element.prototype;
        elementState.customElementState = CE_STATE_FAILED;
        elementState.customElementDefinition = null;
        elementState.reactionQueue.splice(0, elementState.reactionQueue.length);
    }
    definition.constructionStack.pop();
    if (caught) {
        throw caught;
    }
    elementState.customElementState = CE_STATE_CUSTOM;
}

function tryToUpgradeElementSync(element) {
    var elementState = getPrivateState(element);
    var isValue = null;
    if (elementState) {
        if (shouldNotUpgrade(elementState)) {
            return;
        }
        isValue = elementState.isValue;
    }
    var definition = lookupCustomElementDefinition(element.ownerDocument, element.namespaceURI, element.localName, isValue);
    if (definition) {
        upgradeElement(element, definition);
    }
}

function tryToUpgradeElement(element) {
    var elementState = getPrivateState(element);
    var isValue = null;
    if (elementState) {
        if (shouldNotUpgrade(elementState)) {
            return;
        }
        isValue = elementState.isValue;
    }
    var definition = lookupCustomElementDefinition(element.ownerDocument, element.namespaceURI, element.localName, isValue);
    if (definition) {
        enqueueUpgradeReaction(element, definition);
    }
}

function enqueueElementOnAppropriateElementQueue(element) {
    var installation = getPrivateState(window);
    if (!installation) {
        return;
    }
    // https://html.spec.whatwg.org/multipage/scripting.html#enqueue-an-element-on-the-appropriate-element-queue
    // 1. If the custom element reactions stack is empty, then:
    var stack = installation.customElementsReactionStack;
    if (stack.length === 0) {
        // 1. Add element to the backup element queue.
        installation.backupElementQueue.push(element);
        // 2. If the processing the backup element queue flag is set, abort this algorithm.
        if (installation.processingBackupElementQueue) {
            return;
        }
        // 3. Set the processing the backup element queue flag.
        installation.processingBackupElementQueue = true;
        // 4. Queue a microtask to perform the following steps:
        _microtask2.default.enqueue(function () {
            // 1. Invoke custom element reactions in the backup element queue.
            invokeReactions(installation.backupElementQueue);
            // 2. Unset the processing the backup element queue flag.
            installation.processingBackupElementQueue = false;
        });
    }
    // 2. Otherwise, add element to the current element queue.
    else {
            stack[stack.length - 1].push(element);
        }
}

function enqueueCallbackReaction(element, callbackName, args) {
    // https://html.spec.whatwg.org/multipage/scripting.html#enqueue-a-custom-element-callback-reaction
    var elementState = getPrivateState(element);
    var definition = elementState.customElementDefinition;
    var callback = definition.lifecycleCallbacks[callbackName];
    if (callback == null) {
        return;
    }
    if (callbackName === CE_CALLBACK_ATTRIBUTE_CHANGED) {
        var attributeName = args[0];
        if (definition.observedAttributes.indexOf(attributeName) === -1) {
            return;
        }
    }
    if (!elementState.reactionQueue) {
        elementState.reactionQueue = [];
    }
    elementState.reactionQueue.push({ type: callbackReactionType, callback: callback, args: args });
    enqueueElementOnAppropriateElementQueue(element);
}

function enqueueUpgradeReaction(element, definition) {
    // https://html.spec.whatwg.org/multipage/scripting.html#enqueue-a-custom-element-upgrade-reaction
    var elementState = getPrivateState(element) || setPrivateState(element, { reactionQueue: [] });
    elementState.customElementDefinition = definition;
    elementState.reactionQueue.push({ type: upgradeReactionType, definition: definition });
    enqueueElementOnAppropriateElementQueue(element);
}

function invokeReactions(queue) {
    // https://html.spec.whatwg.org/multipage/scripting.html#invoke-custom-element-reactions
    for (var i = 0; i < queue.length; i++) {
        var element = queue[i];
        var reactions = getPrivateState(element).reactionQueue;
        while (reactions.length) {
            try {
                var splicedOut = reactions.splice(0, 1);
                var reaction = splicedOut[0];
                switch (reaction.type) {
                    case upgradeReactionType:
                        upgradeElement(element, reaction.definition);
                        break;
                    case callbackReactionType:
                        reaction.callback.apply(element, reaction.args);
                        break;
                }
            } catch (error) {
                _utils2.default.reportError(error);
            }
        }
    }
}

function executeCEReactions(callback) {
    var installation = getPrivateState(window);
    if (installation) {
        var stack = installation.customElementsReactionStack;
        stack.push([]);
        var result = callback();
        invokeReactions(stack.pop());
        return result;
    }
    return callback();
}

// Utility functions

function shouldNotUpgrade(privateState) {
    return privateState && (privateState.customElementState === CE_STATE_CUSTOM || privateState.customElementState === CE_STATE_FAILED);
}

function getCallback(prototype, callbackName) {
    var callback = prototype[callbackName];
    if (callback && typeof callback === 'function') {
        return callback;
    }
    return null;
}

function getPrivateState(object) {
    return object._custom;
}

function setPrivateState(object, state) {
    return object._custom = state;
}

},{"./dom.js":2,"./interfaces/Attr.js":3,"./microtask.js":19,"./utils.js":28}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _mutationObservers = require('./mutation-observers.js');

var _mutationObservers2 = _interopRequireDefault(_mutationObservers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    registerInsertingSteps: registerInsertingSteps,
    registerRemovingSteps: registerRemovingSteps,
    registerAdoptingSteps: registerAdoptingSteps,
    registerCloningSteps: registerCloningSteps,
    registerAttributeChangeSteps: registerAttributeChangeSteps,

    forEachShadowIncludingInclusiveDescendant: forEachShadowIncludingInclusiveDescendant,
    treeOrderRecursiveSelectAll: treeOrderRecursiveSelectAll,
    treeOrderRecursiveSelectFirst: treeOrderRecursiveSelectFirst,
    isShadowRoot: isShadowRoot,

    parseHTMLFragment: parseHTMLFragment,
    serializeHTMLFragment: serializeHTMLFragment,

    root: root,

    convertNodesIntoANode: convertNodesIntoANode,

    clone: clone,
    adopt: adopt,

    shadowIncludingRoot: shadowIncludingRoot,
    shadowIncludingInclusiveAncestor: shadowIncludingInclusiveAncestor,
    closedShadowHidden: closedShadowHidden,
    retarget: retarget,

    changeAttribute: changeAttribute,
    appendAttribute: appendAttribute,
    removeAttribute: removeAttribute,
    setAttribute: setAttribute,
    setAttributeValue: setAttributeValue,
    removeAttributeByName: removeAttributeByName,
    removeAttributeByNamespace: removeAttributeByNamespace,

    insertAdjacent: insertAdjacent,

    listOfElementsWithQualifiedName: listOfElementsWithQualifiedName,
    listOfElementsWithNamespaceAndLocalName: listOfElementsWithNamespaceAndLocalName,
    listOfElementsWithClassNames: listOfElementsWithClassNames,

    setExistingAttributeValue: setExistingAttributeValue,

    findFlattenedSlotables: findFlattenedSlotables,

    preInsert: preInsert,
    insert: insert,
    append: append,
    replace: replace,
    replaceAll: replaceAll,
    preRemove: preRemove,
    remove: remove

};


var insertingSteps = [];
var removingSteps = [];
var adoptingSteps = [];
var cloningSteps = [];
var attributeChangeSteps = [];

function registerInsertingSteps(steps) {
    insertingSteps.push(steps);
}

function registerRemovingSteps(steps) {
    removingSteps.push(steps);
}

function registerAdoptingSteps(steps) {
    adoptingSteps.push(steps);
}

function registerCloningSteps(steps) {
    cloningSteps.push(steps);
}

function registerAttributeChangeSteps(steps) {
    attributeChangeSteps.push(steps);
}

var elementRemoveAttributeNSDescriptor = _utils2.default.descriptor(Element, 'removeAttributeNS');
var elementSetAttributeDescriptor = _utils2.default.descriptor(Element, 'setAttribute');
var elementSetAttributeNSDescriptor = _utils2.default.descriptor(Element, 'setAttributeNS');
var namedNodeMapSetNamedItemNSDescriptor = _utils2.default.descriptor(NamedNodeMap, 'setNamedItemNS');
var nodeAppendChildDescriptor = _utils2.default.descriptor(Node, 'appendChild');
var nodeCloneNodeDescriptor = _utils2.default.descriptor(Node, 'cloneNode');
var nodeInsertBeforeDescriptor = _utils2.default.descriptor(Node, 'insertBefore');
var nodeRemoveChildDescriptor = _utils2.default.descriptor(Node, 'removeChild');

var attrValueDescriptor = _utils2.default.descriptor(Attr, 'value');

var ATTR_NAME = 'name';
var EMPTY_STRING = '';
var ERROR_IN_USE_ATTRIBUTE = 'InUseAttributeError';
var ERROR_HIERARCHY_REQUEST = 'HierarchyRequestError';
var ERROR_INDEX_SIZE = 'IndexSizeError';
var ERROR_NOT_FOUND = 'NotFoundError';
var ERROR_SYNTAX = 'SyntaxError';
var MO_TYPE_CHILD_LIST = 'childList';
var NS_HTML = 'http://www.w3.org/1999/xhtml';
var NS_MATHML = 'http://www.w3.org/1998/Math/MathML';
var NS_SVG = 'http://www.w3.org/2000/svg';
var NS_XML = 'http://www.w3.org/XML/1998/namespace';
var NS_XMLNS = 'http://www.w3.org/2000/xmlns/';
var NS_XLINK = 'http://www.w3.org/1999/xlink';
var SHADOW_MODE_OPEN = 'open';
var SHADOW_MODE_CLOSED = 'closed';
var SHADOW_NODE_NAME = '#shadow-root';
var TAG_SLOT = 'slot';

function forEachInclusiveDescendant(node, callback) {
    callback(node);
    var childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        forEachInclusiveDescendant(childNodes[i], callback);
    }
}

function forEachShadowIncludingInclusiveDescendant(node, action) {
    action(node);
    var shadowState = null;
    var shadowRoot = null;
    if ((shadowState = _utils2.default.getShadowState(node)) && (shadowRoot = shadowState.shadowRoot)) {
        forEachShadowIncludingInclusiveDescendant(shadowRoot, action);
    }
    var childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        forEachShadowIncludingInclusiveDescendant(childNodes[i], action);
    }
}

function treeOrderRecursiveSelectAll(node, results, match) {
    if (match(node)) {
        results[results.length] = node;
    }
    var firstChild = node.firstChild;
    if (firstChild) {
        treeOrderRecursiveSelectAll(firstChild, results, match);
    }
    var nextSibling = node.nextSibling;
    if (nextSibling) {
        treeOrderRecursiveSelectAll(nextSibling, results, match);
    }
}

function treeOrderRecursiveSelectFirst(node, match) {
    if (match(node)) {
        return node;
    }
    var firstChild = node.firstChild;
    if (firstChild) {
        var result = treeOrderRecursiveSelectFirst(firstChild, match);
        if (result) {
            return result;
        }
    }
    var nextSibling = node.nextSibling;
    if (nextSibling) {
        return treeOrderRecursiveSelectFirst(nextSibling, match);
    }
    return null;
}

function isShadowRoot(node) {
    return node.nodeName === SHADOW_NODE_NAME;
}

function isSlot(node) {
    return node.localName === TAG_SLOT;
}

function isSlotable(node) {
    return node instanceof Element || node instanceof Text;
}

// https://www.w3.org/TR/DOM-Parsing/

// PERF: This function uses a recycled document fragment 
// to avoid allocation. Callers must empty the returned fragment.
var parser = new DOMParser();
var parsingFragment = document.createDocumentFragment();
function parseHTMLFragment(markup, context) {
    // The surrounding tag is required to preserve all of the original markup (comments, etc.)
    // and also account for behavior of things like table elements.
    var tag = context.tagName;
    var depth = 0;
    switch (tag) {
        case 'TABLE':
            markup = '<TABLE>' + markup + '</TABLE>';
            depth = 1;
            break;
        case 'COLGROUP':
        case 'TBODY':
        case 'THEAD':
        case 'TFOOT':
            markup = '<TABLE><' + tag + '>' + markup + '</' + tag + '></TABLE>';
            depth = 2;
            break;
        case 'TR':
            markup = '<TABLE><TBODY><TR>' + markup + '</TR></TBODY></TABLE>';
            depth = 3;
            break;
        default:
            markup = '<BODY>' + markup + '</BODY>';
            break;
    }
    var parsingResult = parser.parseFromString(markup, 'text/html').body;
    for (var i = 0; i < depth && parsingResult.firstChild; i++) {
        parsingResult = parsingResult.firstChild;
    }
    var firstChild = void 0;
    while (firstChild = parsingResult.firstChild) {
        nodeAppendChildDescriptor.value.call(parsingFragment, firstChild);
    }
    return parsingFragment;
}

function serializeHTMLFragment(node) {
    // https://www.w3.org/TR/html5/single-page.html#html-fragment-serialization-algorithm

    // 1. Let s be a string, and initialize it to the empty string.
    var s = EMPTY_STRING;

    // 2. If the node is a template element, then let the node instead be the 
    // template element's template contents (a DocumentFragment node).
    if (node.localName === 'template') {
        var content = node.content;
        if (content) {
            node = content;
        }
    }

    // 3. For each child node of the node, in tree order, run the following steps:
    var childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        // 1. Let current node be the child node being processed.
        var currentNode = childNodes[i];
        // 2. Append the appropriate string from the following list to s:
        switch (currentNode.nodeType) {
            case Node.ELEMENT_NODE:
                var tagName = void 0;
                switch (currentNode.namespaceURI) {
                    case NS_HTML:
                    case NS_MATHML:
                    case NS_SVG:
                        tagName = currentNode.localName;
                        break;
                    default:
                        tagName = currentNode.qualifiedName;
                        break;
                }
                s += '<' + tagName;
                var attributes = currentNode.attributes;
                for (var j = 0; j < attributes.length; j++) {
                    var attribute = attributes[j];
                    s += ' ' + serializeAttributeName(attribute);
                    s += '="' + escapeString(attribute.value) + '"';
                }
                s += '>';
                switch (currentNode.localName) {
                    case 'area':case 'base':case 'basefont':case 'bgsound':
                    case 'br':case 'col':case 'embed':case 'frame':case 'hr':
                    case 'img':case 'input':case 'keygen':case 'link':case 'meta':
                    case 'param':case 'source':case 'track':case 'wbr':
                        continue;
                    case 'pre':case 'textarea':case 'listing':
                        var firstChild = currentNode.firstChild;
                        if (firstChild && firstChild.nodeType === Node.TEXT_NODE && firstChild.data[0] === '\n') {
                            s += '\n';
                        }
                        break;
                }
                s += serializeHTMLFragment(currentNode);
                s += '</' + tagName + '>';
                break;
            case Node.TEXT_NODE:
                switch (currentNode.parentNode.localName) {
                    case 'style':case 'script':case 'xmp':case 'iframe':
                    case 'noembed':case 'noframes':case 'plaintext':case 'noscript':
                        s += currentNode.data;
                        break;
                    default:
                        s += escapeString(currentNode.data);
                        break;
                }
                break;
            case Node.COMMENT_NODE:
                s += '<!--' + currentNode.data + '-->';
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                s += '<?' + currentNode.target + ' ' + currentNode.data + '>';
                break;
            case Node.DOCUMENT_TYPE_NODE:
                s += '<!DOCTYPE ' + currentNode.name + '>';
                break;
        }
    }

    // 4. The result of the algorithm is the string s.
    return s;

    function escapeString(string, attributeMode) {
        if (!string || !string.length) {
            return EMPTY_STRING;
        }

        string = string.replace('&', '&amp;');
        string = string.replace('\xA0', '&nbsp;');

        if (attributeMode) {
            string = string.replace('"', '&quot;');
        } else {
            string = string.replace('<', '&lt;');
            string = string.replace('>', '&gt;');
        }

        return string;
    }

    function serializeAttributeName(attribute) {
        var namespaceURI = attribute.namespaceURI;
        var localName = attribute.localName;
        if (!namespaceURI) {
            return localName;
        }
        switch (namespaceURI) {
            case NS_XML:
                return 'xml:' + localName;
            case NS_XMLNS:
                if (localName === 'xmlns') {
                    return localName;
                }
                return 'xmlns:' + localName;
            case NS_XLINK:
                return 'xlink:' + localName;
            default:
                return attribute.name;
        }
    }
}

// https://dom.spec.whatwg.org/#trees

function root(node) {
    var root = node;
    var parent = root.parentNode;

    while (parent != null) {
        root = parent;
        parent = root.parentNode;
    }

    return root;
}

function descendant(nodeA, nodeB) {
    var parent = nodeA.parentNode;

    while (parent != null) {
        if (nodeB === parent) {
            return true;
        }
        parent = parent.parentNode;
    }

    return false;
}

function inclusiveDescendant(nodeA, nodeB) {
    return nodeA === nodeB || descendant(nodeA, nodeB);
}

function ancestor(nodeA, nodeB) {
    var parent = nodeB.parentNode;

    while (parent != null) {
        if (nodeA === parent) {
            return true;
        }
        parent = parent.parentNode;
    }

    return false;
}

function inclusiveAncestor(nodeA, nodeB) {
    return nodeA === nodeB || ancestor(nodeA, nodeB);
}

// https://dom.spec.whatwg.org/#interface-parentnode

function convertNodesIntoANode(nodes, document) {
    var node = null;

    for (var i = 0; i < nodes.length; i++) {
        var item = nodes[i];

        if (typeof item === "string") {
            nodes[i] = document.createTextNode(item);
        }
    }

    if (nodes.length === 1) {
        node = nodes[0];
    } else {
        node = document.createDocumentFragment();

        for (var _i = 0; _i < nodes.length; _i++) {
            node.appendChild(nodes[_i]);
        }
    }

    return node;
}

// https://dom.spec.whatwg.org/#interface-node

function clone(node, document, cloneChildren) {
    // https://dom.spec.whatwg.org/#concept-node-clone
    // To clone a node, with an optional document and clone children flag, run these steps:

    // 1. If document is not given, let document be node’s node document.
    document = document || node.ownerDocument;

    // For performance reasons we are going to do things a little differently.

    // 2. If node is an element, then....
    // 3. Otherwise, let copy be a node that implements the same interfaces 
    // as node, and fulfills these additional requirements, switching on node:
    // 4. Set copy’s node document and document to copy, if copy is a document, 
    // and set copy’s node document to document otherwise.
    var copy = nodeCloneNodeDescriptor.value.call(node, false);
    for (var i = 0; i < cloningSteps.length; i++) {
        cloningSteps[i](copy);
    }

    // 5. Run any cloning steps defined for node in other applicable 
    // specifications and pass copy, node, document and the clone children 
    // flag if set, as parameters.
    // SKIP: other

    // 6. If the clone children flag is set, clone all the children of node 
    // and append them to copy, with document as specified and the clone 
    // children flag being set.
    // PERF: Use the native appendChild instead of the simulation DOM append algorithm.
    // This should be okay because no node in the clone tree can possibly have any mutation 
    // observers or shadow roots yet.
    if (cloneChildren) {
        var childNodes = node.childNodes;
        var childNodesCount = childNodes.length;
        for (var _i2 = 0; _i2 < childNodesCount; _i2++) {
            var childCopy = clone(childNodes[_i2], document, true);
            nodeAppendChildDescriptor.value.call(copy, childCopy);
        }
    }

    return copy;
}

function adopt(node, document) {
    // https://dom.spec.whatwg.org/#concept-node-adopt

    // 1. Let oldDocument be node’s node document.
    var oldDocument = node.ownerDocument;

    // 2. If node’s parent is not null, remove node from its parent.
    var parent = node.parentNode;
    if (parent != null) {
        remove(node, parent);
    }

    // 3. If document is not the same as oldDocument, run these substeps:
    if (document != oldDocument) {
        forEachShadowIncludingInclusiveDescendant(node, function (inclusiveDescendant) {
            for (var i = 0; i < adoptingSteps.length; i++) {
                adoptingSteps[i](inclusiveDescendant, oldDocument, document);
            }
        });
    }
}

// https://dom.spec.whatwg.org/#interface-documentfragment

function hostIncludingInclusiveAncestor(nodeA, nodeB) {
    if (inclusiveAncestor(nodeA, nodeB)) {
        return true;
    }

    var host = root(nodeB).host;

    if (host && hostIncludingInclusiveAncestor(nodeA, host)) {
        return true;
    }

    return false;
}

// https://dom.spec.whatwg.org/#interface-shadowroot

function shadowIncludingRoot(node) {
    var rootNode = root(node);
    if (isShadowRoot(rootNode)) {
        rootNode = shadowIncludingRoot(rootNode.host);
    }
    return rootNode;
}

function shadowIncludingDescendant(nodeA, nodeB) {
    do {
        if (isShadowRoot(nodeA)) {
            nodeA = nodeA.host;
        } else {
            nodeA = nodeA.parentNode;
        }
        if (nodeA === nodeB) {
            return true;
        }
    } while (nodeA != null);

    return false;
}

function shadowIncludingAncestor(nodeA, nodeB) {
    return shadowIncludingDescendant(nodeB, nodeA);
}

function shadowIncludingInclusiveAncestor(nodeA, nodeB) {
    return nodeA === nodeB || shadowIncludingAncestor(nodeA, nodeB);
}

function closedShadowHidden(nodeA, nodeB) {
    // https://dom.spec.whatwg.org/#concept-closed-shadow-hidden
    var rootNode = root(nodeA);

    if (!isShadowRoot(rootNode)) {
        return false;
    }

    if (shadowIncludingInclusiveAncestor(rootNode, nodeB)) {
        return false;
    }

    if (rootNode.mode === SHADOW_MODE_CLOSED || closedShadowHidden(rootNode.host, nodeB)) {
        return true;
    }

    return false;
}

function retarget(nodeA, nodeB) {
    // https://dom.spec.whatwg.org/#retarget
    // To retarget an object A against an object B, repeat these steps 
    // until they return an object:

    var rootNode = void 0;
    while (rootNode = root(nodeA)) {
        // 1. If A’s root is not a shadow root, or A’s root is a shadow-including 
        // inclusive ancestor of B, then return A.
        if (!isShadowRoot(rootNode) || shadowIncludingInclusiveAncestor(rootNode, nodeB)) {
            return nodeA;
        }
        // 2. Set A to A’s root’s host.
        nodeA = rootNode.host;
    }
}

// https://dom.spec.whatwg.org/#interface-element

registerAttributeChangeSteps(function updateSlotName(element, localName, oldValue, value, nameSpace) {
    // https://dom.spec.whatwg.org/#slot-name
    if (isSlot(element)) {
        if (localName === ATTR_NAME && nameSpace == null) {
            if (value === oldValue) {
                return;
            }
            if (value == null && oldValue === EMPTY_STRING) {
                return;
            }
            if (value === EMPTY_STRING && oldValue == null) {
                return;
            }
            if (value == null || value === EMPTY_STRING) {
                elementSetAttributeDescriptor.value.call(element, ATTR_NAME, EMPTY_STRING);
            } else {
                elementSetAttributeDescriptor.value.call(element, ATTR_NAME, value);
            }
            var elementTree = root(element);
            if (isShadowRoot(elementTree)) {
                assignSlotablesForATree(elementTree);
            }
        }
    }
});

registerAttributeChangeSteps(function updateSlotableName(element, localName, oldValue, value, nameSpace) {
    // https://dom.spec.whatwg.org/#slotable-name
    if (localName === TAG_SLOT && nameSpace == null) {
        if (value === oldValue) {
            return;
        }
        if (value == null && oldValue === EMPTY_STRING) {
            return;
        }
        if (value === EMPTY_STRING && oldValue == null) {
            return;
        }
        if (value == null || value === EMPTY_STRING) {
            elementSetAttributeDescriptor.value.call(element, TAG_SLOT, EMPTY_STRING);
        } else {
            elementSetAttributeDescriptor.value.call(element, TAG_SLOT, value);
        }
        var parentNode = element.parentNode;
        if (!parentNode) {
            return;
        }
        var parentState = _utils2.default.getShadowState(parentNode);
        if (!parentState || !parentState.shadowRoot) {
            return;
        }
        assignSlotablesForATree(parentState.shadowRoot);
    }
});

function changeAttribute(attribute, element, value) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-change

    var name = attribute.localName;
    var nameSpace = attribute.namespaceURI;
    var oldValue = attribute.value;
    var newValue = value;

    // 1. Queue a mutation record...
    // SKIP

    // 2. If element is custom...
    // SKIP: refactored out into attribute change steps

    // 3. Run the attribute change steps...
    for (var i = 0; i < attributeChangeSteps.length; i++) {
        attributeChangeSteps[i](element, name, oldValue, newValue, nameSpace);
    }

    // 4. Set attribute's value...
    if (nameSpace) {
        elementSetAttributeNSDescriptor.value.call(element, nameSpace, attribute.prefix + ':' + name, newValue);
    } else {
        elementSetAttributeDescriptor.value.call(element, name, newValue);
    }
}

function appendAttribute(attribute, element) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-append

    var name = attribute.localName;
    var nameSpace = attribute.namespaceURI;
    var oldValue = null;
    var newValue = attribute.value;

    // 1. Queue a mutation record...
    // SKIP

    // 2. If element is custom...
    // SKIP: refactored out into attribute change steps

    // 3. Run the attribute change steps...
    for (var i = 0; i < attributeChangeSteps.length; i++) {
        attributeChangeSteps[i](element, name, oldValue, newValue, nameSpace);
    }

    // 4. Append the attribute to the element’s attribute list.
    // SKIP: handled by caller

    // 5. Set attribute’s element to element.
    // SKIP: native
}

function removeAttribute(attribute, element) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-remove

    var name = attribute.localName;
    var nameSpace = attribute.namespaceURI;
    var oldValue = attribute.value;
    var newValue = null;

    // 1. Queue a mutation record...
    // SKIP

    // 2. If element is custom...
    // SKIP: refactored out into attribute change steps

    // 3. Run the attribute change steps...
    for (var i = 0; i < attributeChangeSteps.length; i++) {
        attributeChangeSteps[i](element, name, oldValue, newValue, nameSpace);
    }

    // 4. Remove attribute from the element’s attribute list.
    elementRemoveAttributeNSDescriptor.value.call(element, nameSpace, name);

    // 5. Set attribute’s element to null.
    // SKIP: native
}

function replaceAttribute(oldAttr, newAttr, element) {
    // Used by 'set an attribute'
    // https://dom.spec.whatwg.org/#concept-element-attributes-replace

    var name = oldAttr.localName;
    var nameSpace = oldAttr.namespaceURI;
    var oldValue = oldAttr.value;
    var newValue = newAttr.value;

    // 1. Queue a mutation record...
    // SKIP

    // 2. If element is custom...
    // SKIP: refactored out into attribute change steps

    // 3. Run the attribute change steps...
    for (var i = 0; i < attributeChangeSteps.length; i++) {
        attributeChangeSteps[i](element, name, oldValue, newValue, nameSpace);
    }

    // 4. Replace oldAttr by newAttr in the element’s attribute list.
    // SKIP: handled by callers

    // 5. Set oldAttr’s element to null.
    // SKIP: native

    // 6. Set newAttr’s element to element.
    // SKIP: native
}

function setAttribute(attr, element, nativeSetAttributeNodeDescriptor) {
    if (attr.ownerElement != null && attr.ownerElement !== element) {
        throw _utils2.default.makeDOMException(ERROR_IN_USE_ATTRIBUTE);
    }
    var attributes = element.attributes;
    var oldAttr = attributes.getNamedItemNS(attr.namespaceURI, attr.localName);
    if (oldAttr === attr) {
        return attr;
    }
    namedNodeMapSetNamedItemNSDescriptor.value.call(attributes, attr);
    if (oldAttr) {
        replaceAttribute(oldAttr, attr, element);
    } else {
        appendAttribute(attr, element);
    }
    return oldAttr;
}

function setAttributeValue(element, localName, value, prefix, ns) {
    prefix = prefix || null;
    ns = ns || null;
    var attributes = element.attributes;
    var attribute = attributes.getNamedItemNS(ns, localName);
    if (!attribute) {
        elementSetAttributeDescriptor.value.call(element, localName, value);
        attribute = attributes.getNamedItemNS(ns, localName);
        appendAttribute(attribute, element);
        return;
    }
    changeAttribute(attribute, element, value);
}

function removeAttributeByName(qualifiedName, element) {
    var attributes = element.attributes;
    var attr = attributes.getNamedItem(qualifiedName);
    if (attr) {
        removeAttribute(attr, element);
    }
    return attr;
}

function removeAttributeByNamespace(nameSpace, localName, element) {
    var attributes = element.attributes;
    var attr = attributes.getNamedItemNS(nameSpace, localName);
    if (attr) {
        removeAttribute(attr, element);
    }
    return attr;
}

function insertAdjacent(element, where, node) {
    if (!(node instanceof Node)) {
        throw new TypeError();
    }
    var parent = void 0;
    // https://dom.spec.whatwg.org/#insert-adjacent
    switch ((where || EMPTY_STRING).toLowerCase()) {
        case 'beforebegin':
            if (parent = element.parentNode) {
                return preInsert(node, parent, element);
            }
            return null;
        case 'afterbegin':
            return preInsert(node, element, element.firstChild);
        case 'beforeend':
            return preInsert(node, element, null);
        case 'afterend':
            if (parent = element.parentNode) {
                return preInsert(node, parent, element.nextSibling);
            }
            return null;
        default:
            throw _utils2.default.makeDOMException(ERROR_SYNTAX);
    }
}

function listOfElementsWithQualifiedName(root, qualifiedName) {
    var results = [];
    var firstChild = root.firstChild;

    if (firstChild === null) {
        return results;
    }

    if (qualifiedName === '*') {
        treeOrderRecursiveSelectAll(firstChild, results, _utils2.default.isElementNode);
        return results;
    }

    // TODO: Consider support for non-HTML documents?
    var lowerCaseQualifiedName = qualifiedName.toLowerCase();
    treeOrderRecursiveSelectAll(firstChild, results, function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return false;
        } else if (node.namespaceURI === NS_HTML) {
            return node.localName === lowerCaseQualifiedName;
        } else if (node.prefix !== null) {
            return node.prefix + ':' + node.localName === qualifiedName;
        } else {
            return node.localName === qualifiedName;
        }
    });

    return results;
}

function listOfElementsWithNamespaceAndLocalName(root, nameSpace, localName) {
    var results = [];
    var firstChild = root.firstChild;

    if (firstChild === null) {
        return results;
    }

    if (nameSpace === '') {
        nameSpace = null;
    }

    if (nameSpace === '*' && localName === '*') {
        treeOrderRecursiveSelectAll(firstChild, results, _utils2.default.isElementNode);
        return results;
    }

    if (nameSpace === '*') {
        treeOrderRecursiveSelectAll(firstChild, results, function (node) {
            return node.nodeType === Node.ELEMENT_NODE && node.localName === localName;
        });
        return results;
    }

    if (localName === '*') {
        treeOrderRecursiveSelectAll(firstChild, results, function (node) {
            return node.nodeType === Node.ELEMENT_NODE && node.namespaceURI === nameSpace;
        });
        return results;
    }

    treeOrderRecursiveSelectAll(firstChild, results, function (node) {
        return node.nodeType === Node.ELEMENT_NODE && node.namespaceURI === nameSpace && node.localName === localName;
    });
    return results;
}

function listOfElementsWithClassNames(root, names) {
    var results = [];
    var firstChild = root.firstChild;

    if (firstChild === null) {
        return results;
    }

    var classes = _utils2.default.getUniqueSortedTokens(names);

    if (classes === null) {
        return results;
    }

    treeOrderRecursiveSelectAll(firstChild, results, function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return false;
        }
        var nodeClassNames = _utils2.default.getUniqueSortedTokens(node.className);
        return nodeClassNames !== null && _utils2.default.hasAll(classes, nodeClassNames);
    });

    return results;
}

// https://dom.spec.whatwg.org/#attr

function setExistingAttributeValue(attribute, value) {
    if (attribute.ownerElement == null) {
        attrValueDescriptor.set.call(attribute, value);
    } else {
        changeAttribute(attribute, attribute.ownerElement, value);
    }
}

// https://dom.spec.whatwg.org/#finding-slots-and-slotables

function findASlot(slotable, open) {
    // https://dom.spec.whatwg.org/#find-a-slot
    // To find a slot for a given slotable slotable and an optional 
    // open flag (unset unless stated otherwise), run these steps:

    // 1. If slotable’s parent is null, then return null.
    var parent = slotable.parentNode;
    if (!parent) {
        return null;
    }

    // 2. Let shadow be slotable’s parent’s shadow root.
    var parentState = _utils2.default.getShadowState(parent);

    // 3. If shadow is null, then return null.
    if (!parentState || !parentState.shadowRoot) {
        return null;
    }

    // 4. If the open flag is set and shadow’s mode is not "open", then return null.
    if (open === true && parentState.shadowRoot.mode !== SHADOW_MODE_OPEN) {
        return null;
    }

    // 5. Return the first slot in shadow’s tree whose name is slotable’s name, if any, and null otherwise.
    if (!parentState.shadowRoot.firstChild) {
        return null;
    }

    var name = slotable instanceof Element ? slotable.slot : EMPTY_STRING;

    return treeOrderRecursiveSelectFirst(parentState.shadowRoot.firstChild, function (node) {
        return isSlot(node) && node.name === name;
    });
}

function findSlotables(slot) {
    // https://dom.spec.whatwg.org/#find-slotables
    // To find slotables for a given slot slot, run these steps:

    // 1. Let result be an empty list.
    // PERF: allocations later on in algorithm
    var result = void 0;

    // 2. If slot’s root is not a shadow root, then return result.
    var slotRoot = root(slot);
    if (!isShadowRoot(slotRoot)) {
        // PERF: 'an empty list' from step 1
        return [];
    }

    // 3. Let host be slot’s root’s host.
    var host = slotRoot.host;

    // 4. For each slotable child of host, slotable, in tree order, run these substeps:
    var slotableChildren = host.childNodes;
    // PERF: allocation of result
    result = new Array(slotableChildren.length);
    var pushed = 0;
    for (var i = 0; i < slotableChildren.length; i++) {
        var slotable = slotableChildren[i];
        if (slotable.nodeType === Node.ELEMENT_NODE || slotable.nodeType === Node.TEXT_NODE) {
            // 1. Let foundSlot be the result of finding a slot given slotable.
            var foundSlot = findASlot(slotable);
            // 2. If foundSlot is slot, then append slotable to result.
            if (foundSlot === slot) {
                result[pushed++] = slotable;
            }
        }
    }
    // PERF: set the actual length
    result.length = pushed;

    // 5. Return result.
    return result;
}

function findFlattenedSlotables(slot) {
    // https://dom.spec.whatwg.org/#find-flattened-slotables
    // To find flattened slotables for a given slot slot, run these steps:

    // 1. Let result be an empty list.
    var result = [];

    // 2. Let slotables be the result of finding slotables given slot.
    var slotables = findSlotables(slot);

    // 3. If slotables is the empty list, then append each slotable child of slot, in tree order, to slotables.
    if (slotables.length === 0) {
        var slotableChildren = slot.childNodes;
        var slotableChildrenLength = slotableChildren.length;
        slotables.length = slotableChildrenLength;
        var slotablesPushed = 0;
        for (var i = 0; i < slotableChildrenLength; i++) {
            var slotableChild = slotableChildren[i];
            if (slotableChild.nodeType === Node.ELEMENT_NODE || slotableChild.nodeType === Node.TEXT_NODE) {
                slotables[slotablesPushed++] = slotableChild;
            }
        }
        slotables.length = slotablesPushed;
    }

    // 4. For each node in slotables, run these substeps:
    for (var _i3 = 0; _i3 < slotables.length; _i3++) {
        var node = slotables[_i3];
        // 1. If node is a slot, run these subsubsteps:
        if (isSlot(node)) {
            var temporaryResult = findFlattenedSlotables(node);
            var resultLength = resultLength;
            result.length += temporaryResult.length;
            for (var j = 0; j < temporaryResult.length; j++) {
                result[resultLength + j] = temporaryResult[k];
            }
        } else {
            result[result.length] = node;
        }
    }

    // 5. Return result.
    return result;
}

// https://dom.spec.whatwg.org/#assigning-slotables-and-slots

// Using custom algorithms instead.

function assignSlotableToSlot(slotable, slot, suppressSignaling) {
    var slotableState = _utils2.default.getShadowState(slotable);
    slotableState.assignedSlot = slot;

    var slotState = _utils2.default.getShadowState(slot) || _utils2.default.setShadowState(slot, {});
    var assignedNodes = slotState.assignedNodes = slotState.assignedNodes || [];
    var assignedNodesCount = assignedNodes.length;

    if (!suppressSignaling) {
        _mutationObservers2.default.signalASlotChange(slot);
    }

    if (assignedNodesCount === 0) {
        assignedNodes.push(slotable);

        // rendering
        if (!slotState.childNodes) {
            slotState.childNodes = Array.prototype.slice.call(slot.childNodes);
            var _fallbackNodes = slotState.childNodes;
            var _fallbackNodesCount = _fallbackNodes.length;
            for (var i = 0; i < _fallbackNodesCount; i++) {
                var fallbackNode = _fallbackNodes[i];
                var fallbackNodeState = _utils2.default.getShadowState(fallbackNode) || _utils2.default.setShadowState(fallbackNode, {});
                fallbackNodeState.parentNode = slot;
            }
        }
        var fallbackNodes = slotState.childNodes;
        var fallbackNodesCount = fallbackNodes.length;
        for (var _i4 = 0; _i4 < fallbackNodesCount; _i4++) {
            nodeRemoveChildDescriptor.value.call(slot, fallbackNodes[_i4]);
        }
        nodeAppendChildDescriptor.value.call(slot, slotable);
    } else {
        var referenceNode = null;
        var referenceNodeIndex = 0;
        for (var _i5 = 0; _i5 < assignedNodesCount; _i5++) {
            var assignedNode = assignedNodes[_i5];
            if (assignedNode.compareDocumentPosition(slotable) === Node.DOCUMENT_POSITION_FOLLOWING) {
                break;
            }
            referenceNodeIndex++;
        }
        assignedNodes.splice(referenceNodeIndex, 0, slotable);

        // rendering
        nodeInsertBeforeDescriptor.value.call(slot, slotable, referenceNode);
    }
}

function unassignSlotableFromSlot(slotable, slot, suppressSignaling) {
    var slotableState = _utils2.default.getShadowState(slotable);
    slotableState.assignedSlot = null;

    var slotState = _utils2.default.getShadowState(slot);
    var slotAssignedNodes = slotState.assignedNodes;
    slotAssignedNodes.splice(slotAssignedNodes.indexOf(slotable), 1);

    if (!suppressSignaling) {
        _mutationObservers2.default.signalASlotChange(slot);
    }

    // rendering
    nodeRemoveChildDescriptor.value.call(slot, slotable);
    if (slotAssignedNodes.length === 0) {
        var fallbackNodes = slotState.childNodes;
        var fallbackNodesCount = fallbackNodes.length;
        for (var i = 0; i < fallbackNodesCount; i++) {
            nodeAppendChildDescriptor.value.call(slot, fallbackNodes[i]);
        }
    }
}

function assignSlotablesForATree(tree, noSignalSlots) {
    // Gather slots
    var slots = [];
    treeOrderRecursiveSelectAll(tree, slots, isSlot);
    var slotCount = slots.length;

    // Gather slotables and set their assigned slots
    var hostChildNodes = tree.host.childNodes;
    var hostChildNodesCount = hostChildNodes.length;
    for (var i = 0; i < hostChildNodesCount; i++) {
        var slotable = hostChildNodes[i];
        if (!isSlotable(slotable)) {
            continue;
        }
        var slotableState = _utils2.default.getShadowState(slotable);
        var oldAssignedSlot = slotableState.assignedSlot;
        var newAssignedSlot = null;
        var name = slotable instanceof Element ? slotable.slot : EMPTY_STRING;
        for (var j = 0; j < slots.length; j++) {
            var slot = slots[j];
            if (slot.name === name) {
                newAssignedSlot = slot;
                break;
            }
        }
        if (newAssignedSlot !== oldAssignedSlot) {
            if (oldAssignedSlot) {
                var suppress = !noSignalSlots || noSignalSlots.indexOf(oldAssignedSlot) === -1;
                unassignSlotableFromSlot(slotable, oldAssignedSlot, suppress);
            }
            if (newAssignedSlot) {
                var _suppress = !noSignalSlots || noSignalSlots.indexOf(newAssignedSlot) === -1;
                assignSlotableToSlot(slotable, newAssignedSlot, _suppress);
            }
        }
    }
}

// https://dom.spec.whatwg.org/#mutation-algorithms

function ensurePreInsertionValidity(node, parent, child) {
    // https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
    // To ensure pre-insertion validity of a node into a parent before a child, run these steps:

    // 1. If parent is not a Document, DocumentFragment, or Element node, throw a HierarchyRequestError.
    // SKIP: native

    // 2. If node is a host-including inclusive ancestor of parent, throw a HierarchyRequestError.
    if (hostIncludingInclusiveAncestor(node, parent)) {
        throw _utils2.default.makeDOMException(ERROR_HIERARCHY_REQUEST);
    }

    // 3. If child is not null and its parent is not parent, then throw a NotFoundError.
    if (child != null && child.parentNode !== parent) {
        throw _utils2.default.makeDOMException(ERROR_NOT_FOUND);
    }

    // 4. If node is not a DocumentFragment, DocumentType, Element, Text, ProcessingInstruction, 
    // or Comment node, throw a HierarchyRequestError.
    // SKIP: native

    // 5. If either node is a Text node and parent is a document, or node is a doctype 
    // and parent is not a document, throw a HierarchyRequestError.
    // SKIP: native

    // 6. If parent is a document, and any of the statements below, switched on node, 
    // are true, throw a HierarchyRequestError.
    // SKIP: native
}

function preInsert(node, parent, child) {
    // https://dom.spec.whatwg.org/#concept-node-pre-insert
    // To pre-insert a node into a parent before a child, run these steps:

    // 1. Ensure pre-insertion validity of node into parent before child.
    ensurePreInsertionValidity(node, parent, child);

    // 2. Let reference child be child.
    var referenceChild = child;

    // 3. If reference child is node, set it to node’s next sibling.
    referenceChild === node && (referenceChild = node.nextSibling);

    // 4. Adopt node into parent’s node document.
    // https://dom.spec.whatwg.org/#concept-node-adopt
    adopt(node, parent.ownerDocument);

    // 5. Insert node into parent before reference child.
    // https://dom.spec.whatwg.org/#concept-node-insert
    insert(node, parent, referenceChild);

    // 6. Return node.
    return node;
}

function insert(node, parent, child, suppressObservers) {
    _mutationObservers2.default.requeueNativeRecords();
    // https://dom.spec.whatwg.org/#concept-node-insert
    // To insert a node into a parent before a child, with an optional suppress observers flag, run these steps:

    // 1. Let count be the number of children of node if it is a DocumentFragment node, and one otherwise.
    var count = 1;
    var nodeChildNodes = void 0;
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        nodeChildNodes = node.childNodes;
        count = nodeChildNodes.length;
    }

    // 2. If child is non-null, run these substeps:
    // TODO: (Range)

    // 3. Let nodes be node’s children if node is a DocumentFragment node, 
    // and a list containing solely node otherwise.
    var nodes = new Array(count);

    // 4. If node is a DocumentFragment node, remove its children with the suppress observers flag set.
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        for (var i = 0; i < count; i++) {
            nodes[i] = nodeChildNodes[i];
        }
        // If it's the parsing fragment, avoid some overhead.
        if (node === parsingFragment) {
            for (var _i6 = 0; _i6 < count; _i6++) {
                nodeRemoveChildDescriptor.value.call(node, nodes[_i6]);
            }
        } else {
            for (var _i7 = 0; _i7 < count; _i7++) {
                remove(nodes[_i7], node, true);
            }
            // 5. If node is a DocumentFragment node, queue a mutation record of "childList" for node with removedNodes nodes.
            _mutationObservers2.default.queueMutationRecord(MO_TYPE_CHILD_LIST, node, null, null, null, null, nodes);
        }
    } else {
        nodes[0] = node;
    }

    // 6. For each node in nodes, in tree order, run these substeps:
    var parentState = _utils2.default.getShadowState(parent);
    var parentStateChildNodes = parentState ? parentState.childNodes : null;
    var parentIsConnected = parent.isConnected;
    var parentIsShadowRoot = isShadowRoot(parent);
    var parentTree = root(parent);
    for (var _i8 = 0; _i8 < count; _i8++) {
        var _node = nodes[_i8];
        // 1. Insert node into parent before child or at the end of parent if child is null.
        if (parentStateChildNodes) {
            if (child) {
                var childIndex = parentStateChildNodes.indexOf(child);
                parentStateChildNodes.splice(childIndex, 0, _node);
            } else {
                parentStateChildNodes.push(_node);
            }
            var nodeState = _utils2.default.getShadowState(_node) || _utils2.default.setShadowState(_node, {});
            nodeState.parentNode = parent;
            // If it's a shadow root, perform physical insert on the host.
            if (parentIsShadowRoot) {
                nodeInsertBeforeDescriptor.value.call(parentState.host, _node, child);
            }
        } else {
            nodeInsertBeforeDescriptor.value.call(parent, _node, child);
        }

        // 2. If parent is a shadow host and node is a slotable, then assign a slot for node.
        if (parentState && parentState.shadowRoot && isSlotable(_node)) {
            var slot = findASlot(_node);
            if (slot) {
                assignSlotableToSlot(_node, slot);
            }
        }

        // 3. If parent is a slot whose assigned nodes is the empty list, 
        // then run signal a slot change for parent.
        if (isSlot(parent) && parent.assignedNodes().length === 0) {
            _mutationObservers2.default.signalASlotChange(parent);
        }

        // 4. Run assign slotables for a tree with node’s tree and a set containing 
        // each inclusive descendant of node that is a slot.
        if (isShadowRoot(parentTree)) {
            var inclusiveSlotDescendants = isSlot(_node) ? [_node] : [];
            treeOrderRecursiveSelectAll(_node, inclusiveSlotDescendants, isSlot);
            if (inclusiveSlotDescendants.length) {
                assignSlotablesForATree(parentTree, inclusiveSlotDescendants);
            }
        }

        // 5. For each shadow-including inclusive descendant inclusiveDescendant of node, 
        // in shadow-including tree order, run these subsubsteps:
        forEachShadowIncludingInclusiveDescendant(_node, function (inclusiveDescendant) {
            // 1. Run the insertion steps with inclusiveDescendant
            for (var _i9 = 0; _i9 < insertingSteps.length; _i9++) {
                insertingSteps[_i9](inclusiveDescendant);
            }

            // 2. If inclusiveDescendant is connected, then...
            // SKIP: refactored out into the inserting steps.
        });
    }

    // 7. If suppress observers flag is unset, queue a mutation record of "childList" for parent 
    // with addedNodes nodes, nextSibling child, and previousSibling child’s previous sibling or 
    // parent’s last child if child is null.
    if (!suppressObservers) {
        var previousSibling = child ? child.previousSibling : parent.lastChild;
        _mutationObservers2.default.queueMutationRecord(MO_TYPE_CHILD_LIST, parent, null, null, null, nodes, null, previousSibling, child);
    }
}

function append(node, parent) {
    // https://dom.spec.whatwg.org/#concept-node-append
    // To append a node to a parent, pre-insert node into parent before null.
    return preInsert(node, parent, null);
}

function replace(child, node, parent) {
    // https://dom.spec.whatwg.org/#concept-node-replace
    // To replace a child with node within a parent, run these steps:

    // 1. If parent is not a Document, DocumentFragment, or Element node, throw a HierarchyRequestError.
    // SKIP: native

    // 2. If node is a host-including inclusive ancestor of parent, throw a HierarchyRequestError.
    if (hostIncludingInclusiveAncestor(node, parent)) {
        throw _utils2.default.makeDOMException(ERROR_HIERARCHY_REQUEST);
    }

    // 3. If child’s parent is not parent, then throw a NotFoundError.
    if (child.parentNode !== parent) {
        throw _utils2.default.makeDOMException(ERROR_NOT_FOUND);
    }

    // 4. If node...
    // SKIP: native

    // 5. If either node...
    // SKIP: native

    // 6. If parent...
    // SKIP: native

    // 7. Let reference child be child’s next sibling.
    var referenceChild = child.nextSibling;

    // 8. If reference child is node, set it to node’s next sibling.
    if (referenceChild === node) {
        referenceChild = node.nextSibling;
    }

    // 9. Let previousSibling be child’s previous sibling.
    var previousSibling = child.previousSibling;

    // 10. Adopt node into parent’s node document.
    adopt(node, parent.ownerDocument);

    // 11. Let removedNodes be the empty list.
    var removedNodes = [];

    // 12. If child’s parent is not null, run these substeps:
    var childParent = child.parentNode;
    if (childParent != null) {
        // 1. Set removedNodes to a list solely containing child.
        removedNodes[0] = child;
        // 2. Remove child from its parent with the suppress observers flag set.
        remove(child, parent, true);
    }

    // 13. Let nodes be node’s children if node is a DocumentFragment node, and a list containing solely node otherwise.
    var nodes = void 0;
    if (node instanceof DocumentFragment) {
        var childNodes = node.childNodes;
        var childNodesLength = childNodes.length;
        nodes = new Array(childNodesLength);
        for (var i = 0; i < childNodesLength; i++) {
            nodes[i] = childNodes[i];
        }
    } else {
        nodes = [node];
    }

    // 14. Insert node into parent before reference child with the suppress observers flag set.
    insert(node, parent, referenceChild, true);

    // 15. Queue a mutation record of "childList" for target parent with addedNodes nodes, 
    // removedNodes removedNodes, nextSibling reference child, and previousSibling previousSibling.
    _mutationObservers2.default.queueMutationRecord(MO_TYPE_CHILD_LIST, parent, null, null, null, nodes, removedNodes, previousSibling, referenceChild);
}

function replaceAll(node, parent) {
    // https://dom.spec.whatwg.org/#concept-node-replace-all
    // To replace all with a node within a parent, run these steps:

    // 1. If node is not null, adopt node into parent’s node document.
    if (node != null) {
        adopt(node, parent.ownerDocument);
    }

    // 2. Let removedNodes be parent’s children.
    var parentChildNodes = parent.childNodes;
    var removedNodesCount = parentChildNodes.length;
    var removedNodes = new Array(removedNodesCount);
    for (var i = 0; i < removedNodesCount; i++) {
        removedNodes[i] = parentChildNodes[i];
    }

    // 3. Let addedNodes be the empty list if node is null, node’s children if 
    // node is a DocumentFragment node, and a list containing node otherwise.
    var addedNodes = void 0;
    if (node == null) {
        addedNodes = [];
    } else if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildNodes = node.childNodes;
        var nodeChildNodesLength = nodeChildNodes.length;
        addedNodes = new Array(nodeChildNodesLength);
        for (var _i10 = 0; _i10 < nodeChildNodesLength; _i10++) {
            addedNodes[_i10] = nodeChildNodes[_i10];
        }
    } else {
        addedNodes = [node];
    }

    // 4. Remove all parent’s children, in tree order, with the suppress observers flag set.
    for (var _i11 = 0; _i11 < removedNodesCount; _i11++) {
        remove(removedNodes[_i11], parent, true);
    }

    // 5. If node is not null, insert node into parent before null with the suppress observers flag set.
    if (node != null) {
        insert(node, parent, null, true);
    }

    // 6. Queue a mutation record of "childList" for parent with addedNodes addedNodes and removedNodes removedNodes.
    _mutationObservers2.default.queueMutationRecord(MO_TYPE_CHILD_LIST, parent, null, null, null, addedNodes, removedNodes);
}

function preRemove(child, parent) {
    // https://dom.spec.whatwg.org/#concept-node-pre-remove
    // To pre-remove a child from a parent, run these steps:

    // 1. If child’s parent is not parent, then throw a NotFoundError.
    if (child.parentNode !== parent) {
        throw _utils2.default.makeDOMException(ERROR_NOT_FOUND);
    }

    // 2. Remove child from parent.
    remove(child, parent);

    // 3. Return child.
    return child;
}

function remove(node, parent, suppressObservers) {
    _mutationObservers2.default.requeueNativeRecords();
    // https://dom.spec.whatwg.org/#concept-node-remove
    // To remove a node from a parent, with an optional suppress observers flag, run these steps:

    // TODO: (Range)
    // 1. Let index be node’s index.
    // 2. For each range whose start node is an inclusive descendant of node, set its start to (parent, index).
    // 3. For each range whose end node is an inclusive descendant of node, set its end to (parent, index).
    // 4. For each range whose start node is parent and start offset is greater than index, decrease its start offset by one.
    // 5. For each range whose end node is parent and end offset is greater than index, decrease its end offset by one.

    // TODO: (NodeIterator)
    // 6. For each NodeIterator object iterator whose root’s node document is node’s node document, 
    // run the NodeIterator pre-removing steps given node and iterator.

    // 7. Let oldPreviousSibling be node’s previous sibling.
    var oldPreviousSibling = node.previousSibling;

    // 8. Let oldNextSibling be node’s next sibling.
    var oldNextSibling = node.nextSibling;

    // 9. Remove node from its parent.
    var nodeState = _utils2.default.getShadowState(node);
    var parentState = _utils2.default.getShadowState(parent);
    if (parentState && parentState.childNodes) {
        var nodeIndex = parentState.childNodes.indexOf(node);
        parentState.childNodes.splice(nodeIndex, 1);
        // Should always have nodeState if we got here.
        nodeState.parentNode = null;
        if (isShadowRoot(parent)) {
            nodeRemoveChildDescriptor.value.call(parent.host, node);
        }
    } else {
        nodeRemoveChildDescriptor.value.call(parent, node);
    }

    // 10. If node is assigned, then run assign slotables for node’s assigned slot.
    if (nodeState && nodeState.assignedSlot) {
        // NOTE: Using our own algorithm here instead
        unassignSlotableFromSlot(node, nodeState.assignedSlot);
    }

    var parentTree = root(parent);
    if (isShadowRoot(parentTree)) {
        // 11. If parent is a slot whose assigned nodes is the empty list,
        // then run signal a slot change for parent.
        // SKIP: This is already taken care of by our algorithm in step 10.

        // 12. If node has an inclusive descendant that is a slot, then:
        // 1. Run assign slotables for a tree with parent’s tree.
        // 2. Run assign slotables for a tree with node’s tree and a 
        // set containing each inclusive descendant of node that is a slot.
        var inclusiveSlotDescendants = isSlot(node) ? [node] : [];
        treeOrderRecursiveSelectAll(node, inclusiveSlotDescendants, isSlot);
        if (inclusiveSlotDescendants.length) {
            // NOTE: Using our own algorithm here instead
            // TODO: Test to make sure that our algorithm takes care of clearing
            // the assigned nodes of any of these descendants.
            assignSlotablesForATree(parentTree);
        }
    }

    // 13. Run the removing steps with node and parent.
    forEachShadowIncludingInclusiveDescendant(node, function (inclusiveDescendant) {
        for (var i = 0; i < removingSteps.length; i++) {
            removingSteps[i](inclusiveDescendant, parent);
        }
    });

    // 14. If node is custom, then enqueue a custom element callback reaction 
    // with node, callback name "disconnectedCallback", and an empty argument list.
    // SKIP: refactored out into removing steps

    // 15. For each shadow-including descendant descendant of node, in 
    // shadow-including tree order, run these substeps:
    // SKIP: refactored out into removing steps

    // 16. For each inclusive ancestor inclusiveAncestor of parent...
    var inclusiveAncestor = parent;
    while (inclusiveAncestor) {
        // ...if inclusiveAncestor has any registered observers whose options' 
        // subtree is true, then for each such registered observer registered... 
        var ancestorState = _utils2.default.getShadowState(inclusiveAncestor);
        if (ancestorState && ancestorState.observers) {
            var ancestorObservers = ancestorState.observers;
            var ancestorObserversCount = ancestorObservers.length;
            for (var i = 0; i < ancestorObserversCount; i++) {
                var registeredObserver = ancestorObservers[i];
                if (registeredObserver.options.subtree) {
                    // ...append a transient registered observer whose observer and options are 
                    // identical to those of registered and source which is registered to node’s 
                    // list of registered observers.
                    var observer = registeredObserver.instance;
                    var options = registeredObserver.options;
                    var transientObserver = _mutationObservers2.default.createTransientObserver(observer, node, options);
                    ancestorObservers.push({ instance: transientObserver, options: options });
                }
            }
        }
        inclusiveAncestor = inclusiveAncestor.parentNode;
    }

    // 17. If suppress observers flag is unset, queue a mutation record of "childList" 
    // for parent with removedNodes a list solely containing node, nextSibling 
    // oldNextSibling, and previousSibling oldPreviousSibling.
    if (!suppressObservers) {
        _mutationObservers2.default.queueMutationRecord(MO_TYPE_CHILD_LIST, parent, null, null, null, null, [node], oldPreviousSibling, oldNextSibling);
    }
}

},{"./mutation-observers.js":26,"./utils.js":28}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    install: install,
    patchAttributeNodeIfNeeded: patchAttributeNodeIfNeeded
}; // https://dom.spec.whatwg.org/#interface-attr

function install() {
    if (!_utils2.default.brokenAccessors) {
        var originalValueDescriptor = _utils2.default.descriptor(Attr, 'value');
        var newValueDescriptor = {
            get: originalValueDescriptor.get,
            set: function set(value) {
                var _this = this;

                return _customElements2.default.executeCEReactions(function () {
                    _dom2.default.setExistingAttributeValue(_this, value);
                });
            }
        };
        _utils2.default.defineProperty(Attr.prototype, 'value', newValueDescriptor);
    }

    // TODO: need to ensure that parser-inserted 'slot[name]' and '*[slot]' elements'
    // name and slot attribute nodes are patched. Not high priority but worth
    // keeping track of.
}

function patchAttributeNode(attribute) {
    _utils2.default.defineProperty(attribute, 'value', {
        get: function get() {
            if (!this.ownerElement) {
                delete this.value;
                var result = this.value;
                return result;
            }
            if (this.namespaceURI) {
                return this.ownerElement.getAttributeNS(this.namespaceURI, this.localName);
            }
            return this.ownerElement.getAttribute(this.localName);
        },
        set: function set(value) {
            var _this2 = this;

            if (!this.ownerElement) {
                delete this.value;
                var result = this.value = value;
                return result;
            }
            return _customElements2.default.executeCEReactions(function () {
                return _dom2.default.setExistingAttributeValue(_this2, value);
            });
        }
    });
}

function patchAttributeNodeIfNeeded(attribute) {
    if (_utils2.default.brokenAccessors) {
        patchAttributeNode(attribute);
    }
}

},{"../custom-elements.js":1,"../dom.js":2,"../utils.js":28}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = $CustomEvent;

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $CustomEvent(type, init) {
    var bubbles = false;
    var cancelable = false;
    var composed = false;
    var detail = null;
    if (init) {
        bubbles = init.bubbles === true;
        cancelable = init.cancelable === true;
        composed = init.composed === true;
        detail = init.detail || null;
    }
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, bubbles, cancelable, detail);
    Object.defineProperty(event, 'composed', {
        enumerable: true,
        configurable: true,
        get: function get() {
            return composed;
        }
    });
    return event;
} // https://dom.spec.whatwg.org/#interface-customevent

$CustomEvent.prototype = window.CustomEvent.prototype;

},{"../utils.js":28}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

var _mutationObservers = require('../mutation-observers.js');

var _mutationObservers2 = _interopRequireDefault(_mutationObservers);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://dom.spec.whatwg.org/#interface-document

var originalCreateCDATASection = Document.prototype.createCDATASection;
var originalCreateComment = Document.prototype.createComment;
var originalCreateDocumentFragment = Document.prototype.createDocumentFragment;
var originalCreateElement = Document.prototype.createElement;
var originalCreateElementNS = Document.prototype.createElementNS;
var originalCreateProcessingInstruction = Document.prototype.createProcessingInstruction;
var originalCreateTextNode = Document.prototype.createTextNode;

exports.default = {
    createCDATASection: function createCDATASection(data) {
        var section = originalCreateCDATASection.call(this, data);
        _mutationObservers2.default.registerForMutationObservers(section);
        return section;
    },
    createComment: function createComment(data) {
        var comment = originalCreateComment.call(this, data);
        _mutationObservers2.default.registerForMutationObservers(comment);
        return comment;
    },
    createDocumentFragment: function createDocumentFragment() {
        var fragment = originalCreateDocumentFragment.call(this);
        _mutationObservers2.default.registerForMutationObservers(fragment);
        return fragment;
    },
    createElement: function createElement(name, options) {
        var element = originalCreateElement.call(this, name, options);
        _mutationObservers2.default.registerForMutationObservers(element);
        return element;
    },
    createElementNS: function createElementNS(namespaceURI, qualifiedName, options) {
        var element = originalCreateElementNS.call(this, namespaceURI, qualifiedName, options);
        _mutationObservers2.default.registerForMutationObservers(element);
        return element;
    },
    createProcessingInstruction: function createProcessingInstruction(target, data) {
        var instruction = originalCreateProcessingInstruction.call(this, target, data);
        _mutationObservers2.default.registerForMutationObservers(instruction);
        return instruction;
    },
    createTextNode: function createTextNode(data) {
        var text = originalCreateTextNode.call(this, data);
        _mutationObservers2.default.registerForMutationObservers(text);
        return text;
    },
    getElementsByTagName: function getElementsByTagName(qualifiedName) {
        return _dom2.default.listOfElementsWithQualifiedName(this, qualifiedName);
    },
    getElementsByTagNameNS: function getElementsByTagNameNS(nameSpace, localName) {
        return _dom2.default.listOfElementsWithNamespaceAndLocalName(this, nameSpace, localName);
    },
    getElementsByClassName: function getElementsByClassName(names) {
        return _dom2.default.listOfElementsWithClassNames(this, names);
    },


    // TODO: tests
    importNode: function importNode(node, deep) {
        var _this = this;

        return _customElements2.default.executeCEReactions(function () {
            if (node.nodeType === Node.DOCUMENT_NODE || _dom2.default.isShadowRoot(node)) {
                throw _utils2.default.makeDOMException('NotSupportedError');
            }

            return _dom2.default.clone(node, _this, deep);
        });
    },


    // TODO: tests
    adoptNode: function adoptNode(node) {
        var _this2 = this;

        return _customElements2.default.executeCEReactions(function () {
            return _dom2.default.adopt(node, _this2);
        });
    }
};

},{"../custom-elements.js":1,"../dom.js":2,"../mutation-observers.js":26,"../utils.js":28}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _Attr = require('../interfaces/Attr.js');

var _Attr2 = _interopRequireDefault(_Attr);

var _ShadowRoot = require('../interfaces/ShadowRoot.js');

var _ShadowRoot2 = _interopRequireDefault(_ShadowRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    install: function install() {
        // Element.matches(selectors) polyfill from MDN
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
        // Purposefully chop out the polyfill function that uses querySelectorAll.
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
        }

        if (_utils2.default.brokenAccessors) {
            (function () {
                var attributesDescriptor = {
                    get: function get() {
                        delete HTMLElement.prototype['attributes'];
                        var attributes = this.attributes;
                        _utils2.default.defineProperty(HTMLElement.prototype, 'attributes', attributesDescriptor);
                        var shadowState = _utils2.default.getShadowState(attributes);
                        if (!shadowState) {
                            _utils2.default.setShadowState(attributes, { element: this });
                        }
                        return attributes;
                    }
                };

                _utils2.default.extend(Element, elementMixin);
                _utils2.default.extend(HTMLElement, htmlElementMixin);
                _utils2.default.defineProperty(HTMLElement.prototype, 'attributes', attributesDescriptor);
            })();
        } else {
            var _attributesDescriptor = {
                get: function get() {
                    var attributes = elementAttributesDescriptor.get.call(this);
                    var shadowState = _utils2.default.getShadowState(attributes);
                    if (!shadowState) {
                        _utils2.default.setShadowState(attributes, { element: this });
                    }
                    return attributes;
                }
            };

            _utils2.default.extend(Element, elementMixin);
            _utils2.default.extend(Element, htmlElementMixin);
            _utils2.default.defineProperty(Element.prototype, 'attributes', _attributesDescriptor);

            // Cleanup for IE, Edge
            _utils2.default.deleteProperty(HTMLElement, 'children');
            _utils2.default.deleteProperty(HTMLElement, 'parentElement');
            _utils2.default.deleteProperty(HTMLElement, 'innerHTML');
            _utils2.default.deleteProperty(HTMLElement, 'outerHTML');
            _utils2.default.deleteProperty(HTMLElement, 'contains');
            _utils2.default.deleteProperty(HTMLElement, 'insertAdjacentText');
            _utils2.default.deleteProperty(HTMLElement, 'insertAdjacentElement');
            _utils2.default.deleteProperty(HTMLElement, 'insertAdjacentHTML');
        }
    }
}; // https://dom.spec.whatwg.org/#interface-element

var elementSetAttributeDescriptor = _utils2.default.descriptor(Element, 'setAttribute');
var elementSetAttributeNSDescriptor = _utils2.default.descriptor(Element, 'setAttributeNS');
var nodeRemoveChildDescriptor = _utils2.default.descriptor(Node, 'removeChild');
var elementAttributesDescriptor = _utils2.default.descriptor(Element, 'attributes') || _utils2.default.descriptor(Node, 'attributes');

var elementMixin = {

    get slot() {
        return this.hasAttribute('slot') ? this.getAttribute('slot') : '';
    },

    set slot(value) {
        this.setAttribute('slot', value);
    },

    // TODO: tests
    setAttribute: function setAttribute(qualifiedName, value) {
        var _this = this;

        return _customElements2.default.executeCEReactions(function () {
            var attributes = _this.attributes;
            var attribute = attributes.getNamedItem(qualifiedName);
            if (!attribute) {
                elementSetAttributeDescriptor.value.call(_this, qualifiedName, value);
                attribute = attributes.getNamedItem(qualifiedName);
                _Attr2.default.patchAttributeNodeIfNeeded(attribute);
                _dom2.default.appendAttribute(attribute, _this);
            } else {
                _dom2.default.changeAttribute(attribute, _this, value);
            }
        });
    },


    // TODO: tests
    setAttributeNS: function setAttributeNS(nameSpace, qualifiedName, value) {
        var _this2 = this;

        return _customElements2.default.executeCEReactions(function () {
            var attributes = _this2.attributes;
            var parts = qualifiedName.split(':', 2);
            var localName = parts[parts.length - 1];
            var attribute = attributes.getNamedItemNS(nameSpace, localName);
            if (!attribute) {
                elementSetAttributeNSDescriptor.value.call(_this2, nameSpace, qualifiedName, value);
                attribute = attributes.getNamedItemNS(nameSpace, localName);
                _Attr2.default.patchAttributeNodeIfNeeded(attribute);
                _dom2.default.appendAttribute(attribute, _this2);
            } else {
                _dom2.default.changeAttribute(attribute, _this2, value);
            }
        });
    },


    // TODO: tests
    removeAttribute: function removeAttribute(qualifiedName) {
        var _this3 = this;

        return _customElements2.default.executeCEReactions(function () {
            _dom2.default.removeAttributeByName(qualifiedName, _this3);
        });
    },


    // TODO: tests
    removeAttributeNS: function removeAttributeNS(nameSpace, localName) {
        var _this4 = this;

        return _customElements2.default.executeCEReactions(function () {
            _dom2.default.removeAttributeByNamespace(nameSpace, localName, _this4);
        });
    },


    // TODO: tests
    setAttributeNode: function setAttributeNode(attr) {
        var _this5 = this;

        _Attr2.default.patchAttributeNodeIfNeeded(attr);
        return _customElements2.default.executeCEReactions(function () {
            return _dom2.default.setAttribute(attr, _this5);
        });
    },


    // TODO: tests
    setAttributeNodeNS: function setAttributeNodeNS(attr) {
        var _this6 = this;

        _Attr2.default.patchAttributeNodeIfNeeded(attr);
        return _customElements2.default.executeCEReactions(function () {
            return _dom2.default.setAttribute(attr, _this6);
        });
    },


    // TODO: tests
    removeAttributeNode: function removeAttributeNode(attr) {
        var _this7 = this;

        return _customElements2.default.executeCEReactions(function () {
            if (attr.ownerElement !== _this7) {
                throw _utils2.default.makeDOMException('NotFoundError');
            }
            _dom2.default.removeAttribute(attr, _this7);
            return attr;
        });
    },
    attachShadow: function attachShadow(init) {
        // https://dom.spec.whatwg.org/#dom-element-attachshadow
        if (!init || init.mode !== 'open' && init.mode !== 'closed') {
            throw _utils2.default.makeDOMException('TypeError');
        }

        if (this.namespaceURI !== 'http://www.w3.org/1999/xhtml') {
            throw _utils2.default.makeDOMException('NotSupportedError');
        }

        switch (this.localName) {
            case "article":case "aside":case "blockquote":case "body":
            case "div":case "footer":case "h1":case "h2":case "h3":
            case "h4":case "h5":case "h6":case "header":case "main":
            case "nav":case "p":case "section":case "span":
                break;
            default:
                if (_customElements2.default.isValidCustomElementName(this.localName)) {
                    break;
                }
                throw _utils2.default.makeDOMException('NotSupportedError');
        }

        if (this.shadowRoot) {
            throw _utils2.default.makeDOMException('InvalidStateError');
        }

        var shadow = this.ownerDocument.createDocumentFragment();

        _utils2.default.extend(shadow, _ShadowRoot2.default);

        _utils2.default.setShadowState(shadow, {
            host: this,
            mode: init.mode,
            childNodes: []
        });

        var savedChildNodes = Array.prototype.slice.call(this.childNodes);
        var savedChildNodesCount = savedChildNodes.length;
        for (var i = 0; i < savedChildNodesCount; i++) {
            var savedChildNode = savedChildNodes[i];
            var childState = _utils2.default.getShadowState(savedChildNode) || _utils2.default.setShadowState(savedChildNode, {});
            childState.parentNode = this;
            nodeRemoveChildDescriptor.value.call(this, savedChildNode);
        }

        var hostState = _utils2.default.getShadowState(this);
        if (!hostState) {
            hostState = {};
            _utils2.default.setShadowState(this, hostState);
        }
        hostState.shadowRoot = shadow;
        hostState.childNodes = savedChildNodes;

        return shadow;
    },


    get shadowRoot() {
        // https://dom.spec.whatwg.org/#dom-element-shadowroot
        var shadowRoot = null;
        var shadowState = _utils2.default.getShadowState(this);
        if (shadowState) {
            shadowRoot = shadowState.shadowRoot;
            if (!shadowRoot || shadowRoot.mode === 'closed') {
                return null;
            }
        }
        return shadowRoot;
    },

    // TODO: tests
    closest: function closest(selectors) {
        var element = this;

        do {
            if (element.matches(selectors)) {
                return element;
            }
        } while (element = element.parentElement);
    },
    getElementsByTagName: function getElementsByTagName(qualifiedName) {
        return _dom2.default.listOfElementsWithQualifiedName(this, qualifiedName);
    },
    getElementsByTagNameNS: function getElementsByTagNameNS(ns, localName) {
        return _dom2.default.listOfElementsWithNamespaceAndLocalName(this, ns, localName);
    },
    getElementsByClassName: function getElementsByClassName(names) {
        return _dom2.default.listOfElementsWithClassNames(this, names);
    },


    // TODO: tests
    insertAdjacentElement: function insertAdjacentElement(where, element) {
        var _this8 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-element-insertadjacentelement
            return _dom2.default.insertAdjacent(_this8, where, element);
        });
    },


    // TODO: tests
    insertAdjacentText: function insertAdjacentText(where, data) {
        // https://dom.spec.whatwg.org/#dom-element-insertadjacenttext
        var text = this.ownerDocument.createTextNode(data);
        _dom2.default.insertAdjacent(this, where, text);
        return;
    },


    // TODO: tests
    insertAdjacentHTML: function insertAdjacentHTML(position, text) {
        var _this9 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://w3c.github.io/DOM-Parsing/#dom-element-insertadjacenthtml
            // We aren't going to go exactly by the books for this one.
            var fragment = _dom2.default.parseHTMLFragment(text, _this9);
            _dom2.default.insertAdjacent(_this9, position, fragment);
        });
    }
};

var htmlElementMixin = {

    // https://w3c.github.io/DOM-Parsing/#extensions-to-the-element-interface

    // TODO: more thorough tests of the serialization
    get innerHTML() {
        // https://w3c.github.io/DOM-Parsing/#dom-element-innerhtml
        return _dom2.default.serializeHTMLFragment(this);
    },

    // TODO: MutationObserver tests
    set innerHTML(value) {
        var _this10 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://w3c.github.io/DOM-Parsing/#dom-element-innerhtml
            var fragment = _dom2.default.parseHTMLFragment(value, _this10);
            var content = _this10['content'];
            if (content instanceof DocumentFragment) {
                _dom2.default.replaceAll(fragment, content);
            } else {
                _dom2.default.replaceAll(fragment, _this10);
            }
        });
    },

    // TODO: tests
    get outerHTML() {
        // https://w3c.github.io/DOM-Parsing/#dom-element-outerhtml
        return _dom2.default.serializeHTMLFragment({ childNodes: [this] });
    },

    // TODO: tests
    set outerHTML(value) {
        var _this11 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://w3c.github.io/DOM-Parsing/#dom-element-outerhtml
            var parent = _this11.parentNode;
            if (parent === null) {
                return;
            }
            if (parent.nodeType === Node.DOCUMENT_NODE) {
                throw _utils2.default.makeDOMException('NoModificationAllowedError');
            }
            if (parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                parent = _this11.ownerDocument.createElement('body');
            }
            var fragment = _dom2.default.parseHTMLFragment(value, parent);
            _dom2.default.replace(_this11, fragment, _this11.parentNode);
        });
    }

};

},{"../custom-elements.js":1,"../dom.js":2,"../interfaces/Attr.js":3,"../interfaces/ShadowRoot.js":16,"../utils.js":28}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://dom.spec.whatwg.org/#interface-event

exports.default = {
    install: install
};


var eventStopImmediatePropagationDescriptor = _utils2.default.descriptor(Event, 'stopImmediatePropagation');
var eventCurrentTargetDescriptor = _utils2.default.descriptor(Event, 'currentTarget');
var eventTargetDescriptor = _utils2.default.descriptor(Event, 'target');
var focusEventRelatedTargetDescriptor = _utils2.default.descriptor(FocusEvent, 'relatedTarget');
var mouseEventRelatedTargetDescriptor = _utils2.default.descriptor(MouseEvent, 'relatedTarget');

function eventConstructor(type, init) {
    var bubbles = false;
    var cancelable = false;
    var composed = false;
    if (init) {
        bubbles = init.bubbles === true;
        cancelable = init.cancelable === true;
        composed = init.composed === true;
    }
    var event = document.createEvent('Event'); // Capitalized to work with older WebKit
    event.initEvent(type, bubbles, cancelable);
    Object.defineProperty(event, 'composed', {
        enumerable: true,
        configurable: true,
        get: function get() {
            return composed;
        }
    });
    return event;
};

function install() {
    if (!_utils2.default.brokenAccessors) {
        _utils2.default.extend(Event, {
            get currentTarget() {
                var shadowState = _utils2.default.getShadowState(this);
                if (shadowState) {
                    return shadowState.currentTarget;
                }
                return eventCurrentTargetDescriptor.get.call(this);
            },
            get target() {
                var shadowState = _utils2.default.getShadowState(this);
                if (shadowState) {
                    return shadowState.target;
                }
                return eventTargetDescriptor.get.call(this);
            }
        });

        // FocusEvent:
        // relatedTarget will be the element losing or gaining focus
        _utils2.default.extend(FocusEvent, {
            get relatedTarget() {
                var shadowState = _utils2.default.getShadowState(this);
                if (shadowState) {
                    return shadowState.relatedTarget;
                }
                return focusEventRelatedTargetDescriptor.get.call(this);
            }
        });

        // MouseEvent:
        // relatedTarget will be the element being moved into or out of
        _utils2.default.extend(MouseEvent, {
            get relatedTarget() {
                var shadowState = _utils2.default.getShadowState(this);
                if (shadowState) {
                    return shadowState.relatedTarget;
                }
                return mouseEventRelatedTargetDescriptor.get.call(this);
            }
        });
    }

    _utils2.default.extend(Event, eventMixin);
    eventConstructor.prototype = Event.prototype;
    window.Event = eventConstructor;
}

var eventMixin = {
    stopImmediatePropagation: function stopImmediatePropagation() {
        var shadowState = _utils2.default.getShadowState(this);
        if (shadowState) {
            shadowState.stopImmediatePropagationFlag = true;
            this.stopPropagation();
            return;
        }
        eventStopImmediatePropagationDescriptor.value.call(this);
    },
    composedPath: function composedPath() {
        // https://dom.spec.whatwg.org/#dom-event-composedpath

        // 1. Let composedPath be a new empty list.
        var composedPath = [];

        // 2. Let currentTarget be context object’s currentTarget attribute value.
        var currentTarget = this.currentTarget;

        // 3. For each tuple in context object’s path:
        var path = _utils2.default.getShadowState(this).path;

        if (path) {
            var c = 0;
            for (var i = 0; i < path.length; i++) {
                var item = path[i][0];
                if (currentTarget instanceof Window) {
                    if (!(item instanceof Node) || !_dom2.default.closedShadowHidden(item, _dom2.default.shadowIncludingRoot(item))) {
                        composedPath[c++] = item;
                    }
                } else if (currentTarget instanceof Node) {
                    if (!_dom2.default.closedShadowHidden(item, currentTarget)) {
                        composedPath[c++] = item;
                    }
                } else {
                    composedPath[c++] = item;
                }
            }
        }

        // 4. return composedPath.
        return composedPath;
    },


    get composed() {
        // TODO: Compare against the actual prototype instead of just the type strings
        return builtInComposedEvents.indexOf(this.type) !== -1;
    }

};

var builtInComposedEvents = [
// FocusEvent
'blur', 'focus', 'focusin', 'focusout',
// MouseEvent
'click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
// WheelEvent
'wheel',
// InputEvent
'beforeinput', 'input',
// KeyboardEvent
'keydown', 'keyup',
// CompositionEvent
'compositionstart', 'compositionupdate', 'compositionend',
// Legacy UIEvent
'DOMActivate',
// Legacy FocusEvent
'DOMFocusIn', 'DOMFocusOut',
// Legacy KeyboardEvent
'keypress',

// Touch Events
'touchstart', 'touchend', 'touchmove', 'touchcancel'];

},{"../dom.js":2,"../utils.js":28}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _Event = require('./Event.js');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    install: install
}; // https://dom.spec.whatwg.org/#interface-eventtarget

var ieBrowserToolsCallbackMagicString = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC(){try{return n(arguments)}catch(i){t(i)}}';

var eventTargetDescriptor = _utils2.default.descriptor(Event, 'target');

var focusEventRelatedTargetDescriptor = _utils2.default.descriptor(FocusEvent, 'relatedTarget');
var mouseEventRelatedTargetDescriptor = _utils2.default.descriptor(MouseEvent, 'relatedTarget');

var getEventTarget = function getEventTarget(event) {
    return eventTargetDescriptor.get.call(event);
};
var getFocusEventRelatedTarget = function getFocusEventRelatedTarget(event) {
    return focusEventRelatedTargetDescriptor.get.call(event);
};
var getMouseEventRelatedTarget = function getMouseEventRelatedTarget(event) {
    return mouseEventRelatedTargetDescriptor.get.call(event);
};

if (_utils2.default.brokenAccessors) {
    getEventTarget = function getEventTarget(event) {
        var state = _utils2.default.getShadowState(event);
        return state.nativeEvent.target;
    };
    getFocusEventRelatedTarget = function getFocusEventRelatedTarget(event) {
        var state = _utils2.default.getShadowState(event);
        return state.nativeEvent.relatedTarget;
    };
    getMouseEventRelatedTarget = getFocusEventRelatedTarget;
}

var $EventTarget = function $EventTarget(base) {

    var native = {
        addEventListener: base.prototype.addEventListener,
        removeEventListener: base.prototype.removeEventListener,
        dispatchEvent: base.prototype.dispatchEvent
    };

    return {
        addEventListener: function addEventListener(type, callback, options) {
            if (typeof callback !== 'function') {
                return;
            }

            if (this instanceof Document && callback.toString() === ieBrowserToolsCallbackMagicString) {
                native.addEventListener.call(this, type, callback, options);
                return;
            }

            var listener = { callback: callback };
            var capture = false;

            if (typeof options === 'boolean') {
                capture = options;
            } else if (typeof options !== 'undefined') {
                capture = options.capture === true;
                listener.once = options.once === true;
                // we don't do anything with passive.
                listener.passive = options.passive === true;
            }

            var collection = getEventListenerCollection(this, type, capture) || createEventListenerCollection(this, type, capture);

            collection.addListener(this, listener);
            collection.attach(native.addEventListener);
        },
        removeEventListener: function removeEventListener(type, callback, options) {
            if (typeof callback !== 'function') {
                return;
            }

            if (this instanceof Document && callback.toString() === ieBrowserToolsCallbackMagicString) {
                native.removeEventListener.call(this, type, callback, options);
                return;
            }

            var listener = { callback: callback };
            var capture = false;

            if (typeof options === 'boolean') {
                capture = options;
            } else if (typeof options !== 'undefined') {
                capture = options.capture === true;
            }

            var collection = getEventListenerCollection(this, type, capture);

            if (!collection) {
                return;
            }

            collection.removeListener(this, listener);

            if (collection.empty) {
                collection.detach(native.removeEventListener);
            }
        }
    };
};

function install() {
    // In IE and Safari < 10, EventTarget is not exposed and Window's
    // EventTarget methods are not the same as Node's.
    if ('EventTarget' in Window) {
        _utils2.default.extend(EventTarget, $EventTarget(EventTarget));
    } else {
        _utils2.default.extend(Window, $EventTarget(Window));
        _utils2.default.extend(Node, $EventTarget(Node));
    }
}

var EventListenerCollection = function EventListenerCollection(target, type, capture) {
    var _this = this;

    this.target = target;
    this.type = type;
    this.capture = capture;
    this.hostListeners = [];
    this.shadowListeners = [];

    this.callback = function (event) {
        var phase = event.eventPhase;
        switch (phase) {
            case Event.prototype.CAPTURING_PHASE:
                if (_this.hostListeners.length) {
                    _this.invokeListeners(event, _this.target, _this.hostListeners);
                }
                if (_this.shadowListeners.length) {
                    _this.invokeListeners(event, _utils2.default.getShadowState(target).shadowRoot, _this.shadowListeners);
                }
                break;
            case Event.prototype.AT_TARGET:
                var nativeTarget = getEventTarget(event);
                var listeners = _this.getListeners(nativeTarget);
                if (listeners.length) {
                    _this.invokeListeners(event, nativeTarget, listeners);
                }
                break;
            case Event.prototype.BUBBLING_PHASE:
                if (_this.shadowListeners.length) {
                    _this.invokeListeners(event, _utils2.default.getShadowState(target).shadowRoot, _this.shadowListeners);
                }
                if (_this.hostListeners.length) {
                    _this.invokeListeners(event, _this.target, _this.hostListeners);
                }
                break;
        }
    };

    if (_utils2.default.brokenAccessors) {
        (function () {
            var innerCallback = _this.callback;
            _this.callback = function (event) {
                var wrapper = wrapEventWithBrokenAccessors(event);
                innerCallback(wrapper);
            };
        })();
    }
};

function getEventListenerCollection(target, type, capture) {
    var targetState = _utils2.default.getShadowState(target);
    var nativeTarget = target;
    var nativeTargetState = targetState;
    if (targetState && targetState.host) {
        nativeTarget = targetState.host;
        nativeTargetState = _utils2.default.getShadowState(nativeTarget);
    }
    if (!nativeTargetState || !nativeTargetState.listeners) {
        return null;
    }
    var collections = nativeTargetState.listeners;
    for (var i = 0; i < collections.length; i++) {
        var collection = collections[i];
        if (collection.target === nativeTarget && collection.type === type && collection.capture === capture) {
            return collection;
        }
    }
    return null;
};

function createEventListenerCollection(target, type, capture) {
    var targetState = _utils2.default.getShadowState(target);
    var nativeTarget = target;
    var nativeTargetState = targetState;
    if (targetState && targetState.host) {
        nativeTarget = targetState.host;
        nativeTargetState = _utils2.default.getShadowState(nativeTarget);
    }
    if (!nativeTargetState) {
        nativeTargetState = _utils2.default.setShadowState(nativeTarget, { listeners: [] });
    } else if (!nativeTargetState.listeners) {
        nativeTargetState.listeners = [];
    }
    var collection = new EventListenerCollection(nativeTarget, type, capture);
    nativeTargetState.listeners.push(collection);
    return collection;
};

EventListenerCollection.prototype = {

    get empty() {
        return this.hostListeners.length === 0 && this.shadowListeners.length === 0;
    },

    getListeners: function getListeners(target) {
        var targetState = _utils2.default.getShadowState(target);
        if (targetState && targetState.host) {
            return this.shadowListeners;
        }
        return this.hostListeners;
    },
    addListener: function addListener(target, listener) {
        var listeners = this.getListeners(target);

        for (var i = 0; i < listeners.length; i++) {
            if (listener.callback === listeners[i].callback) {
                return;
            }
        }

        listeners.push(listener);
    },
    removeListener: function removeListener(target, listener) {
        var listeners = this.getListeners(target);

        for (var i = 0; i < listeners.length; i++) {
            var existing = listeners[i];
            if (listener.callback === existing.callback) {
                existing.removed = true;
                listeners.splice(i, 1);
                break;
            }
        }
    },
    invokeListeners: function invokeListeners(event, currentTarget, listeners) {
        var eventState = _utils2.default.getShadowState(event) || _utils2.default.setShadowState(event, {});
        var path = eventState.calculatedPath;
        if (!path) {
            path = eventState.calculatedPath = calculatePath(event);
        }
        // if there is no target, the event is not composed and should be stopped
        var target = calculateTarget(currentTarget, path);
        if (!target) {
            event.stopImmediatePropagation();
        } else {
            var relatedTarget = calculateRelatedTarget(currentTarget, path);
            var remove = void 0;

            eventState.path = path;
            eventState.currentTarget = currentTarget;
            eventState.target = target;
            eventState.relatedTarget = relatedTarget;

            var listenersCopy = listeners.slice(0, listeners.length);
            for (var i = 0; i < listenersCopy.length; i++) {
                var listener = listenersCopy[i];
                if (!listener.removed) {
                    // TODO: uhhh... was something supposed to be done with the result?
                    var result = listener.callback.call(currentTarget, event);
                }
                if (listener.once) {
                    if (!remove) {
                        remove = [listener];
                    } else {
                        remove.push[listener];
                    }
                }
                if (eventState.stopImmediatePropagationFlag) {
                    break;
                }
            }

            eventState.path = null;
            eventState.currentTarget = null;

            if (remove) {
                for (var _i = 0; _i < remove.length; _i++) {
                    var index = listeners.indexOf(remove[_i]);
                    listeners.splice(index, 1);
                }
            }
        }
    },
    attach: function attach(descriptor) {
        descriptor.call(this.target, this.type, this.callback, this.capture);
    },
    detach: function detach(descriptor) {
        descriptor.call(this.target, this.type, this.callback, this.capture);
    }
};

function calculatePath(event) {
    // https://dom.spec.whatwg.org/#concept-event-dispatch

    var path = [];
    var p = 0;

    var target = getEventTarget(event);

    var getRelatedTarget = null;

    if (event instanceof FocusEvent) {
        getRelatedTarget = getFocusEventRelatedTarget;
    } else if (event instanceof MouseEvent) {
        getRelatedTarget = getMouseEventRelatedTarget;
    }

    // 1. Set event’s dispatch flag.
    // SKIP: native

    // 2. Let targetOverride be target, if legacy target override flag is 
    // not given, and target’s associated Document otherwise. 
    var targetOverride = target;

    // 3. Let relatedTarget be the result of retargeting event’s relatedTarget 
    // against target if event’s relatedTarget is non-null, and null otherwise.
    var originalRelatedTarget = null;
    var relatedTarget = null;
    if (getRelatedTarget) {
        originalRelatedTarget = getRelatedTarget(event);
        if (originalRelatedTarget) {
            relatedTarget = _dom2.default.retarget(originalRelatedTarget, target);
        }
    }

    // 4. If target is relatedTarget and target is not event’s relatedTarget, then return true.
    // SKIP: native

    // 5. Append (target, targetOverride, relatedTarget) to event’s path.
    path[p++] = [target, targetOverride, relatedTarget];

    // 6. Let isActivationEvent be true, if event is a MouseEvent object and 
    // event’s type attribute is "click", and false otherwise.
    // SKIP: native

    // 7. Let activationTarget be target, if isActivationEvent is true and 
    // target has activation behavior, and null otherwise.
    // SKIP: native

    // 8. Let parent be the result of invoking target’s get the parent with event.
    var parent = getTheParent(target, event, path);

    // 9. While parent is non-null:
    while (parent != null) {
        // 1. Let relatedTarget be the result of retargeting event’s relatedTarget
        // against parent if event’s relatedTarget is non-null, and null otherwise.
        if (originalRelatedTarget) {
            relatedTarget = _dom2.default.retarget(originalRelatedTarget, parent);
        }
        // 2. If target’s root is a shadow-including inclusive ancestor of parent, then... 
        // append (parent, null, relatedTarget) to event’s path.
        if (_dom2.default.shadowIncludingInclusiveAncestor(_dom2.default.root(target), parent)) {
            path[p++] = [parent, null, relatedTarget];
            parent = getTheParent(parent, event, path);
            continue;
        }
        // 3. Otherwise, if parent and relatedTarget are identical, then set parent to null.
        else if (parent === relatedTarget) {
                break;
            }
            // 4. Otherwise, set target to parent and then... 
            // append (parent, target, relatedTarget) to event’s path.
            else {
                    target = parent;
                    path[p++] = [parent, target, relatedTarget];
                    parent = getTheParent(parent, event, path);
                    continue;
                }
        // 5. If parent is non-null, then set parent to the result of 
        // invoking parent’s get the parent with event.
        // NOTE: This step was duplicated above to save some cycles.
    }

    return path;
}

function getTheParent(node, event, path) {
    // https://dom.spec.whatwg.org/#get-the-parent
    // Each EventTarget object also has an associated get the parent 
    // algorithm, which takes an event event, and returns an EventTarget 
    // object. Unless specified otherwise it returns null.

    // A node’s get the parent algorithm, given an event, 
    // returns the node’s assigned slot, if node is assigned, 
    // and node’s parent otherwise.

    // A document’s get the parent algorithm, given an event, returns null if event’s 
    // type attribute value is "load" or document does not have a browsing context, 
    // and the document’s associated Window object otherwise.

    // A shadow root’s get the parent algorithm, given an event, returns null if 
    // event’s composed flag is unset and shadow root is the root of event’s 
    // path’s first tuple’s item, and shadow root’s host otherwise.

    if (node instanceof Node) {
        if (node.nodeType === Node.DOCUMENT_NODE) {
            if (event.type === 'load') {
                // or browsing context?
                return null;
            }
            return node.defaultView;
        } else if (_dom2.default.isShadowRoot(node)) {
            if (!event.composed) {
                var item = path[0][0];
                if (_dom2.default.root(item) === node) {
                    return null;
                }
            }
            return node.host;
        }
        return node.assignedSlot || node.parentNode;
    }

    return null;
}

function calculateRelatedTarget(currentTarget, path) {
    for (var i = 0; i < path.length; i++) {
        var item = path[i][0];
        var relatedTarget = path[i][2];
        if (item === currentTarget) {
            return relatedTarget;
        }
    }
    return null;
}

function calculateTarget(currentTarget, path) {
    for (var i = 0; i < path.length; i++) {
        var item = path[i][0];
        if (item === currentTarget) {
            for (var j = i; j >= 0; j--) {
                var target = path[j][1];
                if (target != null) {
                    return target;
                }
            }
            return null;
        }
    }
    return null;
}

function wrapEventWithBrokenAccessors(event) {
    var eventState = _utils2.default.getShadowState(event) || _utils2.default.setShadowState(event, {});

    if (eventState.wrapper) {
        return eventState.wrapper;
    }

    eventState.nativeEvent = event;

    var descriptors = {
        type: {
            get: function get() {
                return event.type;
            }
        },
        target: {
            get: function get() {
                return eventState.target || event.target;
            }
        },
        currentTarget: {
            get: function get() {
                return eventState.currentTarget || event.currentTarget;
            }
        },
        eventPhase: {
            get: function get() {
                return event.eventPhase;
            }
        },
        bubbles: {
            get: function get() {
                return event.bubbles;
            }
        },
        cancelable: {
            get: function get() {
                return event.cancelable;
            }
        },
        preventDefault: {
            value: function value() {
                return event.preventDefault();
            }
        },
        defaultPrevented: {
            get: function get() {
                return event.defaultPrevented;
            }
        },
        stopPropagation: {
            value: function value() {
                return event.stopPropagation();
            }
        }
    };

    if ('relatedTarget' in event) {
        descriptors.relatedTarget = {
            get: function get() {
                return eventState.relatedTarget || event.relatedTarget;
            }
        };
    }

    var wrapper = Object.create(event, descriptors);

    _utils2.default.setShadowState(wrapper, eventState);

    eventState.wrapper = wrapper;

    return wrapper;
}

},{"../dom.js":2,"../utils.js":28,"./Event.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element

exports.default = {

    // TODO: tests
    get name() {
        if (this.localName !== 'slot') {
            return;
        }

        return this.hasAttribute('name') ? this.getAttribute('name') : '';
    },

    // TODO: tests
    set name(value) {
        if (this.localName !== 'slot') {
            return;
        }

        _dom2.default.setAttributeValue(this, 'name', value);
    },

    // TODO: tests
    assignedNodes: function assignedNodes(options) {
        if (this.localName !== 'slot') {
            return;
        }

        // https://html.spec.whatwg.org/multipage/scripting.html#dom-slot-assignednodes
        // The assignedNodes(options) method, when invoked, must run these steps:

        // 1. If the value of options's flatten member is false, then return this element's assigned nodes.
        if (!options || options.flatten !== true) {
            var assignedNodes = null;
            var shadowState = _utils2.default.getShadowState(this);
            if (shadowState) {
                assignedNodes = shadowState.assignedNodes;
            }
            return assignedNodes || [];
        }

        // 2. Return the result of finding flattened slotables with this element.
        return _dom2.default.findFlattenedSlotables(this);
    }
};

},{"../dom.js":2,"../utils.js":28}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://www.w3.org/TR/html5/single-page.html#the-table-element

exports.default = {

    // TODO: tests
    deleteCaption: function deleteCaption() {
        var caption = this.caption;
        if (caption) {
            _dom2.default.remove(caption, this);
        }
    },


    // TODO: tests
    deleteTHead: function deleteTHead() {
        var tHead = this.tHead;
        if (tHead) {
            _dom2.default.remove(tHead, this);
        }
    },


    // TODO: tests
    deleteTFoot: function deleteTFoot() {
        var tFoot = this.tFoot;
        if (tFoot) {
            _dom2.default.remove(tFoot, this);
        }
    },


    // TODO: tests
    deleteRow: function deleteRow(index) {
        // https://www.w3.org/TR/html5/single-page.html#dom-table-deleterow
        if (index === -1) {
            index = this.rows.length - 1;
        }
        if (index < 0 || index >= this.rows.length) {
            throw _utils2.default.makeDOMException('IndexSizeError');
        }
        this.rows[index].remove();
    }
};

},{"../dom.js":2,"../utils.js":28}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    // TODO: tests
    deleteCell: function deleteCell(index) {
        // https://www.w3.org/TR/html5/single-page.html#dom-tr-deletecell
        if (index === -1) {
            index = this.cells.length - 1;
        }
        if (index < 0 || index >= this.cells.length) {
            throw _utils2.default.makeDOMException('IndexSizeError');
        }
        this.cells[index].remove();
    }
}; // https://www.w3.org/TR/html5/single-page.html#the-tr-element

},{"../utils.js":28}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    // TODO: tests
    deleteRow: function deleteRow(index) {
        // https://www.w3.org/TR/html5/single-page.html#dom-tbody-deleterow
        if (index < 0 || index >= this.rows.length) {
            throw _utils2.default.makeDOMException('IndexSizeError');
        }
        this.rows[index].remove();
    }
}; // https://www.w3.org/TR/html5/single-page.html#the-tbody-element

},{"../utils.js":28}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = $MutationObserver;

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _mutationObservers = require('../mutation-observers.js');

var _mutationObservers2 = _interopRequireDefault(_mutationObservers);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $MutationObserver(callback) {
    var observer = _mutationObservers2.default.createMutationObserver(callback);
    _utils2.default.setShadowState(this, { observer: observer });
    observer.interface = this;
} // https://dom.spec.whatwg.org/#interface-mutationobserver

$MutationObserver.prototype = {
    observe: function observe(target, options) {
        _utils2.default.getShadowState(this).observer.observe(target, options);
    },
    disconnect: function disconnect() {
        _utils2.default.getShadowState(this).observer.disconnect();
    },
    takeRecords: function takeRecords() {
        var records = _utils2.default.getShadowState(this).observer.queue;
        return records.splice(0, records.length);
    }
};

},{"../dom.js":2,"../mutation-observers.js":26,"../utils.js":28}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _Attr = require('../interfaces/Attr.js');

var _Attr2 = _interopRequireDefault(_Attr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://dom.spec.whatwg.org/#interface-namednodemap

exports.default = {

    // TODO: tests
    setNamedItem: function setNamedItem(attr) {
        var _this = this;

        _Attr2.default.patchAttributeNodeIfNeeded(attr);
        return _customElements2.default.executeCEReactions(function () {
            var shadowState = _utils2.default.getShadowState(_this);
            return _dom2.default.setAttribute(attr, shadowState.element);
        });
    },


    // TODO: tests
    setNamedItemNS: function setNamedItemNS(attr) {
        var _this2 = this;

        _Attr2.default.patchAttributeNodeIfNeeded(attr);
        return _customElements2.default.executeCEReactions(function () {
            var shadowState = _utils2.default.getShadowState(_this2);
            return _dom2.default.setAttribute(attr, shadowState.element);
        });
    },


    // TODO: tests
    removeNamedItem: function removeNamedItem(qualifiedName) {
        var _this3 = this;

        return _customElements2.default.executeCEReactions(function () {
            var shadowState = _utils2.default.getShadowState(_this3);
            var attr = _dom2.default.removeAttributeByName(qualifiedName, shadowState.element);
            if (!attr) {
                throw _utils2.default.makeDOMException('NotFoundError');
            }
            return attr;
        });
    },


    // TODO: tests
    removeNamedItemNS: function removeNamedItemNS(nameSpace, localName) {
        var _this4 = this;

        return _customElements2.default.executeCEReactions(function () {
            var shadowState = _utils2.default.getShadowState(_this4);
            var attr = _dom2.default.removeAttributeByNamespace(nameSpace, localName, shadowState.element);
            if (!attr) {
                throw _utils2.default.makeDOMException('NotFoundError');
            }
            return attr;
        });
    }
};

},{"../custom-elements.js":1,"../dom.js":2,"../interfaces/Attr.js":3,"../utils.js":28}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    install: install
}; // https://dom.spec.whatwg.org/#interface-node

var nodeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
var nodeHasChildNodesDescriptor = _utils2.default.descriptor(Node, 'hasChildNodes');
var nodeChildNodesDescriptor = _utils2.default.descriptor(Node, 'childNodes');

var accessorDescriptors = {

    get parentNode() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var parentNode = nodeState.parentNode;
            if (parentNode) {
                return parentNode;
            }
        }
        nodeWalker.currentNode = this;
        return nodeWalker.parentNode();
    },

    get parentElement() {
        var parentNode = this.parentNode;
        if (parentNode && parentNode.nodeType === Node.ELEMENT_NODE) {
            return parentNode;
        }
        return null;
    },

    // TODO: tests
    get childNodes() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var childNodes = nodeState.childNodes;
            if (childNodes) {
                var childNodesLength = childNodes.length;
                var result = new Array(childNodesLength);
                for (var i = 0; i < childNodesLength; i++) {
                    result[i] = childNodes[i];
                }
                return result;
            }
        }
        if (_utils2.default.brokenAccessors) {
            var _childNodes = new Array();
            nodeWalker.currentNode = this;
            var firstChild = nodeWalker.firstChild();
            if (!firstChild) {
                return _childNodes;
            }
            _childNodes.push(firstChild);
            var nextSibling = void 0;
            while (nextSibling = nodeWalker.nextSibling()) {
                _childNodes.push(nextSibling);
            }
            return _childNodes;
        }
        return nodeChildNodesDescriptor.get.call(this);
    },

    // TODO: tests
    get firstChild() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var childNodes = nodeState.childNodes;
            if (childNodes) {
                if (childNodes.length) {
                    return childNodes[0];
                }
                return null;
            }
        }
        nodeWalker.currentNode = this;
        return nodeWalker.firstChild();
    },

    // TODO: tests
    get lastChild() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var childNodes = nodeState.childNodes;
            if (childNodes) {
                if (childNodes.length) {
                    return childNodes[childNodes.length - 1];
                }
                return null;
            }
        }
        nodeWalker.currentNode = this;
        return nodeWalker.lastChild();
    },

    // TODO: tests
    get previousSibling() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var parentNode = nodeState.parentNode;
            if (parentNode) {
                var childNodes = _utils2.default.getShadowState(parentNode).childNodes;
                var siblingIndex = childNodes.indexOf(this) - 1;
                return siblingIndex < 0 ? null : childNodes[siblingIndex];
            }
        }
        nodeWalker.currentNode = this;
        return nodeWalker.previousSibling();
    },

    // TODO: tests
    get nextSibling() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var parentNode = nodeState.parentNode;
            if (parentNode) {
                var childNodes = _utils2.default.getShadowState(parentNode).childNodes;
                var siblingIndex = childNodes.indexOf(this) + 1;
                return siblingIndex === childNodes.length ? null : childNodes[siblingIndex];
            }
        }
        nodeWalker.currentNode = this;
        return nodeWalker.nextSibling();
    },

    get nodeValue() {
        switch (this.nodeType) {
            case Node.ATTRIBUTE_NODE:
                return this.value;
            case Node.TEXT_NODE:
            case Node.PROCESSING_INSTRUCTION_NODE:
            case Node.COMMENT_NODE:
                return this.data;
        }
    },

    // TODO: MutationObserver tests
    set nodeValue(value) {
        var _this = this;

        return _customElements2.default.executeCEReactions(function () {
            switch (_this.nodeType) {
                case Node.ATTRIBUTE_NODE:
                    _this.value = value;
                    break;
                case Node.TEXT_NODE:
                case Node.PROCESSING_INSTRUCTION_NODE:
                case Node.COMMENT_NODE:
                    _this.data = value;
                    break;
            }
        });
    },

    get textContent() {
        switch (this.nodeType) {
            case Node.DOCUMENT_FRAGMENT_NODE:
            case Node.ELEMENT_NODE:
                return elementTextContent(this);
            case Node.ATTRIBUTE_NODE:
                return this.value;
            case Node.TEXT_NODE:
            case Node.PROCESSING_INSTRUCTION_NODE:
            case Node.COMMENT_NODE:
                return this.data;
            default:
                return null;
        }
    },

    // TODO: MutationObserver tests
    set textContent(value) {
        var _this2 = this;

        return _customElements2.default.executeCEReactions(function () {
            switch (_this2.nodeType) {
                case Node.DOCUMENT_FRAGMENT_NODE:
                case Node.ELEMENT_NODE:
                    var node = null;
                    if (value !== '') {
                        node = _this2.ownerDocument.createTextNode(value);
                    }
                    _dom2.default.replaceAll(node, _this2);
                    break;
                case Node.ATTRIBUTE_NODE:
                    _this2.value = value;
                    break;
                case Node.TEXT_NODE:
                case Node.PROCESSING_INSTRUCTION_NODE:
                case Node.COMMENT_NODE:
                    _this2.data = value;
                    break;
            }
        });
    }

};

var methodDescriptors = {

    get isConnected() {
        return _dom2.default.shadowIncludingRoot(this).nodeType === Node.DOCUMENT_NODE;
    },

    getRootNode: function getRootNode(options) {
        var composed = options && options.composed === true;
        return composed ? _dom2.default.shadowIncludingRoot(this) : _dom2.default.root(this);
    },


    // TODO: tests
    hasChildNodes: function hasChildNodes() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var childNodes = nodeState.childNodes;
            if (childNodes) {
                return childNodes.length > 0;
            }
        }

        return nodeHasChildNodesDescriptor.value.call(this);
    },


    // TODO: tests
    normalize: function normalize() {
        var _this3 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-node-normalize
            // The normalize() method, when invoked, must run these steps 
            // for each descendant exclusive Text node node of context object:
            var childNodes = _this3.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var childNode = childNodes[i];
                if (childNode.nodeType === Node.TEXT_NODE) {
                    var length = childNode.data.length;
                    if (length === 0) {
                        _dom2.default.remove(childNode, _this3);
                        continue;
                    }
                    var data = '';
                    var contiguousTextNodes = new Array(childNodes.length);
                    var contiguousCount = 0;
                    var next = childNode;
                    while ((next = next.nextSibling) && next.nodeType === Node.TEXT_NODE) {
                        data += next.data;
                        contiguousTextNodes[contiguousCount++] = next;
                    }
                    childNode.replaceData(length, 0, data);
                    // TODO: (Range)
                    for (var j = 0; j < contiguousCount; j++) {
                        _dom2.default.remove(contiguousTextNodes[j], _this3);
                    }
                } else {
                    childNode.normalize();
                }
            }
        });
    },


    // TODO: tests
    cloneNode: function cloneNode(deep) {
        var _this4 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-node-clonenode
            // The cloneNode(deep) method, when invoked, must run these steps:

            // 1. If context object is a shadow root, then throw a NotSupportedError.
            if (_dom2.default.isShadowRoot(_this4)) {
                throw _utils2.default.makeDOMException('NotSupportedError');
            }

            // 2. Return a clone of the context object, with the clone children flag set if deep is true.
            return _dom2.default.clone(_this4, undefined, deep);
        });
    },


    // TODO: tests
    isEqualNode: function isEqualNode(other) {
        // https://dom.spec.whatwg.org/#dom-node-isequalnode
        // https://dom.spec.whatwg.org/#concept-node-equals
        if (!other) {
            return false;
        }

        if (this.nodeType !== other.nodeType) {
            return false;
        }

        var thisAttributes = void 0;
        var otherAttributes = void 0;

        switch (this.nodeType) {
            case Node.DOCUMENT_TYPE_NODE:
                if (this.name !== other.name || this.publicId !== other.publicId || this.systemId !== other.systemId) {
                    return false;
                }
                break;
            case Node.ELEMENT_NODE:
                if (this.namespaceURI !== other.namespaceURI || this.prefix !== other.prefix || this.localName !== other.localName) {
                    return false;
                }
                thisAttributes = this.attributes;
                otherAttributes = other.attributes;
                if (thisAttributes.length != otherAttributes.length) {
                    return false;
                }
                break;
            case Node.ATTRIBUTE_NODE:
                if (this.namespaceURI !== other.namespaceURI || this.localName !== other.localName || this.value !== other.value) {
                    return false;
                }
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                if (this.target !== other.target || this.data !== other.data) {
                    return false;
                }
                break;
            case Node.TEXT_NODE:
            case Node.COMMENT_NODE:
                if (this.data !== other.data) {
                    return false;
                }
                break;
        }

        if (this.nodeType == Node.ELEMENT_NODE) {
            for (var i = 0; i < thisAttributes.length; i++) {
                var attr1 = thisAttributes[i];
                var attr2 = otherAttributes[attr1.name];
                if (attr1.value !== attr2.value) {
                    return false;
                }
            }
        }

        var childNodes1 = this.childNodes;
        var childNodes2 = other.childNodes;
        if (childNodes1.length !== other.childNodes.length) {
            return false;
        }

        for (var _i = 0; _i < childNodes1.length; _i++) {
            if (!childNodes1[_i].isEqualNode(childNodes2[_i])) {
                return false;
            }
        }

        return true;
    },


    // TODO: tests
    compareDocumentPosition: function compareDocumentPosition(other) {
        // https://dom.spec.whatwg.org/#dom-node-comparedocumentposition

        if (this === other) {
            return 0;
        }

        var node1 = other;
        var node2 = this;
        var attr1 = null;
        var attr2 = null;

        if (node1.nodeType == Document.prototype.ATTRIBUTE_NODE) {
            attr1 = node1;
            node1 = attr1.ownerElement;
        }

        if (node2.nodeType == Document.prototype.ATTRIBUTE_NODE) {
            attr2 = node2;
            node2 = attr2.ownerElement;

            if (attr1 && node1 && node2 === node1) {
                var attrs = node2.atttributes;
                for (var i = 0; i < attrs.length; i++) {
                    var attr = attrs[i];
                    if (attr.isEqualNode(attr1)) {
                        return Document.prototype.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + Document.prototype.DOCUMENT_POSITION_PRECEDING;
                    } else if (attr.isEqualNode(attr2)) {
                        return Document.prototype.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + Document.prototype.DOCUMENT_POSITION_FOLLOWING;
                    }
                }
            }
        }

        if (!node1 || !node2 || _dom2.default.root(node1) !== _dom2.default.root(node2)) {
            return Document.prototype.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + Document.prototype.DOCUMENT_POSITION_FOLLOWING + Document.prototype.DOCUMENT_POSITION_DISCONNECTED;
        }

        if (ancestorOf(node2, node1) || node1 === node2 && attr2) {
            return Document.prototype.DOCUMENT_POSITION_CONTAINS + Document.prototype.DOCUMENT_POSITION_PRECEDING;
        }

        if (ancestorOf(node1, node2) || node1 === node2 && attr1) {
            return Document.prototype.DOCUMENT_POSITION_CONTAINS + Document.prototype.DOCUMENT_POSITION_FOLLOWING;
        }

        if (preceding(node1, node2)) {
            return Document.prototype.DOCUMENT_POSITION_PRECEDING;
        }

        return Document.prototype.DOCUMENT_POSITION_FOLLOWING;
    },


    // TODO: tests
    contains: function contains(node) {
        // https://dom.spec.whatwg.org/#dom-node-contains

        var parent = node.parentNode;

        if (!parent) {
            return false;
        }

        do {
            if (parent === this) {
                return true;
            }
        } while (parent = parent.parentNode);

        return false;
    },


    // TODO: tests
    insertBefore: function insertBefore(node, child) {
        var _this5 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-node-insertbefore
            // The insertBefore(node, child) method, when invoked, must return the result 
            // of pre-inserting node into context object before child.
            return _dom2.default.preInsert(node, _this5, child);
        });
    },


    // TODO: tests
    appendChild: function appendChild(node) {
        var _this6 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-node-appendchild
            // The appendChild(node) method, when invoked, must return the result of 
            // appending node to context object.
            return _dom2.default.append(node, _this6);
        });
    },


    // TODO: tests
    replaceChild: function replaceChild(node, child) {
        var _this7 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-node-replacechild
            // The replaceChild(node, child) method, when invoked, must return the 
            // result of replacing child with node within context object.
            return _dom2.default.replace(child, node, _this7);
        });
    },


    // TODO: tests
    removeChild: function removeChild(child) {
        var _this8 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-node-removechild
            // The removeChild(child) method, when invoked, must return the result of 
            // pre-removing child from context object.
            return _dom2.default.preRemove(child, _this8);
        });
    }
};

function install() {
    if (_utils2.default.brokenAccessors) {
        var subtypes = [Document, DocumentFragment, Element, Attr, CharacterData];

        subtypes.forEach(function (type) {
            return _utils2.default.extend(type, accessorDescriptors);
        });
        _utils2.default.extend(Node, methodDescriptors);
    } else {
        _utils2.default.extend(Node, accessorDescriptors);
        _utils2.default.extend(Node, methodDescriptors);

        // Cleanup for IE, Edge
        _utils2.default.deleteProperty(Node, 'attributes');
    }
}

function ancestorOf(node, ancestor) {
    var parent = node.parentNode;

    do {
        if (parent === ancestor) {
            return true;
        }
    } while (parent = parent.parentNode);

    return false;
}

function preceding(element1, element2) {
    function precedingSiblings(parent, sibling1, sibling2) {
        var siblings = parent.childNodes;
        for (var _i2 = 0; _i2 < siblings.length; _i2++) {
            var sibling = siblings[_i2];
            if (sibling === sibling1) {
                return true;
            } else if (sibling === sibling2) {
                return false;
            }
        }
    }

    // Check if they're already siblings.
    var ancestor1 = element1.parentNode;
    var ancestor2 = element2.parentNode;

    if (ancestor1 === ancestor2) {
        return precedingSiblings(element1, element2);
    }

    // Find the closest common ancestor.
    var ancestors1 = [ancestor1];
    var ancestors2 = [ancestor2];

    while (ancestor1 = ancestor1.parentNode) {
        ancestors1.push(ancestor1);
    }

    while (ancestor2 = ancestor2.parentNode) {
        ancestors2.push(ancestor2);
    }

    ancestors1.reverse();
    ancestors2.reverse();

    var diff = Math.abs(ancestors1.length - ancestors2.length);
    var min = Math.min(ancestors1.length, ancestors2.length);

    var i = 0;
    while (ancestors1[i] === ancestors2[i]) {
        i++;
    }

    return precedingSiblings(ancestors1[i - 1], ancestors1[i], ancestors2[i]);
}

function elementTextContent(element) {
    var result = '';
    var childNodes = element.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        var childNode = childNodes[i];
        switch (childNode.nodeType) {
            case Node.ELEMENT_NODE:
                result += elementTextContent(childNode);
                break;
            case Node.TEXT_NODE:
                result += childNode.data;
                break;
        }
    }
    return result;
}

},{"../custom-elements.js":1,"../dom.js":2,"../utils.js":28}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    get nodeName() {
        return '#shadow-root';
    },

    get mode() {
        return _utils2.default.getShadowState(this).mode;
    },

    get host() {
        return _utils2.default.getShadowState(this).host;
    },

    // TODO: tests
    get innerHTML() {
        return _dom2.default.serializeHTMLFragment(this);
    },

    // TODO: tests
    set innerHTML(value) {
        var _this = this;

        return _customElements2.default.executeCEReactions(function () {
            var fragment = _dom2.default.parseHTMLFragment(value, _this);
            _dom2.default.replaceAll(fragment, _this);
        });
    }

}; // https://dom.spec.whatwg.org/#interface-shadowroot
// https://www.w3.org/TR/shadow-dom/#the-shadowroot-interface

},{"../custom-elements.js":1,"../dom.js":2,"../utils.js":28}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://dom.spec.whatwg.org/#interface-text

exports.default = {

    // TODO: tests
    splitText: function splitText(offset) {
        var length = this.length;
        if (offset > length) {
            throw _utils2.default.makeDOMException('IndexSizeError');
        }
        var count = length - offset;
        var newData = this.data.slice(offset, count);
        var newNode = this.ownerDocument.createTextNode(newData);
        var parent = this.parentNode;
        if (parent) {
            _dom2.default.insert(newNode, parent, this.nextSibling);
            // TODO: (Range)
        }
        this.replaceData(offset, count, '');
        // TODO: (Range)
        // if (!parent) { }
        return newNode;
    }
};

},{"../dom.js":2,"../utils.js":28}],18:[function(require,module,exports){
'use strict';

var _shadowDom = require('./shadow-dom.js');

var _shadowDom2 = _interopRequireDefault(_shadowDom);

var _customElements = require('./custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var installShadowDom = false;
var installCustomElements = false;

if (window['forceShadowDomPolyfill'] || !_shadowDom2.default.nativeSupport) {
    installShadowDom = true;
}

if (window['forceCustomElementsPolyfill'] || !_customElements2.default.nativeSupport) {
    installShadowDom = true;
    installCustomElements = true;
}

if (installShadowDom) {
    _shadowDom2.default.install();
    window['shadowDomPolyfilled'] = true;
}

if (installCustomElements) {
    _customElements2.default.install();
    window['customElementsPolyfilled'] = true;
} else {
    // TODO: Offer a way to opt out if desired. Possibly refer to:
    // https://philipwalton.com/articles/loading-polyfills-only-when-needed/
    _customElements2.default.installTranspiledClassSupport();
}

},{"./custom-elements.js":1,"./shadow-dom.js":27}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    enqueue: enqueue
};


var triggered = false;
var queue = new Array();
var trigger = document.createElement('span');
var observer = new MutationObserver(process);
observer.observe(trigger, { attributes: true });

function enqueue(microtask) {
    queue.push(microtask);
    if (!triggered) {
        trigger.hidden = !trigger.hidden;
        triggered = true;
    }
}

function process() {
    triggered = false;
    queue.splice(0, queue.length).forEach(function (microtask) {
        return microtask();
    });
}

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://dom.spec.whatwg.org/#interface-childnode

exports.default = {

    // TODO: tests
    before: function before() {
        var _this = this;

        for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
            nodes[_key] = arguments[_key];
        }

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-childnode-before
            // The before(nodes) method, when invoked, must run these steps:

            // 1. Let parent be context object’s parent.
            var parent = _this.parentNode;

            // 2. If parent is null, terminate these steps.
            if (!parent) {
                return;
            }

            // 3. Let viablePreviousSibling be context object’s first preceding 
            // sibling not in nodes, and null otherwise.
            var viablePreviousSibling = _this.previousSibling;
            while (viablePreviousSibling && nodes.indexOf(viablePreviousSibling) !== -1) {
                viablePreviousSibling = viablePreviousSibling.previousSibling;
            }

            // 4. Let node be the result of converting nodes into a node, given 
            // nodes and context object’s node document. Rethrow any exceptions.
            var node = _dom2.default.convertNodesIntoANode(nodes, _this.ownerDocument);

            // 5. If viablePreviousSibling is null, set it to parent’s first child, 
            // and to viablePreviousSibling’s next sibling otherwise.
            if (viablePreviousSibling === null) {
                viablePreviousSibling = parent.firstChild;
            } else {
                viablePreviousSibling = viablePreviousSibling.nextSibling;
            }

            // 6. Pre-insert node into parent before viablePreviousSibling. 
            // Rethrow any exceptions.
            _dom2.default.preInsert(node, parent, viablePreviousSibling);
        });
    },


    // TODO: tests
    after: function after() {
        var _this2 = this;

        for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            nodes[_key2] = arguments[_key2];
        }

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-childnode-after
            // The after(nodes) method, when invoked, must run these steps:

            // 1. Let parent be context object’s parent.
            var parent = _this2.parentNode;

            // 2. If parent is null, terminate these steps.
            if (!parent) {
                return;
            }

            // 3. Let viableNextSibling be context object’s first following 
            // sibling not in nodes, and null otherwise.
            var viableNextSibling = _this2.nextSibling;
            while (viableNextSibling && nodes.indexOf(viableNextSibling) !== -1) {
                viableNextSibling = viableNextSibling.nextSibling;
            }

            // 4. Let node be the result of converting nodes into a node, given 
            // nodes and context object’s node document. Rethrow any exceptions.
            var node = _dom2.default.convertNodesIntoANode(nodes, _this2.ownerDocument);

            // 5. Pre-insert node into parent before viableNextSibling. Rethrow 
            // any exceptions.
            _dom2.default.preInsert(node, parent, viableNextSibling);
        });
    },


    // TODO: tests
    replaceWith: function replaceWith() {
        var _this3 = this;

        for (var _len3 = arguments.length, nodes = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            nodes[_key3] = arguments[_key3];
        }

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-childnode-replacewith
            // The replaceWith(nodes) method, when invoked, must run these steps:

            // 1. Let parent be context object’s parent.
            var parent = _this3.parentNode;

            // 2. If parent is null, terminate these steps.
            if (!parent) {
                return;
            }

            // 3. Let viableNextSibling be context object’s first following 
            // sibling not in nodes, and null otherwise.
            var viableNextSibling = _this3.nextSibling;
            while (viableNextSibling && nodes.indexOf(viableNextSibling) !== -1) {
                viableNextSibling = viableNextSibling.nextSibling;
            }

            // 4. Let node be the result of converting nodes into a node, given 
            // nodes and context object’s node document. Rethrow any exceptions.
            var node = _dom2.default.convertNodesIntoANode(nodes, _this3.ownerDocument);

            // 5. If context object’s parent is parent, replace the context object 
            // with node within parent. Rethrow any exceptions.
            if (_this3.parentNode == parent) {
                _dom2.default.replace(_this3, node, parent);
            }
            // 6. Otherwise, pre-insert node into parent before viableNextSibling. 
            // Rethrow any exceptions.
            else {
                    _dom2.default.preInsert(node, parent, viableNextSibling);
                }
        });
    },


    // TODO: tests
    remove: function remove() {
        var _this4 = this;

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-childnode-remove
            // The remove() method, when invoked, must run these steps:

            // 1. If context object’s parent is null, terminate these steps.
            var parent = _this4.parentNode;

            if (!parent) {
                return;
            }

            // 2. Remove the context object from context object’s parent.
            _dom2.default.remove(_this4, parent);
        });
    }
};

},{"../custom-elements.js":1,"../dom.js":2}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://dom.spec.whatwg.org/#mixin-documentorshadowroot
// https://www.w3.org/TR/shadow-dom/#extensions-to-the-documentorshadowroot-mixin

var nativeDocumentActiveElement = _utils2.default.descriptor(Document, 'activeElement');

exports.default = {

    // TODO: consider getSelection()
    // TODO: consider elementFromPoint(double x, double y)
    // TODO: consider elementsFromPoint(double x, double y)
    // TODO: consider get styleSheets()

    // TODO: tests
    get activeElement() {
        var document = this.ownerDocument || this;
        var nativeActiveElement = nativeDocumentActiveElement.get.call(document);

        if (!nativeActiveElement || document != _dom2.default.shadowIncludingRoot(this)) {
            return null;
        }

        return _dom2.default.retarget(nativeActiveElement, this);
    }

};

},{"../dom.js":2,"../utils.js":28}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elementWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, false); // https://dom.spec.whatwg.org/#interface-nondocumenttypechildnode

exports.default = {

    // TODO: tests
    get previousElementSibling() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var parentNode = nodeState.parentNode;
            if (parentNode) {
                var childNodes = _utils2.default.getShadowState(parentNode).childNodes;
                var index = childNodes.indexOf(this);
                while (index > 0) {
                    var previous = childNodes[--index];
                    if (previous.nodeType === Node.ELEMENT_NODE) {
                        return previous;
                    }
                };
                return null;
            }
        }
        elementWalker.currentNode = this;
        return elementWalker.previousSibling();
    },

    // TODO: tests
    get nextElementSibling() {
        var nodeState = _utils2.default.getShadowState(this);
        if (nodeState) {
            var parentNode = nodeState.parentNode;
            if (parentNode) {
                var childNodes = _utils2.default.getShadowState(parentNode).childNodes;
                var index = childNodes.indexOf(this);
                while (index < childNodes.length - 1) {
                    var next = childNodes[++index];
                    if (next.nodeType === Node.ELEMENT_NODE) {
                        return next;
                    }
                };
                return null;
            }
        }
        elementWalker.currentNode = this;
        return elementWalker.nextSibling();
    }

};

},{"../utils.js":28}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getElementById: function getElementById(id) {
        // https://dom.spec.whatwg.org/#dom-nonelementparentnode-getelementbyid

        if (id === '' || /\s/.test(id)) {
            return null;
        }

        var firstChild = this.firstChild;

        if (!firstChild) {
            return null;
        }

        return _dom2.default.treeOrderRecursiveSelectFirst(firstChild, function (node) {
            return node.id === id;
        });
    }
}; // https://dom.spec.whatwg.org/#interface-nonelementparentnode

},{"../dom.js":2}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _customElements = require('../custom-elements.js');

var _customElements2 = _interopRequireDefault(_customElements);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elementWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, false); // https://dom.spec.whatwg.org/#interface-parentnode

exports.default = {

    get children() {
        var childNodes = void 0;

        var shadowState = _utils2.default.getShadowState(this);
        if (shadowState) {
            childNodes = shadowState.childNodes;
        }

        if (!childNodes) {
            childNodes = this.childNodes;
        }

        var childNodesLength = childNodes.length;
        var elements = new Array(childNodesLength);
        var pushed = 0;
        for (var i = 0; i < childNodesLength; i++) {
            var node = childNodes[i];
            if (node.nodeType == Node.ELEMENT_NODE) {
                elements[pushed++] = node;
            }
        }
        elements.length = pushed;

        return elements;
    },

    get firstElementChild() {
        var shadowState = _utils2.default.getShadowState(this);
        if (shadowState) {
            var childNodes = shadowState.childNodes;
            if (childNodes) {
                for (var i = 0; i < childNodes.length; i++) {
                    var node = childNodes[i];
                    if (node.nodeType == Node.ELEMENT_NODE) {
                        return node;
                    }
                }
                return null;
            }
        }
        elementWalker.currentNode = this;
        return elementWalker.firstChild();
    },

    get lastElementChild() {
        var shadowState = _utils2.default.getShadowState(this);
        if (shadowState) {
            var childNodes = shadowState.childNodes;
            if (childNodes) {
                for (var i = childNodes.length - 1; i >= 0; i--) {
                    var node = childNodes[i];
                    if (node.nodeType == Node.ELEMENT_NODE) {
                        return node;
                    }
                }
                return null;
            }
        }
        elementWalker.currentNode = this;
        return elementWalker.lastChild();
    },

    get childElementCount() {
        var childNodes = void 0;

        var shadowState = _utils2.default.getShadowState(this);
        if (shadowState) {
            childNodes = shadowState.childNodes;
        }

        if (!childNodes) {
            childNodes = this.childNodes;
        }

        var count = 0;

        for (var i = 0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (node.nodeType == Node.ELEMENT_NODE) {
                count++;
            }
        }

        return count;
    },

    // TODO: tests
    prepend: function prepend() {
        var _this = this;

        for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
            nodes[_key] = arguments[_key];
        }

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-parentnode-prepend
            // The prepend(nodes) method, when invoked, must run these steps:

            // 1. Let node be the result of converting nodes into a node given 
            // nodes and context object’s node document. Rethrow any exceptions.
            var node = _dom2.default.convertNodesIntoANode(nodes, _this.ownerDocument || _this);

            // 2. Pre-insert node into context object before the context object’s 
            // first child. Rethrow any exceptions.
            _dom2.default.preInsert(node, _this, _this.firstChild);
        });
    },


    // TODO: tests
    append: function append() {
        var _this2 = this;

        for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            nodes[_key2] = arguments[_key2];
        }

        return _customElements2.default.executeCEReactions(function () {
            // https://dom.spec.whatwg.org/#dom-parentnode-append
            // The append(nodes) method, when invoked, must run these steps:

            // 1. Let node be the result of converting nodes into a node given 
            // nodes and context object’s node document. Rethrow any exceptions.
            var node = _dom2.default.convertNodesIntoANode(nodes, _this2.ownerDocument || _this2);

            // 2. Append node to context object. Rethrow any exceptions.
            _dom2.default.append(node, _this2);
        });
    },


    // TODO: tests
    querySelector: function querySelector(selectors) {
        var firstChild = this.firstChild;

        if (!firstChild) {
            return null;
        }

        return _dom2.default.treeOrderRecursiveSelectFirst(firstChild, function (node) {
            return node.nodeType === Node.ELEMENT_NODE && node.matches(selectors);
        });
    },


    // TODO: tests
    querySelectorAll: function querySelectorAll(selectors) {
        // https://dom.spec.whatwg.org/#scope-match-a-selectors-string
        var results = [];

        var firstChild = this.firstChild;

        if (!firstChild) {
            return results;
        }

        _dom2.default.treeOrderRecursiveSelectAll(firstChild, results, function (node) {
            return node.nodeType === Node.ELEMENT_NODE && node.matches(selectors);
        });

        return results;
    }
};

},{"../custom-elements.js":1,"../dom.js":2,"../utils.js":28}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('../dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://dom.spec.whatwg.org/#mixin-slotable

exports.default = {

    get assignedSlot() {
        // spec implementation is to run 'find a slot'
        // this uses an alternative (see https://github.com/whatwg/dom/issues/369)
        var shadowState = _utils2.default.getShadowState(this);
        if (shadowState) {
            var slot = shadowState.assignedSlot;
            if (slot && _dom2.default.closedShadowHidden(slot, this)) {
                return null;
            }
            return slot;
        }
        return null;
    }

};

},{"../dom.js":2,"../utils.js":28}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _microtask = require('./microtask.js');

var _microtask2 = _interopRequireDefault(_microtask);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    queueMutationRecord: queueMutationRecord,
    requeueNativeRecords: function requeueNativeRecords() {
        _requeueNativeRecords(documentObserver.takeRecords());
    },
    createMutationObserver: createMutationObserver,
    createTransientObserver: createTransientObserver,
    registerForMutationObservers: registerForMutationObservers,
    signalASlotChange: signalASlotChange
};


var MO_TYPE_ATTRIBUTES = 'attributes';
var MO_TYPE_CHILD_LIST = 'childList';
var MO_TYPE_CHARACTER_DATA = 'characterData';

var mutationObservers = [];
var signalSlotList = [];
var theEmptyList = Object.freeze([]);

var mutationObserverCompoundMicrotaskQueuedFlag = false;

var documentObserver = new MutationObserver(function (records) {
    _requeueNativeRecords(records);
    notifyMutationObservers();
});

registerForMutationObservers(document);

function queueMutationObserverCompoundMicrotask() {
    if (mutationObserverCompoundMicrotaskQueuedFlag) {
        return;
    }
    mutationObserverCompoundMicrotaskQueuedFlag = true;
    _microtask2.default.enqueue(notifyMutationObservers);
}

function getOrCreateNodeObservers(node) {
    var nodeState = _utils2.default.getShadowState(node) || _utils2.default.setShadowState(node, {});
    var observers = nodeState.observers;
    return observers ? observers : nodeState.observers = [];
}

function createMutationObserver(callback) {
    return {
        callback: callback,
        queue: [],
        nodes: [],
        observe: function observe(node, options) {
            _requeueNativeRecords(documentObserver.takeRecords());
            if (this.nodes.length === 0) {
                mutationObservers.push(this);
            }
            var nodeObservers = getOrCreateNodeObservers(node);
            nodeObservers.push({ instance: this, options: options });
            this.nodes.push(node);
        },
        disconnect: function disconnect() {
            var index = mutationObservers.indexOf(this);
            mutationObservers.splice(index, 1);
            for (var i = 0; i < this.nodes.length; i++) {
                var nodeObservers = getOrCreateNodeObservers(this.nodes[i]);
                for (var j = 0; j < nodeObservers.length; j++) {
                    if (nodeObservers[j].instance === this) {
                        nodeObservers.splice(j, 1);
                        break;
                    }
                }
            }
            this.nodes = [];
        }
    };
}

function createTransientObserver(observer, node, options) {
    var transientObserver = {
        observer: observer,
        callback: observer.callback,
        options: options,
        queue: [],
        node: node,
        disconnect: function disconnect() {
            var nodeObservers = getOrCreateNodeObservers(this.node);
            for (var j = 0; j < nodeObservers.length; j++) {
                if (nodeObservers[j].instance === this) {
                    nodeObservers.splice(j, 1);
                    break;
                }
            }
        }
    };

    var nodeObservers = getOrCreateNodeObservers(node);
    nodeObservers.push({ instance: transientObserver, options: options });

    return transientObserver;
}

function queueMutationRecord(type, target, name, nameSpace, oldValue, addedNodes, removedNodes, previousSibling, nextSibling) {
    // PERF: This is an out-of-spec optimization
    if (mutationObservers.length === 0) {
        return;
    }

    // https://dom.spec.whatwg.org/#queueing-a-mutation-record
    // 1. Let interested observers be an initially empty set of 
    // MutationObserver objects optionally paired with a string.
    var interestedObservers = [];
    var pairedStrings = [];
    // 2. Let nodes be the inclusive ancestors of target.
    var nodes = [target];
    var ancestor = target;
    while (ancestor = ancestor.parentNode) {
        nodes.push(ancestor);
    }
    // 3. Then, for each node in nodes... 
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var nodeState = _utils2.default.getShadowState(node);
        if (!nodeState || !nodeState.observers) {
            continue;
        }
        // ...and then for each registered observer (with registered 
        // observer’s options as options) in node’s list of registered 
        // observers...
        for (var j = 0; j < nodeState.observers.length; j++) {
            var registeredObserver = nodeState.observers[j];
            var options = registeredObserver.options;
            // ...run these substeps:
            // 1. If none of the following are true:
            if (node != target && !options.subtree) {
                continue;
            }
            if (type === MO_TYPE_ATTRIBUTES) {
                if (!options.attributes) {
                    continue;
                }
                // if options' attributeFilter is present, and options' attributeFilter
                // does not contain name or namespace is non-null
                if (options.attributeFilter && (options.attributeFilter.indexOf(name) === -1 || nameSpace != null)) {
                    continue;
                }
            }
            if (type === MO_TYPE_CHARACTER_DATA && !options.characterData) {
                continue;
            }
            if (type === MO_TYPE_CHILD_LIST && !options.childList) {
                continue;
            }
            // ...then run the subsubsteps:
            // 1. If registered observer’s observer is not in interested observers, 
            // append registered observer’s observer to interested observers.
            var observer = registeredObserver.instance;
            var index = interestedObservers.indexOf(observer);
            if (index === -1) {
                index = interestedObservers.length;
                interestedObservers[index] = observer;
            }
            // 2. If either type is "attributes" and options’ attributeOldValue is true, 
            // or type is "characterData" and options’ characterDataOldValue is true, 
            // set the paired string of registered observer’s observer in interested observers to oldValue.
            if (type === MO_TYPE_ATTRIBUTES && options.attributeOldValue || type === MO_TYPE_CHARACTER_DATA && options.characterDataOldValue) {
                pairedStrings[index] = oldValue;
            }
        }
    }

    // PERF: This is an out-of-spec optimization
    if (interestedObservers.length === 0) {
        return;
    }

    // 4. Then, for each observer in interested observers, run these substeps:
    for (var _i = 0; _i < interestedObservers.length; _i++) {
        var _observer = interestedObservers[_i];
        // 1. Let record be a new MutationRecord object with its type set to type and target set to target.
        var record = {
            type: type,
            target: target,
            attributeName: null,
            attributeNamespace: null,
            addedNodes: theEmptyList,
            removedNodes: theEmptyList,
            previousSibling: null,
            nextSibling: null,
            oldValue: null
        };
        // 2. If name and namespace are given, set record’s attributeName to name, and record’s attributeNamespace to namespace.
        if (name) {
            record.attributeName = name;
            record.attributeNamespace = nameSpace;
        }
        // 3. If addedNodes is given, set record’s addedNodes to addedNodes.
        if (addedNodes) {
            record.addedNodes = addedNodes;
            if (addedNodes instanceof Array) {
                record.addedNodes = addedNodes.slice();
            }
        }
        // 4. If removedNodes is given, set record’s removedNodes to removedNodes.
        if (removedNodes) {
            record.removedNodes = removedNodes;
            if (removedNodes instanceof Array) {
                record.removedNodes = removedNodes.slice();
            }
        }
        // 5. If previousSibling is given, set record’s previousSibling to previousSibling.
        if (previousSibling) {
            record.previousSibling = previousSibling;
        }
        // 6. If nextSibling is given, set record’s nextSibling to nextSibling.
        if (nextSibling) {
            record.nextSibling = nextSibling;
        }
        // 7. If observer has a paired string, set record’s oldValue to observer’s paired string.
        record.oldValue = pairedStrings[_i];
        // 8. Append record to observer’s record queue.
        _observer.queue.push(record);
    }

    // 5. Queue a mutation observer compound microtask.
    queueMutationObserverCompoundMicrotask();
}

function _requeueNativeRecords(records) {
    var recordsCount = records.length;
    for (var i = 0; i < recordsCount; i++) {
        var record = records[i];
        queueMutationRecord(record.type, record.target, record.attributeName, record.attributeNamespace, record.oldValue, record.addedNodes, record.removedNodes, record.previousSibling, record.nextSibling);
    }
}

function registerForMutationObservers(node) {
    documentObserver.observe(node, {
        attributes: true,
        characterData: true,
        attributeOldValue: true,
        characterDataOldValue: true,
        subtree: true
    });
}

function notifyMutationObservers() {
    mutationObserverCompoundMicrotaskQueuedFlag = false;
    var notifyList = mutationObservers.slice();
    var signalList = signalSlotList.splice(0, signalSlotList.length);
    for (var i = 0; i < notifyList.length; i++) {
        var observer = notifyList[i];
        var queue = observer.queue.splice(0, observer.queue.length);
        for (var j = mutationObservers.length - 1; j >= 0; j--) {
            var transientObserver = mutationObservers[j];
            if (transientObserver.observer === observer) {
                mutationObservers.splice(j, 1);
                transientObserver.disconnect();
            }
        }
        if (queue.length) {
            try {
                observer.callback.call(observer.interface, queue, observer.interface);
            } catch (error) {
                _utils2.default.reportError(error);
            }
        }
    }
    // TODO: verify that observers fire after slot change
    for (var _i2 = 0; _i2 < signalList.length; _i2++) {
        var slot = signalList[_i2];
        // 'Event' is capitalized for Webkit.
        var event = slot.ownerDocument.createEvent('Event');
        event.initEvent('slotchange', true, false);
        try {
            slot.dispatchEvent(event);
        } catch (error) {
            _utils2.default.reportError(error);
        }
    }
}

// https://dom.spec.whatwg.org/#signaling-slot-change

function signalASlotChange(slot) {
    // https://dom.spec.whatwg.org/#signal-a-slot-change
    // To signal a slot change, for a slot slot, run these steps:

    // 1. If slot is not in unit of related similar-origin browsing contexts' 
    // signal slot list, append slot to unit of related similar-origin browsing 
    // contexts' signal slot list.
    if (signalSlotList.indexOf(slot) === -1) {
        signalSlotList.push(slot);
    }

    // 2. Queue a mutation observer compound microtask.
    queueMutationObserverCompoundMicrotask();
}

},{"./microtask.js":19,"./utils.js":28}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = require('./dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _Attr = require('./interfaces/Attr.js');

var _Attr2 = _interopRequireDefault(_Attr);

var _CustomEvent = require('./interfaces/CustomEvent.js');

var _CustomEvent2 = _interopRequireDefault(_CustomEvent);

var _Document = require('./interfaces/Document.js');

var _Document2 = _interopRequireDefault(_Document);

var _Element = require('./interfaces/Element.js');

var _Element2 = _interopRequireDefault(_Element);

var _Event = require('./interfaces/Event.js');

var _Event2 = _interopRequireDefault(_Event);

var _EventTarget = require('./interfaces/EventTarget.js');

var _EventTarget2 = _interopRequireDefault(_EventTarget);

var _HTMLSlotElement = require('./interfaces/HTMLSlotElement.js');

var _HTMLSlotElement2 = _interopRequireDefault(_HTMLSlotElement);

var _HTMLTableElement = require('./interfaces/HTMLTableElement.js');

var _HTMLTableElement2 = _interopRequireDefault(_HTMLTableElement);

var _HTMLTableRowElement = require('./interfaces/HTMLTableRowElement.js');

var _HTMLTableRowElement2 = _interopRequireDefault(_HTMLTableRowElement);

var _HTMLTableSectionElement = require('./interfaces/HTMLTableSectionElement.js');

var _HTMLTableSectionElement2 = _interopRequireDefault(_HTMLTableSectionElement);

var _MutationObserver = require('./interfaces/MutationObserver.js');

var _MutationObserver2 = _interopRequireDefault(_MutationObserver);

var _NamedNodeMap = require('./interfaces/NamedNodeMap.js');

var _NamedNodeMap2 = _interopRequireDefault(_NamedNodeMap);

var _Node = require('./interfaces/Node.js');

var _Node2 = _interopRequireDefault(_Node);

var _ShadowRoot = require('./interfaces/ShadowRoot.js');

var _ShadowRoot2 = _interopRequireDefault(_ShadowRoot);

var _Text = require('./interfaces/Text.js');

var _Text2 = _interopRequireDefault(_Text);

var _ChildNode = require('./mixins/ChildNode.js');

var _ChildNode2 = _interopRequireDefault(_ChildNode);

var _DocumentOrShadowRoot = require('./mixins/DocumentOrShadowRoot.js');

var _DocumentOrShadowRoot2 = _interopRequireDefault(_DocumentOrShadowRoot);

var _NonDocumentTypeChildNode = require('./mixins/NonDocumentTypeChildNode.js');

var _NonDocumentTypeChildNode2 = _interopRequireDefault(_NonDocumentTypeChildNode);

var _NonElementParentNode = require('./mixins/NonElementParentNode.js');

var _NonElementParentNode2 = _interopRequireDefault(_NonElementParentNode);

var _ParentNode = require('./mixins/ParentNode.js');

var _ParentNode2 = _interopRequireDefault(_ParentNode);

var _Slotable = require('./mixins/Slotable.js');

var _Slotable2 = _interopRequireDefault(_Slotable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nativeSupport = 'attachShadow' in Element.prototype;

exports.default = {
    nativeSupport: nativeSupport,
    install: install
};


function install() {

    // Hacky setting in case you want to use ShadyCSS.
    window['ShadyDOM'] = { 'inUse': true };

    // Attr interface
    _Attr2.default.install();

    // CustomEvent interface
    window.CustomEvent = _CustomEvent2.default;

    // Document interface
    _utils2.default.extend(Document, _Document2.default);

    // Element interface
    _Element2.default.install();

    // Event interface
    _Event2.default.install();

    // EventTarget
    _EventTarget2.default.install();

    // HTMLSlotElement interface
    _utils2.default.extend('HTMLSlotElement' in window ? HTMLSlotElement : HTMLUnknownElement, _HTMLSlotElement2.default);

    // HTMLTableElement interface
    _utils2.default.extend(HTMLTableElement, _HTMLTableElement2.default);

    // HTMLTableRowElement interface
    _utils2.default.extend(HTMLTableRowElement, _HTMLTableRowElement2.default);

    // HTMLTableSectionElement interface
    _utils2.default.extend(HTMLTableSectionElement, _HTMLTableSectionElement2.default);

    // MutationObserver interface
    window.MutationObserver = _MutationObserver2.default;

    // NamedNodeMap interface
    _utils2.default.extend(NamedNodeMap, _NamedNodeMap2.default);

    // Node interface
    _Node2.default.install();

    // Text interface
    _utils2.default.extend(Text, _Text2.default);

    // ChildNode mixin
    _utils2.default.extend(DocumentType, _ChildNode2.default);
    _utils2.default.extend(Element, _ChildNode2.default);
    _utils2.default.extend(CharacterData, _ChildNode2.default);

    // DocumentOrShadowRoot mixin
    _utils2.default.extend(Document, _DocumentOrShadowRoot2.default);
    _utils2.default.extend(_ShadowRoot2.default, _DocumentOrShadowRoot2.default);

    // NonDocumentTypeChildNode mixin
    _utils2.default.extend(Element, _NonDocumentTypeChildNode2.default);
    _utils2.default.extend(CharacterData, _NonDocumentTypeChildNode2.default);

    // NonElementParentNode mixin
    _utils2.default.extend(Document, _NonElementParentNode2.default);
    _utils2.default.extend(DocumentFragment, _NonElementParentNode2.default);

    // ParentNode mixin
    _utils2.default.extend(Document, _ParentNode2.default);
    _utils2.default.extend(DocumentFragment, _ParentNode2.default);
    _utils2.default.extend(_ShadowRoot2.default, _ParentNode2.default);
    if (_utils2.default.brokenAccessors) {
        _utils2.default.extend(HTMLElement, _ParentNode2.default);
    } else {
        _utils2.default.extend(Element, _ParentNode2.default);
    }

    // Slotable mixin
    _utils2.default.extend(Element, _Slotable2.default);
    _utils2.default.extend(Text, _Slotable2.default);
}

},{"./dom.js":2,"./interfaces/Attr.js":3,"./interfaces/CustomEvent.js":4,"./interfaces/Document.js":5,"./interfaces/Element.js":6,"./interfaces/Event.js":7,"./interfaces/EventTarget.js":8,"./interfaces/HTMLSlotElement.js":9,"./interfaces/HTMLTableElement.js":10,"./interfaces/HTMLTableRowElement.js":11,"./interfaces/HTMLTableSectionElement.js":12,"./interfaces/MutationObserver.js":13,"./interfaces/NamedNodeMap.js":14,"./interfaces/Node.js":15,"./interfaces/ShadowRoot.js":16,"./interfaces/Text.js":17,"./mixins/ChildNode.js":20,"./mixins/DocumentOrShadowRoot.js":21,"./mixins/NonDocumentTypeChildNode.js":22,"./mixins/NonElementParentNode.js":23,"./mixins/ParentNode.js":24,"./mixins/Slotable.js":25,"./utils.js":28}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var brokenAccessors = typeof descriptor(Node, 'childNodes').get === 'undefined';
var nodeAppendChildDescriptor = descriptor(Node, 'appendChild');
var documentCreateElementDescriptor = descriptor(Document, 'createElement');

exports.default = {
    brokenAccessors: brokenAccessors,
    descriptor: descriptor,
    makeDOMException: makeDOMException,
    reportError: reportError,
    extend: extend,
    defineProperty: defineProperty,
    deleteProperty: deleteProperty,
    getShadowState: getShadowState,
    setShadowState: setShadowState,
    isElementNode: isElementNode,
    getUniqueSortedTokens: getUniqueSortedTokens,
    hasAll: hasAll
};


function descriptor(type, name) {
    return Object.getOwnPropertyDescriptor(type.prototype || type, name);
}

// TODO: analyze usages and provide brief but descriptive messages
function makeDOMException(name, message) {
    try {
        var sacrifice = documentCreateElementDescriptor.value.call(window.document, 'div');
        nodeAppendChildDescriptor.value.call(sacrifice, sacrifice);
    } catch (caught) {
        return Object.create(caught, {
            'message': {
                get: function get() {
                    return message;
                }
            },
            'name': {
                get: function get() {
                    return name;
                }
            },
            'code': {
                get: function get() {
                    return caught.code;
                }
            },
            'toString': {
                value: function value() {
                    if (message) {
                        return name + ': ' + message;
                    }
                    return name;
                }
            }
        });
    }
}

function reportWarning(message) {
    if ('console' in window && 'warn' in window.console) {
        window.console.warn(message);
    }
}

function reportError(error) {
    if ('console' in window && 'error' in window.console) {
        window.console.error(error);
    }
}

function extend(extending, mixin) {
    mixin = mixin.prototype || mixin;
    var names = Object.getOwnPropertyNames(mixin);
    for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (name === 'constructor') {
            continue;
        }
        var newDescriptor = Object.getOwnPropertyDescriptor(mixin, name);
        newDescriptor.configurable = true;
        if (extending.prototype) {
            var oldDescriptor = Object.getOwnPropertyDescriptor(extending.prototype, name);
            if (oldDescriptor) {
                if ('value' in newDescriptor) {
                    if (!oldDescriptor.writable) {
                        //reportWarning('Unable to configure data property: ' + name);
                        continue;
                    }
                    extending.prototype[name] = newDescriptor.value;
                    continue;
                }
                if (('get' in newDescriptor || 'set' in newDescriptor) && !oldDescriptor.configurable) {
                    //reportWarning('Unable to configure accessor property: ' + name);
                    continue;
                }
            }
            Object.defineProperty(extending.prototype, name, newDescriptor);
        } else {
            Object.defineProperty(extending, name, newDescriptor);
        }
    }
}

function defineProperty(prototype, name, newDescriptor) {
    newDescriptor.configurable = true;
    newDescriptor.enumerable = true;
    var oldDescriptor = Object.getOwnPropertyDescriptor(prototype, name);
    if ('value' in newDescriptor) {
        newDescriptor.writable = true;
        if (oldDescriptor && !oldDescriptor.configurable) {
            prototype[name] = newDescriptor.value;
            return;
        }
    }
    Object.defineProperty(prototype, name, newDescriptor);
}

function deleteProperty(constructor, name) {
    var descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, name);
    if (!descriptor) {
        return;
    }
    if (!descriptor.configurable) {
        console.warn('Warning: unable to delete property \'' + name + '\' of ' + constructor.name);
        return;
    }
    delete constructor.prototype[name];
}

function getShadowState(object) {
    return object._shadow;
}

function setShadowState(object, state) {
    return object._shadow = state;
}

function isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
}

function hasAll(desiredItems, itemsInQuestion) {
    // depends on sorted, unique input.
    if (itemsInQuestion.length < desiredItems.length) {
        return false;
    }

    var d = 0;
    var i = 0;
    var desiredItem = desiredItems[0];
    var itemInQuestion = itemsInQuestion[0];
    var iLength = itemsInQuestion.length;
    var dLength = desiredItems.length;
    do {
        if (itemInQuestion === desiredItem) {
            desiredItem = desiredItems[++d];
        }
        itemInQuestion = itemsInQuestion[++d];
    } while (d <= dLength && i <= iLength);
    return d > dLength;
}

function getUniqueSortedTokens(tokens) {
    if (tokens === null || tokens === undefined || tokens === '') {
        return null;
    }

    tokens = tokens.trim().split(/\s+/).sort();

    if (tokens.length > 1) {
        var last = tokens[0];
        var unique = [last];
        for (var i = 1; i < tokens.length; i++) {
            var current = tokens[i];
            if (current === last) {
                continue;
            }
            unique.push(current);
            last = current;
        }
        tokens = unique;
    }

    return tokens;
}

},{}]},{},[18]);
