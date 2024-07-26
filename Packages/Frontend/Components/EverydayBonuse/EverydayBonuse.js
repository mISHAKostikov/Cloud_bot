import {Component} from '../../Api/Components/Component/Component.js';


export class EverydayBonuse extends Component {
    static _attributes = {
        ...super._attributes,

        active: true,
        animation: false,
    };

    static _elements = {
        button_close: '',
    }

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }

    static resources = {
        cross: new URL(`${this.name}.svg#cross`, import.meta.url),
    };


    get active() {
        return this._attributes.active;
    }
    set active(active) {
        this._attribute__set('active', active);
        this.animation = true;
    }

    get animation() {
        return this._attributes.active;
    }
    set animation(animation) {
        this._attribute__set('animation', animation);
    }


    _button_close__on_pointerDown() {
        this.delete();
    }

    _eventListeners__define() {
        this._elements.button_close.addEventListener('pointerdown', this._button_close__on_pointerDown.bind(this));
    }


    async delete() {
        this.active = false;

        await setTimeout(() => this.remove(), 5e2);
        this.event__dispatch('delete');
    }

    refresh() {}
}
