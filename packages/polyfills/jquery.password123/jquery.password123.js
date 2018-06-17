/**
*	@preserve jQuery password123: iPhone Style Passwords Plugin - v1.5 - 2/1/2011
*	http://timmywillison.com/samples/password123/
*	Copyright (c) 2011 timmy willison
*	Dual licensed under the MIT and GPL licences.
*	http://timmywillison.com/licence/
*/

// *Version: 1.5, Last updated: 2/1/2011*
//
// Demo			- http://timmywillison.com/samples/password123/
// Testing		- http://timmywillison.com/samples/password123/qunit/test/
// GitHub		- http://github.com/timmywil/password123
// Source		- http://github.com/timmywil/password123/raw/master/jquery.password123.js (13.8kb)
// (Minified)	- http://github.com/timmywil/password123/raw/master/jquery.password123.min.js (5.2kb)
//
// License
//
// Copyright (c) 2011 timmy willison,
// Dual licensed under the MIT and GPL licenses.
// http://timmywillison.com/licence/
//
// Support and Testing
//
// Versions of jQuery and browsers this was tested on.
//
// jQuery Versions - 1.3.2-1.5
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-5,
//					 Chrome 4-6, Opera 9.6-10.5.
//
// Release History
//
// 1.5   - (2/1/2011) Added widget-style option method, only instantiate when not calling a method
// 1.4	 - (2/1/2011) Restructured plugin, added destroy method, added tests
// 1.3	 - (11/23/2010) Added Google Closure Compiler comments, common password field attribute
//				support when replacing fields, and no longer sends placeholder value when submitting the form.
// 1.2	 - (9/28/2010) Placeholders changed to only work with HTML5 placeholder attribute,
//				'value' attribute now reserved for actual values
// 1.1	 - (7/5/2010) Add Placeholder functionality
// 1.0	 - (7/4/2010) Initial release
//
// See README for usage and placeholder explanation

