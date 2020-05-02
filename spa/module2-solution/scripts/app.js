(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

        toBuyList.checkOffItem = function (itemIndex) {
            ShoppingListCheckOffService.checkOffItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtList = this;

        alreadyBoughtList.items = ShoppingListCheckOffService.getItemsBought();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var itemsToBuy = [
            {name: 'cookies', quantity: '10 bags'},
            {name: 'chips', quantity: '5 bags'},
            {name: 'drinks', quantity: '10 bottles'},
            {name: 'candy', quantity: '4 bags'}];

        var itemsBought = [];

        service.getItemsToBuy = function () {
            return itemsToBuy;
        };

        service.getItemsBought = function () {
            return itemsBought;
        };

        service.checkOffItem = function (itemIndex) {
            itemsBought.push(itemsToBuy[itemIndex]);
            itemsToBuy.splice(itemIndex, 1);
        };
    }
})();