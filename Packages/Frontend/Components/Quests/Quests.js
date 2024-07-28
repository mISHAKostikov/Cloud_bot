import {Component} from '../../Api/Components/Component/Component.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';

import {Subscribe} from '../Subscribe/Subscribe.js';


export class Quests extends Component {
    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static _elements = {
        twitter_id: '',
        subscribe: '',
        root: '',
    }

    static {
        this.define();
    }

    _rest = new Rest('https://localhost/Work/Cloud_bot/Packages/Backend/Manager/Manager.php');
    _subscribes = [];


    _twitter_id__before_input(event) {
        if (isNaN(event.data) || event.data === ' ') {
            alert('ID должен быть числом');
            event.preventDefault();
        }

        // console.log(event.data);
        // console.log(event.data);
        //this._elements.twitter_id.value += event.data;
    }

    async _twitter_subscribe_check(event) {
        let event_target = event.target;

        console.log(this._elements.twitter_id.value);

        if (this._elements.twitter_id.value != '') {
            let {error, result} = await this._rest.call('twitter_subscribe__check', event_target.url, this._elements.twitter_id.value);

            if (error || !result) return;

            // console.log(event, event.target);
            event_target._elements.button_control.setAttribute('disabled', true);
            event_target.fullfill = true;
            //console.log(this._elements.button_control);
            event_target._elements.bonus.removeAttribute('disabled');
        }
        else {
            alert('Введи Twitter ID');
            return;
        }
    }

    _eventListeners__define() {
        this._elements.twitter_id.addEventListener('beforeinput', this._twitter_id__before_input.bind(this));
        this._elements.root.addEventListener('twitter_subscribe_check', this._twitter_subscribe_check.bind(this));
    }

    _init() {
        this._subscribes = this._elements.root.querySelectorAll('.subscribe');
    }


    data__apply(...args) {
        for (let i = 0; i < this._subscribes.lenght; i++) {
            this._subscribes[i].fullfill = args[i];
        }
    }

    refresh() {}
}