;(function ($, window, document, undefined) {

	// Extend jQuery
	$.fn.password123 = function ( options ) {
		var instance = $.data( this[0], "password123" ),
			args = Array.prototype.slice.call( arguments, 1 );

		// Catch method calls
		if ( !!instance && typeof options === "string" && options.charAt( 0 ) !== "_" && instance[ options ] ) {
			args.unshift( this );
			return instance[ options ].apply( instance, args );
		}

		return this.map(function( i, elem ) {
			// Returns the new password fields for chaining
			// Old password fields are removed
			return new password123._init( elem, options );
		});
	};

	var clear_timeout = window.clearTimeout,
		counter = 0,
	password123 = {

		_init: function( elem, options ) {

			// Catch fields that aren't password fields
			if ( !elem.type === "password" ) {
				return elem;
			}

			var self = this;

			// Continue regularly
			self.options = $.extend({

				// You can use any html character code or
				// plain text character
				character: "&#8226;",

				// This is the delay(ms) for when the last
				// character will change
				delay: 2000,

				// Use any prefix you like for the new
				// field ids, but they will always be zero-indexed
				prefix: "iField",

				// Enable the override of the placeholder attribute
				placeholder: true,

				// With this classname, you can set placeholder
				// specific styles in your own css
				placeholderClass: 'place',

				// When true, this will mask the placeholder or initial value
				maskInitial: false
			}, options);

			// HTML encode the character
			self.encodedChar = $('<div>'+ self.options.character +'</div>').text();

			// Replace the fields with what we need
			// and store in var fields
			self.$field = self._replaceField( elem )

				// Bind textchange to the fields with
				// the letterChange function
				.bind('textchange', function() {
					self._letterChange.call( self );
				});


			// Add placeholder stuff
			if ( self.options.placeholder ) {
				self._bindPlaceholder();
			}

			// Mask the placeholder or initial value if needed
			if ( self.options.maskInitial ) {
				self.$field.keyup();
			}

			// Return the new password field
			return self.$field[0];
		},

		/**
		 * Replaces the password field with a hidden field
		 * and adds the new visible text field.
		 * @param {object} $field One field to replace
		 * @return {object} The new text field.
		 * @private
		 */
		_replaceField: function( field ) {
			var	self     = this,
				$field   = $(field),
				place    = $field.attr('placeholder') || undefined,
				field_id = self.options.prefix + counter++,
				value    = $field.val() || ( self.options.placeholder ? place || '' : '' ),
				classes  = self.options.placeholder && place !== undefined && (value === place || value === '') ?
								field.className + ' ' + self.options.placeholderClass :
								field.className,
				attrs = { 'class': classes, 'id': field_id, 'value': value, 'placeholder': self.options.placeholder ? undefined : place },
				standards = [ 'size', 'tabindex', 'readonly', 'disabled', 'maxlength' ];

			// Combine attrs with standard attrs
			for ( var i = 0; i < standards.length; i++ ) {
				var attr = $field.attr( standards[i] );
				attrs[ standards[i] ] = attr && attr > -1 ? attr : undefined;
			}

			// The hidden field that will get sent with the form
			self.$hidden = $('<input type="hidden"/>')
				.attr({
					'name': $field.attr('name'),
					'id': field.id,
					'class': field.className,
					'disabled': $field.attr('disabled')
				})
				.replaceAll( $field )
				.val( value !== place ? value : '' );

			self.$oldField = $field;

			// The main field
			return $('<input type="text"/>')
				.attr( attrs )
				.insertAfter( self.$hidden )
				.data({
					'value': $field.val() || '', // If value was set, fill it in correctly
					'placeholder': place, // Attach placeholder for comparison to value
					'newVal': value, // This to avoid sending the placeholder value when submitting the form
					'password123': self // Attach the instance of this plugin
				});
		},

		/**
		 * Calls for the necessary adjustments when
		 * a field is changed
		 * @private
		 */
		_letterChange: function( elem ) {
			var fv = this.$field.val();

			if ( fv.length > this.$field.data('value').length ) {

				// Apply fieldChange as normal
				this.$field.data( 'value', this._fieldChange() );

			} else if ( fv.length < this.$field.data('value').length ) {

				// Clear the timeout for the last character
				clear_timeout( this.last );

				var old = this.$hidden.val(),
					newVal;

				if ( fv.length < old.length - 1 ) {
					newVal = old.substr( 0, fv.length );
				} else {
					var cp = this._getCursorPosition();

					// Create the new value with the correct
					// character deleted
					newVal = old.length > cp + 1 && cp > -1
						? old.slice(0, cp).concat(old.slice(cp + 1))
						: old.slice(0, cp);
				}

				// Update data and the hidden input
				this.$field.data({ 'value': fv, 'newVal': newVal });
				if ( newVal !== this.$field.data('placeholder') ) {
					this.$hidden.val( newVal );
				}
			}

			return this;
		},

		/**
		 * Updates the field with the dots as the user types,
		 * and sets the timeout for the last char.
		 * @return {string} The new value to set to field.data
		 * @private
		 */
		_fieldChange: function() {
			var self = this;

			// Clear the timeout for the last character
			clear_timeout( self.last );
			var fv = self.$field.val(), len = fv.length,
				old = self.$hidden.val(),
				cp = self._getCursorPosition(),
				newVal;

			// Update the hidden value with the correct value
			// depending on cursor position
			newVal = old.length > cp + 1 && cp > -1
				? old.substr(0, cp-1) + fv.charAt(cp-1) + old.substr(cp-1)
				: old + fv.charAt(len - 1);
			self.$field.data('newVal', newVal);
			if ( newVal !== self.$field.data('placeholder') ) {
				self.$hidden.val( newVal );
			}

			if ( len > 1 ) {

				// Loop through and change all characters
				for ( var i = 0; i < len - 1; i++ ) {
					fv = fv.replace( fv.charAt(i), self.encodedChar );
				}

				// Update the field
				self.$field.val( fv );
			}
			if ( len > 0 ) {

				// Set the timeout for the last character
				self.last = setTimeout(function () {
					cp = self._getCursorPosition();
					fv = self.$field.val();
					fv = fv.replace( fv.charAt(len - 1), self.encodedChar );
					self.$field.val( fv ).data('value', fv);

					// Reset cursor position to what it was if not at end
					if ( cp != len ) {
						self._setCursorPosition( cp );
					}
				}, self.options.delay);
			}

			// Reset cursor position to what it was if not at end
			if ( cp != len ) {
				self._setCursorPosition( cp );
			}
			return fv;
		},

		/**
		 * Placeholder functionality
		 * @private
		 */
		_bindPlaceholder: function() {
			var self = this,
				place = self.$field.data('placeholder');

			if ( place !== undefined ) {
				self.$field.bind({
					"focus.password123": function() {
						// Compare the hidden value with the placeholder value
						if ( self.$field.data('newVal') === place ) {
							self.$field.val('').removeClass( self.options.placeholderClass ).data( 'newVal', '' );
							self.$hidden.val('');
						}
					},
					"blur.password123": function() {
						// If it's empty, put the placeholder in as the value
						if ( place !== undefined && self.$field.val() === '' ) {
							self.$field.val( place ).addClass( self.options.placeholderClass ).data( 'newVal', place );

							// Mask the placeholder if needed
							if ( self.options.maskInitial ) {
								self.$field.keyup();
							}
						}
					}
				});
			} else {
				self.$field.keyup();
			}
			return self;
		},

		/**
		 * Remove placeholder functionality
		 * @private
		 */
		_changePlaceholder: function( isPlace ) {
			if ( isPlace && !this.options.placeholder ) {
				return this._bindPlaceholder();
			} else if ( !isPlace && this.options.placeholder ) {
				this.$field.focus().unbind('.password123').blur();
			}
			return this;
		},

		/**
		 * Change the id prefix on this field
		 * @private
		 */
		_changePrefix: function( value ) {
			var cur = this.$field.attr("id"),
				prev = this.options.prefix;
			this.$field.attr( 'id', cur.replace( prev, value ) );
			return this;
		},

		/**
		 * Gets the current cursor position in a textfield
		 * to determine where to delete/update a character.
		 * @return {Number} The index for the position of the cursor.
		 * @private
		 */
		_getCursorPosition: function() {
			var elem = this.$field[0];
			if ( elem != null ) {
				// IE
				if ( document.selection ) {
					elem.focus();
					var sel = document.selection.createRange();
					sel.moveStart( 'character', -elem.value.length );
					return sel.text.length;
				}
				// Others
				else if ( elem.selectionStart !== undefined ) {
					return elem.selectionStart;
				}
			}
			return -1;
		},

		/**
		 * Sets the cursor position to a previous state
		 * if the field was updated somewhere in the middle.
		 * @param {Element} field The raw field.
		 * @param {Number} pos The position to set to.
		 * @private
		 */
		_setCursorPosition: function( pos ) {
			var elem = this.$field[0];
			if ( elem != null ) {
				// IE
				if ( elem.createTextRange ) {
					var range = elem.createTextRange();
					range.move('character', pos);
					range.select();
				}
				// Others
				else if ( elem.setSelectionRange ) {
					elem.focus();
					elem.setSelectionRange( pos, pos );
				}
				else {
					elem.focus();
				}
			}
		},

		/**
		 * Internally sets options
		 * @return password123 instance
		 * @private
		 */
		_setOptions: function( options ) {
			var self = this;
			$.each( options, function( key, value ) {
				switch ( key ) {
					case "placeholder":
						self._changePlaceholder( value === "false" ? false : value );
						break;
					case "prefix":
						self._changePrefix( value );
				}
				self.options[ key ] = value;
			});
			return this;
		},

		/**
		 * Destroys everything password123 has done and
		 * sets the original password field back in place
		 * @return The original password field
		 */
		destroy: function( elem ) {
			var val = this.$hidden.remove().val();
			return this.$oldField.val( val ).replaceAll( elem );
		},

		/**
		 * Get/set option on an existing password123 instance
		 * @return The password123 field
		 */
		option: function( elems, key, value ) {
			if ( !key ) {
				return $.extend( {}, this.options ); // Avoids returning direct reference
			}
			var options = key;

			if ( typeof key === "string" ) {
				if ( value === undefined ) {
					return this.options[ key ];
				}
				options = {};
				options[ key ] = value;
			}

			this._setOptions( options );

			return elems;
		}
	};
	password123._init.prototype = password123;

	// Textchange event with a little extra
	$.event.special.textchange = {
		setup: function( data, namespaces ) {
			$(this).bind('keyup.textchange', $.event.special.textchange.handler);
			$(this).bind('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
		},
		teardown: function( namespaces ) {
			$(this).unbind('.textchange');
		},
		handler: function( event ) {
			$.event.special.textchange.triggerIfChanged( $(this) );
		},
		delayedHandler: function( event ) {
			var $element = $(this);

			setTimeout(function() {
				$.event.special.textchange.triggerIfChanged( $element );
			}, 25);
		},
		triggerIfChanged: function( $element ) {
			var v = $element.val();

			if ( $element.val() !== $element.data('lastValue') ) {

				// Check if something larger than one letter was pasted into the field
				var p123 = $.data( $element[0], "password123" );
				if ( v.length > 1 && v.indexOf( p123.encodedChar ) === -1 ) {

					// If so, we need to save it before it disappears,
					// but continue with triggering the field change
					// by taking the last letter off
					v = v.substr(0, v.length-1);
					$element.data('value', v);
					p123.$hidden.val( v );
				}
				$element.trigger( 'textchange', $element.data('lastValue') );
				$element.data('lastValue', $element.val());
			}
		}
	};


})(jQuery, this, this.document);
