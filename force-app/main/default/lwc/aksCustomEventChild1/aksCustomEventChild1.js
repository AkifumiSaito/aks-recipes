import { LightningElement, api } from 'lwc';

export default class AksCustomEventChild1 extends LightningElement {

    @api parentValue;
    @api child2Value;
    child1Value = 'Child1 Default Value';
    changedValue= 'Child1 Changed Value';

    handleClick(){
        this.child1Value = this.changedValue;
        this.dispatchEvent(
            new CustomEvent('cchange1',{
                bubbles: true,
                composed: true,
                detail: {
                    value : this.child1Value
                }
            })
        );
    }

}