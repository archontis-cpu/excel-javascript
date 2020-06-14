class DOM {
    constructor(selector) {
        /* this.$el === native element!!! */
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }
    clear() {
        this.html('');
        return this;
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }
    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }
    append(node) {
        if (node instanceof DOM) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }
    closest(selector) {
        return $(this.$el.closest(selector));
    }
    getCoords() {
        return this.$el.getBoundingClientRect();
    }
    find(selector) {
        return $(this.$el.querySelector(selector));
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }
    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }
    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }
    focus() {
        this.$el.focus();
        return this;
    }
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1],
            };
        }
        return this.data.id;
    }
    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
    }
    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key];
            });
    }
    get data() {
        return this.$el.dataset;
    }
    getStyles(styles = []) {
        return styles.reduce((result, style) => {
            result[style] = this.$el.style[style];
            return result;
        }, { });
    }
}

export function $(selector) {
    return new DOM(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
