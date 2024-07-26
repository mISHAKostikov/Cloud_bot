import {Component} from '../../Api/Components/Component/Component.js';
import {Telegram} from '../../Api/Units/Telegram/Telegram.js';


export class Subscribe extends Component {
    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static _attributes = {
        ...super._attributes,

        paint: '',
        fullfill: false,
        url: '',
    };

    static _elements = {
        image: '',
        button_control: '',
        button_subscribe: '',
        bonus: '',
    }

    get paint() {
        return this._attributes.paint;
    }
    set paint(paint) {
        this._attribute__set('paint', paint);
        this.refresh();
    }

    get fullfill() {
        return this._attributes.fullfill;
    }
    set fullfill(fullfill) {
        this._attribute__set('fullfill', fullfill);
        this.refresh();
    }

    get url() {
        return this._attributes.url;
    }
    set url(url) {
        this._attribute__set('url', url);
    }

    _button_subscribe__on_pointerDown() {
        //console.log(this._elements.button_subscribe.hasAttribute('active'));
        Telegram.telegram_link__open(this.url);
        if (this.fullfill) return;

        this._elements.button_control.removeAttribute('disabled');
    }

    _button_control__on_pointerDown() {
        this._elements.button_control.setAttribute('disabled', true);
        this.fullfill = true;
        //console.log(this._elements.button_control);
        this._elements.bonus.removeAttribute('disabled');
    }


    _eventListeners__define() {
        this._elements.button_subscribe.addEventListener('pointerdown', this._button_subscribe__on_pointerDown.bind(this));
        this._elements.button_control.addEventListener('pointerdown', this._button_control__on_pointerDown.bind(this));
    }


    static {
        this.define();
    }

    _init() {
        this.refresh();
    }


    refresh() {
        let url_image = new URL(`${this.paint}.png`, import.meta.url);
        this._elements.image.setAttribute('src', url_image);

        if (this.fullfill) {
            this._elements.bonus.removeAttribute('disabled');
        }
    }
}
