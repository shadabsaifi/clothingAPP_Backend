'use strict';
app.controller('addPremiumPackageCtrl', ['$scope', '$localStorage', 'tapNCultureService', 'toastr','$state', function($scope, $localStorage, tapNCultureService, toastr,$state) {

    console.log = function() {}
    console.log("Add New package Ctrl")
    $scope.obj = {};   
    
    $scope.savePackage = () =>{
        $scope.obj._id = $localStorage.admin._id
        // alert(JSON.stringify($scope.obj._id))
        tapNCultureService.addPremiumAccount($scope.obj).then((response) => {
            // alert(JSON.stringify(response));
            if (response.responseCode === 200) {
                toastr.success("Package Saved!","Success")
                $scope.obj = {};
                $scope.obj.packageImage =""
                // $scope.addPremiumAccount.$setPristine(true);
                console.log($scope.$$phase)
                // if($scope.$$phase){
                //     console.log($digest);
                //     console.log($apply)
                // }
                $state.go('header.premiumList',{},{reload:'header.premiumList'});
            }
        }, (err) => {
            console.log(err)
        })
        console.log("back")
       window.history.back();
    }
    // $scope.savePackage = () => {

    //     $scope.obj._id = $localStorage.admin._id
    //     console.log($scope.obj)
    //     tapNCultureService.addPremiumAccount($scope.obj).then((response) => {
    //         console.log(response);
    //         if (response.responseCode === 200) {
    //             toastr.success("Package Saved!","Success")
    //             $scope.obj = {};
    //             $scope.obj.packageImage =""
    //             $scope.addPremiumAccount.$setPristine(true);
    //             console.log($scope.$$phase)
    //             // if($scope.$$phase){
    //             //     console.log($digest);
    //             //     console.log($apply)
    //             // }
    //             $state.go('header.premiumList',{},{reload:'header.premiumList'});
    //         }
    //     }, (err) => {
    //         console.log(err)
    //     })
    // }
    $scope.abcd = true;
    $scope.data = {}; //init variable
    $scope.click = function() { //default function, to be override if browser supports input type='file'
        $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
    }
    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';
    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
        return;
    }

    $scope.click = function() { //activate function to begin input file on click
        console.log("over here")
        if(!$scope.obj.packageImage){
            $scope.imageValue = true;
        }        
        fileSelect.click();
    }
    fileSelect.onchange = function() { //set callback to action after choosing file        
        var f = fileSelect.files[0],
            r = new FileReader();
        r.onloadend = function(e) { //callback after files finish loading
            // console.log("control is here");
            //  if(e.target.result){
            $scope.obj.packageImage = e.target.result;
            // console.log($scope.obj.packageImage)             
            //  }
            if ($scope.obj.packageImage) {
                $scope.abcd = false;
                $scope.imageValue = false;
            } else {
                $scope.imageValue = true;
            }            
            $scope.$apply();
            // console.log($scope.data.b64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")); //replace regex if you want to rip off the base 64 "header" 
            //here you can send data over your server as desired
        }
        if (f)
            r.readAsDataURL(f); //once defined all callbacks, begin reading the file
    };

}])