function init() {
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
    //PROMISE PROTOTYPES
    Object.defineProperty(Promise.prototype, "safe", {
        get: function() {
            return this.catch(err => {
                console.error(err);
            });
        }
    });
    //OBJECT PROTOTYPES
    Object.defineProperty(Object.prototype, "keysize", {
        get: function() {
            return Object.keys(this).length;
        }
    });
    Object.defineProperty(Object.prototype, "array", {
        get: function() {
            return Array.from(this);
        }
    });
    Object.defineProperty(Object.prototype, "cleaned", {
        get: function() {
            for (let i in this) {
                if (this[i] === undefined) {
                    delete this[i];
                }
            }
            return this;
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
    //STRING PROTOTYPES
    Object.defineProperty(String.prototype, "jsonObject", {
        get: function() {
            return JSON.parse(this);
        },
        set: function(val) {
            var str = JSON.stringify(val);
            for(let i in this) {
                delete this[i];
            }
            for(let i in str) {
                this[i] = str[i];
            }
        }
    });
    Object.defineProperty(String.prototype, "URI", {
        get: function() {
            return encodeURI(this);
        },
        set: function(val) {
            var str = decodeURI(val);
            for(let i in this) {
                delete this[i];
            }
            for(let i in str) {
                this[i] = str[i];
            }
        }
    });
    Object.defineProperty(String.prototype, "nonURI", {
        get: function() {
            return decodeURI(this);
        },
        set: function(val) {
            var str = encodeURI(val);
            for(let i in this) {
                delete this[i];
            }
            for(let i in str) {
                this[i] = str[i];
            }
        }
    });
}

module.exports = init;