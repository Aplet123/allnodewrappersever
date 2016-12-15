function init() {
    //IMPORTANT PROTOTYPES
    Object.defineProperty(Object.prototype, "copy", {
        value: function() {
            var obj = {};
            for(let i in this) {
                obj[i] = this[i];
            }
            return obj;
        }
    });
    Object.defineProperty(Object.prototype, "keysize", {
        get: function() {
            return Object.keys(this).length;
        }
    });
    //ARRAY PROTOTYPES
    Object.defineProperty(Array.prototype, "last", {
        get: function() {
            return this[this.length - 1];
        },
        set: function(val) {
            this[this.length - 1] = val;
        }
    });
    Object.defineProperty(Array.prototype, "random", {
        get: function() {
            return this[Math.floor(Math.random() * this.length)];
        },
        set: function(val) {
            this[Math.floor(Math.random() * this.length)] = val;
        }
    });
    Object.defineProperty(Array.prototype, "sum", {
        get: function() {
            return this.reduce((a,b) => a + b);
        }
    });
    Object.defineProperty(Array.prototype, "mean", {
        get: function() {
            return this.sum / this.length;
        }
    });
    Object.defineProperty(Array.prototype, "joined", {
        get: function() {
            return this.join``;
        }
    });
    //PROMISE PROTOTYPES
    Object.defineProperty(Promise.prototype, "safe", {
        get: function() {
            return this.catch(err => {
                console.error(err);
            });
        }
    });
    //OBJECT PROTOTYPES
    Object.defineProperty(Object.prototype, "array", {
        get: function() {
            return Array.from(this);
        }
    });
    Object.defineProperty(Object.prototype, "cleaned", {
        get: function() {
            var self = this.copy();
            for (let i in self) {
                if (self[i] === undefined) {
                    delete self[i];
                }
            }
            return self;
        }
    });
    Object.defineProperty(Object.prototype, "objectified", {
        get: function() {
            return new Object(this);
        }
    });
    Object.defineProperty(Object.prototype, "jsonString", {
        get: function() {
            return JSON.stringify(this);
        },
        set: function(val) {
            var parsed = JSON.parse(val);
            for(let i in parsed) {
                this[i] = parsed[i];
            }
        }
    });
    Object.defineProperty(Object.prototype, "map", {
        value: function(func) {
            var self = this.copy();
            for (let i in self) {
                self[i] = func(self[i], i, self);
            }
            return self;
        }
    });
    Object.defineProperty(Object.prototype, "delete", {
        value: function(obj) {
            var self = this.copy();
            if (obj instanceof Array) {
                obj.map(v => {
                    delete self[v];
                });
            } else {
                delete self[obj];
            }
            return self;
        }
    });
    Object.defineProperty(Object.prototype, "merge", {
        value: function(obj, merge) {
            var self = this.copy();
            for(let i in obj) {
                if(i in self && merge) {
                    self[i] = obj[i];
                } else if (!(i in self)) {
                    self[i] = obj[i];
                }
            }
            return self;
        }
    });
    Object.defineProperty(Object.prototype, "filter", {
        value: function(func) {
            var self = this.copy();
            for(let i in self) {
                if (!func(this[i], i, this)) {
                    delete this[i];
                }
            }
            return self;
        }
    });
    Object.defineProperty(Object.prototype, "indexOf", {
        value: function(val, strict = true) {
            for (let i in this) {
                if (strict ? (this[i] === val) : (this[i] == val)) {
                    return i;
                }
            }
            return null;
        }
    });
    Object.defineProperty(Object.prototype, "every", {
        value: function(func) {
            for (let i in this) {
                if (!func(this[i], i, this)) {
                    return false;
                }
            }
            return true;
        }
    });
    Object.defineProperty(Object.prototype, "some", {
        value: function(func) {
            for (let i in this) {
                if (func(this[i], i, this)) {
                    return true;
                }
            }
            return false;
        }
    });
    Object.defineProperty(Object.prototype, "find", {
        value: function(func) {
            for (let i in this) {
                if (func(this[i], i, this)) {
                    return this[i];
                }
            }
            return undefined;
        }
    });
    Object.defineProperty(Object.prototype, "findIndex", {
        value: function(func) {
            for (let i in this) {
                if (func(this[i], i, this)) {
                    return i;
                }
            }
            return undefined;
        }
    });
    Object.defineProperty(Object.prototype, "includes", {
        value: function(val, strict = true) {
            if(this.indexOf(val, strict) !== null) {
                return true;
            } else {
                return false;
            }
        }
    });
    Object.defineProperty(Object.prototype, "reduce", {
        value: function(func, initial) {
            var keys = [];
            for (let i in this) {
                keys.push(i);
            }
            var index = keys[(initial === undefined) ? 1 : 0];
            var val = (initial === undefined) ? this[keys[0]] : initial;
            while(index < keys.length) {
                val = func(val, this[index], index++, this);
            }
            return val;
        }
    });
    Object.defineProperty(Object.prototype, "compare", {
        value: function(obj) {
            if (this.keysize !== obj.keysize || typeof this !== typeof obj || this.constructor !== obj.constructor) {
                return false;
            }
            for (let i in this) {
                if (i in obj) {
                    if (this[i] !== obj[i]) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
    });
    //STRING PROTOTYPES
    Object.defineProperty(String.prototype, "jsonObject", {
        get: function() {
            return JSON.parse(this);
        }
    });
    Object.defineProperty(String.prototype, "URI", {
        get: function() {
            return encodeURI(this);
        }
    });
    Object.defineProperty(String.prototype, "nonURI", {
        get: function() {
            return decodeURI(this);
        }
    });
    Object.defineProperty(String.prototype, "chars", {
        get: function() {
            return this.split``;
        }
    });
    Object.defineProperty(String.prototype, "number", {
        get: function() {
            return Number(this);
        }
    });
    //NUMBER PROTOTYPES
    Object.defineProperty(Number.prototype, "string", {
        get: function() {
            return String(this);
        }
    });
}

module.exports = init;