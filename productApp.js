/**
 * http://usejsdoc.org/
 */
'use strict';

var productApp = angular.module("productApp", []);

productApp.directive("productList", function($document, $window){
	return{
		restrict: 'E',
		transclude : true,
		template: '<ul class="productGrid"><li ng-repeat = "product in productSubList">' + 
					'<div class="productClass">' +
					'<div class = "productIcon">' +
					'<img src="product.img"/>' +
					'</div>' +
					'<div class ="contentClass">' +
					'<label><h2>{{ product.name }}</h2></label>' +
					'<span class="categoryClass">{{product.cat}}</span>' +
					'<div class="priceClass">{{ product.price | currency }}</div>' +
					'<span class="scoreClass">{{product.score}}</span><br/>' +
					'</div></div></li></ul>' +
					'<div ng-if="index<productList.length" class="loadingClass">Loading...</div>' +
					'<a href="" id="showMeLink" ng-hide="true" ng-click="addMoreItems()">Show me more...</a>',
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