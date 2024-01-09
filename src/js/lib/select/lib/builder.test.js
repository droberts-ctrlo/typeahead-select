import SelectBuilder from './builder';

describe('select builder', () => {
    //placeholder test for now
    it('should create a builder', () => {
        const builder = new SelectBuilder();
        expect(builder).toBeDefined();
        expect(builder).not.toBeNull();
        expect(builder).toBeInstanceOf(SelectBuilder);
    });

    it('should throw an error if label is not set', () => {
        const builder = new SelectBuilder();
        expect(() => builder.build()).toThrow('Label is required');
    });

    it('should throw an error if id is not set', () => {
        const builder = new SelectBuilder();
        expect(() => builder.setLabel('test').build()).toThrow('Id is required');
    });

    it('should throw an error if there are no items', () => {
        const builder = new SelectBuilder();
        expect(() => builder.setLabel('test').setId('test').build()).toThrow('At least one item is required');
    });
});