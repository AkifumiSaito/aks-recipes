import { LightningElement } from 'lwc';

export default class AksCustomEventParent extends LightningElement {

    parentValue = 'Parent Default value';
    child1Value;
    child2Value;
    changedValue= 'Parent Changed Value';

    handleClick(){
        this.parentValue = this.changedValue;
    }
    handleChild1(event){
        this.child1Value = event.detail.value;
    }
    handleChild2(event){
        this.child2Value = event.detail.value;
    }

}