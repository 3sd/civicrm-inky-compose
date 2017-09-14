(function(angular, $, _) {
  // declare your module
  inkyCompose = angular.module('civicrm-inky-compose', ['ui.ace']);

  inkyCompose.controller('InkyComposeController', function($scope, $sce, crmApi){

    // Initialise the form
    if(!$scope.$parent.mailing.template_options.pug){
      $scope.$parent.mailing.template_options.pug = "container\n row\n  columns\n   h1 Hello World\n   p I am an email."
    }
    $scope.$parent.mailing.body_html = trustAndAddReplaceMethod($scope.$parent.mailing.body_html)

    // Call Civinky to convert the Pug and CSS into email friendly HTML
    $scope.convert = function(){
      try{
        CRM.civinky({pug: $scope.$parent.mailing.template_options.pug, css: $scope.css}).then(function(result){
          $scope.$parent.mailing.body_html = trustAndAddReplaceMethod(result)
        });
      }catch (e) {
        CRM.alert(e)
      }
    }
    $scope.convert()

    // Watch for changes to css, and convert the Pug again if it changes
    $scope.$watch('css', function(){
      $scope.convert()
    })

    // When a valid CSS URL has been passed to template_options.cssUrl, get the
    // CSS
    $scope.getCss = function(){
      if($scope.$parent.mailing.template_options.cssUrl && /\.css$/.test($scope.$parent.mailing.template_options.cssUrl)){
        $.get( $scope.$parent.mailing.template_options.cssUrl)
        .done(function(css){
          $scope.css = css
        })
        .fail(function(){
          $scope.css = ''
        })
      }else{
        $scope.css = ''
      }
    }
    $scope.getCss()

    // This function is needed because
    // 1) by default Angular will santize the html that Civinky returns, and
    // 2) crmApi wants to call the replace() method of mailing.body_html but the
    //    trusted HTML object does not have this method (so we clone it from
    //    a newString()). See CRM-18474 for more info.
    function trustAndAddReplaceMethod(value = ''){
      value = $sce.trustAsHtml(value)
      s = new String();
      value.replace = s.replace
      return value
    }
  })

  inkyCompose.directive('crmMailingInkyCompose', function() {
    return {
      templateUrl: CRM.resourceUrls['civicrm-inky-compose'] + '/ang/inkyCompose.html',
      scope: {
        mailing: '='
      }
    };
  });


})(angular, CRM.$, CRM._);
