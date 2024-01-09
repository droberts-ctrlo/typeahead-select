export default class SelectBuilder {
    private required: boolean;
    private hideGroup: boolean;
    private fieldsetClass: string[];
    private formgroupClass: string[];
    private labelCheckboxName?: string;
    private id?: string;
    private label?: string;
    private helpText?: string;
    private popoverBody?: string;
    private dataAttributes: string[]; //TODO: make this a type
    private readonly: boolean;
    private placeholder?: string;
    private items: string[]; //TODO: make this a type
    private withDetails: boolean;

    constructor() {
        this.required = false;
        this.hideGroup = false;
        this.fieldsetClass = [];
        this.formgroupClass = [];
        this.dataAttributes = [];
        this.readonly = false;
        this.items = [];
        this.withDetails = false;
    }

    isRequired(): SelectBuilder {
        this.required = true;
        return this;
    }

    isHideGroup(): SelectBuilder {
        this.hideGroup = true;
        return this;
    }

    addFieldsetClass(...fieldsetClass: string[]): SelectBuilder {
        this.fieldsetClass.push(...fieldsetClass);
        return this;
    }

    addFormgroupClass(...formgroupClass: string[]): SelectBuilder {
        this.formgroupClass.push(...formgroupClass);
        return this;
    }

    setLabelCheckboxName(labelCheckboxName: string): SelectBuilder {
        this.labelCheckboxName = labelCheckboxName;
        return this;
    }

    setId(id: string): SelectBuilder {
        this.id = id;
        return this;
    }

    setLabel(label: string): SelectBuilder {
        this.label = label;
        return this;
    }

    setHelpText(helpText: string): SelectBuilder {
        this.helpText = helpText;
        return this;
    }

    setPopoverBody(popoverBody: string): SelectBuilder {
        this.popoverBody = popoverBody;
        return this;
    }

    addDataAttributes(...dataAttributes: string[]): SelectBuilder {
        this.dataAttributes.push(...dataAttributes);
        return this;
    }

    isReadonly(): SelectBuilder {
        this.readonly = true;
        return this;
    }

    setPlaceholder(placeholder: string): SelectBuilder {
        this.placeholder = placeholder;
        return this;
    }

    build() {
        if (!this.label) throw new Error('Label is required');
        if (!this.id) throw new Error('Id is required');
        if (!this.items.length) throw new Error('At least one item is required');
    }
}

// [%
//   fieldset_class = is_required AND ! fieldset_class.match('fieldset--required') ? fieldset_class _ ' fieldset--required' : fieldset_class;
//   select_widget_class = is_required ? ' select-widget--required' : '';
// %]
// [% IF ! hide_group %]
// <div class="form-group [% formgroup_class %]">
// [% END %]
//   <fieldset class="fieldset [% fieldset_class %]">
// <div class="fieldset__legend">
//   [%
//     IF label_checkbox_name;
//       INCLUDE fields/sub/checkbox.tt
//         id           = label_checkbox_name
//         name         = label_checkbox_name
//         input_class  = "mb-3"
//         label        = ""
//         value        = 1
//         checked      = 0
//         help_text    = ""
//         popover_body = ""
//         filter       = "html";
//     END;
//   %]
//   <legend id="[% id %]-label">
//     [% INCLUDE fields/sub/filter.tt value=label; %]
//   </legend>
//   [% IF popover_body; INCLUDE fields/sub/popover.tt popover_id=id popover_body=popover_body popover_class="popover-container--top"; END; %]
// </div>
// [% IF help_text %]
// <p id="[% id %]-help" class="form-text">
//   [% help_text | html %]
// </p>
// [% END %]
//     <div class="select-widget[% select_widget_class %]" [% IF data_attributes; INCLUDE fields/sub/data_attributes.tt; END; %]>
//       <div class="select-widget-dropdown">
//         <div class="form-control" [% IF is_readonly %]readonly disabled[% END %]>
//           <ul class="current">
//             <li class="none-selected">[% INCLUDE fields/sub/filter.tt value=placeholder filter="html"; %]</li>
//             [%
//               FOREACH item IN items;
//                 value_hidden = item.value == value ? '' : " hidden";
//             %]
//             <li
//               data-list-id="[% item.value %]"
//               data-list-item="[% id %]_[% item.value %]"
//               data-list-text="[% INCLUDE fields/sub/filter.tt value=item.label_plain filter="html" %]"
//               [% value_hidden %]
//             >
//               <span class="widget-value__value">[% IF item.label_html; item.label_html; ELSIF item.label_plain; INCLUDE fields/sub/filter.tt value=item.label_plain filter="html"; ELSE; item;END; %]</span>
//                 <button class="close select-widget-value__delete" aria-hidden="true" aria-label="delete" title="delete" tabindex="-1">&times;</button>
//             </li>
//             [% END %]
//             [% UNLESS is_readonly %]
//               <li class="search">
//                 <input
//                   type="search"
//                   class="form-control-search"
//                   style="width:100px"
//                   placeholder = [% is_disabled ? "Admin-Only" : "Search..."; %]
//                   aria-controls="[% id %]-values-single"
//                   aria-expanded="false"
//                   aria-describedby="[% id %]-label"
//                   disabled = "disabled"
//                   aria-disabled = "true"
//                 >
//               </li>
//             [% END %]
//           </ul>
//         </div>

//         <ul hidden class="available select__menu dropdown-menu show [% with_details ? 'with-details' : ''; %]"
//             id="[% id %]-values-single"
//             aria-labelledby="[% id %]-label"
//             [% IF help_text %]aria-describedby="[% id %]-help"[% END %]
//             role="listbox"
//         >
//           [% IF has_subvals OR has_typeahead %]
//             <li class="spinner">
//               <div class="spinner-border" role="status">
//                 <span class="sr-only">Loading...</span>
//               </div>
//             </li>
//           [% END %]
//           <li class="has-noresults" hidden>No results</li>
//           [% FOREACH item IN items %]
//           <li class="answer" role="option">
//             [% IF with_details %]
//             <div class="control">
//             [% END %]
//               <div class="radio-group__option">
//                 <input
//                   type="radio"
//                   id="[% id %]_[% item.value %]"
//                   class="radio-group__input"
//                   name="[% name %]"
//                   value=[% item.value %][% IF item.value == value %]
//                   checked[% END %][% IF is_required %]
//                   required
//                   aria-required="true"[% END %]
//                   data-value="[% IF item.label_html; item.label_html; ELSIF item.label_plain; INCLUDE fields/sub/filter.tt value=item.label_plain filter="html"; ELSE; item;END; %]"
//               >
//               <label class="radio-group__label" for="[% id %]_[% item.value %]">
//                 [%
//                     IF item.label_plain;
//                         INCLUDE fields/sub/filter.tt value=item.label_plain filter="html";
//                     ELSIF item.label_html;
//                         item.label_html;
//                     ELSE;
//                         item;
//                     END;
//                 %]
//               </label>
//             </div>
//           [% IF with_details %]
//             </div>
//             <div class="details">
//               <button
//                 type="button"
//                 class="btn btn-small btn-default btn-js-more-info"
//                 data-toggle="modal"
//                 data-target=#detailsModal
//                 data-record-id="[% item.value %]"
//                 aria-described-by="lbl-single-details-0"
//                 disabled=is_disabled
//                 aria-disabled=is_disabled
//               >
//                 <span class="btn__title">Details</span>
//               </button>
//             </div>
//           [% END %]
//         </li>
//         [% END; %]
//       </ul>
//     </div>
//   </div>
// </fieldset>
// [% IF ! hide_group %]
// </div>
// [% END %]
