(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];


function LunchCheckController($scope) {
  $scope.items = "";
  $scope.result = "";
  // $scope.textColor = "black";
  
  $scope.processItems = function () {
    console.log("button pressed");
    console.log($scope.items);
    console.log($scope.result);
    var itemCount = 0;
    if(!$scope.items){
      itemCount = 0;    
    }
    else {
      itemCount = nonEmptyItemCounter($scope.items);
    }

    if(itemCount == 0){
      $scope.result = "Please enter data first";
      $scope.textColor = "red";
    } else if(itemCount <= 3) {
        $scope.result = "Enjoy!";
        $scope.textColor = "green";
    } else {
        $scope.result = "Too much!";
        $scope.textColor = "green";
    }
  };

  function nonEmptyItemCounter(items){
    var itemlist = items.split(",");
    return itemlist.filter(x =>  (x && x.trim())).length;
  }
}

})();
