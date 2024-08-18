import { LightningElement, api } from 'lwc';

export default class AksUrlAccess extends LightningElement {
    @api message;
    @api urlParam;
}