import {Component} from '../../Api/Components/Component/Component.js';

import {Captcha} from '../Captcha/Captcha.js'
import {EverydayBonuse} from '../EverydayBonuse/EverydayBonuse.js'
import {Timer} from '../Timer/Timer.js'


export class Bonus extends Component {
    static _attributes = {
        ...super._attributes,

        everydayBonuse: 0,
        profit: '',
    }
    static _components = [Captcha, Timer, EverydayBonuse];

    static _elements = {
        button_collect_everyday_bonuse: '',
        button_collect_pasive_bonuse: '',
        everydayBonuse: '',
        root: '',
        timer: '',
    }

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }

    static resources = {
        everyday_box: new URL(`${this.name}.svg#everyday_box`, import.meta.url),
    };


    get profit() {
        return this._attributes.profit;
    }
    set profit(profit) {
        this._attribute__set('profit', profit);
        this._elements.timer.text = this.profit;
    }

    get everydayBonuse() {
        return this._attributes.everydayBonuse;
    }
    set everydayBonuse(everydayBonuse) {
        this._attribute__set('everydayBonuse', everydayBonuse);

        // if (everydayBonuse == -1) return;

        this._elements.everydayBonuse.active_bonuse__set(everydayBonuse)
    }


    async _button_collect_everyday_bonuse__on_pointerDown() {
        this._elements.everydayBonuse.active = true;
    }

    _button_collect_pasive_bonuse__on_pointerDown() {
        if (this._elements.button_collect_pasive_bonuse.hasAttribute('disabled')) return

        let captcha = new Captcha();

        captcha.classList.add('captcha');
        captcha.addEventListener('answer__false', this._captcha__on_answer__false.bind(this));
        captcha.addEventListener('answer__true', this._captcha__on_answer__true.bind(this));
        // captcha.addEventListener('delete', this._captcha__on_delete.bind(this));

        this._elements.root.append(captcha);
        // this._elements.button_collect_pasive_bonuse.setAttribute('disabled', true);
    }

    _captcha__on_answer__false(event) {
        event.target.refresh();
    }

    _captcha__on_answer__true(event) {
        event.target.delete();
        this.event__dispatch('passive_bonuse__take');
        this._elements.button_collect_pasive_bonuse.setAttribute('disabled', true);
        this._elements.timer.start();
    }

    // _captcha__on_delete(event) {
    //     event.target.close();
    // }

    _eventListeners__define() {
        this._elements.button_collect_pasive_bonuse.addEventListener('pointerdown', this._button_collect_pasive_bonuse__on_pointerDown.bind(this));
        this._elements.button_collect_everyday_bonuse.addEventListener('pointerdown', this._button_collect_everyday_bonuse__on_pointerDown.bind(this));
        this._elements.timer.addEventListener('stop', this._timer_on_stop.bind(this));
        this._elements.everydayBonuse.addEventListener('bonuse__click', this._everydayBonuse_on_bonuse__click.bind(this));
    }

    _everydayBonuse_on_bonuse__click() {
        this.event__dispatch('everydayBonuse__selected');
    }

    _init() {
        this._elements.timer.duration = 6e4;

        this.props__sync('profit');
        this.profit = 6e4;
        this.refresh();
    }

    _timer_on_stop() {
        this._elements.button_collect_pasive_bonuse.removeAttribute('disabled');
    }


    refresh() {
        if (this._elements.button_collect_pasive_bonuse.hasAttribute('disabled')) {
            this._elements.timer.start();
        }
    }
}
