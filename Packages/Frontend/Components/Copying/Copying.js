import {Component} from '../../Api/Components/Component/Component.js';


export class Copying extends Component {
    static _attributes = {
        ...super._attributes,

        _active: {
            default: false,
            enum: [false, true],
        },

        text_copy: '',
        text: '',
    };

    static _elements = {
        button: '',
        field: '',
        root: '',
    };

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    animation_time = 2e3;


    get _active() {
        return this._attributes._active;
    }
    set _active(active) {
        this._attribute__set('_active', !!active);
    }


    get text() {
        return this._attributes.text;
    }
    set text(text) {
        this._attribute__set('text', text);
        this._elements.field.textContent = text;
    }

    get text_copy() {
        return this._attributes.text_copy;
    }
    set text_copy(text_copy) {
        this._attribute__set('text_copy', text_copy);
        this._elements.field.textContent = text_copy;
    }


    _active__toggle() {
        this._active = !this._active;
    }

    _eventListeners__define() {
        this._elements.root.addEventListener('pointerdown', this._root__on_pointerDown.bind(this));
    }

    _init() {
        this.props__sync('text_copy');
    }

    _root__on_pointerDown(event) {
        if (this._active || !(event.target == this._elements.field || event.target == this._elements.button) || !this.text_copy) return;

        navigator.clipboard.writeText(this.text_copy).then(() => {
            this._active__toggle();
            setTimeout(this._active__toggle.bind(this), this.animation_time);
        });
    }
}
