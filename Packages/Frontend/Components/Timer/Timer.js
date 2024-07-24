import {Component} from '../../Api/Components/Component/Component.js';
import {Renderer} from '../../Api/Units/Renderer_new/Renderer.js';


export class Timer extends Component {
    static _attributes = {
        ...super._attributes,

        _progress: 1,

        duration: {
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
    // _remains_storage = '';
    _renderer = new Renderer({render: this._render.bind(this)});


    get _progress() {
        return this._attributes._progress;
    }
    set _progress(progress) {
        this._attribute__set('_progress', progress);
        this._elements.root.style.setProperty('--_progress', progress);
    }

    get _remains() {
        return this._elements.time_value.textContent;
        // return this._remains_storage;
    }
    set _remains(remains) {
        this._elements.time_value.textContent = remains;
        // this._remains_storage = remains;
    }


    get duration() {
        return this._attributes.duration;
    }
    set duration(duration) {
        this._attribute__set('duration', +duration);
        this._clear();
    }


    _clear() {
        this._progress = 1;
        this._remains = this._time_formatted__get(this.duration);
    }

    _init() {
        this.props__sync('_progress', 'duration');
    }

    _render() {
        let duration = this._renderer._timeStamp - this._renderer._timeStamp_initial;

        if (duration > this.duration) {
            this._progress = 0;
            this.stop();

            return;
        }

        this._progress = 1 - duration / this.duration;
        this._remains = this._time_formatted__get(this.duration - duration);
    }

    _time_formatted__get(time) {
        time = new Date(time);
        let milliseconds = Math.trunc(time.getMilliseconds() / 10);
        let minutes = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
        let seconds = time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`;
        milliseconds = milliseconds > 9 ? milliseconds : `0${milliseconds}`;

        return `${minutes}:${seconds}:${milliseconds}`;
    }


    // pause() {
    //     this._renderer.stop();
    // }

    // resume() {
    //     this._renderer.run();
    // }

    start() {
        this._clear();
        this._renderer.run();

        this.event__dispatch('timer__start');
    }

    stop() {
        this._renderer.stop();
        this.event__dispatch('timer__stop');
    }
}
