import {Component} from '../../Api/Components/Component/Component.js';
import {Flickable} from '../../Api/Components/Flickable/Flickable.js'

import {Copying} from '../Copying/Copying.js'
import {Table} from '../Table/Table.js'


export class Friends extends Component {
    static _attributes = {
        ...super._attributes,

        link_ref: '',
        count_ref: 0,
    };

    static _components = [Flickable, Table];

    static _elements = {
        copying: '',
        table: '',
        display: '',
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
        this._attribute__set('count_ref', count_ref);
        this._elements.table.count_all_entries = +count_ref;
    }

    get link_ref() {
        return this._attributes.link_ref;
    }
    set link_ref(link_ref) {
        this._attribute__set('link_ref', link_ref);
        this._elements.copying.text_copy = link_ref;
    }


    _eventListeners__define() {
        this._elements.table.addEventListener('data__update', this._table__on_data__update.bind(this));
        window.addEventListener('resize', this._window__on_resize.bind(this));
    }

    _init() {
        this._elements.table.count_rows_page = 10;
        // this._elements.table.count_rows_page = 1;
        this.props__sync();
    }

    _table__on_data__update() {
        this._elements.display.refresh();
    }

    _window__on_resize() {
        this._elements.display.refresh();
    }


    async refresh() {
        await this._elements.table.refresh();
        this._elements.table.title = 'Друзья ' + (this.count_ref || '');

        setTimeout(this._elements.display.refresh.bind(this._elements.display), 3e3);
    }
}
