angular.module("dopplesleep.datapoints", [])

.controller("DataController", function ($scope, DataPoints, Devices) {

  $scope.ssid = {};
  $scope.password = {};
  $scope.deviceID = {};
  $scope.formData = {};
  $scope.data = {};

  $scope.getData = function() {
    DataPoints.getData($scope.formData.text)
    .then(function(dopplesleeps){
      $scope.data.datapoints = dopplesleeps;
      console.log($scope.data.datapoints);
      var itemsFormatted = [];
      $scope.data.datapoints.forEach((dopplesleep) => {
          itemsFormatted.push({
              qData: dopplesleep.qData,
              iData: dopplesleep.iData,
              time: dopplesleep.time,
              deviceID: dopplesleep.deviceID
          });
      });
      var headers = {
          qData: "qData",
          iData: "iData",
          time: "Time Stamp",
          deviceID: "Device ID"
      };
      var fileTitle = 'data';
      if($scope.formData.text.length > 0){
        exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile()
      }
      $scope.formData = {}; //clear form data
    })
    .catch(function(error){
      console.log('ERROR: ', error);
    })
  }

  $scope.registerDevice = function() {
    Devices.registerDevice($scope.ssid.text, $scope.password.text, $scope.deviceID.text)
    console.log('here');
    $scope.ssid = {};
    $scope.password = {};
    $scope.deviceID = {};
  }

});

function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

//from https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2
function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }
    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
