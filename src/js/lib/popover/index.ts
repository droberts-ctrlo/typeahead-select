import Popover from "./lib/popover"

declare global{
    interface JQuery {
        popover(options: PopoverOptions): JQuery;
    }
}

interface PopoverOptions {
    id: string;
    body: string;
    debug: boolean;
}

export default (options: PopoverOptions): Popover => new Popover(options.id, options.body,options.debug);