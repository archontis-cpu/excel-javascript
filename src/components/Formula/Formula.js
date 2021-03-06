import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/DOM";

export class Formula extends ExcelComponent {
    static className = 'excel__formula';
    /*
    статическое поле потому,
    что к нему можно получить доступ
    без создания инстанса класса
    */

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options,
        });
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula');
        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value);
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula"
                 class="input" 
                 contenteditable="true"
                 spellcheck="false">
            </div>
            `;
    }

    onInput(event) {
        const text = $(event.target).text();
        this.$emit('formula:input', text);
    }

    storeChanged({ currentText }) {
        this.$formula.text(currentText);
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            event.preventDefault();

            this.$emit('formula:done');
        }
    }
}
