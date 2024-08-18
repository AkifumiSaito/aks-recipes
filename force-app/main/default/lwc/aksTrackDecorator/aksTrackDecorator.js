import { LightningElement, track } from 'lwc';

export default class AksTrackDecorator extends LightningElement {

    variable1 = 'var';
    @track object1 = { property1 : 'prop' };
    object2 = { property1 : 'prop' };
    
    handleChange(){
        this.variable1 = 'varChanged';
        this.object1.property1 = 'propChanged';
        this.object2.propetry2 = 'propChanged';
    }
}