import {Component} from '../../Api/Components/Component/Component.js';
import {Common} from '../../Api/Units/Common/Common.js'


export class Counter extends Component {
    static _attributes = {
        ...super._attributes,

        button_reset: false,
        value: 0,
    };

    static _elements = {
        counter_value: '',
        root: '',
    };

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    _range = [-Infinity, Infinity];


    get button_reset() {
        return this._attributes.button_reset;
    }
    set button_reset(button_reset) {
        this._attribute__set('button_reset', button_reset);
    }

    get value() {
        return this._attributes.value;
    }
    set value(value) {
        value = this._to_range(value);

        this._attribute__set('value', value);
        this.refresh();
    }

    get range() {
        return this._range;
    }
    set range(range) {
        console.log(range)
        let [min, max] = range;
        this._range = [+min || 0, +max || Infinity];

        this.value = this.range[0];
    }


    _eventListeners__define() {
       this._elements.root.addEventListener('pointerdown', this._root__on_pointerDown.bind(this));
    }

    _init() {
        this.props__sync();
    }

    _root__on_pointerDown(event) {
        if (!event.target.classList.contains('button')) return;

        if (event.target.classList.contains('button_increment')) {
            this.value = this._to_range(this.value + 1);
        }
        else if (event.target.classList.contains('button_decrement')) {
            this.value = this._to_range(this.value - 1);
        }
        else {
            this.value = isFinite(this._range[0]) ? this._range[0] : 0;
        }

        this.refresh();
    }

    _to_range(value) {
        return Common.to_range((+value || 0), this._range[0], this._range[1]);
    }


    refresh() {
        this._elements.counter_value.textContent = this.value;
    }
}
