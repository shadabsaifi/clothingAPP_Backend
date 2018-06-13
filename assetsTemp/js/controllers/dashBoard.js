'use strict'
app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, {
                $files: event.target.files
            });
        });
    };

    return {
        link: fn_link
    }
}])

app.controller('dashBoardCtrl', ['$scope', '$localStorage', 'tapNCultureService', '$q', '$http', function ($scope, $localStorage, tapNCultureService, $q, $http) {

    // console.log = function() {}
    console.log($localStorage);
    // alertify.success("Success! Welcome to dashBoard")
    tapNCultureService.activeUsers().then((response) => {
        if (response.responseCode === 200) {
            $scope.activeUsers = response.data;
        }
        console.log(response);
    }, (err) => {
        console.log(err)
    })

    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        console.log($files)
        angular.forEach($files, function (value, key) {
            console.log("66666666666", value, "222222222", key)
            formdata.append("yyzz", value);
        });
        formdata.append("aabb", {
            name: "user",
            role: "admin"
        })
    };

    $scope.uploadFiles = function () {
        var request = {
            method: 'POST',
            url: 'http://localhost:4646/admin/tempRoute',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }
        console.log(request)
        $http(request)
            .success(function (d) {
                alert(d);
            })
            .error(function () {});
    }
    tapNCultureService.totalCollection().then((response) => {
        if (response.responseCode == 200) {
            console.log("response.data@@@@@@@@@@@@@@@@@@@@",response.data)
            if (response.data == 0) {
                $scope.data = response.data
            } else {
                $scope.data = response.data
            }
        }
    })

}]);