/**
 * http://usejsdoc.org/
 */
'use strict';

var productApp = angular.module("productApp", []);

productApp.directive("productList", function($document, $window){
	return{
		restrict: 'E',
		template: 	'{{index}}<ul class="productGrid"><li ng-repeat = "product in productList | filter:categoryFilter | orderBy: sortFieldSelection | limitTo:index" ' +
					'class="productGridElement">' + 
						'<div class="productClass">' +
							'<div class = "productIcon">' +
								'<img src="{{product.img}}"/>' +
							'</div>' +
						'<div class ="contentClass">' +
							'<label class="productLabel"><h2>{{ product.name }}</h2></label>' +
							'<span class="categoryClass">{{product.cat}}</span>' +
							'<div class="priceClass">{{ product.price | currency }}</div>' +
							'<div class="scoreClass">{{product.score | number: 4}}</div>' +
						'</div>' + 
					'</div></li></ul>',
		link: function(scope, elem, attrs){
			$document.bind('scroll', function () {
				if($(document).height() - $(window).height() == $(window).scrollTop())
				{
					scope.$apply(function () {
						scope.index = scope.index + 9;
					});
				}
			});
		}
	}
});