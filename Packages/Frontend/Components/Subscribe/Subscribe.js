import {Component} from '../../Api/Components/Component/Component.js';
import {Telegram} from '../../Api/Units/Telegram/Telegram.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';


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


    _rest = new Rest('https://localhost/Work/Cloud_bot/Packages/Backend/Manager/Manager.php');

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
        if (this.paint=='tg') {
            Telegram.telegram_link__open(this.url);
        }
        else {
            Telegram.other_link__open(this.url);
        }

        if (this.fullfill) return;

        this._elements.button_control.removeAttribute('disabled');
    }

    async _button_control__on_pointerDown() {
        if (this.paint=='tg') {
            let {error, result} = await this._rest.call('tg_subscribe__check', this.url, Telegram.user.id);

            if (error || !result) return;

            this._elements.button_control.setAttribute('disabled', true);
            this.fullfill = true;
            //console.log(this._elements.button_control);
            this._elements.bonus.removeAttribute('disabled');
        }
        else {
            this.event__dispatch('twitter_subscribe_check');
        }
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
