var app = angular.module('Swiggy', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/restaurants', {
		templateUrl: 'swiggy-demo/restaurants.html',
		controller: 'RestaurantsCtrl'
	})
	.when('/restaurant/:name', {
		templateUrl: 'swiggy-demo/menu.html',
		controller: 'MenuCtrl'
	});

	$routeProvider.otherwise({
		redirectTo: '/restaurants'
	});
});

app.controller('RestaurantsCtrl', function($scope, $http, $window){
	$window.document.title = "Restaurants";
	$http.get('swiggy-demo/swiggy-demo.json').then((response) => {
		$scope.restaurants = response.data.restaurants;
	});
});

app.controller('MenuCtrl', function($window, $scope, $http, $routeParams){
	$http.get('swiggy-demo/swiggy-demo.json').then((response) => {
		angular.forEach(response.data.restaurants, (restaurant, index) => {
			if(restaurant.name == $routeParams.name){
				$scope.restaurant = restaurant;
				$window.document.title = $routeParams.name;
			}
		});
	});
	$scope.removeItemFromCart = function(item){
		if(item.cart_quantity > 1){
			item.cart_quantity -= 1;
		}else{
			item.cart_quantity = 0;
		}
	};
	$scope.addItemToCart = function(item){
		item.cart_quantity += 1;
		console.log($scope.restaurant.items);
	};
});