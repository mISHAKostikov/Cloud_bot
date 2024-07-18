import {Component} from '../../Api/Components/Component/Component.js';
import {Leafable} from '../../Api/Components/Leafable/Leafable.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';


export class Root extends Component {
    static _attributes = {
        ...super._attributes,

        verticalSwipes: true,
    }


    static css_url = true;
    static html_url = true;
    static url = import.meta.url;


    static {
        this.define();
    }


    _rest = new Rest(`https://mmnds.store`);
    _telegram = null;
}
