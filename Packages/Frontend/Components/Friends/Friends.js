import {Component} from '../../Api/Components/Component/Component.js';

import {Copying} from '../Copying/Copying.js'
import {Table} from '../Table/Table.js'


export class Friends extends Component {
    static _attributes = {
        ...super._attributes,

        link_ref: '',
        count_ref: 0,
    };

    static _components = [Table];

    static _elements = {
        copying: '',
        table: '',
    }


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    get count_ref() {
        return this._attributes.count_ref;
    }
    set count_ref(count_ref) {
        this._attribute__set('count_ref', +count_ref);
    }

    get link_ref() {
        return this._attributes.link_ref;
    }
    set link_ref(link_ref) {
        this._attribute__set('link_ref', link_ref);
        this._elements.copying.text_copy = link_ref;
    }

    // get referals() {
    //     return this._elements.table.pages_records;
    // }
    // set referals(referals) {
    //     this._elements.table.pages_records = referals;
    //     this._elements.table.refresh();
    // }


    // async _get__referals() {
    //     let tg_id = this._telegram?.initDataUnsafe?.user?.id;
    //     let is__time_requests = (Date.now() - this._time_last_request) > this.limit_time__requests;

    //     if (!tg_id || !is__time_requests) return;

    //     this._referals = await this._rest.call('get__referals', tg_id);

    // }

    _init() {
        this.props__sync();
    }


    referals__add() {
        this._elements.table.pages_records = [
            {
                "avatar_url": "./logo.jpg",
                "leval": "2",
                "name": "User User",
                "bonus": "200 золота",
                "profit": "1"
            },
            {
                "avatar_url": "#",
                "leval": "3",
                "name": "2",
                "bonus": "bonus",
                "profit": "1"
            },
            {
                "avatar_url": "#",
                "leval": "4",
                "name": "3",
                "bonus": "bonus",
                "profit": "1"
            },
            {
                "avatar_url": "#",
                "leval": "5",
                "name": "4",
                "bonus": "bonus",
                "profit": "1"
            },
            {
                "avatar_url": "#",
                "leval": "6",
                "name": "5",
                "bonus": "bonus",
                "profit": "1"
            }
        ];
        this._elements.table.refresh();
    }

    refresh() {
        // this._elements.table.refresh();
        this.referals__add();
    }
}
