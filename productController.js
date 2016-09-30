'use strict';

productApp.controller('ProductController', ['$scope', '$filter', 'ProductService', function($scope, $filter, ProductService){
	$scope.categories = ['jeans', 'sarees', 'tops', 'pants', 'tshirts'];
	self.filterCategories = "";
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
		if(self.filterCategories != "" && self.filterCategories.indexOf(category) != -1){
			self.filterCategories = self.filterCategories.split(category)[0].trim() + " " + self.filterCategories.split(category)[1].trim();
		}
		else{
			self.filterCategories += " " + category;
		}
	}
	
	$scope.categoryFilter = function(product){
		return (self.filterCategories.trim() != ""? self.filterCategories.indexOf(product.cat) != -1 : true);
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