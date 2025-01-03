import {Component} from '../../Api/Components/Component/Component.js';
// import {Repeater} from '../../Api/Components/Repeater/Repeater.js';
// import {Flickable} from '../../Api/Components/Flickable/Flickable.js'


export class EverydayBonuse extends Component {
    static _attributes = {
        ...super._attributes,

        active: false,
        animation: false,
    };

    // static _components = [Repeater, Flickable];

    static _elements = {
        button_close: '',
        root: '',
        // display: '',
        // repeater: '',
    }

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }

    // static Repeater_manager = class extends Repeater.Manager {
    //     data__apply() {
    //         this._item.active = this._model_item.active;
    //         this._item.bonus = this._model_item.bonus;
    //         this._item.day = this._model_item.day;
    //     }

    //     init() {
    //         this.data__apply();
    //     }
    // };

    static resources = {
        cross: new URL(`${this.name}.svg#cross`, import.meta.url),
        bonus: new URL(`${this.name}.svg#bonus`, import.meta.url),
    };


    _bonuses = [];


    get active() {
        return this._attributes.active;
    }
    set active(active) {
        this.animation = true;

        if (active) {
            this.hidden = false
        };

        this._attribute__set('active', active);

        if (!active) {
            setTimeout(() => this.hidden = true, 5e2)
        }
    }

    get animation() {
        return this._attributes.animation;
    }
    set animation(animation) {
        this._attribute__set('animation', animation);
    }

    get hidden() {
        return this._attributes.hidden;
    }
    set hidden(hidden) {
        this._attribute__set('hidden', hidden);
    }


    _button_close__on_pointerDown() {
        this.delete();
    }

    _eventListeners__define() {
        this._elements.button_close.addEventListener('pointerdown', this._button_close__on_pointerDown.bind(this));
        this._elements.root.addEventListener('pointerdown', this._root__on_pointerDown.bind(this));
        // this._elements.repeater.eventListeners__add({
        //     add: this._repeater__on_add.bind(this),
        //     define: this._repeater__on_add.bind(this),
        // });
        // window.addEventListener('resize', this._window__on_resize.bind(this));
    }

    _init() {
        this._bonuses = this._elements.root.querySelectorAll('.bonuse');
        // this._elements.repeater.Manager = this.constructor.Repeater_manager;
        // this._elements.repeater.model.add([
        //     {
        //         active: '1',
        //         bonus: '1',
        //         day: '1',
        //     },
        //     {
        //         active: '2',
        //         bonus: '2',
        //         day: '2',
        //     },
        //     {
        //         active: '3',
        //         bonus: '3',
        //         day: '3',
        //     }
        // ]);
    }

    _root__on_pointerDown(event) {
        let path = this.constructor.path__get(event.target, this._elements._root);
        let bonus_current = path.find((item) => item.classList.contains('bonuse'));

        if (!bonus_current || !bonus_current.hasAttribute('active')) return;

        this.event__dispatch('bonuse__click');
    }

    // _repeater__on_add() {
    //     this._elements.display.refresh();
    // }

    // _window__on_resize() {
    //     this._elements.display.refresh();
    // }


    delete() {
        this.active = false;
    }

    active_bonuse__set(index) {
        for (let bonuse of this._bonuses) {
            if (bonuse.hasAttribute('active')) {
                bonuse.removeAttribute('active');
            }
        }

        if (index == -1) return;

        this._bonuses[index].setAttribute('active', true);
    }
}
