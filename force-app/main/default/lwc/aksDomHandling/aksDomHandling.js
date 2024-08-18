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

    //Sync input filed with propetry
    input = {
        lastname : '',
        firstname : '',
        email : '',
        telno : ''
    }


    handleFieldChange(event){
        switch(event.target.dataset.name){
            case 'TelNo':
                this.input.telno = event.target.value;
                break;
        }
    }

    handleSave(){
        const inputFields = this.template.querySelectorAll('lightning-input-field[data-type="contact"');
        inputFields.forEach((inputField) => {
            this.input[inputField.dataset.name] = inputField.value;
        })
        console.log(JSON.stringify(this.input));
    }

    resetLastName(){
        this.template.querySelector('lightning-input-field[data-name="lastname"').reset();
    }

}