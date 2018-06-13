'use strict';
app.controller('viewUserCtrl', ['$scope', 'tapNCultureService', '$localStorage', '$state', 'toastr', function($scope, tapNCultureService, $localStorage, $state, toastr) {

    console.log = function() {}
    console.log('viewUserCtrl');
    console.log($localStorage.user._id)

    $scope.goBack = () => {
        delete $localStorage.user;
        $state.go('header.userMgmt')
    }

    let commonFunc = () => {
        tapNCultureService.getDetailsOfUser($localStorage.user).then((response) => {
            if(response.responseCode===200){
                $scope.obj = response.data[0];
                $scope.myLikes = response.data[0].myFavourite;	
            }
        }, (err) => {
            console.log(err)
        })
    }
    commonFunc();

    $scope.viewUser = (data) => {
        let obj={}
        obj.user=data.user._id;
        console.log(obj)
        tapNCultureService.viewUserFromView(obj).then((response) => {
            console.log(response)
            if(response.responseCode===200){
            	$scope.miniObj = response.data;	
            }
            // else{
            // 	toastr.error("Error due to bad network","Error")
            // }            
        }, (err) => {
            console.log(err)
        })
    }
    let finalDel;
    $scope.deleteUser = (data) => {
        finalDel={};
        finalDel = { user: data.user._id };
        if (data.user.status === "ACTIVE") {
            finalDel.status = "DELETED";
        } else if (data.user.status === "BLOCKED") {
            toastr.info("This user was blocked by Admin", "Info");
            finalDel.status = "BLOCKEDANDDELETED";
        } else if(data.user.status === "BLOCKEDANDDELETED") {
            finalDel.status = "BLOCKED";
        }else
        	finalDel.status="ACTIVE"
            $scope.value=finalDel.status;
    }

    $scope.finalDelete=()=>{
                tapNCultureService.deleteUserFromView(finalDel).then((response) => {
            if(response.responseCode===200){
                commonFunc();   
            }
            // else{
            //  toastr.error("Error due to bad network","error");
            // }
        }, (err) => {
            console.log(err)
        })
    }

}])