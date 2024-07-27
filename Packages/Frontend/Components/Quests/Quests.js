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
    }

    static {
        this.define();
    }

    _rest = new Rest('https://localhost/Work/Cloud_bot/Packages/Backend/Manager/Manager.php');


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
        if (this._elements.twitter_id.value != '') {
            let check_result = await this._rest.call('twitter_subscribe__check', event.data.url, this._elements.twitter_id.value);

            if (!check_result) return;

            event.data._elements.button_control.setAttribute('disabled', true);
            event.data.fullfill = true;
            //console.log(this._elements.button_control);
            event.data._elements.bonus.removeAttribute('disabled');
        }
        else {
            alert('Введи Twitter ID')
            return;
        }
    }

    _eventListeners__define() {
        this._elements.twitter_id.addEventListener('beforeinput', this._twitter_id__before_input.bind(this));
        this._elements.subscribe.addEventListener('twitter_subscribe_check', this._twitter_subscribe_check.bind(this));
    }

    refresh() {}
}
