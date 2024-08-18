import { LightningElement, track } from 'lwc';
import { updateRecord, deleteRecord } from 'lightning/uiRecordApi';

import ID_FIELD from "@salesforce/schema/AKS_SimpleObject__c.Id";
import EMAIL_FILED from "@salesforce/schema/AKS_SimpleObject__c.Email__c";
import PHONE_FIELD from "@salesforce/schema/AKS_SimpleObject__c.TelNo__c";

import getRecords from '@salesforce/apex/AKS_LightningDatatable.getRecords';
import updateRecords from '@salesforce/apex/AKS_LightningDatatable.updateRecords';

const CLEAREMAIL_ACTION = 'clearEmail';
const CLEARPHONE_ACTION = 'clearPhone';
const DELETE_ACTION = 'delete';

export default class AksLightningDatatable extends LightningElement {

    @track data;
    @track displayData;
    @track draftValues;

    //Row Action
    rowActions = [
        { label: 'Clear Email', name: CLEAREMAIL_ACTION },
        { label: 'Clear Phone', name: CLEARPHONE_ACTION },
        { label: 'Delete', name: DELETE_ACTION }
    ];

    //Row Action For Datatable Columns
    actionColumn = {
        type : 'action',
        typeAttributes : {
            rowActions: this.rowActions,
        }
    };

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
        { label: 'FirstName', fieldName : 'FirstName__c', editable: true },
        { label: 'Email', fieldName : 'Email__c', editable : true },
        { label: 'Phone', fieldName : 'TelNo__c', type : 'phone'},
        this.actionColumn
    ];

    //Handle Row Action
    handleAction(event){
        switch ( event.detail.action.name){
            case CLEAREMAIL_ACTION:
                this.clearEmail(event.detail.row);
                break;
            case CLEARPHONE_ACTION:
                this.clearPhone(event.detail.row);
                break;
            case DELETE_ACTION:
                this.deleteSelectRecord(event.detail.row);
                break;
        }
    }

    //Clear Email Field
    async clearEmail( record ){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = record.Id;
        fields[EMAIL_FILED.fieldApiName] = '';
        const recordInput = { fields };
        try{
            await updateRecord( recordInput );
            return this.handleClick();
        }catch(error){
            console.log(error);
        }
    }

    //Clear Phone Field
    async clearPhone( record ){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = record.Id;
        fields[PHONE_FIELD.fieldApiName] = '';
        const recordInput = { fields };
        try{
            await updateRecord( recordInput );
            return this.handleClick();
        }catch(error){
            console.log(error);
        }
    }

    //Delete Record
    async deleteSelectRecord( record ){
        try {
            await deleteRecord( record.Id);
            return this.handleClick();
        }catch(error){
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
                    return { ...row, LinkName};
                });
            }
        }catch( error ){
            console.log(error);
        }
    }
}