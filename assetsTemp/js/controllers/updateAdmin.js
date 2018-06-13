'use strict';
app.controller('updateAdminCtrl', ['$scope', '$localStorage', '$state', 'tapNCultureService','toastr', function($scope, $localStorage, $state, tapNCultureService,toastr) {
    
    // console.log = function() {}
    // console.log("updateAdminCtrl"+JSON.stringify($localStorage.admin))
    $scope.obj2 = {};
    $scope.obj2 = $localStorage.admin;
       console.log("updateAdminCtrl"+JSON.stringify($localStorage))
    // $scope.obj2._id = $localStorage._id;
    // console.log("gjkhrghtrhtiuhreitr"+ $scope.obj2+"typeOF---"+typeof $scope.obj2)
    // console.log($scope.obj)
    
    // console.log("hello"+JSON.stringify($scope.obj2))


    tapNCultureService.adminDetail($scope.obj2).then((response) => {

        if (response.responseCode === 200) {
        $scope.obj2=response.data[0]
    
        }
         else{
            toastr.error("Error due to bad network", "Error")
        }
    }, (err) => {
        console.log(err)
    })



    $scope.save = () => {
        console.log("heloo0ooooooooooooo",$scope.obj2);
        $scope.obj2.location = document.getElementById('address').value;
        
        if ($scope.packageImage) {
            $scope.obj2.profilePic = $scope.packageImage;
        }
        // $scope.obj2._id = $scope.obj._id;
       
        tapNCultureService.updateAdmin($scope.obj2).then((response) => {
            console.log("response"+JSON.stringify(response))
            if (response.responseCode === 200) {
                console.log("@@@===>",response.data.phoneNumber)
                $localStorage.admin.name=response.data.name;
                $localStorage.admin.profilePic=response.data.profilePic;
                $localStorage.admin.phoneNumber=response.data.phoneNumber;
                $localStorage.admin.location=response.data.location;
                // console.log(response)
                toastr.success("Admin Updated","Success");
                $state.go('header.viewAdminProfile',{},{reload:'header'});
            }
        }, (err) => {
            console.log(err);
        })
        // ({token,...temp}=temp);
    }




    $scope.goBack = () => {
        // $scope.obj2 = {};
        $scope.packageImage = "";
        // $scope.$apply();
        $state.go('header.viewAdminProfile');
    }
    $scope.abcd = true;
    $scope.data = {};
    $scope.click = function() {
        $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
    }
    var fileSelect = document.createElement('input');
    fileSelect.type = 'file';
    fileSelect.accept = 'image/*'
    if (fileSelect.disabled) {
        return;
    }

    $scope.click = function() {
        console.log("over here")
        if (!$scope.packageImage) {
            $scope.imageValue = true;
        }
        fileSelect.click();
    }
    fileSelect.onchange = function() {
        var f = fileSelect.files[0],
            r = new FileReader();
        r.onloadend = function(e) {
            // console.log("control is here");
            //  if(e.target.result){
            $scope.packageImage = e.target.result;
            // console.log($scope.obj.packageImage)             
            //  }
            // if ($scope.obj.packageImage) {
            //     $scope.abcd = false;
            //     $scope.imageValue = false;
            // } else {
            //     $scope.imageValue = true;
            // }            
            $scope.$apply();
            // console.log($scope.data.b64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")); //replace regex if you want to rip off the base 64 "header" 
        }
        if (f)
            r.readAsDataURL(f);
    };

    //  obj = $localStorage.admin.email
		
    

    function initMap() {
           
        var input = document.getElementById('address');
        
        new google.maps.places.Autocomplete(input);

    }
    
    initMap();
}])