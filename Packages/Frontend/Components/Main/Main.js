import {Component} from '../../Api/Components/Component/Component.js';


export class Main extends Component {
    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static resources = {
        leval: new URL(`${this.name}.svg#leval`, import.meta.url),
    };

    static {
        this.define();
    }
}
