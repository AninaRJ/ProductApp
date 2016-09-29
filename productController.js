'use strict';

productApp.controller('ProductController', ['$scope', 'ProductService', function($scope, ProductService){
	$scope.categories = ['', 'jeans', 'sarees', 'tops', 'pants', 'tshirts'];
	$scope.filterCategories = "";
	
	$scope.fetchProducts = function(){
		ProductService.fetchAllProducts()
			.then(
			function(data){ 
				if(data){ 
					$scope.productList = data.products;
					$scope.index = 0;
					$scope.productSize = 9;
					$scope.productSubList = [];
					$scope.addMoreItems();
					$scope.loadItems = true;
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
	
	$scope.addMoreItems = function(){
		
		for(var i =$scope.index;i< ($scope.index + 9); i++){
			if($scope.index <= $scope.productList.length){
				$scope.productSubList.push($scope.productList[i]);
			}
			else{
				return;
			}
		}
		$scope.index += $scope.productSize;
	}
}]);