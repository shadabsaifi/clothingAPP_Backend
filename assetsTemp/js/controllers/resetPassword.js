'use strict';

app.controller('resetCtrl', ['$scope', 'tapNCultureService','$state','toastr','$localStorage', function($scope, tapNCultureService, $state, toastr,$localStorage) {
    
    // console.log = function() {}
    $scope.obj = {
        password:'',
        id:$state.params.id
    };

    $scope.reset = () => {
        // alert("@@@@@@@@@@")
        // console.log("in reset")
        // alert("=========+>>>>>"+JSON.stringify($scope.obj))
        tapNCultureService.resetPassword($scope.obj).then((response) => {
            console.log("=========+>>>>>"+JSON.stringify(response))
                if(response.responseCode === 200){
                    $localStorage.admin=response.data;
                    toastr.success("Password successfully change.")                    
                    $state.go('login');
                }
                else if(response.responseCode === 400){
                    toastr.error(response.responseMessage,"Authentication Failed");
                }
            },
            (err) => {
                console.log(err)
            })
    }

}])
