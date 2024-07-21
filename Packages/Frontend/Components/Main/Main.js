import {Component} from '../../Api/Components/Component/Component.js';


export class Main extends Component {
    static _attributes = {
        ...super._attributes,

        avatar_url: 'https://cdn1.ozone.ru/s3/multimedia-9/6255709557.jpg',
        button_active_subscribe_title: 'Активировать',
        leval: {
            default: '1',
            range: [1, Infinity]
        },
        time_active_subscribe: {
            default: '0',
            range: [0, Infinity]
        },
    };

    static _elements = {
        avatar: '',
        button_active_subscribe: '',
        button_leval: '',
        leval_current: '',
        time_active_subscribe: '',
    };

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static resources = {
        leval: new URL(`${this.name}.svg#leval`, import.meta.url),
    };

    static {
        this.define();
    }


    get avatar_url() {
        return this._attributes.avatar_url;
    }
    set avatar_url(avatar_url) {
        this.attribute__set('avatar_url', avatar_url);
        this._elements.avatar.setAttribute('src', avatar_url);
    }

    get button_active_subscribe_title() {
        return this._attributes.button_active_subscribe_title;
    }
    set button_active_subscribe_title(button_active_subscribe_title) {
        this.attribute__set('button_active_subscribe_title', button_active_subscribe_title);
        this._elements.button_active_subscribe.textContent = button_active_subscribe_title;
    }

    get leval() {
        return this._attributes.leval;
    }
    set leval(leval) {
        this.attribute__set('leval', leval);
        this._elements.leval_current.textContent = leval;
    }

    get time_active_subscribe() {
        return this._attributes.time_active_subscribe;
    }
    set time_active_subscribe(time_active_subscribe) {
        this.attribute__set('time_active_subscribe', time_active_subscribe);

        let date = new Date(time_active_subscribe);

        this._elements.time_active_subscribe.textContent = `
            ${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}
        `;
    }


    _button_active_subscribe__on_pointerDown() {
        let detail = {
            context: this.button_active_subscribe_title,
        };

        this.event__dispatch('buttonActiveSubscribe__click', detail);
    }

    _button_leval__on_pointerDown() {
        this.event__dispatch('buttonLeval__click');
    }

    _eventListeners__define() {
        this._elements.button_active_subscribe.addEventListener('pointerdown', this._button_active_subscribe__on_pointerDown.bind(this));
        this._elements.button_leval.addEventListener('pointerdown', this._button_leval__on_pointerDown.bind(this));
    }

    _init() {
        this.props__sync();
    }
}
