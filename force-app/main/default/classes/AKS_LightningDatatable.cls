public with sharing class AKS_LightningDatatable {

    @AuraEnabled
    public static List<AKS_SimpleObject__c> getRecords(){

        List<AKS_SimpleObject__c> result = new List<AKS_SimpleObject__c>();
        try {
            result = [ SELECT Id, FirstName__c, LastName__c, Email__c, TelNo__c, GenderIdentity__c
                        FROM AKS_SimpleObject__c
                        ORDER BY CreatedDate
                        LIMIT 500
                        ];            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return result;
    }

    @AuraEnabled
    public static List<AKS_SimpleObject__c> getOffsetRecords(Integer limitSize, Integer offset){

        List<AKS_SimpleObject__c> result = new List<AKS_SimpleObject__c>();
        try {
            result = [ SELECT Id, FirstName__c, LastName__c, Email__c, TelNo__c, GenderIdentity__c
                        FROM AKS_SimpleObject__c
                        ORDER BY CreatedDate
                        LIMIT :limitSize
                        OFFSET :offset
                        ];            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return result;
    }

    @AuraEnabled
    public static void updateRecords( List<AKS_SimpleObject__c> records ){
        try {
            update records;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return;
    }

}