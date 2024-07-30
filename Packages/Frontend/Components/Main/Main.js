import {Component} from '../../Api/Components/Component/Component.js';
import {Renderer} from '../../Api/Units/Renderer_new/Renderer.js';


export class Main extends Component {
    static _attributes = {
        ...super._attributes,

        avatar_url: '',
        button_active_subscribe_title: 'Активировать',
        level: {
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
        button_level: '',
        level_current: '',
        time_active_subscribe: '',
    };

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static resources = {
        level: new URL(`${this.name}.svg#level`, import.meta.url),
    };

    static {
        this.define();
    }


    _renderer = new Renderer({render: this._render.bind(this)});


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

    get level() {
        return this._attributes.level;
    }
    set level(level) {
        this.attribute__set('level', level);
        this._elements.level_current.textContent = level;
    }

    get time_active_subscribe() {
        return this._attributes.time_active_subscribe;
    }
    set time_active_subscribe(time_active_subscribe) {
        this._attribute__set('time_active_subscribe', time_active_subscribe);

        if (this.time_active_subscribe - (Date.now() / 1e3) < 0) return;

        this._renderer.start();
    }


    _button_active_subscribe__on_pointerDown() {
        let detail = {
            context: this.button_active_subscribe_title,
        };

        this.event__dispatch('buttonActiveSubscribe__click', detail);
    }

    _button_level__on_pointerDown() {
        this.event__dispatch('buttonLevel__click');
    }

    _eventListeners__define() {
        this._elements.button_active_subscribe.addEventListener('pointerdown', this._button_active_subscribe__on_pointerDown.bind(this));
        this._elements.button_level.addEventListener('pointerdown', this._button_level__on_pointerDown.bind(this));
    }

    _init() {
        this.props__sync();
    }

    _render() {
        let time = new Date(this.time_active_subscribe * 1e3 - Date.now());
        let days = Math.floor(time / (1e3 * 60 * 60 * 24));
        let hours = Math.floor((time % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60));
        let minutes = Math.floor((time % (1e3 * 60 * 60)) / (1e3 * 60));

        days = days > 9 ? days : `0${days}`;
        hours = hours > 9 ? hours : `0${hours}`;
        minutes = minutes > 9 ? minutes : `0${minutes}`;

        this._elements.time_active_subscribe.textContent = `${days}:${hours}:${minutes}`;
    }

    refresh() {}
}
