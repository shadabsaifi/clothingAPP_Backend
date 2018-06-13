'use strict';
app.controller('viewPremiumCtrl', ['$scope', '$state', 'tapNCultureService','toastr','$localStorage', function($scope, $state, tapNCultureService,toastr,$localStorage) {

	console.log = function() {}
	console.log("viewPremiumCtrl")
	$scope.obj=$localStorage.package;

	$scope.cancel=()=>{
		delete $localStorage.package;
		$state.go('header.premiumList')
	}

}])