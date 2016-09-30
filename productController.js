'use strict';

productApp.controller('ProductController', ['$scope', '$filter', 'ProductService', function($scope, $filter, ProductService){
	$scope.categories = ['jeans', 'sarees', 'tops', 'pants', 'tshirts'];
	$scope.filterCategories = "";
	$scope.sortFields = [{
		value: 'price',
		displayText: 'Sort by Price'
	},{
		value: 'score',
		displayText: 'Sort by Score'
	}]
	
	$scope.setSortSelection = function(sortValue){	
		$scope.sortFieldSelection = sortValue;
	}
	
	$scope.toggleCategories = function(category){
		if($scope.filterCategories.contains(category)){
			$scope.filterCategories = $scope.filterCategories.split(category)[0].trim() + " " + $scope.filterCategories.split(category)[1].trim();
		}
		else{
			$scope.filterCategories += " " + category;
		}
	}
	
	$scope.categoryFilter = function(product){
		return ($scope.filterCategories.trim() != ""? $scope.filterCategories.contains(product.cat): true);
	}
	
	$scope.fetchProducts = function(){
		ProductService.fetchAllProducts()
			.then(
			function(data){ 
				if(data){ 
					$scope.productList = data.products;
					$scope.index = 9;
					$scope.productSize = 9;
				}
				else{
					console.log("Data not retrieved");
				}
			},
			function(errResponse){
				console.log(errResponse);
			});
	}
	
	$scope.fetchProducts();
}]);