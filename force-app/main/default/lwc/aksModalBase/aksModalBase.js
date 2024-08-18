import { LightningElement } from 'lwc';

import aksModal from 'c/aksModal';

export default class AksModalBase extends LightningElement {

    modalResult;

    async handleClick(){
        this.result = await aksModal.open({
            size: 'medium',
            description: 'demo',
            modalHeaderLabel : 'Header!!',
            modalContent : 'Content!!',
        })

        this.modalResult = JSON.stringify(this.result);
    }

}