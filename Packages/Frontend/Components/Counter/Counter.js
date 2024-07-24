import {Component} from '../../Api/Components/Component/Component.js';
import {Common} from '../../Api/Units/Common/Common.js'


export class Counter extends Component {
    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    _value = 0;
    _counter_value = null;
    _range = [-Infinity, Infinity];


    set value(value) {
        this._value = this._toRange();
        this.refresh();
    }

    get value() {
        return this._value;
    }

    set range(range) {
        let [min, max] = range;
        this._range = [+min || 0, +max || Infinity];
        this._value = this.range[0];
    }

    get range() {
        return this._range;
    }


    _init() {

        this._counter_value = this._shadow.querySelector('.value');

        this._shadow.addEventListener('pointerdown', this._on__pointerDown.bind(this));

        this.refresh();
    }

    _on__pointerDown(event) {
        if (!event.target.classList.contains('button')) return;

        let value = this._value;

        if (event.target.classList.contains('button_increment')) {
            value = this._toRange(value + 1);
        }
        else if (event.target.classList.contains('button_decrement')) {
            value = this._toRange(value - 1);
        }
        else {
            value = isFinite(this._range[0]) ? this._range[0] : 0;
        }

        this._value = value;
        this.refresh();
    }

    _toRange(value) {
        return Common.toRange((+value || 0), this._range[0], this._range[1]);
    }


    refresh() {
        this._counter_value.textContent = this._value;
    }
}
