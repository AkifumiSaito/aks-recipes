/*
 * Extensive Lightning Datatable with custom typs
 * https://developer.salesforce.com/docs/platform/lwc/guide/data-table-custom-types.html
 */

import LightningDatatable from 'lightning/datatable';
import customPicklistNormalTemplate from './customPicklistNormalTemplate.html'
import customPicklistEditTemplate from './customPicklistEditTemplate.html';

export default class AksCustomDatatable extends LightningDatatable {

    //"customTypes" is fixed name. Do not change.
    // Custom Type Name(ex:customPicklist)  : User defined type name.
    // template: this template is displayed in standard mode.
    // editTemplate: this template is displayed in edit mode.
    // standardCellLayout: You can use the standardCellLayout to style cells for your custom data type to make them look similar to the standard data types.
    // typeAttributes: these are attributes set by column definition and passed to template
    static customTypes = {
        customPicklist: {
            template: customPicklistNormalTemplate,
            editTemplate: customPicklistEditTemplate,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context']
        }
    };
}