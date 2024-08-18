import { LightningElement } from 'lwc';

export default class AksForEach extends LightningElement {

    displayData = [
        { Id: 'ABA0001', Name : 'Taro Yamada', Age : '23', Pref : 'Tokyo' },
        { Id: 'ABA0002', Name : 'Jiro Sato', Age : '34', Pref : 'Chiba' },
        { Id: 'ABA0003', Name : 'Saburo　Tanaka', Age : '45', Pref : 'Saitama' },
        { Id: 'ABA0004', Name : 'Siro　Suzuki', Age : '56', Pref : 'Ibaraki' },
    ];

    get displayDataWithCalss(){
        return this.displayData.map( item =>{
            return {
                ...item,
                cssClass: Number(item.Age) < 30 ? 'slds-box txt-alert' : 'slds-box'
            }
        })
    };

}