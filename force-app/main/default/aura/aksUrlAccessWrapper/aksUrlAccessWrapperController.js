({
    init: function (component, event, helper) {
        const message = 'Message from wrapper'
        component.set('v.message', message);
        const urlParam = component.get("v.pageReference").state.c__param;
        component.set('v.urlParam', urlParam);
      },
})