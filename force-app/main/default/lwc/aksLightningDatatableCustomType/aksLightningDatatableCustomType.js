import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';

import AKSSIMPLE_OBJECT from '@salesforce/schema/AKS_SimpleObject__c';
import GENDER_FIELD from '@salesforce/schema/AKS_SimpleObject__c.GenderIdentity__c';

import getRecords from '@salesforce/apex/AKS_LightningDatatable.getRecords';
import updateRecords from '@salesforce/apex/AKS_LightningDatatable.updateRecords';

export default class AksLightningDatatableCustomType extends LightningElement {

    @track data;
    @track displayData;
    @track draftValues;
    @track pickListOptions

    //Datatable Columns
    columns = [
        {
            label: 'LastName',
            fieldName : 'LinkName',
            type : 'url',
            typeAttributes : {
                label : { fieldName: 'LastName__c'},
                target: '_blank',
            },
        },
        {
            label: 'Gender',
            fieldName : 'GenderIdentity__c',
            editable: true,
            type: 'customPicklist',
            typeAttributes : {
                placeholder: 'Choose Gender',
                options: { fieldName: 'pickListOptions'},
                value: { fieldName: 'GenderIdentity__c'},
                context: { fieldName: 'Id'},
            }
        },
    ];

    //Fetch picklist options
    @wire(getObjectInfo, { objectApiName: AKSSIMPLE_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: GENDER_FIELD})
    wirePickList({ error, data }) {
        if (data) {
            this.pickListOptions = data.values;
        } else if (error) {
            console.log(error);
        }
    }

    //Handle Row Select
    handleSelection(event){
        console.log('seleceted row array', JSON.stringify(event.detail.selectedRows));
    }

    //Handle Inline Edit Save. Object ( Id and changed values set) are stored in event.detail.draftValues in array type)
    async handleSave(event){
        this.draftValues = event.detail.draftValues;
        try{
            await updateRecords( { records : this.draftValues });
            //close save and cancel footer
            this.draftValues = null;
            return this.handleClick();
        }catch(error){
            console.log(error);
        }
    }

    //Retrieve Datatable Data
    handleClick(){
        this.loadData();
    }

    async loadData(){
        try{
            this.data = await getRecords();
            if(this.data){
                this.displayData = this.data.map( row =>{
                    let LinkName = `/${row.Id}`;
                    let pickListOptions = this.pickListOptions;
                    return { ...row, LinkName, pickListOptions};
                });
            }
        }catch( error ){
            console.log(error);
        }
    }

}