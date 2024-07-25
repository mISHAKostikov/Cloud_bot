// import './_Telegram_api.js';
import './Telegram_api.js';

import {ExternalPromise} from '../ExternalPromise/ExternalPromise.js';
// import {ExternalPromise} from '../../../Global/Js/ExternalPromise/ExternalPromise.js';


export class Telegram {
    // static _callback = (error, success) => {
    //     this._result = error ? error : success;
    // };

    static _result = null;
    static _telegram = window.Telegram;
    static _webApp = this._telegram.WebApp;


    static async data__get(key) {
        let promise = new ExternalPromise();
        this._webApp.CloudStorage.getItem(key, (error, success) => error ? promise.reject(error) : promise.fulfill(success));

        return promise;
    }

    static async data__remove(...args) {
        let promise = new ExternalPromise();
        this._webApp.CloudStorage.removeItems(args, (error, success) => error ? promise.reject(error) : promise.fulfill(success));

        return promise;
    }

    static async data__save(key, data) {
        let promise = new ExternalPromise();
        this._webApp.CloudStorage.setItem(key, value, (error, success) => error ? promise.reject(error) : promise.fulfill(success));

        return promise;
    }

    static app__init() {
       this._webApp.expand();
       this._webApp.ready();
    }

    static user_id__get() {
        return this._webApp.initDataUnsafe.user.id;
    }

    static verticalSwipes__disable() {
        this._webApp.disableVerticalSwipes();
    }

    static verticalSwipes__enable() {
        this._webApp.enableVerticalSwipes();
    }
}
