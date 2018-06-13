app.service('tapNCultureService',['$http','$q',function($http,$q){

	let self=this;
	let baseUrl="http://localhost:8000/admin/";
	//  let baseUrl="http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:4646/admin/"
	
	self.profile=()=>{
		return httpMethod("get", "profile")
	}
	
	self.adminDetail=()=>{
		return httpMethod("get", "adminDetail")
	}
	self.getStaticContent=()=>{
		return httpMethod("get", "getStaticContent")
	}
	self.getAllTransactions=(data,page)=>{
		return httpMethod("post", "getAllTransactions?page="+page,data)
	}
	self.activeUsers=()=>{
		return httpMethod("get", "activeUsers")
	}

	self.getAllUsers=(data)=>{
		return httpMethod("post", "getAllUsers",data)
	}
	self.login=(data)=>{
		return httpMethod("post","login", data);
	}
	self.tempCld=(data)=>{
		return httpMethod("post", "tempCld", data)
	}
	self.blockUnblock=(data)=>{
		return httpMethod("post","blockUnblockUser", data)
	}
	self.deleteUser=(data)=>{
		return httpMethod("post", "deleteUser", data)
	}	
	self.updateStaticContent=(data)=>{
		return httpMethod("post", "updateStaticContent", data)
	}
	self.forgotPassword=(data)=>{
		return httpMethod("post", "forgotPassword" , data)
	}
	self.searchFromUserMgmt=(data)=>{
		return httpMethod("post","searchFromUserMgmt", data)
	}
	self.deleteStaticContent=(data)=>{
		return httpMethod("post","deleteStaticContent", data)
	}
	self.addNewPackage=(data)=>{
		return httpMethod("post","addNewPackage", data)
	}
	self.getAllPackages=(data)=>{
		return httpMethod("post", "getAllPackages",data)
	}
	self.deletePackage=(data)=>{
		return httpMethod("post", "deletePackage", data)
	}
	self.viewUserFromView=(data)=>{
		return httpMethod("post", "viewUserFromView", data)
	}
	self.deleteUserFromView=(data)=>{
		return httpMethod("post","deleteUserFromView", data)
	}
	self.getDetailsOfUser=(data)=>{
		return httpMethod("post", "getDetailsOfUser", data)
	}
	self.updateAdmin=(data)=>{
		return httpMethod("post", "updateAdmin", data)
	}
	self.addPremiumAccount=(data)=>{
		return httpMethod("post", "addPremiumAccount", data)
	}
	self.showPremiumList=(data)=>{
		return httpMethod("post", "showPremiumList", data)
	}
	self.deletePremium=(data)=>{
		return httpMethod("post", "deletePremium", data)
	}
	self.showBoostList=(data)=>{
		return httpMethod("post", "showBoostList", data)
	}
	self.addNewBoost=(data)=>{
		return httpMethod("post", "addNewBoost", data)
	}
	self.deleteBoost=(data)=>{
		return httpMethod("post", "deleteBoost", data)
	}
	self.getBoostDetail=(data)=>{
		return httpMethod("post", "getBoostDetail", data)
	}
	self.totalCollection=(data)=>{
		return httpMethod("get", "totalCollection", data)
	}
	self.resetPassword=(data)=>{
		return httpMethod("post", "resetPassword", data)
	}
	

	let httpMethod=(method,url,data)=>{
		let httpOptions={
			method:method,
			url:baseUrl+url,
			headers:{"Content-Type":"application/json"},
			data:data
		}
		let deferred=$q.defer();
		$http(httpOptions).then((success)=>{
			deferred.resolve(success.data)
		},
		(err)=>{
			deferred.reject(err)
		})
		return deferred.promise;
	}

}])