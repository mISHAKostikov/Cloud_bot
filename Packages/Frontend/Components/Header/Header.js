import {Component} from '../../Api/Components/Component/Component.js';


export class Header extends Component {
    static _attributes = {
        ...super._attributes,

        auto_velocity: {
            default: 0,
            range: [0, Infinity],
        },
        balanse_value__cost: {
            default: 0,
            range: [0, Infinity],
        },
        balanse_value__gold: {
            default: 0,
            range: [0, Infinity],
        },
        balanse_value__rate: {
            default: 0,
            range: [0, Infinity],
        },
        balanse_value__tokens: {
            default: 0,
            range: [0, Infinity],
        },
        bonus_ref: {
            default: 0,
            range: [0, Infinity],
        },
    };

    static _elements = {
        airdrop: '',
        auto_velocity: '',
        balanse_value__cost: '',
        balanse_value__gold: '',
        balanse_value__rate: '',
        balanse_value__tokens: '',
        bonus_ref: '',
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


    get auto_velocity() {
        return this._attributes.auto_velocity;
    }
    set auto_velocity(auto_velocity) {
        this.attribute__set('auto_velocity', auto_velocity);
        this._elements.auto_velocity.textContent = auto_velocity;
    }

    get balanse_value__cost() {
        return this._attributes.balanse_value__cost;
    }
    set balanse_value__cost(balanse_value__cost) {
        this.attribute__set('balanse_value__cost', balanse_value__cost);
        this._elements.balanse_value__cost.textContent = balanse_value__cost;
    }

    get balanse_value__gold() {
        return this._attributes.balanse_value__gold;
    }
    set balanse_value__gold(balanse_value__gold) {
        this.attribute__set('balanse_value__gold', balanse_value__gold);
        this._elements.balanse_value__gold.textContent = balanse_value__gold;
    }

    get balanse_value__rate() {
        return this._attributes.balanse_value__rate;
    }
    set balanse_value__rate(balanse_value__rate) {
        this.attribute__set('balanse_value__rate', balanse_value__rate);
        this._elements.balanse_value__rate.textContent = balanse_value__rate;
    }

    get balanse_value__tokens() {
        return this._attributes.balanse_value__tokens;
    }
    set balanse_value__tokens(balanse_value__tokens) {
        this.attribute__set('balanse_value__tokens', balanse_value__tokens);
        this._elements.balanse_value__tokens.textContent = balanse_value__tokens;
    }

    get bonus_ref() {
        return this._attributes.bonus_ref;
    }
    set bonus_ref(bonus_ref) {
        this.attribute__set('bonus_ref', bonus_ref);
        this._elements.bonus_ref.textContent = bonus_ref;
    }


    _airdrop__on_pointerDown() {
        this.event__dispatch('airdrop__click');
    }

    _eventListeners__define() {
        this._elements.airdrop.addEventListener('pointerdown', this._airdrop__on_pointerDown.bind(this));
    }

    _init() {
        this.props__sync();
    }
}
