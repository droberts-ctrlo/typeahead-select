import PopoverComponent from "./component";
import Popover from "./popover";

window.$ = require('jquery');

describe('Popover Tests', () => {
    it('throws an error if id is not set', () => {
        expect(() => new Popover('', 'test')).toThrow('Id is required');
    });

    it('throws an error if popover body is not set', () => {
        expect(() => new Popover('test', '')).toThrow('Body is required');
    });

    it('creates a popover', () => {
        const popover = new Popover('test', 'test');
        expect(popover).toBeDefined();
        expect(popover).not.toBeNull();
        expect(popover).toBeInstanceOf(Popover);
        const result = popover.build();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(PopoverComponent);
    });
});