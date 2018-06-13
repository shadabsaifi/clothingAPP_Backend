'use strict';

app.controller('headerCtrl', ['$scope', 'tapNCultureService','$localStorage','$state','$location','toastr', function($scope, tapNCultureService,$localStorage,$state,$location,toastr) {

    // console.log = function() {}

    console.log("Inside headerCtrl");
    if ($localStorage.admin) {
        $scope.name = $localStorage.admin.name;
        $scope.profilePic = $localStorage.admin.profilePic;
    }

    $scope.logout = () => {
        $localStorage.$reset();
        $state.go('login')
        toastr.success("Successfully logout")    
            
    }
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
   };

}])