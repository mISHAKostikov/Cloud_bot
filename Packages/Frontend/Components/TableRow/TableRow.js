import {Component} from '../../Api/Components/Component/Component.js';


export class TableRow extends Component {
    static _attributes = {
        ...super._attributes,

        avatar_url: '',
        bonus: '',
        leval: {
            default: 1,
            range: [1, Infinity],
        },
        name: '',
        profit: {
            default: 0,
            range: [0, Infinity],
        },
    };

    static _elements = {
        avatar: '',
        bonus: '',
        leval: '',
        user_name: '',
        user_profit: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    get avatar_url() {
        return this._attributes.avatar_url;
    }
    set avatar_url(avatar_url) {
        this._attribute__set('avatar_url', avatar_url);
        this._elements.avatar.setAttribute('src', avatar_url);
    }

    get bonus() {
        return this._attributes.bonus;
    }
    set bonus(bonus) {
        this._attribute__set('bonus', bonus);
        this._elements.bonus.textContent = bonus;
    }

    get leval() {
        return this._attributes.leval;
    }
    set leval(leval) {
        this._attribute__set('leval', +leval);
        this._elements.leval.textContent = leval;
    }

    get name() {
        return this._attributes.name;
    }
    set name(name) {
        this._attribute__set('name', name);
        this._elements.user_name.textContent = name;
    }

    get profit() {
        return this._attributes.profit;
    }
    set profit(profit) {
        this._attribute__set('profit', +profit);
        this._elements.user_profit.textContent = profit;
    }


    _init() {
        this.props__sync();
    }
}
