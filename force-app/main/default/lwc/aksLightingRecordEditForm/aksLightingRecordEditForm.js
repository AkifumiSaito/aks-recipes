import { LightningElement, api } from 'lwc';
import AKS_SimpleObject__c from "@salesforce/schema/AKS_SimpleObject__c";
import LASTNAME_FIELD from "@salesforce/schema/AKS_SimpleObject__c.LastName__c";
import FIRSTNAME_FIELD from "@salesforce/schema/AKS_SimpleObject__c.FirstName__c";
import EMAIL_FIELD from "@salesforce/schema/AKS_SimpleObject__c.Email__c";
import TEL_FIELD from "@salesforce/schema/AKS_SimpleObject__c.TelNo__c";

export default class AksLightingRecordEditForm extends LightningElement {

    @api recordId;
    objectApiName = AKS_SimpleObject__c;
    field = {
        lastname: LASTNAME_FIELD,
        firstname: FIRSTNAME_FIELD,
        email : EMAIL_FIELD,
        telno : TEL_FIELD,
    };

    //Prevent Duplicate Save
    isSaving = false;
    hasError = false;
    errorMessage = false;
    get disabled(){ return this.isSaving};

    //Sync input filed with propetry
    input = {
        TelNo : ''
    }

    handleSubmit(event){
        event.preventDefault(); 
        this.isSaving = true;
        this.hasError = false;
        this.errorMessage = '';
        const fields = event.detail.fields;
        fields.TelNo__c = this.input.TelNo;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    /**
     * event
     * when error is occurred event.detail.output is returned
     * event.detail.output.errors : (Array) whole error
     * event.detail.output.fieldErrors.field__c : (Array) field error
     */
    handleError(event){
        this.hasError = true;
        this.errorMessage = event.detail.detail;
        this.isSaving = false;
    }

    handleSuccess(event){
        this.isSaving = false;
    }

    handleFieldChange(event){
        switch(event.target.dataset.name){
            case 'TelNo':
                this.input.TelNo = event.target.value;
                break;
        }
    }

}