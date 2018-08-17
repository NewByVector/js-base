function EventTarget () {
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    removeHandle: function (type, handler) {
        var handlers = this.handlers[type];
        if (handlers instanceof Array) {
            for (var i = 0,len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        var handlers = this.handlers[event.type];
        if (handlers instanceof Array) {
            for (var i = 0,len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    }
}