import {Component} from '../../Api/Components/Component/Component.js';
import {Flickable} from '../../Api/Components/Flickable/Flickable.js';
import {Repeater} from '../../Api/Components/Repeater/Repeater.js';

import {TableRow} from '../TableRow/TableRow.js';


export class Table extends Component {
    static _attributes = {
        ...super._attributes,

        _count_visible_entries: {
            default: 0,
            range: [0, Infinity],
        },
        _count_pages: {
            default: 1,
            range: [1, Infinity],
        },
        _count_current_entries: {
            default: 0,
            range: [0, Infinity],
        },

        count_rows_page: {
            default: 1,
            range: [1, Infinity],
        },
        page: {
            default: 0,
            range: [0, Infinity],
        },
        title: '',
    };

    static _components = [Flickable, Repeater, TableRow];

    static _elements = {
        button_next: '',
        button_prev: '',
        display: '',
        repeater: '',
        title: '',
    };


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static resources = {
        button_next: new URL(`${this.name}.svg#button_next`, import.meta.url),
        button_prev: new URL(`${this.name}.svg#button_prev`, import.meta.url),
    };

    static Repeater_manager = class extends Repeater.Manager {
        data__apply() {
            this._item.avatar_url = this._model_item.avatar_url;
            this._item.leval = this._model_item.leval;
            this._item.name = this._model_item.name;
            this._item.bonus = this._model_item.bonus;
            this._item.profit = this._model_item.profit;
        }

        init() {
            this.data__apply();
        }
    };

    static {
        this.define();
    }


    pages_records = [];


    get _count_visible_entries() {
        return this._attributes._count_visible_entries;
    }
    set _count_visible_entries(count_current_entries) {
        this._attribute__set('_count_visible_entries', +count_current_entries);
    }

    get _count_current_entries() {
        this._count_current_entries = this.pages_records.length;

        return this._attributes._count_current_entries;
    }
    set _count_current_entries(count_current_entries) {
        this._attribute__set('_count_current_entries', +count_current_entries);
    }

    get _count_pages() {
        this._count_pages = Math.ceil(this._count_current_entries / this.count_rows_page);

        return this._attributes._count_pages;
    }
    set _count_pages(count_pages) {
        this._attribute__set('_count_pages', +count_pages);
    }


    get count_rows_page() {
        return this._attributes.count_rows_page;
    }
    set count_rows_page(count_rows_page) {
        this._attribute__set('count_rows_page', +count_rows_page);
    }

    get page() {
        return this._attributes.page;
    }
    set page(page) {
        this._attribute__set('page', +page);
        this._page__refresh();
        this._control_button__visibiliyy_toggle();
    }

    get title() {
        return this._attributes.title;
    }
    set title(title) {
        this._attribute__set('title', title);
        this._elements.title.textContent = title;
    }


    _button_next__on_pointerDown() {
        if (this.page == (this._count_pages - 1)) return;

        this.page++;
    }

    _button_prev__on_pointerDown() {
        if (this.page == 0) return;

        this.page--;
    }

    _control_button__visibiliyy_toggle() {
        if (this._count_pages == 1) {
            this._elements.button_next.style.visibility = 'hidden';
            this._elements.button_prev.style.visibility = 'hidden';

            return;
        }

        switch (this.page) {
            case (0):
                this._elements.button_prev.style.visibility = 'hidden';
                this._elements.button_next.style.visibility = 'visible';
                break;
            case (this._count_pages - 1):
                this._elements.button_next.style.visibility = 'hidden';
                this._elements.button_prev.style.visibility = 'visible';
                break;
            default:
                this._elements.button_next.style.visibility = 'visible';
                this._elements.button_prev.style.visibility = 'visible';
        }
    }

    _eventListeners__define() {
        this._elements.repeater.eventListeners__add({
            add: this._repeater__on_add.bind(this),
            define: this._repeater__on_add.bind(this),
        });
        window.addEventListener('resize', this._window__on_resize.bind(this));
        this._elements.button_next.addEventListener('pointerdown', this._button_next__on_pointerDown.bind(this));
        this._elements.button_prev.addEventListener('pointerdown', this._button_prev__on_pointerDown.bind(this));
    }

    _init() {
        this._elements.repeater.Manager = this.constructor.Repeater_manager;
        this.props__sync('_count_current_entries', 'count_rows_page', 'page', 'title');
        this.refresh();
        this.title = 'Друзья';
    }


    _repeater__on_add() {
        this._elements.display.refresh();
    }

    _window__on_resize() {
        this._elements.display.refresh();
    }


    // _rows__set() {
    //     this._count_visible_entries = this.data.length;

    //     this._count_page = Math.ceil(this._count_visible_entries / this.count_rows_page);

    //     for (let i = 0; i < this._count_page; i++) {
    //         let delegate = this._template.querySelector('.delegate').cloneNode(true);
    //         let repeater = delegate.querySelector('.repeater');
    //         let index_slice_start = i * this.count_rows_page;
    //         this._index_slice_end = Math.min((i + 1) * this.count_rows_page, this._count_visible_entries);

    //         repeater.Manager = this.constructor.Repeater_manager;
    //         repeater.model.add(this.data.slice(index_slice_start, this._index_slice_end));

    //         this._repeaters.push(repeater);
    //         this._elements.content.append(delegate);
    //     }
    // }

    _page__refresh() {
        let index_slice_end = Math.min((this.page + 1) * this.count_rows_page, this._count_current_entries);
        let index_slice_start = this.page * this.count_rows_page;

        this.clear();
        this._elements.repeater.model.add(this.pages_records.slice(index_slice_start, index_slice_end));
        this._count_visible_entries = index_slice_end;
        this._elements.display.refresh();
    }


    clear() {
        this._elements.repeater.model.clear();
    }

    refresh() {
        this._page__refresh();
        this._control_button__visibiliyy_toggle();
    }

    // rows__add(data) {
    //     this.data.push(...data);
    //     this._count_visible_entries = this.data.length;
    //     let count_page = this._count_page;
    //     this._count_page += Math.ceil(data.length / this.count_rows_page);

    //     for (let i = 0; i < count_page; i++) {
    //         let delegate = this._template.querySelector('.delegate').cloneNode(true);
    //         let repeater = delegate.querySelector('.repeater');
    //         let index_slice_start = i * this.count_rows_page;
    //         this._index_slice_end = Math.min((i + 1) * this.count_rows_page, this._count_visible_entries);

    //         repeater.Manager = this.constructor.Repeater_manager;
    //         repeater.model.add(this.data.slice(index_slice_start, this._index_slice_end));

    //         this._repeaters.push(repeater);
    //         this._elements.content.append(delegate);
    //     }
    // }
}
