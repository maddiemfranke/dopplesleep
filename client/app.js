angular.module("dopplesleep", [
  "dopplesleep.datapoints",
  "dopplesleep.services",
  "ngRoute",
  "ui.bootstrap"
])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/query', {
      templateUrl: 'datapoints/query.html',
      controller: 'DataController'
    })
    .when('/datapoints/:id', {
      templateUrl: 'datapoints/data.html',
      controller: 'DataController',
    })
    .when('/registerDevice', {
      templateUrl: 'datapoints/registerdevice.html',
      controller: 'DataController',
    })
    .otherwise({
      redirectTo: "/"
    });

})

.controller("AppController", function ($scope, DataPoints) {

  $scope.formData = {};
  $scope.data = {};

   $scope.getData = function() {
    DataPoints.getData($scope.formData)
      .then(function(datapoints){
        $scope.data.datapoints = datapoints;
        $scope.formData = {}; //clear form data
        console.log($scope.data.datapoints);
      })
      .catch(function(error){
        console.log('ERROR: ', error);
      })
    }
    $scope.getData();

});
