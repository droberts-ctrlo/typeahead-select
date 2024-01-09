/* eslint-disable @typescript-eslint/no-unused-vars */
import "./css/main.scss";
import Popover from './js/lib/popover';

(function($){
    const defaults = {
        id: 'popover',
        body: 'This is a test popover',
        debug: true
    }

    $.fn.popover = function(options){
        options  = $.extend({}, defaults, options);
        const popover = Popover(options)
        const component = popover.build();
        component.appendTo(this);
        return this;
    }
})(jQuery);