angular.module("dopplesleep.services",[])

.factory("DataPoints", function($http) {
  // get all data for specific device
  var getData = function (id) {
    return $http({
      method: "GET",
      url: "/api/datapoints/" + id,
    })
    .then(function (res) {
      return res.data
    })
  }
  return {
    getData: getData,
  }
})
