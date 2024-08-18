import { LightningElement, track } from 'lwc';

import getOffsetRecords from '@salesforce/apex/AKS_LightningDatatable.getOffsetRecords';

export default class AksLightningDatatableInfiniteLoading extends LightningElement {

    //Datatable Data
    @track displayData;
    //Number of records to read at a time
    rowLimit = 20;
    //Record Offset 
    rowOffSet = 0;
    //Maximum number of records to display in the data table
    limitRows = 200;
    //Lading Status
    loadStatus = '';
    //Datatable DOM
    targetDatatable;

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
        { label: 'FirstName', fieldName : 'FirstName__c'},
        { label: 'Email', fieldName : 'Email__c'},
        { label: 'Phone', fieldName : 'TelNo__c', type : 'phone'},
    ];

    
    //Retrieve Datatable Data
    handleClick(){
        this.resetCondition();
        this.loadData();
    }

    //Load data. Data is retrieved with offset as maximum
    async loadData(){
        try{
            const result = await getOffsetRecords({limitSize: this.rowLimit, offset: this.rowOffSet});
            let tmpData;
            if(result){
                tmpData = result.map( row =>{
                    let LinkName = `/${row.Id}`;
                    return { ...row, LinkName};
                });
            }
            this.displayData = this.displayData.concat(tmpData);
            if(this.displayData.length >= this.limitRows){
                this.targetDatatable.enableInfiniteLoading = false;
                this.loadStatus = 'All Data is Displayed'
            }
            if(this.targetDatatable){
                this.targetDatatable.isLoading = false;
            }
        }catch( error ){
            console.log(error);
        }
    }

    //Reset condition
    resetCondition(){
        this.displayData = [];
        this.rowOffSet = 0;
        this.loadStatus = '';
        if(this.targetDatatable){
            this.targetDatatable.enableInfiniteLoading = true;
        }
    }

    //Triggered when datatable is scrolled
    loadMoreDataHandler(event) {
        event.preventDefault();
        this.targetDatatable = event.target;
        this.targetDatatable.isLoading = true;
        this.loadStatus = 'Loading';
        this.rowOffSet = this.rowOffSet + this.rowLimit;
        this.loadData();
    }
}