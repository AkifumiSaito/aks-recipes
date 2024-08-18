import { LightningElement } from 'lwc';

import CUSTOMPERMISSION01 from '@salesforce/customPermission/CustomPermission01';

export default class AksCustomPermission extends LightningElement {

    hasCustomPermission = CUSTOMPERMISSION01;

}