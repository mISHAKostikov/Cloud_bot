import {Component} from '../../Api/Components/Component/Component.js';


export class Timer extends Component {
    static _attributes = {
        ...super._attributes,

        _progress: 100,
        _velocity_animation: 0,
        timer_duration: {
            default: 1e3,
            range: [0, Infinity],
        },
    }

    static _elements = {
        root: '',
        time_value: '',
    }


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    _date_stop = 0;
    _remains_storage = '';
    _timer_id__pie_animation = 0;
    _timer_id__render = 0;



    get _remains() {
        return this._remains_storage;
    }
    set _remains(remains) {
        this._elements.time_value.textContent = remains;
        this._remains_storage = remains;
    }

    get timer_duration() {
        return this._attributes.timer_duration;
    }
    set timer_duration(timer_duration) {
        this._attribute__set('timer_duration', +timer_duration);
        this._clear();
    }


    get _progress() {
        return this._attributes._progress;
    }
    set _progress(progress) {
        this._attribute__set('_progress', progress);
        this._elements.root.style.setProperty('--_progress', progress);
    }

    get _velocity_animation() {
        return this._attributes._velocity_animation;
    }
    set _velocity_animation(_velocity_animation) {
        this._attribute__set('_velocity_animation', +_velocity_animation);
    }


    _clear() {
        this._progress = 100;
        this._remains = this._get_format_time(new Date(this.timer_duration));
    }

    _init() {
        this.props__sync();
    }

    _pie__animation() {
        this._progress--;

        if (this._progress == 0) {
            this.stop();

            return;
        }

        this._timer_id__pie_animation = setTimeout(this._pie__animation.bind(this), this._velocity_animation);
    }

    _get_format_time(time) {
        let minutes = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
        let seconds = time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`;
        let milliseconds = Math.trunc(time.getMilliseconds() / 10);
        milliseconds = milliseconds > 9 ? milliseconds : `0${milliseconds}`;

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    _render() {
        let date_now = Date.now()
        this._remains = this._get_format_time(new Date(this._date_stop - date_now));

        if (date_now >= this._date_stop) {
            this.stop();

            return;
        }

        this._timer_id__render = setTimeout(this._render.bind(this), 10);
    }


    start() {
        this._clear();
        this._date_stop = Date.now() + this.timer_duration;
        this._render();
        this._velocity_animation = this.timer_duration / 110;
        this._pie__animation();
    }

    stop() {
        // this._clear();
        this._remains = this._get_format_time(new Date(0))
        this._progress = 0;
        clearTimeout(this._timer_id__pie_animation);
        clearTimeout(this._timer_id__render);
    }
}
