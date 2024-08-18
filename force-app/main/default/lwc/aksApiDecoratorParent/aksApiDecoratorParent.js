import { LightningElement } from 'lwc';

export default class AksApiDecoratorParent extends LightningElement {
    param1 = 'Hello';
    param2 = 'Good Morning!';
    
    handleClick(){
        console.log('handleClick');
        this.template.querySelector('c-aks-api-decorator').changeParam(this.param2);
    };
}