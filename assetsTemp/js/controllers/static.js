'use strict';
app.controller('staticCtrl', ['$scope', 'tapNCultureService', 'toastr', '$state', function($scope, tapNCultureService, toastr, $state) {
    let statics, fetchedData = {};
    console.log = function() {}
    $scope.data = {
        textInput: '1234',
        options: {
            language: 'en',
            allowedContent: true,
            entities: false
        }
    };

    let commonGetStatic = () => {
        tapNCultureService.getStaticContent().then((response) => {
            console.log(response)
            if (response.responseCode === 200) {
                fetchedData = response.data[0];
                $scope.aboutUsCreatedAt = (new Date(fetchedData.aboutUsCreatedAt)).toLocaleString();
                $scope.contactUsCreatedAt = (new Date(fetchedData.contactUsCreatedAt)).toLocaleString();
                $scope.termsAndServicesCreatedAt = (new Date(fetchedData.termsAndServicesCreatedAt)).toLocaleString();
                // $scope.helpCenterCreatedAt = (new Date(fetchedData.helpCenterCreatedAt)).toLocaleString();
                // $scope.privacyPolicyCreatedAt = (new Date(fetchedData.privacyPolicyCreatedAt)).toLocaleString();
                // $scope.termsDataPolicyCookieCreatedAt = (new Date(fetchedData.termsDataPolicyCookieCreatedAt)).toLocaleString();
                // $scope.vipSubscriptionsCreatedAt = (new Date(fetchedData.vipSubscriptionsCreatedAt)).toLocaleString();
            }
            // else {
            //     toastr.error("Error due to bad network", "Error")
            // }
            console.log(fetchedData);
        }, (err) => {
            console.log(err)
        })
    }
    commonGetStatic();

    $scope.save = () => {
        let obj = {};
        obj.field = "";
        obj.data = $scope.data.textInput;
        obj._id = fetchedData._id;
        console.log(obj);

        if ($scope.whichStatic === "aboutUs") {
            obj.field = $scope.whichStatic;
        } else if ($scope.whichStatic === "contactUs") {
            obj.field = $scope.whichStatic;
        } else {
            obj.field = $scope.whichStatic;
        }
        console.log(obj)

        tapNCultureService.updateStaticContent(obj).then((response) => {
            if (response.responseCode === 200) {
                commonGetStatic();
                $state.go('header.static', {}, { reload: 'header.static' })
            }
            // else {
            //     toastr.error("Error due to bad network", "Error");
            // }
        }, (err) => {
            console.log(err);
        })

        console.log($scope.data)
        console.log($scope.data.textInput)
    }

    $scope.table = true;
    $scope.visibility = (data) => {
        $scope.whichStatic = data;

        if ($scope.whichStatic === "aboutUs") {
            $scope.data.textInput = fetchedData.aboutUs;
        } else if ($scope.whichStatic === "contactUs") {
            $scope.data.textInput = fetchedData.contactUs;
        } else {
            $scope.data.textInput = fetchedData.termsAndServices;
        }
        //statics = data
        $scope.editOnOff = !$scope.editOnOff;
        $scope.table = !$scope.table;
    }
    let finalDel;
    $scope.delete = (data) => {
        finalDel = {};
        finalDel.type = data
        $scope.staticValue=data;
    }

    $scope.finalDelete = () => {
        tapNCultureService.deleteStaticContent(finalDel).then((response) => {
            if (response.responseCode === 200) {
                toastr.success("Content Deleted", "Success")
                commonGetStatic();
            }
            // else{
            //     toastr.error("Error due to bad network", "Error");
            // }
        }, (err) => {
            console.log(err)
        })

    }

}]);