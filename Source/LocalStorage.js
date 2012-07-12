/*
---

name: LocalStorage

description: Simple localStorage wrapper. Does not even attempt to be a fancy plugin.

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Cookie, Core/JSON]

provides: LocalStorage

...
*/

var storage, set, get, erase;
if ('localStorage' in this) {
	storage = this.localStorage;
	set = function(key, value){
		storage.setItem(key, JSON.stringify(value));
		return this;
	};

	get = function(key){
		return JSON.parse(storage.getItem(key));
	};

	erase = function(key){
		storage.removeItem(key);
		return this;
	}.overloadGetter();
} else {
	storage = this.Cookie;
	set = function(key, value){
		storage.write(key, JSON.stringify(value));
		return this;
	};

	get = function(key){
		return JSON.parse(storage.read(key));
	};

	erase = function(key){
		storage.dispose(key);
		return this;
	}.overloadGetter();
}

this.LocalStorage = {
	set: set.overloadSetter(),
	get: get.overloadGetter(),
	erase: function(){
		erase.apply(this, arguments);
		return this;
	}
};
