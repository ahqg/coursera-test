(function (){
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'menuItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var menu = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowDown = this;

        narrowDown.errorState = false;

        narrowDown.searchForItem = function() {
            if(!(narrowDown.searchTerm && narrowDown.searchTerm !== "")) {
                narrowDown.errorState = true;
                narrowDown.found = [];
            }
            else {
                MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm)
                .then(function(result) {
                    narrowDown.found = result;
                    if(narrowDown.found.length === 0) {
                        narrowDown.errorState = true;
                    }
                    else {
                        narrowDown.errorState = false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });   
            }        
        };

        narrowDown.removeItem = function(itemIndex) {
            narrowDown.found.splice(itemIndex, 1);
            if(narrowDown.found.length === 0){
                narrowDown.errorState = true;
            }
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            })
            .then(function(result) {
                var foundItems = result.data.menu_items.filter(function(item) {
                    return (item.description.toLowerCase().indexOf(searchTerm) !== -1);
                });

                return foundItems; 
            })
            .catch(function(error) {
                console.log(error);
            });
        };
    }
})();