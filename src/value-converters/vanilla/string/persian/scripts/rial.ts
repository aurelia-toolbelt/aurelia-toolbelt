/*!
 * Rial.js v0.0.2
 * Copyright 2015 Saeid Habibpour
 * a tiny JavaScript library for money and currency formatting
 *
 * examples and documentation:
 * http://github.com/habibpour/rial.js/
 */

/* tslint:disable */


// @ts-ignore
String.prototype.replaceAll = function (token, newToken, ignoreCase) {
	var _token;
	var str = this + "";
	var i = -1;
	if (typeof token === "string") {
		if (ignoreCase) {
			_token = token.toLowerCase();
			while ((
				i = str.toLowerCase().indexOf(
					token, i >= 0 ? i + newToken.length : 0
				)) !== -1
			) {
				str = str.substring(0, i) +
					newToken +
					str.substring(i + token.length);
			}
		} else {
			return this.split(token).join(newToken);
		}
	}
	return str;
};

// @ts-ignore
function Rial(obj) {
	if (!this.isEmpty(obj)) {
		this.Decimal(obj.decimal);
		this.Alphabet(obj.alphabet);
		this.Currency(obj.currency);
		this.Cut(obj.cut);
	}
}

// @ts-ignore
Rial.prototype.Decimal = function (str) {
	if (!this.isEmpty(str))
		this.decimal = str;
	else
		this.decimal = "";
	return this;
};

// @ts-ignore
Rial.prototype.Alphabet = function (str) {
	if (!this.isEmpty(str))
		this.alphabet = str;
	return this;
};

// @ts-ignore
Rial.prototype.Currency = function (str) {
	if (!this.isEmpty(str))
		this.currency = str;
	return this;
};

// @ts-ignore
Rial.prototype.Cut = function (str) {
	if (!this.isEmpty(str))
		this.cut = str;
	else
		this.cut = 0;
	return this;
};

// @ts-ignore
Rial.prototype.persianAlphabet = function (str) {
	this.result = str
		.replaceAll('0', '۰')
		.replaceAll('1', '۱')
		.replaceAll('2', '۲')
		.replaceAll('3', '۳')
		.replaceAll('4', '۴')
		.replaceAll('5', '۵')
		.replaceAll('6', '۶')
		.replaceAll('7', '۷')
		.replaceAll('8', '۸')
		.replaceAll('9', '۹');
};

// @ts-ignore
Rial.prototype.latinAlphabet = function (str) {
	this.result = str
		.replaceAll('۰', '0')
		.replaceAll('۱', '1')
		.replaceAll('۲', '2')
		.replaceAll('۳', '3')
		.replaceAll('۴', '4')
		.replaceAll('۵', '5')
		.replaceAll('۶', '6')
		.replaceAll('۷', '7')
		.replaceAll('۸', '8')
		.replaceAll('۹', '9');
};

// @ts-ignore
Rial.prototype.isEmpty = function (element) {
	if (element === undefined || element == null || element == "")
		return true;
	return false;
}

// @ts-ignore
Rial.prototype.clean = function (str) {
	var chars = "0۰";
	if (this.isEmpty(chars))
		chars = "\s";
	str = str.replace(new RegExp("^[" + chars + "]+"), "");
	this.result = str.toString().replace(/[^0-9+۰-۹]/g, '');
}

// @ts-ignore
Rial.prototype.format = function (str) {
	if (!this.isEmpty(str)) { // Hamed Fathi
		str = str.split("").reverse().join("");
		var n = str.match(/.{1,3}/g);
		for (var i = 0; i < n.length; i++)
			n[i] = n[i].split("").reverse().join("");
		str = n.reverse().join(this.decimal);
		this.result = str;
	} // Hamed Fathi
	else // Hamed Fathi
		this.result = "0"; // Hamed Fathi
}

// @ts-ignore
Rial.prototype.slice = function (str) {
	this.result = str.substring(0, str.length - this.cut);
}

// @ts-ignore
Rial.prototype.get = function (str) {
	this.result = str;
	this.clean(this.result);
	if (this.isEmpty(this.result))
		return 0;
	if (this.alphabet == "en")
		this.latinAlphabet(this.result);
	else
		this.persianAlphabet(this.result);
	this.slice(this.result);
	this.format(this.result);
	if (!this.isEmpty(this.currency))
		this.result += " " + this.currency;

	return this.result;
};

// Hamed Fathi export for Node.js
if (typeof module !== 'undefined' && module.exports) {
	module.exports.Rial = Rial;
}