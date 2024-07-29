import {Component} from '../../Api/Components/Component/Component.js';
import {Leafable} from '../../Api/Components/Leafable/Leafable.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';
import {Telegram} from '../../Api/Units/Telegram/Telegram.js';

import {Bonus} from '../Bonus/Bonus.js';
import {Footer} from '../Footer/Footer.js';
import {Friends} from '../Friends/Friends.js';
import {Header} from '../Header/Header.js';
import {Main} from '../Main/Main.js';
import {Pay} from '../Pay/Pay.js';
import {Quests} from '../Quests/Quests.js';


export class Root extends Component {
    static _attributes = {
        ...super._attributes,

        _time_last_request: 0,

        limit_time__requests: {
            default: 6e4,
            persistent: true,
            range: [0, Infinity],
        },
        verticalSwipes: true,
    };

    static _elements = {
        bonus: '',
        footer: '',
        friends: '',
        header: '',
        leafable: '',
        main: '',
        quests: '',
        root: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    _page_num = 0;
    _rest = new Rest(`https://192.168.0.100/Apps/Cloud_bot/Packages/Backend/Manager/Manager`);
    // _rest = new Rest(`https://localhost/Work/Cloud_bot/Packages/Backend/Manager/Manager.php`);
    // _rest = new Rest(`https://mmnds.store`);
    _telegram = null;
    _user = {};
    // _user_telegram_id = 509815216;
    _user_telegram_id = Telegram.user?.id || 1316897349;


    get _time_last_request() {
        return this._attributes._time_last_request;
    }
    set _time_last_request(time_last_request) {
        this._attribute__set('_time_last_request', time_last_request);
    }


    get limit_time__requests() {
        return this._attributes.limit_time__requests;
    }
    set limit_time__requests(limit_time__requests) {
        this._attribute__set('limit_time__requests', limit_time__requests);
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


    async _bonus__on_everydayBonuse__selected() {
        let {result} = await this._rest.call('everydayBonus__take', this._user_telegram_id);

        if (!result) return;

        await this._user_data__get();
        this._user_data__apply();
    }

    async _bonus__on_passive_bonuse__take() {
        let {result} = await this._rest.call('passive_bonus__add', this._user_telegram_id);

        if (!result) return;

        await this._user_data__get();
        this._user_data__apply();
    }

    _eventListeners__define() {
        this._elements.main.addEventListener('buttonActiveSubscribe__click', this._main_on__buttonActiveSubscribe__click.bind(this));
        this._elements.bonus.addEventListener('everydayBonuse__selected', this._bonus__on_everydayBonuse__selected.bind(this));
        this._elements.bonus.addEventListener('passive_bonuse__take', this._bonus__on_passive_bonuse__take.bind(this));
        this._elements.footer.addEventListener('button_active__toggle', this._footer__on_button_active__toggle.bind(this));
        // this._elements.header.addEventListener('airdrop__click', (event) => {console.log(event.target)});
        this._elements.leafable.addEventListener('animation_end', this._leafable__on_animation_end.bind(this));
        this._elements.main.addEventListener('buttonLeval__click', this._main__on_buttonLeval__click.bind(this));
    }

    _footer__on_button_active__toggle(event) {
        this._page_num = event.detail.page_num;

        if (this._elements.leafable.index != this._page_num) {
            this._elements.footer.busy = true;
        }

        this._elements.leafable.index = this._page_num;
        this._elements.leafable.children[this._page_num].refresh();
        this._user_info__state();
    }

    _init() {
        this.props__sync('verticalSwipes', '_time_last_request', 'limit_time__requests');
        this._user_info__state();
    }

    _leafable__on_animation_end() {
        this._elements.footer.busy = false;
    }

    _main_on__buttonActiveSubscribe__click() {
        let pay = new Pay();

        this._elements.root.append(pay);
        pay.counter_range = [0, 12];
        pay.sum = 0.01;
        pay.type = 'subscribe';
        pay.text = 'Здесь ты можешь купить автоматическое начисление бонусов! Выбери количество месяцев, которое будет действовать подписка и нажми оплатить. Для оплаты используется кошелёк MetaMask. Стоимость подписки на 1 месяц 0.01 ETH'
    }

    _main__on_buttonLeval__click() {
        let pay = new Pay();

        this._elements.root.append(pay);
        pay.counter_range = [0, Infinity];
        pay.sum = 0.005;
        pay.type = 'leval';
        pay.text = 'Здесь ты можешь купить уровень! Выбери количество уровней и нажми оплатить. Для оплаты используется кошелёк MetaMask. Стоимость уровня 0.005 ETH'
    }

    async _user_info__state() {

        let is__time_requests = this._time_last_request ? (Date.now() - this._time_last_request) > this.limit_time__requests : 1;

        if (!is__time_requests) return;

        await this._user_data__get();
        this._user_data__apply();
    }

    async _user_data__get() {
        if (!this._user_telegram_id) return;

        this._time_last_request = Date.now();

        let {result} = await this._rest.call('user__get', this._user_telegram_id);

        if (!result) return;

        this._user = result;
    }

    _user_data__apply() {
        console.log(this._user)
        let is__active_end_date = this._user.active_end_date - (Date.now() / 1e3) > 0;

        this._elements.bonus.profit = `+ ${this._user.leval} золота`;

        if (
            this._user.count_day_registration == this._user.everyday_bonus_current ||
            this._user.count_day_registration > 11
        ) {
            this._elements.bonus.everydayBonuse = -1;
            console.log(1)
        }
        else {
            this._elements.bonus.everydayBonuse = this._user.count_day_registration
        }

        this._elements.friends.link_ref = `https://t.me/testmmn_bot?start=${this._user_telegram_id}_${Telegram.user?.username}`;
        this._elements.friends.count_ref = this._user.count_referrals;
        // this._elements.friends.refresh();

        this._elements.header.auto_velocity = this._user.leval;
        this._elements.header.balanse_value__cost = 1000;
        this._elements.header.balanse_value__gold = this._user.passive_bonuses_balanse;
        this._elements.header.balanse_value__rate = 0.04;
        this._elements.header.balanse_value__tokens = this._user.active_bonuses_balanse;
        this._elements.header.bonus_ref = this._user.bonus_referrals ?? 0;
        this._elements.header.refresh(is__active_end_date);

        this._elements.main.avatar_url = this._user.avatar_url || '';
        this._elements.main.button_active_subscribe_title = is__active_end_date ? 'Продлить' : 'Активировать';
        this._elements.main.leval = this._user.leval;
        this._elements.main.time_active_subscribe = this._user.active_end_date;

        this._elements.quests.data__apply(this._user.quest_telegram, this._user.quest_twitter);
    }
}
