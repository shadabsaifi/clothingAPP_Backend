'use strict';
app.controller('viewBoostCtrl', ['$scope', '$state', 'tapNCultureService','toastr','$localStorage', function($scope, $state, tapNCultureService,toastr,$localStorage) {

	console.log = function() {}
	console.log("viewPackageCtrl")
	$scope.obj=$localStorage.package;

	$scope.cancel=()=>{
		delete $localStorage.package;
		$state.go('header.boostList')
	}

}])