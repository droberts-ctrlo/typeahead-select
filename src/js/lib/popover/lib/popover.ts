import PopoverComponent from "./component";

export default class Popover {
    constructor(private id: string, private body: string, private debug: boolean = false) {
        if (this.debug) console.log('Popover: constructor', this.id, this.body);
        if (!this.id || this.id === '') throw new Error('Id is required');
        if (!this.body || this.body === '') throw new Error('Body is required');
    }

    build(): PopoverComponent {
        if (this.debug) console.log('Popover: build', this.id, this.body);
        if (!this.id || this.id === '') throw new Error('Id is required');
        if (!this.body || this.body === '') throw new Error('Body is required');
        const id = this.id;
        const body = this.body;

        const result = $(`
<div class="popover-container popover-container--top">
    <button
        class="popover__btn"
        type="button"
        title="Information popover"
        aria-describedby="${id}-popover">
        <div class="arrow"></div>
    </button>
    <div class="popover" role="tooltip" id="${id}-popover">
        <div class="popover-body">
        ${body}
        </div>
    </div>
</div>
        `);

        if (this.debug) console.log('Popover: return new PopoverComponent');
        return new PopoverComponent(result[0], this.debug);
    }
}
