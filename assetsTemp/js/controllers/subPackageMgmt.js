'use strict';
app.controller('subPackageMgmtCtrl', ['$scope', '$state', 'tapNCultureService', 'toastr', '$localStorage', function($scope, $state, tapNCultureService, toastr, $localStorage) {

    // console.log = function() {}
    $scope.currentPage = 1;
    $scope.currentPageSubs = 1;
    let obj = {},
        objSubs = {},
        temp = "",
        tempSubs = "";
    $scope.packageSearchDisabler = true;
    $scope.subsSearchDisabler = true;

    let reuseFn = () => {
        obj.page = $scope.currentPage
        $scope.a=($scope.currentPage-1)*5
        tapNCultureService.getAllPackages(obj).then((response) => {
            console.log("+++++++++++++++++++++++++++++++++++",response)
            if (response.responseCode === 200) {
                $scope.totalItems = response.data.total;
                $scope.itemsPerPage = response.data.limit;
                $scope.packageData = response.data.docs;
                console.log("data====>>>+++++++"+JSON.stringify($scope.packageData))
                if (response.data.docs.length === 0){
                    // return toastr.error("No data found", 'Error')
                }
            }
            else{
                toastr.error("Error due to bad network", "Error")
            }
        }, (err) => {
            console.log(err)
        })
    }
    reuseFn();

    $scope.newPage = () => {
        reuseFn();
        console.log("Control is here", $scope.currentPage);
    }

    $scope.packageSearchFn = () => {
        //console.log(temp, "[[[[]]]]", $scope.packageSearch)
        console.log("$scope.packageSearch==>",$scope.packageSearch)
        if ($scope.packageSearch === temp) {
            // console.log("here")            
            $scope.currentPage = 1;
            obj.filterWord = $scope.packageSearch;
            $scope.packageSearchDisabler = true
            reuseFn();
        }
        // else if (!$scope.packageSearch) {
        //     obj.filterWord = '';
        //     reuseFn();
        //     $scope.packageSearchDisabler = true;
        //     return toastr.error("No Input to Search", 'Error')
        // } else {
        //     $scope.currentPage = 1;
        //     obj.filterWord = $scope.packageSearch;           
        //     $scope.packageSearchDisabler = false;
        //     reuseFn();
        // }
    }

    $scope.validation1 = () => {
         console.log("ng-change",$scope.packageSearch)
        if ($scope.packageSearch) {
            temp = $scope.packageSearch;
            //console.log(temp);
            $scope.packageSearchDisabler = false;
        } else {

            obj.filterWord = '';
            reuseFn();
            $scope.packageSearchDisabler = true;
            return toastr.error("No Input to Search", 'Error')
        }
    }

    $scope.subsAndTransSearchFn = () => {
        if ($scope.subsAndTransSearch === tempSubs) {
            $scope.currentPageSubs = 1;
            objSubs.filterWord = $scope.subsAndTransSearch;
            reuseFn2()
            $scope.subsSearchDisabler = true;

        }

    }


    $scope.validation2 = () => {
        //  console.log("ng-change",$scope.packageSearch)
        if ($scope.subsAndTransSearch) {
            tempSubs = $scope.subsAndTransSearch;
            // console.log(tempSubs);
            $scope.subsSearchDisabler = false;
        } else {
            // console.log("Thenga")
            objSubs.filterWord = '';
            reuseFn2();
            $scope.subsSearchDisabler = true;
            // return toastr.error("No Input to Search", 'Error')
        }
    }

    $scope.viewPackage = (data) => {
        console.log("viewPackage", data)
        $localStorage.package = data;
        console.log($localStorage)
        $state.go('header.viewPackage')
    }
    let pck;
    $scope.deletePackage = (data) => {
        console.log("data",data)
        pck = {};
        pck = data;
        console.log("here deletePackage", data)
        // let tellUser = confirm('Are you sure you want to delete this package.')
        // if (tellUser) {

        // } else {
        //     console.log("cancelled")
        // }
    }

    $scope.finalDelete = () => {
        tapNCultureService.deletePackage(pck).then((response) => {
            // console.log(response)
            if (response.responseCode === 200) {
                $scope.currentPage = 1;
                obj.filterWord = '';
                reuseFn();
                toastr.success('Package Deleted', "Success")
            }
            // else{
            //     toastr.error("Error due to bad network", "Error")
            // }
        }, (err) => {
            console.log(err)
        })
    }

    let reuseFn2 = () => {        
        $scope.b=($scope.currentPageSubs-1)*5
        tapNCultureService.getAllTransactions(objSubs, $scope.currentPageSubs).then((response) => {
            if (response.responseCode === 200) {
                $scope.subsData = response.data.docs;
                $scope.totalItemsSubs = response.data.total;
                $scope.itemsPerPageSubs = response.data.limit;
                // if (response.data.docs.length === 0)
                //     return toastr.error("No data found", 'Error')
            }
            // else{
            //     toastr.error("Error due to bad network", "Error")
            // }
        }, err => {
            console.log(err);
        })
    }
    reuseFn2();

    $scope.newPageSubs = () => {
        reuseFn2();
    }

    $scope.viewTransaction = (data) => {
        // alert("@@"+JSON.stringify(data))
        $scope.viewThisTrans = data;
    }

    $scope.packagesTable = true;
    $scope.package = () => {
        $scope.packagesTable = true;
        $scope.subsAndTransTable = false;
    }
    $scope.subsAndTrans = () => {
        $scope.subsAndTransTable = true;
        $scope.packagesTable = false;
    }
    $scope.addNewPackView = () => {
        console.log("kdsgkdsgnk")
        $state.go('header.addNewPackage')
    }

}]);