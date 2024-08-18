import { LightningElement, api } from 'lwc';

export default class AksCustomEventChild2 extends LightningElement {

    @api parentValue;
    @api child1Value;
    child2Value = 'Child2 Default Value';
    changedValue= 'Child2 Changed Value';

    handleClick(){
        this.child2Value = this.changedValue;
        this.dispatchEvent(
            new CustomEvent('cchange2',{
                bubbles: true,
                composed: true,
                detail: {
                    value : this.child2Value
                }
            })
        );
    }

}