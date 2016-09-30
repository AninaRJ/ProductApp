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
	alert(category)
		if($scope.filterCategories.contains(category)){
			$scope.filterCategories = $scope.filterCategories.split(category)[0].trim() + " " + $scope.filterCategories.split(category)[1].trim();
		}
		else{
			$scope.filterCategories += " " + category;
		}
		$scope.sortFieldSelection = '';
		$scope.productSubList = [];
		$scope.index = 0;
		$scope.addMoreItems();
	}
	
	$scope.moreItemsPresent = function(){
		var totalLength = 0;
		
		if($scope.filterCategories == ""){
			totalLength = $scope.productList.length;
		}
		else{
			totalLength = $scope.filterSubList.length;
		}
		
		return($scope.index < totalLength - 1);
	}

	
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
			// If no filter categories are provided
		if($scope.filterCategories == ""){
			// Easy peasy : take from the sublist and display
			
			for(var i = $scope.index; i < ($scope.productSize + $scope.index) ; i++){
				if(i < $scope.productList.length){
					$scope.productSubList.push($scope.productList[i]);
				}
				else{
					$scope.index = $scope.index + (i - $scope.index);
					return;
				} // exceeded the main list
			}
			$scope.index = $scope.index + $scope.productSize;
		}
		else{
			// When a filter category is on
			$scope.filterSubList = $filter('filter')($scope.productList, $scope.filterCategories.trim());
			alert($scope.filterCategories)
			
			for(var i = $scope.index; i < ($scope.productSize + $scope.index) ; i++){
				if(i < $scope.filterSubList.length){
					$scope.productSubList.push($scope.filterSubList[i]);
				}
				else{ 
					$scope.index = $scope.index + (i - $scope.index);
					return;
				} // exceeded the main list
			}
			$scope.index = $scope.index + $scope.productSize;
		}
	}
}]);