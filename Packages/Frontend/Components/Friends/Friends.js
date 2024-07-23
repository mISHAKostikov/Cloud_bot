import {Component} from '../../Api/Components/Component/Component.js';

import {Copying} from '../Copying/Copying.js'
import {Table} from '../Table/Table.js'


export class Friends extends Component {
    static _components = [Table];

    static _elements = {
        table: '',
    }


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    _init() {
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

        this._elements.table.count_rows_page = 3;
        this._elements.table.refresh();
    }

    refresh() {
        this._elements.table.refresh();
    }
}
