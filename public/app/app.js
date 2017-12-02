var app = angular.module('app', []);

app.controller('pedidos', function($scope, $http){
	$scope.pedidos = [];

	$http.get('pedidos').then(function(result){
		$scope.pedidos = result.data;
	});
})