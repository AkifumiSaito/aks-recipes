/*
 * This class is used to for LWC Component 'aksWireStandard'
 */
public with sharing class AKS_WireStandard {

    @AuraEnabled(cacheable=true)
    public static AKS_SimpleObject__c getSimpleObject(String recordId){
        AKS_SimpleObject__c result = new AKS_SimpleObject__c();
        try {
            result = [SELECT Id, LastName__c, FirstName__c FROM AKS_SimpleObject__c WHERE Id = :recordId LIMIT 1].get(0);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return result;
    }

}