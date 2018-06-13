'use strict';

app.controller('imageUploadCtrl', ['$scope','tapNCultureService', function($scope,tapNCultureService) {    

    console.log = function() {}
    // $scope.obj = {};
    console.log("In imageUploadCtrl")
    // $scope.uploadImage = () => {
    //     console.log($scope.obj)
    // }

    // $scope.uploadavtar = function(files) {
    //     //var fd = new FormData();
    //     //Take the first selected file
    //     //fd.append("file", files[0]);

    //     var imagefile = document.querySelector('#file');
    //     console.log(imagefile);
    //     if (imagefile.files && imagefile.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function(e) {
    //             console.log("result is here", e)
    //             $('#temp_image')
    //                 .attr('src', e.target.result);
    //         };
    //         console.log("1", imagefile.files[0]);
    //         reader.readAsDataURL(imagefile.files[0]);
    //         //console.log("testWords",reader.readAsDataURL(imagefile.files[0]))
    //         this.imagefile = imagefile.files[0];
    //         console.log("2", imagefile.files[0]);
    //         console.log("3", this.imagefile);
    //     } else {
    //         console.log("Image not selected");
    //     }


    // }

    $scope.data = {}; //init variable
    $scope.click = function() { //default function, to be override if browser supports input type='file'
       // console.log("1111111")
        $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
    }

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
        return;
    }

    $scope.click = function() { //activate function to begin input file on click
        fileSelect.click();
    }

    fileSelect.onchange = function() { //set callback to action after choosing file
        var f = fileSelect.files[0],
            r = new FileReader();

        r.onloadend = function(e) { //callback after files finish loading
            $scope.data.b64 = e.target.result;
            $scope.$apply();
           // console.log($scope.data.b64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")); //replace regex if you want to rip off the base 64 "header" 
            //here you can send data over your server as desired
        }
        if(f)
        r.readAsDataURL(f); //once defined all callbacks, begin reading the file
    };
        let a=[];
    $scope.addImage=()=>{

        a.push($scope.data.b64)
        console.log(a);
        for(let x of a)
        console.log(x.substring(0,20))
    }

    $scope.uploadImageToCld=()=>{
        let obj={};obj.image=$scope.data.b64;
        console.log(obj)
        tapNCultureService.tempCld(obj).then((response)=>{
            console.log(response);
        })
    }

}]);

app.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);



//--------------
// <div ng-controller="MyCtrl">

//     <div ng-repeat="step in stepsModel">
//         <img class="thumb" ng-src="{{step}}" />
//     </div>
    
//     <input type='file' ng-model-instant onchange="angular.element(this).scope().imageUpload(event)" multiple />

// </div>



// var myApp = angular.module('myApp',[]);


// function MyCtrl($scope) {
//     $scope.stepsModel = [];

//     $scope.imageUpload = function(event){
//          var files = event.target.files; //FileList object
         
//          for (var i = 0; i < files.length; i++) {
//              var file = files[i];
//                  var reader = new FileReader();
//                  reader.onload = $scope.imageIsLoaded; 
//                  reader.readAsDataURL(file);
//          }
//     }

//     $scope.imageIsLoaded = function(e){
//         $scope.$apply(function() {
//             $scope.stepsModel.push(e.target.result);
//         });
//     }
// }