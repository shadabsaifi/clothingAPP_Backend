'use strict'
app.controller('userMgmtCtrl', ['$scope', 'tapNCultureService', 'toastr', '$state', '$localStorage', function($scope, tapNCultureService, toastr, $state, $localStorage) {

    let tellUser;
    // $scope.totalItems=11;
    $scope.currentPage = 1;
    // $scope.itemsPerPage=2;
    let obj = {},   //obj has global scope.
        temp = ''; //temp=''; since then it will violate a use case as then undefined===undefined it will give. hence initialize it to ''.
    $scope.toggleSearchButton = true;
    // console.log = function() {}

    let commonFunc = () => {
        obj.page = $scope.currentPage;
        $scope.index=($scope.currentPage-1)*5
        console.log(obj);
        tapNCultureService.getAllUsers(obj).then((response) => {
            console.log(response)
            if (response.responseCode === 200) {
                if (response.data.total === 0) {
                    // toastr.error("No Data", "Error")
                }
                $scope.totalItems = response.data.total;
                $scope.itemsPerPage = response.data.limit;
                $scope.userData = response.data.docs;
            }
            else {
                toastr.error("Error due to bad newtwork", "Error")
            }
        }, (err) => {
            console.log("error")
        })
    }
    commonFunc();

    let finalBlocUn
    $scope.blockUnblockUser = (data) => {
        console.log(data)
        let obj = {}        //this obj has scope within this block only.
        obj._id = data._id;
        finalBlocUn={};
        tellUser = false;

        if (data.status === "ACTIVE")
            obj.status = "BLOCKED";
        else if (data.status === "DELETED" || data.status === "BLOCKEDANDDELETED")
            return toastr.error("You cannot unblock a deleted user", "Error");
        else if (data.status === "BLOCKED")
            obj.status = "ACTIVE"
        $scope.valueBlockUnblock=obj.status;
        finalBlocUn=obj;
        // tellUser = confirm(`Are you sure want to ${obj.status} this user`)
        // if (tellUser) {
        //     console.log(obj)

        // } else {
        //     console.log("cancelled");
        // }
    }

    $scope.finalBlockUnblock = () => {
        console.log(finalBlocUn)
        tapNCultureService.blockUnblock(finalBlocUn).then((response) => {
                if (response.responseCode === 200) {
                    commonFunc();
                    console.log(response)
                }
                // else {
                //     toastr.error("Error due to bad network", "Error")
                // }
            },
            (err) => {
                console.log(err)
            })
    }

    let finalDel;
    $scope.deleteUser = (data) => {
        finalDel = {};
        console.log(data);
        let obj = {};   // this obj has scope within this block only
        obj._id = data._id;
        tellUser = false;
        if (data.status === "DELETED")
            obj.status = "ACTIVE"
        else if (data.status === "BLOCKED")
            obj.status = "BLOCKEDANDDELETED"
        else if (data.status === "BLOCKEDANDDELETED")
            obj.status = "BLOCKED"
        else
            obj.status = "DELETED"
        $scope.value = obj.status;
        finalDel = obj;
        // tellUser = confirm(`Are you sure want to ${obj.status} this user`)
        // if (tellUser) {

        // } else {
        //     console.log("cancelled")
        // }
    }

    $scope.finalDelete = () => {
        tapNCultureService.deleteUser(finalDel).then((response) => {
            if (response.responseCode === 200) {
              
                toastr.success("User deleted", "Success")
                commonFunc();
                console.log(response)
            }
            // else {
            //     toastr.error("Error due to bad network", "Error")
            // }
        }, (err) => {
            console.log(err)
        })
    }

    $scope.search = () => {
        if ($scope.searchInput === temp) {
            $scope.currentPage = 1;
            obj.filterWord = $scope.searchInput;
            commonFunc();
            $scope.toggleSearchButton = true;
            // return toastr.error("No Input to Search usermgmt", 'Error')
        }
        // else {
        //     $scope.currentPage = 1;
        //     obj.filterWord = $scope.searchInput;
        //     commonFunc();
        //     $scope.toggleSearchButton=false;
        // }
    }

    $scope.abcd = () => {
        //  console.log("abcd",$scope.searchInput);
        if ($scope.searchInput) {
            temp = $scope.searchInput;
            $scope.toggleSearchButton = false;
        } else {
            $scope.currentPage = 1;
            obj.filterWord = '';
            commonFunc()
            $scope.toggleSearchButton = true;
            //  console.log("Thenga")
        }
    }

    $scope.newPage = () => {
        commonFunc();
    }

    $scope.viewUser = (data) => {
        // console.log("===>data",data)
        // alert("===>data",data)
        $localStorage.user = data;
        console.log(data)
        $state.go('header.viewUser')
    }
}])