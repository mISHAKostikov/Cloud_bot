import {Component} from '../../Api/Components/Component/Component.js';
import {Repeater} from '../../Api/Components/Repeater/Repeater.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';
import {Telegram} from '../../Api/Units/Telegram/Telegram.js';

import {TableRow} from '../TableRow/TableRow.js';


export class Table extends Component {
    static _attributes = {
        ...super._attributes,

        _busy: false,
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
            persistent: true,
            range: [1, Infinity],
        },
        count_all_entries: {
            default: 1,
            persistent: true,
            range: [1, Infinity],
        },
        page: {
            default: 0,
            persistent: true,
            range: [0, Infinity],
        },
        title: '',
    };

    static _components = [Repeater, TableRow];

    static _elements = {
        button_next: '',
        button_prev: '',
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
            this._item.level = this._model_item.level;
            this._item.name = `${this._model_item.first_name ?? ''} ${this._model_item.last_name ?? ''}`;
            this._item.bonus = this._model_item.payment;
            this._item.profit = this._model_item.bonus;
        }

        init() {
            this.data__apply();
        }
    };

    static {
        this.define();
    }


    _rest = new Rest(new URL(`Packages/Backend/Manager/Manager`, location));
    // _user_telegram_id = 509815216;
    _user_telegram_id = Telegram.user?.id;


    pages_records = [];


    get _busy() {
        return this._attributes._busy;
    }
    set _busy(busy) {
        this._attribute__set('_busy', busy);

        // if (!busy) {
        //     this._page__refresh();
        // }
    }

    get _count_visible_entries() {
        return this._attributes._count_visible_entries;
    }
    set _count_visible_entries(count_visible_entries) {
        this._attribute__set('_count_visible_entries', +count_visible_entries);
    }

    get _count_current_entries() {
        // this._count_current_entries = this.pages_records.length;

        return this._attributes._count_current_entries;
    }
    set _count_current_entries(count_current_entries) {
        this._attribute__set('_count_current_entries', +count_current_entries);
    }

    get _count_pages() {
        this._count_pages = Math.ceil(this.count_all_entries / this.count_rows_page);

        return this._attributes._count_pages;
    }
    set _count_pages(count_pages) {
        this._attribute__set('_count_pages', count_pages);
    }


    get count_all_entries() {
        return this._attributes.count_all_entries;
    }
    set count_all_entries(count_all_entries) {
        count_all_entries = Math.max(count_all_entries, this._count_current_entries);

        this._attribute__set('count_all_entries', count_all_entries);
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
        // window.addEventListener('resize', this._window__on_resize.bind(this));
        this._elements.button_next.addEventListener('pointerdown', this._button_next__on_pointerDown.bind(this));
        this._elements.button_prev.addEventListener('pointerdown', this._button_prev__on_pointerDown.bind(this));
    }

    async _init() {
        this._elements.repeater.Manager = this.constructor.Repeater_manager;
        this.props__sync('_count_current_entries', 'count_all_entries', 'count_rows_page', 'title');

        this.refresh();
    }

    _repeater__on_add() {
        this.event__dispatch('data__update');
    }

    async _referrals__load(index_slice_start) {
        let {result} = await this._rest.call('referrals__get', this._user_telegram_id, index_slice_start);

        if (!result) return;

        this._count_current_entries = result.length;
        this._elements.repeater.model.add(result);
        // this.pages_records.push(...result);
    }

    async _page__refresh() {
        if (this.count_all_entries == this._count_current_entries) return;

        let index_slice_end = Math.min((this.page + 1) * this.count_rows_page, this._count_current_entries);
        let index_slice_start = this.page * this.count_rows_page;
        let records_current = this.pages_records.slice(index_slice_start, index_slice_end);

        // if (
        //     records_current.length < this.count_rows_page &&
        //     this.count_all_entries > this._count_current_entries &&
        //     !this._busy
        // ) {
        //     this._busy = true;
        //     await this._referrals__load(index_slice_start);
        //     // return;
        //     this._busy = false;
        //     records_current = this.pages_records.slice(index_slice_start, index_slice_end);
        // }

        this.clear();

        // if (!records_current.length) return;

        // this._elements.repeater.model.add(records_current);

        if (this._busy) return;

        this._busy = true;
        await this._referrals__load(index_slice_start);
        this._busy = false;

        this._count_visible_entries = index_slice_end;
    }


    clear() {
        this._elements.repeater.model.clear();
    }

    refresh() {
        this._page__refresh();
        this._control_button__visibiliyy_toggle();
    }
}
