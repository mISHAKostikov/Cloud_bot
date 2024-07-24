import {Component} from '../../Api/Components/Component/Component.js';


export class Footer extends Component {
    static _attributes = {
        ...super._attributes,

        button_active: {
            default: 0,
            range: [0, 3],
        },
    };

    static _elements = {
        root: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    _buttons = [];


    get button_active() {
        return this._attributes.button_active;
    }
    set button_active(index) {
        this.attribute__set('button_active', index);
        this._button_active__toggle(index);
    }


    // static resources = {
    //     bounus: new URL(`${this.name}.svg#bonus`, import.meta.url),
    //     friend: new URL(`${this.name}.svg#friend`, import.meta.url),
    //     home: new URL(`${this.name}.svg#home`, import.meta.url),
    //     quest: new URL(`${this.name}.svg#quest`, import.meta.url),
    // };

    static {
        this.define();
    }


    _button_active__toggle(index_active) {
        let butten_active_current = this._buttons.find((item) => item.hasAttribute('_active'));
        butten_active_current?.removeAttribute('_active');
        // this.button_active__set(+index_active);

        let detail = {
            page_num: +index_active,
        };

        this.event__dispatch('button_active__toggle', detail);
    }


    _eventListeners__define() {
        this._elements.root.addEventListener('pointerdown', this._root__on_pointerDown.bind(this));
    }

    _init() {
        this._buttons = Array.from(this._elements.root.querySelectorAll('.button'));
        this.props__sync('button_active');
    }

    _root__on_pointerDown(event) {
        let path = this.constructor.path__get(event.target, this._elements._root);
        let butten_current = path.find((item) => item.classList.contains('button'));

        if (!butten_current) return;

        this.button_active = butten_current.getAttribute('page_num');
    }


    button_active__set(num) {
        this._buttons[+num].setAttribute('_active', true);
    }
}
