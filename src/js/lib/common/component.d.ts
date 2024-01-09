/* eslint-disable @typescript-eslint/ban-types */
declare class Component {
    constructor(element);
    element: HTMLElement;
}

/**
 * Register a component that can be initialized
 *
 * @export
 * @param { Function } componentInitializer Function that will be called when component initializes
 */
declare const registerComponent: (componentInitializer: Function) => void;

/**
 * Initialize all registered components in the defined scope
 *
 * @export
 * @param {HTMLElement} scope The scope to initialize the components in.
 */
declare const initializeRegisteredComponents: (scope: HTMLElement) => void;

/**
 * Get an Array of elements matching `selector` within `scope`
 *
 * @export
 * @param {HTMLElement} scope The scope to select elements
 * @param {String} selector The selector to select elements
 * @returns {Array[HTMLElement]} An array of elements
 */
declare const getComponentElements: (scope: HTMLElement, selector: string) => HTMLElement[];

/**
 * Initialize component `Component` on all elements matching `selector` within `scope`
 * Will only initialize elements that have not been initialized.
 *
 * @export
 * @param {HTMLElement} scope The scope to initialize the objects on
 * @param {String|Function} selector The selector to select elements
 * @param {Component} ComponentClass The Component class to initialize
 * @returns {Array[Component]} An array of initialized components
 */
declare const initializeComponent: (scope: HTMLElement, selector: string | Function, ComponentClass: Component) => Component[];

export {
    Component,
    initializeComponent,
    initializeRegisteredComponents,
    getComponentElements,
    registerComponent,
}
