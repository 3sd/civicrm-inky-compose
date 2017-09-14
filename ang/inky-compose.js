(function(angular, $, _) {
  // declare your module
  module = angular.module('civicrm-inky-compose', ['ui.ace']);

  module.controller('InkyComposeController', function($scope, $sce, crmApi){

    function trustAndAddReplaceMethod(value){
      value = $sce.trustAsHtml(value)

      // Workaround: We need to add a replace method to this trusted object as it will be called in crmApi (see CRM-18474) when attempting a save.
      s = new String();
      value.replace = s.replace

      return value
    }
    //
    // TODO I suspect that there is a better way to initialise the template
    $scope.$parent.mailing.body_html = trustAndAddReplaceMethod($scope.$parent.mailing.body_html)

    $scope.convert = function(){

      try{
        $.get( $scope.$parent.mailing.template_options.cssUrl, function( css ) {
          CRM.civinky({pug: $scope.$parent.mailing.template_options.pug, css: css}).then(function(result){
            console.log()
            $scope.$parent.mailing.body_html = trustAndAddReplaceMethod(result)
            s = new String();
            $scope.$parent.mailing.body_html.replace = s.replace
            // $scope.$parent.mailing.body_html = 'This is safe and might be saved.'
        })
      });


      }catch (e) {
        CRM.alert(e)
      }
    }
    $scope.convert()
  })

  module.directive('crmMailingInkyCompose', function() {
    return {
      templateUrl: CRM.resourceUrls['civicrm-inky-compose'] + '/ang/inkyCompose.html',
      scope: {
        mailing: '='
      }
    };
  });





})(angular, CRM.$, CRM._);
