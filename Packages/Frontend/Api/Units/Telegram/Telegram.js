import '../Telegram_api/Telegram_api.js'


export class Telegram {
    static _callback = function(error, success) {
        this._result = error ? error : success;
    };

    static _result = null;
    static _telegram = window.Telegram;
    static _web_app = this._telegram.WebApp;


    static data__get(key) {
        this._web_app.CloudStorage.getItem(key, this._callback);

        return this._result;
    }

    static data__remove() {
        this._web_app.CloudStorage.removeItems(Array.from(arguments), this._callback);

        return this._result;
    }

    static data__save(key, data) {
        this._web_app.CloudStorage.setItem(key, value, this._callback);

        return this._result;
    }

    static app__init() {
       this._web_app.expand();
       this._web_app.ready();
    }

    static user_tg_id__get() {
        return this._web_app.initDataUnsafe.user.id;
    }

    static verticalSwipes__disable() {
        this._web_app.disableVerticalSwipes();
    }

    static verticalSwipes__enable() {
        this._web_app.enableVerticalSwipes();
    }
}
