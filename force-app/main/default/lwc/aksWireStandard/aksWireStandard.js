import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import LASTNAME_FIELD from '@salesforce/schema/AKS_SimpleObject__c.LastName__c';
import FIRSTNAME_FIELD from '@salesforce/schema/AKS_SimpleObject__c.FirstName__c';

import getSimpleObject from '@salesforce/apex/AKS_WireStandard.getSimpleObject';

const FIELDS = [LASTNAME_FIELD, FIRSTNAME_FIELD];
const FIELDS2 = ['AKS_SimpleObject__c.LastName__c', 'AKS_SimpleObject__c.FirstName__c'];


export default class WireStandard extends LightningElement {


    // Can get recordId when the component is placed in record page.
    // --------------------------------------------------------
    @api recordId;
    lastname3;
    lastname4;

    // Approach 1: Wire record fields using Field Schema. if error, cause compile error. safe option.
    // --------------------------------------------------------
    @wire(getRecord, { recordId: '$recordId', fields:FIELDS})
    record1;


    // Approach 2: Wire record fields using Field API Name Directly
    // --------------------------------------------------------
    @wire(getRecord, { recordId: '$recordId', fields:FIELDS2})
    record2;

    // Approach 3: Wire record fields with function
    // --------------------------------------------------------
    @wire(getRecord, { recordId: '$recordId', fields:FIELDS})
    wiredFunction( result ){
        const { data, error} = result;
        if( data ){
            this.lastname3 = data.fields.LastName__c.value;
        }else if(error){
            console.log('error: ' + error);
            //errro handling
        }
    }

    // Approach 4: Wire Apex with function
    // --------------------------------------------------------
    @wire(getSimpleObject, { recordId : '$recordId'})
    wiredApexFunction( result ){
        const {data, error} = result;
        if( data ){
            this.lastname4 = data.LastName__c;
        }else if(error){
            console.log('error message:' + error.body.message);
            console.log('error type:' + error.errorType);
            console.log('error status: ' + error.status);
            console.log('error status type:' + error.statusText);
        }
    }

    get lastname1(){
        return this.record1?.data?.fields.LastName__c.value;
    }

    get lastname2(){
        return this.record2?.data?.fields.LastName__c.value;
    }

}