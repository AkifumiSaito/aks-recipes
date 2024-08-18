import { LightningElement } from 'lwc';
import LightningConfirm from "lightning/confirm";
import LightningAlert from "lightning/alert";

const ALERT_MESSAGE = {
    label: 'Alert Label',
    message: 'Alert Message',
    theme: 'default',
    variant: 'header',
}

const CONFIRM_MESSAGE = {
    label: 'Confirm Label',
    message: 'Confirm Message',
    theme: 'default',
    variant: 'header',
}

export default class AksAlertAndConfirm extends LightningElement {

    confirmResult;

    async handleAlert(){
        await LightningAlert.open( ALERT_MESSAGE );
    }

    async handleConfirm(){
        const result = await LightningConfirm.open( CONFIRM_MESSAGE );
        this.confirmResult = result;
    }

}