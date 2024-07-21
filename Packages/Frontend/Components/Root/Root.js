import {Component} from '../../Api/Components/Component/Component.js';
import {Leafable} from '../../Api/Components/Leafable/Leafable.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';

import {Bonus} from '../Bonus/Bonus.js';
import {Footer} from '../Footer/Footer.js';
import {Friends} from '../Friends/Friends.js';
import {Main} from '../Main/Main.js';
import {Quests} from '../Quests/Quests.js';


export class Root extends Component {
    static _attributes = {
        ...super._attributes,

        verticalSwipes: true,
    };

    static _elements = {
        footer: '',
        leafable: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static resources = {
        airdrop: new URL(`${this.name}.svg#airdrop`, import.meta.url),
    };

    static {
        this.define();
    }


    _rest = new Rest(`https://mmnds.store`);
    _telegram = null;


    get verticalSwipes() {
        return this._attributes.verticalSwipes;
    }
    set verticalSwipes(value) {
        if (value) {
            this._telegram.enableVerticalSwipes();
        }
        else {
            this._telegram.disableVerticalSwipes();
        }

        this.attribute__set('verticalSwipes', !!value);
    }


    _eventListeners__define() {
        this._elements.footer.addEventListener('button_active__toggle', this._footer__on_button_active__toggle.bind(this));
    }

    _init() {
        this._telegram = window.Telegram.WebApp;
        this.props__sync('verticalSwipes');
    }

    _footer__on_button_active__toggle(event) {
        this._elements.leafable.index = event.detail.page_num;
    }
}
