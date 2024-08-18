import { LightningElement } from 'lwc';

export default class AksCustomEventGroundParent extends LightningElement {

    child1Fired;
    child2Fired;

    handleChange1(){
        this.child1Fired = 'OnFire';
    };
    handleChange2(){
        this.child2Fired = 'OnFire';
    }

}