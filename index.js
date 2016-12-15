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
}

module.exports = {
    init
};