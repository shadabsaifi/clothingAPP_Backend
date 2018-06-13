'use strict';
app.controller('viewAdminProfileCtrl',['$scope','tapNCultureService','$localStorage','$state',function($scope,tapNCultureService,$localStorage,$state){

	console.log = function() {}
	console.log("viewAdminProfileCtrl")
	$scope.obj=$localStorage.admin;
	// $scope.obj.location=""

	console.log("Admin Data =========="+JSON.stringify($scope.obj))

	$scope.update=()=>{
		console.log($localStorage.admin)
		// alert("dfghjkl")
		$state.go('header.updateAdmin')
	}

	$scope.goBack=()=>{ 
		$state.go('header.dashBoard')
	}

	
		 let obj = $localStorage.admin.email
		
		tapNCultureService.adminDetail(obj).then((response) => {
	
			if (response.responseCode === 200) {
			$scope.data=response.data[0]
		
			}
			 else{
				toastr.error("Error due to bad network", "Error")
			}
		}, (err) => {
			console.log(err)
		})

}])