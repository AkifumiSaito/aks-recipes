import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import AksMC from '@salesforce/messageChannel/aksMessageChannel__c';

export default class AksLightningMessagePublish extends LightningElement {

    message = 'This message is sent by publish component';
    messageObject = {
        message1 : 'This message1 belonging to the prop of the object is sent by publish component',
        message2 : 'This message2 belonging to the prop of the object is sent by publish component',
    }

    @wire(MessageContext)
    messageContext;

    // Publish message
    handleClick(){
        const payload = {
            message1: this.message,
            message2: this.messageObject,
        };
        publish(
            this.messageContext,
            AksMC,
            payload
        );
    }
}