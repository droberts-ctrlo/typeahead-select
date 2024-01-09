import { Component } from "../../common/component";

export default class PopoverComponent extends Component {
    constructor(element: HTMLElement, private debug:boolean = false) {
        console.log('PopoverComponent: constructor', element);
        super(element);

        const el = $(this.element);
        const popover = el.find('.popover');
        const arrow = el.find('.arrow');
        const button = el.find('.popover__btn');

        this.initPopover(button, popover, arrow);
    }

    private initPopover(button: HTMLButtonElement, popover: JQuery<HTMLElement>, arrow: JQuery<HTMLElement>) {
        if(this.debug) console.log('PopoverComponent: initPopover', button, popover, arrow);
        if (!button) return

        popover.removeClass('show');
        arrow.removeClass('show');
        this.element.addEventListener('click', (ev) => {});
        this.element.addEventListener('keydown', (ev) => {});
        button.on('click keydown', (ev) => {
            if (ev.type === 'click' || (ev.type === 'keydown' && (ev.which === 13 || ev.which === 32))) {
                if(this.debug) console.log('PopoverComponent: initPopover: click/keydown', ev);
                ev.preventDefault();
                this.handleClick(ev, popover, arrow);
            }
        });
    }

    private handleClick(ev: Event| JQuery.Event, popover: JQuery<HTMLElement>, arrow: JQuery<HTMLElement>) {
        if(this.debug) console.log('PopoverComponent: handleClick', ev, popover, arrow);
        this.togglePopover(popover, arrow);
        ev.stopPropagation();
    }

    private togglePopover(popover: JQuery<HTMLElement>, arrow: JQuery<HTMLElement>) {
        if (popover.hasClass('show')) {
            if(this.debug) console.log('PopoverComponent: togglePopover: hide');
            popover.removeClass('show');
            arrow.removeClass('show');
        } else {
            if(this.debug) console.log('PopoverComponent: togglePopover: show');
            popover.addClass('show');
            arrow.addClass('show');
        }
    }

    appendTo(element: HTMLElement | JQuery<HTMLElement>) {
        if(this.debug) console.log('PopoverComponent: appendTo', element, this.element);
        const el: JQuery<HTMLElement> = $(this.element)
        el.appendTo(element);
    }
}
