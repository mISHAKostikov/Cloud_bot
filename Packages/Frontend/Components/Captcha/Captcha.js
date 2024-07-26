import {Component} from '../../Api/Components/Component/Component.js';
import {Common} from '../../Api/Units/Common/Common.js';


export class Captcha extends Component {
    static _elements = {
        answers: '',
        button_close: '',
        expression: '',
        template: '',
    }

    static css_url = true;
    static html_url = true;
    static url = import.meta.url;

    static {
        this.define();
    }

    static resources = {
        cross: new URL(`${this.name}.svg#cross`, import.meta.url),
    };


    _inaccuracy_operation_false_answer = ['-', '+'];


    answers_count = 4;
    inaccuracy_false_answer = 3;
    operations = ['-', '+', '*'];
    rangre_number = [0, 10];


    _button_close__on_pointerDown() {
        this.delete();
    }

    _calculate_expression() {
        return eval(this._expression)
    }

    _clear() {
        this._elements.answers.innerHTML = '';
        this._elements.expression.textContent = '';
    }

    _create_button_answer() {
        let answer = 0;
        let answer_true = this._calculate_expression();
        let answers_false = [];
        let true_answer_num = Common.get_randomInt(0, this.answers_count);

        for (let i = 0; i < this.answers_count; i++) {
            let button_answer = this._elements.template.content.querySelector('.button_answer').cloneNode(true);

            if (i == true_answer_num) {
                answer = answer_true;
            }
            else {
                let answer_false = 0;

                do {
                    let inaccuracy_num_false_answer = Common.get_randomInt(1, this.inaccuracy_false_answer, true);
                    let inaccuracy_operation_false_answer = this._inaccuracy_operation_false_answer[Common.get_randomInt(0, this._inaccuracy_operation_false_answer.length)];
                    answer_false = eval(answer_true + inaccuracy_operation_false_answer + inaccuracy_num_false_answer);
                }
                while (answers_false.indexOf(answer_false) != -1);

                answer = answer_false;
                answers_false.push(answer_false);
            }

            button_answer.textContent = answer;
            this._elements.answers.append(button_answer)
        }
    }

    _create_expression() {
        let operation = this.operations[Common.get_randomInt(0, this.operations.length)];
        let operand_1 = Common.get_randomInt(this.rangre_number[0], this.rangre_number[1], true);
        let operand_2 = Common.get_randomInt(this.rangre_number[0], this.rangre_number[1], true);

        this._expression = `${operand_1} ${operation} ${operand_2}`;
        this._elements.expression.textContent = this._expression;
    }

    _eventListeners__define() {
        this._elements.answers.addEventListener('pointerdown', this._answers__on_pointerDown.bind(this));
        this._elements.button_close.addEventListener('pointerdown', this._button_close__on_pointerDown.bind(this));
    }

    _init() {
        this.refresh();
    }

    _answers__on_pointerDown(event) {
        if (!event.target.classList.contains('button_answer')) return;

        if (event.target.textContent == this._calculate_expression()) {
            this.event__dispatch('answer__true');
        }
        else {
            this.event__dispatch('answer__false');
        }
    }


    refresh() {
        this._clear();
        this._create_expression();
        this._create_button_answer();
    }

    delete() {
        this.remove();
        this.event__dispatch('delete');
    }
}
