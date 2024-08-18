import { LightningElement, api } from 'lwc';

export default class AksApiDecorator extends LightningElement {
    @api pageParam;
    @api parentParam;
    @api stateParam;
    methodParam
    
    @api
    changeParam(value){
        console.log('changeParam');
        this.methodParam = value;
    }
}