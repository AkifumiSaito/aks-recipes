import { LightningElement, wire } from 'lwc';

import { subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE, COMPONENT_SCOPE } from 'lightning/messageService';
import AksMC from '@salesforce/messageChannel/aksMessageChannel__c';

export default class AksLightningMessageSubscribe extends LightningElement {

    message;
    messageObject;

    @wire(MessageContext)
    messageContext;

    get displayMessage(){ return this.message };

    get displayObjectMessage1(){ return this.messageObject?.message1};
    
    get displayObjectMessage2(){ return this.messageObject?.message2};

    //Subscribe
    subscribeToMessageChannel() {
        if(!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                AksMC,
                (payload) => {
                    this.message = payload.message1;
                    this.messageObject = payload.message2;
                    },
                    {scope: COMPONENT_SCOPE}
            );
        }
    };

    //Unsubscribe
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    };

    //Triggered when the component is mounted.
    connectedCallback() {
        this.subscribeToMessageChannel();
    };

    //Triggered when the component is unmounted.
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    };
}