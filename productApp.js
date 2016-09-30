/**
 * http://usejsdoc.org/
 */
'use strict';

var productApp = angular.module("productApp", []);

productApp.directive("productList", function($document, $window){
	return{
		restrict: 'E',
		transclude : true,
		template: 	'<div class="resultCounter">Displaying {{index}} of {{productList.length}} results</div>' + 
					'<ul class="productGrid"><li ng-repeat = "product in productSubList | orderBy: sortFieldSelection" class="productGridElement">' + 
					'<div class="productClass">' +
					'<div class = "productIcon">' +
					'<img src="product.img"/>' +
					'</div>' +
					'<div class ="contentClass">' +
					'<label class="productLabel"><h2>{{ product.name }}</h2></label>' +
					'<span class="categoryClass">{{product.cat}}</span>' +
					'<div class="priceClass">{{ product.price | currency }}</div>' +
					'<div class="scoreClass">{{product.score | number: 4}}</div>' +
					'</div>' + 
					'</div></li></ul>' +
					'<div ng-if="moreItemsPresent()" ng-cloak class="loadingClass">Loading...</div>' +
					'<a href="" id="showMeLink"  ng-hide="true" ng-click="addMoreItems()">Show me more...</a>',
		link: function(scope, elem, attrs){
			$document.bind('scroll', function () {
				if($(document).height() - $(window).height() == $(window).scrollTop())
				{
					document.getElementById("showMeLink").click();
				}
			});
		}
	}
});