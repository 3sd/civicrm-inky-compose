(function(angular, $, _) {
  // declare your module
  angular.module('civicrm-recurring-mail', []);

  angular.module('crmMailing').config(function($provide) {
    // intercept crmMailingBlockMailing directive, note the 'Directive' suffix
    $provide.decorator('crmMailingBlockScheduleDirective', function($delegate, crmApi) {

      var directive = $delegate[0];

      directive.compile = function(Element, Attrs) {

        // Add an extra option to the schedule block
        Element.children().children().append('<div crm-mailing-block-schedule-recur-option />');
        // return new link function
        return function(scope, elem, attr) {

          var initialized = false;
          scope.$watch('schedule', function() {
            if(!initialized || 1){
              crmApi('MailingRecur', 'getsingle', {
                mailing_id: scope.mailing.id,
              }).then(function(result) {
                if(!result.is_error){
                  scope.schedule.mode = 'recur';
                  scope.recur = result.recur;
                }
              }).catch(function(err){
              });
              initialized = true;
            }


            if (scope.schedule.mode == 'recur') {
              $('.crmMailing-submit-button').hide();
              return;
            }
            $('.crmMailing-submit-button').show();
          }, true);

          // call apply to get original functionality
          directive.link.apply(this, arguments);

        };
      };
      return $delegate;
    });
  });


  // angular.module('crmMailing').controller('crmMailingBlockScheduleRecurOptionCtlr', function($scope) {
  // });

  angular.module('crmMailing').directive('crmMailingBlockScheduleRecurOption', function() {
    return {
      templateUrl: CRM.resourceUrls['civicrm-recurring-mail'] + '/ang/crmMailingBlockScheduleRecurOption.html',
    };
  });


})(angular, CRM.$, CRM._);
