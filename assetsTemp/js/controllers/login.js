'use strict';

app.controller('loginCtrl', ['$scope', 'tapNCultureService','$state','toastr','$localStorage', function($scope, tapNCultureService, $state, toastr,$localStorage) {
    
    console.log = function() {}
    console.log("Inside loginCtrl");
    $scope.obj = {};
    $scope.login = () => {
    	console.log($scope.obj)
        tapNCultureService.login($scope.obj).then((response) => {
                console.log(response);
                if(response.responseCode===200){
                    $localStorage.admin=response.data;
                    console.log("local storage"+JSON.stringify(response.data))                    
                    $state.go('header.dashBoard');
                    // $state.go('resetPassword');
                }
                else if(response.responseCode===400){
                    toastr.error(response.responseMessage,"Authentication Failed");
                }
            },
            (err) => {
                console.log(err)
            })
    }

    $scope.forgotPassword=()=>{
        let forgotPassObj={};
        forgotPassObj.email=$scope.forgotPassEmail;
        tapNCultureService.forgotPassword(forgotPassObj).then((response)=>{            
            console.log(response)
            if(response.responseCode===200){
                toastr.success('Mail Sent','Success');
                $scope.forgotPassEmail=""
                $scope.forgotPasswordForm.$setPristine(true);
            }
            else
                toastr.error(response.responseMessage,'Error');
        },(err)=>{
            toastr.error("Internal Error",'Error')
            console.log(err)
        })
    }
    $scope.openModal=()=>{
        $scope.forgotPassEmail="";
        $scope.forgotPasswordForm.$setPristine(true);
    }

}])