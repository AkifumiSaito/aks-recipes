import { LightningElement } from 'lwc';

export default class AksLoadHandling extends LightningElement {
    isLoading = false;

    handleClick(){
        this.isLoading = true;
        setTimeout(()=>{
            this.isLoading = false;
        }, 3000);
    }

}