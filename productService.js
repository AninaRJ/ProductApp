'use strict';

productApp.factory("ProductService", ['$http', '$q', function($http, $q){
	return {
		
		fetchAllProducts: function(){
			return $http({
				method: 'GET',
				url: 'https://test-prod-api.herokuapp.com/products',
				cache: true
			}).then(
				function(response){
					if(typeof response == 'object'){
						return response.data;
					}
					else{
						$q.reject(response);
					}
				},
				function(response){
					$q.reject(response);
				}
			);
		}
	}
}]);