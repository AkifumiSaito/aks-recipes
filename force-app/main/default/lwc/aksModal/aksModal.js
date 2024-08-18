import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class AksModal extends LightningModal {

    //Modal Header Name
    @api modalHeaderLabel;
    //Modal Content
    @api modalContent;

    handleSave(){
        const result = { status: "success"};
        this.close(result);
    }

    handleCancel(){
        const result = { status: "cancel"};
        this.close(result);
    }

}