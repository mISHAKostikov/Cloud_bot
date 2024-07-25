import {Component} from '../../Api/Components/Component/Component.js';
import {Leafable} from '../../Api/Components/Leafable/Leafable.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';
import {Telegram} from '../../Api/Units/Telegram/Telegram.js';

import {Bonus} from '../Bonus/Bonus.js';
import {Footer} from '../Footer/Footer.js';
import {Friends} from '../Friends/Friends.js';
import {Header} from '../Header/Header.js';
import {Main} from '../Main/Main.js';
import {Quests} from '../Quests/Quests.js';
import {Pay} from '../Pay/Pay.js';


export class Root extends Component {
    static _attributes = {
        ...super._attributes,

        _time_last_request: 0,

        limit_time__requests: 5e3,
        verticalSwipes: true,
    };

    static _elements = {
        footer: '',
        friends: '',
        header: '',
        leafable: '',
        main: '',
        root: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    _page_num = 0;
    _rest = new Rest(`https://192.168.0.100/Apps/Cloud_bot/Packages/Backend/Manager/Manager.php`);
    // _rest = new Rest(`https://mmnds.store`);
    _telegram = null;
    _user = {};


    get _time_last_request() {
        return this._attributes._time_last_request;
    }
    set _time_last_request(time_last_request) {
        this.attribute__set('_time_last_request', time_last_request);
    }


    get limit_time__requests() {
        return this.attributes.limit_time__requests;
    }
    set limit_time__requests(limit_time__requests) {
        this.attribute__set('limit_time__requests', limit_time__requests);
    }

    get verticalSwipes() {
        return this._attributes.verticalSwipes;
    }
    set verticalSwipes(value) {
        if (value) {
            Telegram.verticalSwipes__enable();
        }
        else {
            Telegram.verticalSwipes__disable();
        }

        this.attribute__set('verticalSwipes', !!value);
    }


    _eventListeners__define() {
        this._elements.footer.addEventListener('button_active__toggle', this._footer__on_button_active__toggle.bind(this));
        // this._elements.leafable.addEventListener('animation_end', this._leafable__on_animation_end.bind(this));
        // this._elements.header.addEventListener('airdrop__click', (event) => {console.log(event.target)});
         this._elements.main.addEventListener('buttonActiveSubscribe__click', this._main_on__buttonActiveSubscribe__click.bind(this));
        // this._elements.main.addEventListener('buttonLeval__click', (event) => {console.log(event.target)});
    }

    _footer__on_button_active__toggle(event) {
        this._page_num = event.detail.page_num;
        this._elements.leafable.index = this._page_num;

        this._elements.leafable.children[this._page_num].refresh();
        this._user_info__state();
    }

    _init() {
        // this._telegram = window.Telegram.WebApp;
        this.props__sync('verticalSwipes', '_time_last_request', 'limit_time__requests');
        this._user_info__state();
    }

    _leafable__on_animation_end() {
        this._elements.footer.button_active__set(this._page_num);
    }

    _main_on__buttonActiveSubscribe__click() {
        let pay = new Pay();
        this._elements.root.append(pay);
        pay.counter_range = [0, 12];
        pay.text = 'Здесь ты можешь купить автоматическое начисление бонусов! Выбери количество месяцев, которое будет действовать подписка и нажми оплатить. Для оплаты используется кошелёк MetaMask.'
    }

    async _user_info__state() {
        let tg_id = null;
        let is__time_requests = (Date.now() - this._time_last_request) > this.limit_time__requests;

        if (!tg_id || !is__time_requests) return;

        this._user = await this._rest.call('state', tg_id);
        this._time_last_request = Date.now();
    }
}
