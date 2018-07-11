webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-product/add-product.component.css":
/***/ (function(module, exports) {

module.exports = ".addImage{\n    background-color: #ecf0f5;\n    width: 16%;\n    height: 102px;\n    display: inline-block;\n    vertical-align: top;\n}\n.plusIcon{\n    margin: 25%;\n    font-size: 65px;\n    font-family: initial;\n}"

/***/ }),

/***/ "./src/app/add-product/add-product.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n  <app-side-menu></app-side-menu>\n<div class=\"right-section no-scroll\">\n  <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n  <div class=\"right-inner\">\n\n      <!-- <div class=\"filter-block\">\n          <fieldset class=\"global-fieldset\">\n            <legend>Set Type/Style</legend>\n             <div class=\"filter-content\">\n                  <div class=\"common-detail-box\">\n                  </div>\n             </div>\n         </fieldset>\n        </div>  \n         -->\n            <div class=\"filter-block\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Add Style Tip</legend>\n                  <div class=\"filter-content\">\n                      <form class=\"login_box_outer\" [formGroup]='addProductForm' novalidate>\n                       <div class=\"common-detail-box\">\n                          <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Gender</label>\n                               <div class=\"col-sm-8\">\n                                 <select class=\"form-control angle\" (ngModelChange)=\"onSelect($event)\" id=\"gender\" [formControl]=\"addProductForm.controls['gender']\" [(ngModel)]=\"productDetail.brandGender\" >\n                                   <option value=\"\">--Gender--</option>\n                                   <option *ngFor=\"let gen of brandGender\" value={{gen.name}} >{{gen.name}}</option>\n                                 </select>\n                                 <div class=\"errMsg\" *ngIf=\"addProductForm.controls['gender'].dirty && addProductForm.controls['gender'].invalid\">\n                                  <span style='color:red' [ngClass]=\"{error:addProductForm.controls['gender'].hasError('required')}\" *ngIf=\"addProductForm.controls['gender'].hasError('required')\">*Please select gender.</span>\n                                </div>\n                              </div>\n                           </div>\n                           <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Body Type</label>\n                              <div class=\"col-sm-8\">\n                                 <select class=\"form-control angle\" [(ngModel)]=\"productDetail.bodyType\" id=\"bodyType\" [formControl]=\"addProductForm.controls['bodyType']\">\n                                   <option value=\"\">--Body Type--</option>\n                                   <option *ngFor=\"let body of selectedBody\" value={{body.name}}>{{body.name}}</option>\n                                 </select>\n                                 <div class=\"errMsg\" *ngIf=\"addProductForm.controls['bodyType'].dirty && addProductForm.controls['bodyType'].invalid\">\n                                  <span style='color:red' [ngClass]=\"{error:addProductForm.controls['bodyType'].hasError('required')}\" *ngIf=\"addProductForm.controls['bodyType'].hasError('required')\">*Please select body type.</span>\n                                </div>\n                              </div>\n                           </div>\n                           <div class=\"form-group row\">\n                             <label class=\"col-sm-4 label-right label-top\">Select Brand:</label>\n                             <div class=\"col-sm-8\">\n                               <select class=\"form-control angle\" [(ngModel)]=\"productDetail.brandName\" id=\"brandName\" [formControl]=\"addProductForm.controls['brandName']\">\n                                 <option value=\"\">--Brand--</option>\n                                 <option *ngFor=\"let brand of brandNameList\" value={{brand}}>{{brand}}</option>\n                                </select>\n                                <div class=\"errMsg\" *ngIf=\"addProductForm.controls['brandName'].dirty && addProductForm.controls['brandName'].invalid\">\n                                  <span style='color:red' [ngClass]=\"{error:addProductForm.controls['brandName'].hasError('required')}\" *ngIf=\"addProductForm.controls['brandName'].hasError('required')\">*Please select brand.</span>\n                                </div>\n                             </div>\n                          </div>\n      \n                          <div class=\"form-group row\" [ngClass]=\"{'has-error': (addProductForm.controls['productName'].dirty && addProductForm.controls['productName'].invalid)}\">\n                             <label class=\"col-sm-4 label-right label-top\">Product Name</label>\n                             <div class=\"col-sm-8\">\n                                <input class=\"form-control custom-control custom-input\" id=\"productName\" placeholder=\"Product Name\" type=\"text\" [formControl]=\"addProductForm.controls['productName']\" maxlength=\"40\" />\n                                <div class=\"errMsg\" *ngIf=\"addProductForm.controls['productName'].dirty && addProductForm.controls['productName'].invalid\">\n                                    <span style='color:red' [ngClass]=\"{error:addProductForm.controls['productName'].hasError('required')}\" *ngIf=\"addProductForm.controls['productName'].hasError('required')\">*Please enter product name.</span>\n                                    <span style='color:red' [ngClass]=\"{error:addProductForm.controls['productName'].hasError('minlength') && !addProductForm.controls['productName'].hasError('pattern')}\" *ngIf=\"addProductForm.controls['productName'].hasError('minlength') && !addProductForm.controls['productName'].hasError('pattern')\">*Product name must be minimum 2 characters.</span>\n                                    <span style='color:red' [ngClass]=\"{error:!addProductForm.controls['productName'].hasError('minlength') && addProductForm.controls['productName'].hasError('pattern')}\" *ngIf=\"!addProductForm.controls['productName'].hasError('minlength') && addProductForm.controls['productName'].hasError('pattern')\">*Please enter valid product name.</span>\n                                  </div>\n                             </div>\n                          </div>\n                          \n                          <div class=\"form-group row\">\n                            <label class=\"col-sm-4 label-right label-top\">Website url</label>\n                            <div class=\"col-sm-8\">\n                               <input type=\"text\" class=\"form-control custom-control custom-input\" placeholder=\"Website url\" id=\"webUrl\" [formControl]=\"addProductForm.controls['webUrl']\">\n                               <div class=\"errMsg\" *ngIf=\"addProductForm.controls['webUrl'].dirty && addProductForm.controls['webUrl'].invalid\">\n                                  <span style='color:red' [ngClass]=\"{error:addProductForm.controls['webUrl'].hasError('required')}\" *ngIf=\"addProductForm.controls['webUrl'].hasError('required')\">*Please enter website url.</span>\n                                  <span style='color:red' [ngClass]=\"{error:addProductForm.controls['webUrl'].hasError('minlength') && !addProductForm.controls['webUrl'].hasError('required')}\" *ngIf=\"addProductForm.controls['webUrl'].hasError('minlength') && !addProductForm.controls['webUrl'].hasError('required')\">*Website url must be minimum 2 characters.</span>\n                                </div>\n                            </div>\n                         </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-4 label-right label-top\">Description</label>\n                             <div class=\"col-sm-8\">\n                                <textarea class=\"form-control custom-control textarea-custom\" placeholder=\"Description\" id=\"description\" [formControl]=\"addProductForm.controls['description']\"></textarea>\n                                <div class=\"errMsg\" *ngIf=\"addProductForm.controls['description'].dirty && addProductForm.controls['description'].invalid\">\n                                    <span style='color:red' [ngClass]=\"{error:addProductForm.controls['description'].hasError('required')}\" *ngIf=\"addProductForm.controls['description'].hasError('required')\">*Please enter description.</span>\n                                    <span style='color:red' [ngClass]=\"{error:addProductForm.controls['description'].hasError('minlength') && !addProductForm.controls['description'].hasError('required')}\" *ngIf=\"addProductForm.controls['description'].hasError('minlength') && !addProductForm.controls['description'].hasError('required')\">*Description must be minimum 2 characters.</span>\n                                  </div>\n                             </div>\n                          </div>\n                          \n                          <!-- <div class=\"form-group row\">\n                             <label class=\"col-sm-4 label-right label-top\">Choose color</label>\n                              <div class=\"col-sm-8\">\n                                <div class=\"color-choose\">\n                                  <input type=\"color\" class=\"form-control custom-control custom-input\"  placeholder=\"#455536\">\n                                </div>\n                             </div>\n                          </div> -->\n                       </div>\n                  </form>\n                  </div>\n              </fieldset>\n            </div> \n            <!-- <div class=\"filter-block\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Set Size</legend>\n                  <div class=\"filter-content\">\n                       <div class=\"common-detail-box\">\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-4 label-right label-top\">Size</label>\n                             <div class=\"col-sm-8\">\n                                <input type=\"text\" class=\"form-control custom-control custom-input\">\n                             </div>\n                          </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-4 label-right label-top\">Quantity</label>\n                             <div class=\"col-sm-8\">\n                                <select class=\"form-control angle\">\n                                  <option>Select</option>\n                                </select>\n                             </div>\n                          </div>\n                       </div>\n                  </div>\n              </fieldset>\n            </div> -->\n           <div class=\"repeate_area\" *ngFor=\"let item of addProductDetail let i= index\">\n            <div class=\"filter-block\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Product Images Details</legend>\n                  <div class=\"filter-content\">\n                      <form class=\"login_box_outer\" [formGroup]='addProductForm' novalidate>\n                      <div class=\"common-detail-box\">\n                          <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Size</label>\n                              <div class=\"col-sm-8\">\n                                 <!-- <input type=\"text\" class=\"form-control custom-control custom-input\"> -->\n                                 <div class=\"size_checkboxes\">\n                                    <ul class=\"check_list\">\n                                        <li *ngFor=\"let size of item.productSize\">\n                                            <label>\n                                               <!-- <input name=\"check\" type=\"checkbox\" id=\"xxl\" [formControl]=\"addProductForm.controls['xxl']\"  (change)=\"selectSize(item,addProductForm.value.xxl,'XXL')\"> -->\n                                               <span style=\"background: #5e75fd;\">{{size}}</span>\n                                           </label>\n                                        </li>\n                                        <!-- <li>\n                                            <label>\n                                                <input name=\"check\" type=\"checkbox\" id=\"xl\" [formControl]=\"addProductForm.controls['xl']\"  (change)=\"selectSize(item,addProductForm.value.xl,'XL')\">\n                                                <span>Xl</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"check\" type=\"checkbox\" id=\"m\" [formControl]=\"addProductForm.controls['m']\"  (change)=\"selectSize(item,addProductForm.value.m,'M')\">\n                                                <span>M</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"check\" type=\"checkbox\" id=\"s\" [formControl]=\"addProductForm.controls['s']\" (change)=\"selectSize(item,addProductForm.value.s,'S')\">\n                                                <span>S</span>\n                                            </label>\n                                        </li> -->\n                                    </ul>\n                                    <!-- <ul class=\"check_list\">\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>XXL</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>XL</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>L</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>S</span>\n                                            </label>\n                                        </li>\n                            \n                            \n                                    </ul> -->\n                            \n                                </div>\n                                <span style='color:red'>{{sizeVali}}</span>\n                              </div>\n                           </div>\n                           <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Amount</label>\n                              <div class=\"col-sm-8\">\n                                <span class=\"form-control custom-control custom-input\" >{{item.productPrice}}</span>\n                                 <!-- <input type=\"number\" class=\"form-control custom-control custom-input\" placeholder=\"Amount\" id=\"amount\" [(ngModel)]=\"item.productPrice\" [formControl]=\"addProductForm.controls['amount']\" maxlength=\"6\"> -->\n                                 <!-- <div class=\"errMsg\" *ngIf=\"addProductForm.controls['amount'].dirty && addProductForm.controls['amount'].invalid\">\n                                     <span style='color:red' [ngClass]=\"{error:addProductForm.controls['amount'].hasError('required')}\" *ngIf=\"addProductForm.controls['amount'].hasError('required')\">*Please enter amount.</span>\n                                     <span style='color:red' [ngClass]=\"{error:addProductForm.controls['amount'].hasError('minlength') && !addProductForm.controls['amount'].hasError('pattern')}\" *ngIf=\"addProductForm.controls['amount'].hasError('minlength') && !addProductForm.controls['amount'].hasError('pattern')\">*Amount must be minimum 2 characters.</span>\n                                     <span style='color:red' [ngClass]=\"{error:!addProductForm.controls['amount'].hasError('required') && addProductForm.controls['amount'].hasError('pattern')}\" *ngIf=\"!addProductForm.controls['amount'].hasError('required') && addProductForm.controls['amount'].hasError('pattern')\">*Please enter valid amount.</span>\n                                   </div> -->\n                              </div>\n                           </div>\n                           <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Choose color</label>\n                               <div class=\"col-sm-8\">\n                                 <div class=\"color-choose1\">\n                                    <span class=\"form-control custom-control custom-input\" [ngStyle]=\"{'background-color':item.productColor}\" >{{item.productColor}}</span>\n                                   <!-- <input type=\"color\" class=\"form-control custom-control custom-input\" id=\"color\" [formControl]=\"addProductForm.controls['color']\"  placeholder=\"#455536\"  [(ngModel)]=\"item.productColor\"> -->\n                                   <!-- <div class=\"errMsg\" *ngIf=\"addProductForm.controls['color'].dirty && addProductForm.controls['color'].invalid\">\n                                    <span style='color:red' [ngClass]=\"{error:addProductForm.controls['color'].hasError('required')}\" *ngIf=\"addProductForm.controls['color'].hasError('required')\">*Please select color.</span>\n                                  </div> -->\n                                  </div>\n                              </div>\n                           </div> \n                    </div>\n                    <!-- <div class=\"row\">\n                      <div class=\"col-sm-6\">\n                        <div class=\"common-detail-box\">\n                           <h4>Product Images</h4>\n                            \n                            <div clss=\"add_images_box\">\n                              <ul class=\"img_list\">\n                                <li class=\"addImage\">\n                                  <img src=\"{{imageUrl}}\">\n                                </li>\n                                \n                                <li class=\"addImage\"><input class=\"file_field\" type=\"file\" /><i class=\"plusIcon\">+</i></li>\n                              </ul>\n                                \n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"col-sm-6\">\n                            <div class=\"common-detail-box\">\n                               <h4>Product Image With Body Type</h4>\n                               <div clss=\"add_images_box\">\n                                  <ul class=\"img_list\">\n                                    <li class=\"addImage\">\n                                      <img src=\"{{imageUrl}}\">\n                                    </li>\n                                    <li class=\"addImage\"><input class=\"file_field\" type=\"file\" /><i class=\"plusIcon\">+</i></li>\n                                  </ul>\n                                    \n                                </div>\n                            </div>\n                        </div>\n                      </div> -->\n\n                      \n                    <div class=\"common-detail-box\">\n                        <div class=\"form-group row\">\n                            <label class=\"col-sm-4 label-right label-top\">Product Images</label>\n                             <div class=\"col-sm-8\">\n                                <div clss=\"add_images_box\">\n                                    <ul class=\"img_list\">\n                                      <!-- <li class=\"addImage\" *ngIf=\"trialImage.length==0\">\n                                        <img src=\"assets/img/placeholder.png\">\n                                      </li> -->\n                                      <li class=\"addImage\" *ngFor=\"let imageUrl of item.productImage\">\n                                        <img src=\"{{imageUrl}}\">\n                                      </li>\n                                      \n                                      <li *ngIf=\"trialImage.length<5\" class=\"addImage\"><input class=\"file_field\" type=\"file\" (change)=\"onImageChange($event,item)\" accept=\"image/*\" /><i class=\"plusIcon\">+</i></li>\n                                    </ul>\n                                      \n                                  </div>\n                                  <span style='color:red'>{{imageVali}}</span>\n                            </div>\n                         </div> \n                      \n                     \n                    </div>\n                    </form>        \n                  </div>\n              </fieldset>\n            </div>\n            <div class=\"text-right\">   \n              <!-- <button class=\"addmore btn btn-success\" (click)=\"addMore()\" *ngIf=\"(addProductDetail.length-1)==i\">Add More</button> -->\n              <button class=\"addmore btn btn-danger\" (click)=\"remove(i)\">Remove</button>\n            </div>\n          </div>\n\n          <!-- blank form for more add-->\n          <div class=\"repeate_area\">\n            <div class=\"filter-block\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Product Images Details</legend>\n                  <div class=\"filter-content\">\n                      <form class=\"login_box_outer\" [formGroup]='addProductForm' novalidate>\n                      <div class=\"common-detail-box\">\n                          <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Size</label>\n                              <div class=\"col-sm-8\">\n                                 <!-- <input type=\"text\" class=\"form-control custom-control custom-input\"> -->\n                                 <div class=\"size_checkboxes\">\n                                    <ul class=\"check_list\">\n                                        <li>\n                                            <label>\n                                               <input name=\"check\" type=\"checkbox\" id=\"xxl\" [formControl]=\"addProductForm.controls['xxl']\" [(ngModel)]=\"moreData.xxl\"  (change)=\"selectSize(addProductForm.value.xxl,'XXL')\">\n                                               <span>XXL</span>\n                                           </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"check\" type=\"checkbox\" id=\"xl\" [formControl]=\"addProductForm.controls['xl']\" [(ngModel)]=\"moreData.xl\"  (change)=\"selectSize(addProductForm.value.xl,'XL')\">\n                                                <span>Xl</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"check\" type=\"checkbox\" id=\"m\" [formControl]=\"addProductForm.controls['m']\" [(ngModel)]=\"moreData.m\"  (change)=\"selectSize(addProductForm.value.m,'M')\">\n                                                <span>M</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"check\" type=\"checkbox\" id=\"s\" [formControl]=\"addProductForm.controls['s']\" [(ngModel)]=\"moreData.s\" (change)=\"selectSize(addProductForm.value.s,'S')\">\n                                                <span>S</span>\n                                            </label>\n                                        </li>\n                                    </ul>\n                                    <!-- <ul class=\"check_list\">\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>XXL</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>XL</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>L</span>\n                                            </label>\n                                        </li>\n                                        <li>\n                                            <label>\n                                                <input name=\"radio\" type=\"radio\">\n                                                <span>S</span>\n                                            </label>\n                                        </li>\n                            \n                            \n                                    </ul> -->\n                            \n                                </div>\n                                <span style='color:red'>{{sizeVali}}</span>\n                              </div>\n                           </div>\n                           <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Amount</label>\n                              <div class=\"col-sm-8\">\n                                 <input type=\"number\" class=\"form-control custom-control custom-input\" placeholder=\"Amount\" id=\"amount\"  [formControl]=\"addProductForm.controls['amount']\" [(ngModel)]=\"moreData.productPrice\" maxlength=\"6\">\n                                 <div class=\"errMsg\" *ngIf=\"addProductForm.controls['amount'].dirty && addProductForm.controls['amount'].invalid\">\n                                     <span style='color:red' [ngClass]=\"{error:addProductForm.controls['amount'].hasError('required')}\" *ngIf=\"addProductForm.controls['amount'].hasError('required')\">*Please enter amount.</span>\n                                     <span style='color:red' [ngClass]=\"{error:addProductForm.controls['amount'].hasError('minlength') && !addProductForm.controls['amount'].hasError('pattern')}\" *ngIf=\"addProductForm.controls['amount'].hasError('minlength') && !addProductForm.controls['amount'].hasError('pattern')\">*Amount must be minimum 2 characters.</span>\n                                     <span style='color:red' [ngClass]=\"{error:!addProductForm.controls['amount'].hasError('required') && addProductForm.controls['amount'].hasError('pattern')}\" *ngIf=\"!addProductForm.controls['amount'].hasError('required') && addProductForm.controls['amount'].hasError('pattern')\">*Please enter valid amount.</span>\n                                   </div>\n                              </div>\n                           </div>\n                           <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Choose color</label>\n                               <div class=\"col-sm-8\">\n                                 <div class=\"color-choose1\">\n                                   <input type=\"color\" class=\"form-control custom-control custom-input\" id=\"color\" [formControl]=\"addProductForm.controls['color']\"  placeholder=\"#455536\"  [(ngModel)]=\"moreData.productColor\">\n                                   <div class=\"errMsg\" *ngIf=\"addProductForm.controls['color'].dirty && addProductForm.controls['color'].invalid\">\n                                    <span style='color:red' [ngClass]=\"{error:addProductForm.controls['color'].hasError('required')}\" *ngIf=\"addProductForm.controls['color'].hasError('required')\">*Please select color.</span>\n                                  </div>\n                                  </div>\n                              </div>\n                           </div> \n                    </div>\n                    <!-- <div class=\"row\">\n                      <div class=\"col-sm-6\">\n                        <div class=\"common-detail-box\">\n                           <h4>Product Images</h4>\n                            \n                            <div clss=\"add_images_box\">\n                              <ul class=\"img_list\">\n                                <li class=\"addImage\">\n                                  <img src=\"{{imageUrl}}\">\n                                </li>\n                                \n                                <li class=\"addImage\"><input class=\"file_field\" type=\"file\" /><i class=\"plusIcon\">+</i></li>\n                              </ul>\n                                \n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"col-sm-6\">\n                            <div class=\"common-detail-box\">\n                               <h4>Product Image With Body Type</h4>\n                               <div clss=\"add_images_box\">\n                                  <ul class=\"img_list\">\n                                    <li class=\"addImage\">\n                                      <img src=\"{{imageUrl}}\">\n                                    </li>\n                                    <li class=\"addImage\"><input class=\"file_field\" type=\"file\" /><i class=\"plusIcon\">+</i></li>\n                                  </ul>\n                                    \n                                </div>\n                            </div>\n                        </div>\n                      </div> -->\n\n                      \n                    <div class=\"common-detail-box\">\n                        <div class=\"form-group row\">\n                            <label class=\"col-sm-4 label-right label-top\">Product Images</label>\n                             <div class=\"col-sm-8\">\n                                <div clss=\"add_images_box\">\n                                    <ul class=\"img_list\">\n                                      <li class=\"addImage\" *ngIf=\"trialImage.length==0\">\n                                        <img src=\"assets/img/placeholder.png\">\n                                      </li>\n                                      <li class=\"addImage\" *ngFor=\"let imageUrl of trialImage\">\n                                        <img src=\"{{imageUrl}}\">\n                                      </li>\n                                      \n                                      <li *ngIf=\"trialImage.length<5\" class=\"addImage\"><input class=\"file_field\" type=\"file\" (change)=\"onImageChange($event)\" accept=\"image/*\" /><i class=\"plusIcon\">+</i></li>\n                                    </ul>\n                                      \n                                  </div>\n                                  <span style='color:red'>{{imageVali}}</span>\n                            </div>\n                         </div> \n                      \n                     \n                    </div>\n                    </form>        \n                  </div>\n              </fieldset>\n            </div>\n            <div class=\"text-right\">   \n              <button class=\"addmore btn btn-success\" (click)=\"addMore()\">Add More</button>\n              <!-- <button class=\"addmore btn btn-danger\" (click)=\"remove(i)\" *ngIf=\"(addProductDetail.length-1)!=i\">Remove</button> -->\n            </div>\n          </div>\n\n\n\n            <div class=\"table-button text-center mt30\">\n               <button (click)=\"saveProduct()\" class=\"btn btn-red\" [disabled]=\"addProductForm.invalid\">Save </button>\n               <button (click)=\"cancel()\" class=\"btn btn-danger\">Cancel</button>\n            </div>       \n        </div>  \n      </div>\n</div>"

/***/ }),

/***/ "./src/app/add-product/add-product.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProductComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_img_max__ = __webpack_require__("./node_modules/ng2-img-max/dist/ng2-img-max.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddProductComponent = /** @class */ (function () {
    function AddProductComponent(router, formBuilder, service, ng2ImgMax) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.service = service;
        this.ng2ImgMax = ng2ImgMax;
        this.productDetail = { brandGender: "", bodyType: "", brandName: "" };
        this.trialImage = [];
        this.productSize = [];
        this.addProductDetail = [];
        this.moreData = {};
        this.brandGender = [
            { "id": 1, "name": "Male" },
            { "id": 2, "name": "Female" }
        ];
        this.maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        this.femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
        // this.addProductForm = new FormGroup({
        //   amount:  new FormControl('',[Validators.required])
        // }) 
    }
    AddProductComponent.prototype.ngOnInit = function () {
        this.addProductForm = this.formBuilder.group({
            productName: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].pattern(/^[a-zA-Z ]*$/), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].minLength(2)])],
            amount: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].pattern(/^[1-9]*$/), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].minLength(2)])],
            webUrl: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].minLength(2)])],
            description: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].minLength(2)])],
            gender: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required])],
            bodyType: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required])],
            brandName: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required])],
            xxl: [''],
            xl: [''],
            m: [''],
            s: [''],
            color: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* Validators */].required])]
        });
    };
    AddProductComponent.prototype.onSelect = function (productId) {
        var _this = this;
        if (productId == "") {
            this.productDetail.brandGender = "";
            this.productDetail.bodyType = "";
            this.selectedBody = null;
        }
        this.productDetail.bodyType = "";
        this.brandNameList = null;
        for (var i = 0; i < this.brandGender.length; i++) {
            if (this.brandGender[i].name == productId) {
                this.brandNameList = this.brandGender[i];
            }
        }
        if (this.brandNameList.name == "Male") {
            this.selectedBody = this.maleBodyType;
        }
        else {
            this.selectedBody = this.femaleBodyType;
        }
        var credential = {
            "brandGender": productId
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/brandNameOnAddProduct', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data']);
                _this.brandNameList = response['data'];
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    AddProductComponent.prototype.saveProduct = function () {
        var _this = this;
        console.log("Saveproduct===>>" + JSON.stringify(this.addProductDetail));
        if (this.productSize.length == 0) {
            this.sizeVali = "*Please select size.";
        }
        else if (this.trialImage.length == 0) {
            this.sizeVali = "";
            this.imageVali = "*Please select images.";
        }
        else {
            this.imageVali = '';
            this.addProductDetail.push({ "productPrice": this.addProductForm.value.amount, "productColor": this.addProductForm.value.color, "productSize": this.productSize, "productImage": this.trialImage });
            var credential = {
                "createdBy": localStorage.getItem("adminId"),
                "productName": this.addProductForm.value.productName,
                "brandName": this.addProductForm.value.brandName,
                "productDesc": this.addProductForm.value.description,
                "productGender": this.addProductForm.value.gender,
                "bodyType": this.addProductForm.value.bodyType,
                "productLink": this.addProductForm.value.webUrl,
                "productDetail": this.addProductDetail
            };
            this.service.postApi('/addNewProduct', credential).subscribe(function (response) {
                if (response['responseCode'] == 200) {
                    _this.service.success(response['responseMessage']);
                    _this.router.navigate(['/product-management']);
                    console.log('addNewProduct==>', response['responseMessage']);
                }
                else {
                    _this.service.error(response['responseMessage']);
                    console.log('Failure', response['responseMessage']);
                }
            }, function (error) {
                console.log('something went wrong');
            });
        }
    };
    AddProductComponent.prototype.cancel = function () {
        this.router.navigate(['/product-management']);
    };
    AddProductComponent.prototype.onImageChange = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var image = event.target.files[0];
            console.log("resizeImage_image==>", image);
            this.ng2ImgMax.resizeImage(image, 400, 300).subscribe(function (result) {
                var reader = new FileReader();
                reader.readAsDataURL(result); // read file as data url
                reader.onload = function (event) {
                    console.log("resizeImage==>", event);
                    if (_this.trialImage.length < 5) {
                        _this.trialImage.push(event.target.result);
                        _this.imageVali = '';
                    }
                };
            }, function (error) {
                console.log('😢 Oh no!', error);
            });
            //this.moreData.productImage=this.trialImage;
        }
    };
    AddProductComponent.prototype.addMore = function () {
        if (this.productSize.length != 0 && this.trialImage.length != 0) {
            this.addProductDetail.push({ "productPrice": this.addProductForm.value.amount, "productColor": this.addProductForm.value.color, "productSize": this.productSize, "productImage": this.trialImage });
            //console.log("Saveproduct===>>"+JSON.stringify(this.addProductDetail))
            //this.moreData.productPrice=1;
            //this.moreData.productColor=''
            this.moreData.xxl = false;
            this.moreData.xl = false;
            this.moreData.m = false;
            this.moreData.s = false;
            this.trialImage = [];
            this.productSize = [];
        }
        //this.addProductDetail.push({});
    };
    AddProductComponent.prototype.remove = function (ind) {
        this.addProductDetail.splice(ind, 1);
    };
    AddProductComponent.prototype.selectSize = function (bol, val) {
        if (bol == true) {
            this.productSize.push(val);
            this.sizeVali = "";
        }
        else {
            this.productSize.splice(this.productSize.indexOf(val), 1);
        }
        //this.moreData.productSize = this.productSize
        console.log('sizeArry==>' + this.productSize);
        //alert(bol+"<=size=>"+val)
    };
    AddProductComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-add-product',
            template: __webpack_require__("./src/app/add-product/add-product.component.html"),
            styles: [__webpack_require__("./src/app/add-product/add-product.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_4_ng2_img_max__["b" /* Ng2ImgMaxService */]])
    ], AddProductComponent);
    return AddProductComponent;
}());



/***/ }),

/***/ "./src/app/add-user/add-user.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/add-user/add-user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n  <app-side-menu></app-side-menu>\n<div class=\"right-section\">\n  <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n  <div class=\"right-inner\">\n            <div class=\"filter-block\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Add User</legend>\n                  <div class=\"filter-content\">\n                      <form class=\"login_box_outer\" [formGroup]='addUserForm' novalidate>\n                       <div class=\"common-detail-box\">\n                          <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['name'].dirty && addUserForm.controls['name'].invalid)}\">\n                             <label class=\"col-sm-4 label-right label-top\">Name</label>\n                             <div class=\"col-sm-8\">\n                                <input class=\"form-control\" id=\"name\" name=\"name\" [(ngModel)]=\"userDetail.name\" placeholder=\"Name\" type=\"text\" [formControl]=\"addUserForm.controls['name']\"  maxlength=\"20\"/>\n                                <div class=\"errMsg\" *ngIf=\"addUserForm.controls['name'].dirty && addUserForm.controls['name'].invalid\">\n                                  <span style='color:red' [ngClass]=\"{error:addUserForm.controls['name'].hasError('required')}\" *ngIf=\"addUserForm.controls['name'].hasError('required')\">*Please enter name.</span>\n                                  <span style='color:red' [ngClass]=\"{error:addUserForm.controls['name'].hasError('minlength') && !addUserForm.controls['name'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['name'].hasError('minlength') && !addUserForm.controls['name'].hasError('pattern')\">*Name must be minimum 2 characters.</span>\n                                  <span style='color:red' [ngClass]=\"{error:addUserForm.controls['name'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['name'].hasError('pattern')\">*Please enter valid name.</span>\n                                </div>\n                              </div>\n                          </div>\n                          <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['email'].dirty && addUserForm.controls['email'].invalid)}\">\n                             <label class=\"col-sm-4 label-right label-top\">Email</label>\n                             <div class=\"col-sm-8\">\n                                <input type=\"text\" name=\"email\" [(ngModel)]=\"userDetail.email\" id=\"email\" [formControl]=\"addUserForm.controls['email']\" class=\"form-control\" placeholder=\"Email\" maxlength=\"60\">\n                                <div class=\"errMsg\" *ngIf=\"addUserForm.controls['email'].dirty && addUserForm.controls['email'].invalid\">\n                                  <span style='color:red' [ngClass]=\"{error:addUserForm.controls['email'].hasError('required')}\" *ngIf=\"addUserForm.controls['email'].hasError('required')\">*Please enter an email.</span>\n                                  <span style='color:red' [ngClass]=\"{error: addUserForm.controls['email'].hasError('pattern')}\"  *ngIf=\"addUserForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n                                  <span style='color:red' [ngClass]=\"{error: addUserForm.controls['email'].hasError('maxlength') && addUserForm.controls['email'].dirty}\" *ngIf=\"addUserForm.controls['email'].hasError('maxlength') && ! addUserForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n                              </div>\n                              </div>\n                          </div>\n                          <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['age'].dirty && addUserForm.controls['age'].invalid)}\">\n                             <label class=\"col-sm-4 label-right label-top\">Age</label>\n                             <div class=\"col-sm-8\">\n                             <input class=\"form-control\" name=\"age\" id='age' [(ngModel)]=\"userDetail.age\" placeholder=\"Age\" type=\"text\" [formControl]=\"addUserForm.controls['age']\" minlength=\"1\" maxlength=\"3\"/>\n              <div class=\"errMsg\" *ngIf=\"addUserForm.controls['age'].dirty && addUserForm.controls['age'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['age'].hasError('required')}\"  *ngIf=\"addUserForm.controls['age'].hasError('required')\">*Please enter age.</span>\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['age'].hasError('pattern')}\"  *ngIf=\"addUserForm.controls['age'].hasError('pattern')\">*Please enter valid age.</span>\n              </div>\n                             </div>\n                          </div>\n                          \n                          <!-- <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Gender</label>\n                              <div class=\"col-sm-8\">\n                               <select  class=\"form-control\" [(ngModel)]=\"userDetail.gender\" [ngModelOptions]=\"{standalone: true}\">  \n                                 <option value=\"\">--Select--</option> \n                                  <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n                              </select>  \n                              </div>\n                           </div> -->\n                           <div class=\"form-group row\">\n                            <label class=\"col-sm-4 label-right label-top\">Gender</label>\n                            <div class=\"col-sm-8\">\n                             <select (ngModelChange)=\"onSelect($event)\" class=\"form-control\" [(ngModel)]=\"userDetail.gender\" [ngModelOptions]=\"{standalone: true}\" required>  \n                               <option value=\"\" disabled>--Select--</option> \n                                <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n                            </select>  \n                            </div>\n                         </div>\n                          <div class=\"form-group row\">\n                            <label class=\"col-sm-4 label-right label-top\">Body Type</label>\n                            <div class=\"col-sm-8\">\n                            <select class=\"form-control\" name=\"bodyType\" [disabled]=\"!userDetail.gender\"  [(ngModel)]=\"userDetail.bodyType\" [ngModelOptions]=\"{standalone: true}\" required>\n                                 <option value='' disabled>--Select--</option>  \n                                 <option *ngFor=\"let body of selectedBody\" value={{body.name}}>{{body.name}}</option>\n                            </select>\n                           </div>\n                         </div>\n\n                          <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['height'].dirty && addUserForm.controls['height'].invalid)}\">\n                              <label class=\"col-sm-4 label-right label-top\">height</label>\n                              <div class=\"col-sm-8\">\n                                 <input class=\"form-control\" id=\"height\" name=\"height\" [(ngModel)]=\"userDetail.height\" placeholder=\"height\" type=\"text\" [formControl]=\"addUserForm.controls['height']\" maxlength=\"3\"/>\n                                 <div class=\"errMsg\" *ngIf=\"addUserForm.controls['height'].dirty && addUserForm.controls['height'].invalid\">\n                                   <span style='color:red' [ngClass]=\"{error:addUserForm.controls['height'].hasError('required')}\" *ngIf=\"addUserForm.controls['height'].hasError('required')\">*Please enter height.</span>\n                                   <span style='color:red' [ngClass]=\"{error:addUserForm.controls['height'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['height'].hasError('pattern')\">*Please enter valid height.</span>\n                                 </div>\n                               </div>\n                           </div>\n                           <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['weight'].dirty && addUserForm.controls['weight'].invalid)}\">\n                              <label class=\"col-sm-4 label-right label-top\">weight</label>\n                              <div class=\"col-sm-8\">\n                                 <input class=\"form-control\" id=\"weight\" name=\"weight\" [(ngModel)]=\"userDetail.weight\" placeholder=\"weight\" type=\"text\" [formControl]=\"addUserForm.controls['weight']\" maxlength=\"3\"/>\n                                 <div class=\"errMsg\" *ngIf=\"addUserForm.controls['weight'].dirty && addUserForm.controls['weight'].invalid\">\n                                   <span style='color:red' [ngClass]=\"{error:addUserForm.controls['weight'].hasError('required')}\" *ngIf=\"addUserForm.controls['weight'].hasError('required')\">*Please enter weight.</span>\n                                   <span style='color:red' [ngClass]=\"{error:addUserForm.controls['weight'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['weight'].hasError('pattern')\">*Please enter valid weight.</span>\n                                 </div>\n                               </div>\n                           </div>\n                          <div class=\"table-button text-center mt30\">\n                             <button class=\"btn btn-red\" [disabled]=\"addUserForm.invalid\" (click)=\"save()\">Save </button>\n                             <button (click)=\"cancel()\" class=\"btn btn-danger\">Cancel</button>\n                          </div>\n                       </div>\n                     </form>\n                  </div>\n              </fieldset>\n            </div>        \n        </div>  \n      </div>\n</div>"

/***/ }),

/***/ "./src/app/add-user/add-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(router, formBuilder, service) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.service = service;
        this.userDetail = { "bodyType": "", "gender": "" };
        this.gender = [
            { id: 1, name: "Male" },
            { id: 2, name: "Female" }
        ];
        this.maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        this.femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
    }
    AddUserComponent.prototype.onSelect = function (productId) {
        this.userDetail.bodyType = "";
        var maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        var femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
        this.selectedProduct = null;
        for (var i = 0; i < this.gender.length; i++) {
            if (this.gender[i].name == productId) {
                this.selectedProduct = this.gender[i];
            }
        }
        if (this.selectedProduct.name == "Male") {
            this.selectedBody = this.maleBodyType;
        }
        else {
            this.selectedBody = this.femaleBodyType;
        }
    };
    AddUserComponent.prototype.ngOnInit = function () {
        this.addUserForm = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].pattern(/^[^\s][a-zA-Z ]*$/), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].minLength(2)])],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].pattern(/^[A-Z0-9_]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].maxLength(50)])],
            age: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].pattern(/^[1-9][0-9]{1,7}$/)])],
            height: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].pattern(/^[1-9][0-9]{1,7}$/)])],
            weight: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].pattern(/^[1-9][0-9]{1,7}$/)])],
        });
    };
    AddUserComponent.prototype.cancel = function () {
        this.router.navigate(['/user-management']);
    };
    AddUserComponent.prototype.save = function () {
        var _this = this;
        var credential = {
            "name": this.userDetail.name,
            "email": this.userDetail.email,
            "age": this.userDetail.age,
            "bodyType": this.userDetail.bodyType,
            "height": this.userDetail.height,
            "weight": this.userDetail.weight,
            "gender": this.userDetail.gender
        };
        this.service.postApi('/addNewUser', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                _this.service.success(response['responseMessage']);
                console.log('success', response['responseMessage']);
                _this.router.navigate(['/user-management']);
            }
            else {
                _this.service.error('Fill the necessary fields.');
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    AddUserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-add-user',
            template: __webpack_require__("./src/app/add-user/add-user.component.html"),
            styles: [__webpack_require__("./src/app/add-user/add-user.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */]])
    ], AddUserComponent);
    return AddUserComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__side_menu_side_menu_component__ = __webpack_require__("./src/app/side-menu/side-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_management_user_management_component__ = __webpack_require__("./src/app/user-management/user-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__brand_management_brand_management_component__ = __webpack_require__("./src/app/brand-management/brand-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__product_management_product_management_component__ = __webpack_require__("./src/app/product-management/product-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__add_product_add_product_component__ = __webpack_require__("./src/app/add-product/add-product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style_management_style_management_component__ = __webpack_require__("./src/app/style-management/style-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_user_view_user_component__ = __webpack_require__("./src/app/view-user/view-user.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__login_login_component__["a" /* LoginComponent */] },
    { path: 'side-menu', component: __WEBPACK_IMPORTED_MODULE_3__side_menu_side_menu_component__["a" /* SideMenuComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'user-management', component: __WEBPACK_IMPORTED_MODULE_5__user_management_user_management_component__["a" /* UserManagementComponent */] },
    // {path: 'add-user', component: AddUserComponent},
    { path: 'brand-management', component: __WEBPACK_IMPORTED_MODULE_6__brand_management_brand_management_component__["a" /* BrandManagementComponent */] },
    { path: 'product-management', component: __WEBPACK_IMPORTED_MODULE_7__product_management_product_management_component__["a" /* ProductManagementComponent */] },
    { path: 'add-product', component: __WEBPACK_IMPORTED_MODULE_8__add_product_add_product_component__["a" /* AddProductComponent */] },
    { path: 'style-management', component: __WEBPACK_IMPORTED_MODULE_9__style_management_style_management_component__["a" /* StyleManagementComponent */] },
    { path: 'view-user', component: __WEBPACK_IMPORTED_MODULE_10__view_user_view_user_component__["a" /* ViewUserComponent */] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "  <router-outlet> </router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(_router) {
        var _this = this;
        this._router = _router;
        _router.events.subscribe(function (x) {
            if (x instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationEnd */]) {
                if (localStorage.getItem("token") == '') {
                    if (x.url != '/login') {
                        _this._router.navigate(['/login']);
                    }
                    if (x.url == '/login') {
                        _this._router.navigate(['/']);
                    }
                }
            }
        });
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dnd__ = __webpack_require__("./node_modules/ng2-dnd/ng2-dnd.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_img_max__ = __webpack_require__("./node_modules/ng2-img-max/dist/ng2-img-max.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__side_menu_side_menu_component__ = __webpack_require__("./src/app/side-menu/side-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_management_user_management_component__ = __webpack_require__("./src/app/user-management/user-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__add_user_add_user_component__ = __webpack_require__("./src/app/add-user/add-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__brand_management_brand_management_component__ = __webpack_require__("./src/app/brand-management/brand-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__product_management_product_management_component__ = __webpack_require__("./src/app/product-management/product-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__add_product_add_product_component__ = __webpack_require__("./src/app/add-product/add-product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__style_management_style_management_component__ = __webpack_require__("./src/app/style-management/style-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__view_user_view_user_component__ = __webpack_require__("./src/app/view-user/view-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__edit_user_edit_user_component__ = __webpack_require__("./src/app/edit-user/edit-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ngx_pagination__ = __webpack_require__("./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ngx_toastr__ = __webpack_require__("./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_9__side_menu_side_menu_component__["a" /* SideMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_12__user_management_user_management_component__["a" /* UserManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_13__add_user_add_user_component__["a" /* AddUserComponent */],
                __WEBPACK_IMPORTED_MODULE_14__brand_management_brand_management_component__["a" /* BrandManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_15__product_management_product_management_component__["a" /* ProductManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_16__add_product_add_product_component__["a" /* AddProductComponent */],
                __WEBPACK_IMPORTED_MODULE_17__style_management_style_management_component__["a" /* StyleManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_18__view_user_view_user_component__["a" /* ViewUserComponent */],
                __WEBPACK_IMPORTED_MODULE_19__edit_user_edit_user_component__["a" /* EditUserComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_21_ngx_toastr__["a" /* ToastrModule */].forRoot({
                    timeOut: 10000,
                    positionClass: 'toast-bottom-right',
                    preventDuplicates: true,
                }),
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_20_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_2__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_5_ng2_dnd__["a" /* DndModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_img_max__["a" /* Ng2ImgMaxModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/brand-management/brand-management.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/brand-management/brand-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n  <app-side-menu></app-side-menu>\n<div class=\"right-section\">\n  <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n  <div class=\"right-inner\">\n      \n    <h1 class=\"heading\">BRAND MANAGEMENT</h1>\n    <div class=\"filter-block\">\n        <fieldset class=\"global-fieldset\">\n           <legend>Brands</legend>\n           <div class=\"filter-content\">\n              <div class=\"row\">\n                 <div class=\"col-sm-6\">\n                    <div class=\"form-group\">\n                      <div class=\"search-icon\">\n                         <input type=\"text\" [(ngModel)]=\"searchBrand.data\"  (keyup)=\"search()\" class=\"form-control max-wt-300 search-input\" placeholder=\"Search\">\n                         <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                      </div>\n                   </div>\n                 </div>\n                 <div class=\"col-sm-6\">\n                   <div class=\"btn-right\">\n                      <a class=\"btn btn-red btn-common\"  href=\"#add_brand\" data-toggle=\"modal\">Add</a>\n                   </div>\n                 </div>\n              </div>\n           </div>\n           <div class=\"filter-content pt0\" *ngIf=\"menBrandList.length\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Men</legend>\n                 <div class=\"brand-block\">\n                    <ul>\n                       <li *ngFor=\"let brands of menBrandList\">{{brands}}</li>\n                    </ul>\n                 </div>\n                 <button  *ngIf=\"menBrandList.length < menTotal\" (click)=\"seeMoreMan()\">See more</button>\n              </fieldset>\n           </div>\n           <div class=\"filter-content pt0\" *ngIf=\"!menBrandList.length\">\n                <fieldset class=\"global-fieldset\">\n                   <legend>Men</legend>\n                   <div class=\"brand-block\">\n                      <ul style=\"text-align:center\" >\n                         <li>No Brand Found!!</li>\n                     </ul>\n                  </div>\n                </fieldset>\n             </div>\n           <div class=\"filter-content pt0\" *ngIf=\"womenBrandList.length\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Women</legend>\n                 <div class=\"brand-block\">\n                    <ul>\n                       <li *ngFor=\"let brands of womenBrandList\">{{brands}}</li>\n                    </ul>\n                 </div>\n                 <button  *ngIf=\"womenBrandList.length < womenTotal\" (click)=\"seeMoreWoman()\">See more</button>\n              </fieldset>\n           </div>\n           <div class=\"filter-content pt0\" *ngIf=\"!womenBrandList.length\">\n                <fieldset class=\"global-fieldset\">\n                   <legend>Women</legend>\n                   <div class=\"brand-block\">\n                      <ul style=\"text-align:center\" >\n                         <li>No Brand Found!!</li>\n                     </ul>\n                  </div>\n                </fieldset>\n             </div>\n           <div class=\"filter-content pt0\" *ngIf=\"bothBrandList.length\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Both</legend>\n                 <div class=\"brand-block\">\n                    <ul>\n                       <li *ngFor=\"let brands of bothBrandList\">{{brands}}</li>\n                   </ul>\n                </div>\n                <button  *ngIf=\"bothBrandList.length < bothTotal\" (click)=\"seeMoreBoth()\">See more</button>\n              </fieldset>\n           </div>\n           <div class=\"filter-content pt0\" *ngIf=\"!bothBrandList.length\">\n                <fieldset class=\"global-fieldset\">\n                   <legend>Both</legend>\n                   <div class=\"brand-block\">\n                      <ul style=\"text-align:center\" >\n                         <li>No Brand Found!!</li>\n                     </ul>\n                  </div>\n                </fieldset>\n             </div>\n        </fieldset>\n     </div>\n          \n     </div>\n</div>\n</div>\n\n<div id=\"add_brand\" class=\"modal fade\" data-easein=\"bounceIn\"  tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"costumModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog max-wt-800\">\n      <div class=\"modal-content\">\n          <div class=\"modal-header border0\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n                  ×\n              </button>\n          </div>\n          <div class=\"modal-body pt0\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Add Brands</legend>\n                 <div class=\"max-wt-400 mrgn-0-auto mt20 mb30\">\n                        <form class=\"login_box_outer\" [formGroup]='addBrandForm' novalidate>\n                    <div class=\"form-group mb30\" [ngClass]=\"{'has-error': (addBrandForm.controls['brandName'].dirty && addBrandForm.controls['brandName'].invalid)}\">\n                       <label>Brand Name:</label>\n                       <input class=\"form-control\" name=\"name\" [(ngModel)]=\"brandDetail.name\" placeholder=\"Enter the name of the Brand\" type=\"text\" [formControl]=\"addBrandForm.controls['brandName']\" maxlength=\"20\" />\n                       <div class=\"errMsg\" *ngIf=\"addBrandForm.controls['brandName'].dirty && addBrandForm.controls['brandName'].invalid\">\n                            <span style='color:red' [ngClass]=\"{error:addBrandForm.controls['brandName'].hasError('required')}\" *ngIf=\"addBrandForm.controls['brandName'].hasError('required')\">*Please enter brand name.</span>\n                            <span style='color:red' [ngClass]=\"{error:addBrandForm.controls['brandName'].hasError('minlength') && !addBrandForm.controls['brandName'].hasError('pattern')}\" *ngIf=\"addBrandForm.controls['brandName'].hasError('minlength') && !addBrandForm.controls['brandName'].hasError('pattern')\">*Brand name must be minimum 2 characters.</span>\n                            <span style='color:red' [ngClass]=\"{error:!addBrandForm.controls['brandName'].hasError('minlength') && addBrandForm.controls['brandName'].hasError('pattern')}\" *ngIf=\"!addBrandForm.controls['brandName'].hasError('minlength') && addBrandForm.controls['brandName'].hasError('pattern')\">*Please enter valid brand name.</span>\n                          </div>\n                    </div>\n                    <div class=\"form-group\">\n                       <label>Select Gender:</label>\n                       <select class=\"form-control angle\" [(ngModel)]=\"brandDetail.gender\" [ngModelOptions]=\"{standalone: true}\">\n                        <option value=\"\" disabled>--Select--</option>  \n                        <option value=\"male\">Male</option>\n                        <option value=\"female\">Female</option>\n                        <option value=\"both\">Both</option>\n                       </select>\n                    </div>\n                    <div class=\"button-box mt40\">\n                       <button class=\"btn btn-red mr10 btn-common\" [disabled]=\"addBrandForm.invalid\" data-dismiss=\"modal\" (click)=\"addBrand()\">Add</button>\n                    </div>\n                    </form>\n                 </div>\n              </fieldset>\n          </div>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/brand-management/brand-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BrandManagementComponent = /** @class */ (function () {
    function BrandManagementComponent(formBuilder, service, router) {
        this.formBuilder = formBuilder;
        this.service = service;
        this.router = router;
        this.menBrandList = [];
        this.womenBrandList = [];
        this.bothBrandList = [];
        this.searchBrand = { data: "" };
        this.brandDetail = { "gender": "" };
        this.menPage = 1;
        this.womenPage = 1;
        this.bothPage = 1;
    }
    BrandManagementComponent.prototype.ngOnInit = function () {
        this.addBrandForm = this.formBuilder.group({
            brandName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].pattern(/^[a-zA-Z ]*$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(2)])]
        });
        this.displayBrand();
    };
    BrandManagementComponent.prototype.search = function () {
        this.displayBrand();
    };
    BrandManagementComponent.prototype.displayBrand = function () {
        var _this = this;
        var credential = {
            "search": this.searchBrand.data,
            "menPage": this.menPage,
            "womenPage": this.womenPage,
            "bothPage": this.bothPage
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/brandNameList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data'].menList);
                _this.menBrandList = response['data'].menList.men;
                _this.womenBrandList = response['data'].womenList.women;
                _this.bothBrandList = response['data'].bothList.both;
                _this.menTotal = response['data'].menList.menTotal;
                _this.womenTotal = response['data'].womenList.womenTotal;
                _this.bothTotal = response['data'].bothList.bothTotal;
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    BrandManagementComponent.prototype.seeMoreMan = function () {
        var _this = this;
        this.menPage = this.menPage + 1;
        var credential = {
            "search": this.searchBrand.data,
            "menPage": this.menPage,
            "womenPage": this.womenPage,
            "bothPage": this.bothPage
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/brandNameList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data'].menList);
                for (var i = 0; i < response['data'].menList.men.length; i++) {
                    _this.menBrandList.push(response['data'].menList.men[i]);
                }
                _this.menTotal = response['data'].menList.menTotal;
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    BrandManagementComponent.prototype.seeMoreWoman = function () {
        var _this = this;
        this.womenPage = this.womenPage + 1;
        var credential = {
            "search": this.searchBrand.data,
            "menPage": this.menPage,
            "womenPage": this.womenPage,
            "bothPage": this.bothPage
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/brandNameList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data'].womenList);
                for (var i = 0; i < response['data'].womenList.women.length; i++) {
                    _this.womenBrandList.push(response['data'].womenList.women[i]);
                }
                _this.womenTotal = response['data'].womenList.womenTotal;
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    BrandManagementComponent.prototype.seeMoreBoth = function () {
        var _this = this;
        this.bothPage = this.bothPage + 1;
        var credential = {
            "search": this.searchBrand.data,
            "menPage": this.menPage,
            "womenPage": this.womenPage,
            "bothPage": this.bothPage
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/brandNameList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data'].menList);
                for (var i = 0; i < response['data'].bothList.both.length; i++) {
                    _this.bothBrandList.push(response['data'].bothList.both[i]);
                }
                _this.bothTotal = response['data'].bothList.bothTotal;
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    BrandManagementComponent.prototype.addBrand = function () {
        var _this = this;
        this.menPage = 1;
        this.womenPage = 1;
        this.bothPage = 1;
        var credential = {
            "createdBy": localStorage.getItem("adminId"),
            "brandName": this.brandDetail.name,
            "brandGender": this.brandDetail.gender
        };
        this.service.postApi('/addNewBrand', credential).subscribe(function (response) {
            console.log(JSON.stringify(credential));
            if (response['responseCode'] == 200) {
                _this.service.success(response['responseMessage']);
                console.log('success', response['responseMessage']);
                _this.displayBrand();
            }
            else {
                _this.service.error(response['responseMessage']);
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
        // this.brandDetail.name = ""
        // this.brandDetail.gender = ""
    };
    BrandManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-brand-management',
            template: __webpack_require__("./src/app/brand-management/brand-management.component.html"),
            styles: [__webpack_require__("./src/app/brand-management/brand-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], BrandManagementComponent);
    return BrandManagementComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n<app-side-menu></app-side-menu>\n<div class=\"right-section\">\n    <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n    <div class=\"right-inner\">\n        <h1 class=\"heading\">DASHBOARD</h1>\n       <div class=\"dashbord-body\">\n              <div class=\"row\">\n                  <div class=\"col-sm-6 col-md-4\">\n                      <fieldset class=\"global-fieldset\">\n                          <legend>Users</legend>\n                          <div class=\"filter-content\">\n                              <div class=\"dashboard-content\">\n                                <div class=\"dashboard-left common-text\">\n\n                                  <i class=\"fa fa-users\"></i>\n                                </div>\n                                <div class=\"dashboard-right common-text\">\n                                  {{dashboardData.totalUser}}\n                                </div>\n                              </div>\n                          </div>\n                      </fieldset>\n                  </div>\n                  <div class=\"col-sm-6 col-md-4\">\n                      <fieldset class=\"global-fieldset\">\n                          <legend>Brands</legend>\n                          <div class=\"filter-content\">\n                              <div class=\"dashboard-content\">\n                                <div class=\"dashboard-left common-text\">\n\n                                  <i class=\"fa fa-users\"></i>\n                                </div>\n                                <div class=\"dashboard-right common-text\">\n                                        {{dashboardData.totalBrand}}\n                                </div>\n                              </div>\n                          </div>\n                      </fieldset>\n                  </div>\n                    <div class=\"col-sm-6 col-md-4\">\n                      <fieldset class=\"global-fieldset\">\n                          <legend>Products</legend>\n                          <div class=\"filter-content\">\n                              <div class=\"dashboard-content\">\n                                <div class=\"dashboard-left common-text\">\n\n                                  <i class=\"fa fa-product-hunt\"></i>\n                                </div>\n                                <div class=\"dashboard-right common-text\">\n                                        {{dashboardData.totalProduct}}\n                                </div>\n                              </div>\n                          </div>\n                      </fieldset>\n                  </div>\n               </div>\n            </div>\n        </div>\n       </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(service, router) {
        this.service = service;
        this.router = router;
        this.dashboardData = {};
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getApi('/totalCollection').subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data']);
                _this.dashboardData = response['data'];
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.token = localStorage.getItem("token");
        //baseUrl = 'http://172.16.6.80:1468/admin'
        this.baseUrl = 'http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:1468/admin';
    }
    DataService.prototype.getApi = function (url) {
        var getHttpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                "Content-Type": "application/json",
                "token": this.token
            })
        };
        return this.http.get(this.baseUrl + url, getHttpOptions);
    };
    DataService.prototype.loginPostApi = function (url, data) {
        var getHttpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                "Content-Type": "application/json",
            })
        };
        return this.http.post(this.baseUrl + url, data, getHttpOptions);
    };
    DataService.prototype.postApi = function (url, data) {
        var getHttpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                "Content-Type": "application/json",
                "token": this.token
            })
        };
        return this.http.post(this.baseUrl + url, data, getHttpOptions);
    };
    DataService.prototype.error = function (title) {
        toastr.error(title);
    };
    DataService.prototype.success = function (title, meassage) {
        toastr.success(title, meassage);
    };
    DataService.prototype.setting = function () {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "400",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            'animate': 'flyRight'
        };
    };
    DataService.prototype.ngOnInit = function () {
        this.setting();
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/edit-user/edit-user.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/edit-user/edit-user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n  <app-side-menu></app-side-menu>\n  <div class=\"right-section\">\n    <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n    <div class=\"right-inner\">\n              <div class=\"filter-block\">\n                <fieldset class=\"global-fieldset\">\n                   <legend>Edit User</legend>\n                    <div class=\"filter-content\">\n                      <form class=\"login_box_outer\" [formControlName]='editUserForm' novalidate>\n                         <div class=\"common-detail-box\">\n                            <div class=\"form-group row\" [ngClass]=\"{'has-error': (editUserForm.controls['name'].dirty && editUserForm.controls['name'].invalid)}\">\n                               <label class=\"col-sm-4 label-right label-top\">Name</label>\n                               <div class=\"col-sm-8\">\n                                  <input class=\"form-control custom-input custom-control\" id=\"name\" name=\"name\" [(ngModel)]=\"editUser.name\" value=\"{{editUserDetail.name}}\" type=\"text\" [formControl]=\"editUserForm.controls['name']\"  maxlength=\"20\"/>\n                                  <div class=\"errMsg\" *ngIf=\"editUserForm.controls['name'].dirty && editUserForm.controls['name'].invalid\">\n                                      <span style='color:red' [ngClass]=\"{error:editUserForm.controls['name'].hasError('required')}\" *ngIf=\"editUserForm.controls['name'].hasError('required')\">*Please enter name.</span>\n                                      <span style='color:red' [ngClass]=\"{error:editUserForm.controls['name'].hasError('minlength') && !editUserForm.controls['name'].hasError('pattern')}\" *ngIf=\"editUserForm.controls['name'].hasError('minlength') && !editUserForm.controls['name'].hasError('pattern')\">*Name must be minimum 2 characters.</span>\n                                      <span style='color:red' [ngClass]=\"{error:editUserForm.controls['name'].hasError('pattern')}\" *ngIf=\"editUserForm.controls['name'].hasError('pattern')\">*Please enter valid name.</span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group row\" [ngClass]=\"{'has-error': (editUserForm.controls['email'].dirty && editUserForm.controls['email'].invalid)}\">\n                               <label class=\"col-sm-4 label-right label-top\">Email</label>\n                               <div class=\"col-sm-8\">\n                                  <input type=\"text\" name=\"email\" [(ngModel)]=\"editUser.email\" id=\"email\" [formControl]=\"editUserForm.controls['email']\" class=\"form-control custom-input custom-control\" value=\"{{editUserDetail.email}}\" maxlength=\"60\">\n                                  <div class=\"errMsg\" *ngIf=\"editUserForm.controls['email'].dirty && editUserForm.controls['email'].invalid\">\n                                      <span style='color:red' [ngClass]=\"{error:editUserForm.controls['email'].hasError('required')}\" *ngIf=\"editUserForm.controls['email'].hasError('required')\">*Please enter an email.</span>\n                                      <span style='color:red' [ngClass]=\"{error: editUserForm.controls['email'].hasError('pattern')}\"  *ngIf=\"editUserForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n                                      <span style='color:red' [ngClass]=\"{error: editUserForm.controls['email'].hasError('maxlength') && editUserForm.controls['email'].dirty}\" *ngIf=\"editUserForm.controls['email'].hasError('maxlength') && ! editUserForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n                                  </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group row\" [ngClass]=\"{'has-error': (editUserForm.controls['age'].dirty && editUserForm.controls['age'].invalid)}\">\n                               <label class=\"col-sm-4 label-right label-top\">Age</label>\n                               <div class=\"col-sm-8\">\n                                  <input class=\"form-control custom-input custom-control\" name=\"age\" id='age' [(ngModel)]=\"editUser.age\" value=\"{{editUserDetail.age}}\" type=\"text\" [formControl]=\"editUserForm.controls['age']\" minlength=\"1\" maxlength=\"3\"/>\n                                  <div class=\"errMsg\" *ngIf=\"editUserForm.controls['age'].dirty && editUserForm.controls['age'].invalid\">\n                                      <span style='color:red' [ngClass]=\"{error:editUserForm.controls['age'].hasError('required')}\"  *ngIf=\"editUserForm.controls['age'].hasError('required')\">*Please enter age.</span>\n                                      <span style='color:red' [ngClass]=\"{error:editUserForm.controls['age'].hasError('pattern')}\"  *ngIf=\"editUserForm.controls['age'].hasError('pattern')\">*Please enter valid age.</span>\n                                      </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group row\">\n                              <label class=\"col-sm-4 label-right label-top\">Gender</label>\n                              <div class=\"col-sm-8\">\n                               <select (ngModelChange)=\"onSelect($event)\" class=\"form-control custom-input custom-control angle\" [(ngModel)]=\"editUserDetail.gender\"  [ngModelOptions]=\"{standalone: true}\">  \n                                 <option value=\"\" disabled>--Select--</option> \n                                  <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n                              </select>  \n                              </div>\n                           </div>\n                            <div class=\"form-group row\" *ngIf = \"!condition\">\n                               <label class=\"col-sm-4 label-right label-top\">Body Type</label>\n                               <div class=\"col-sm-8\">\n                                  <select name=\"bodyType\"  [(ngModel)]=\"editUserDetail.bodyType\" class=\"form-control custom-input custom-control angle\"  [ngModelOptions]=\"{standalone: true}\">\n                                      <option value='' disabled>--Select--</option>  \n                                      <option *ngFor=\"let body of editBody\" value={{body.name}}>{{body.name}}</option>  \n                                  </select>\n                               </div>\n                            </div>\n                            <div class=\"form-group row\" *ngIf = \"condition\">\n                              <label class=\"col-sm-4 label-right label-top\">Body Type</label>\n                              <div class=\"col-sm-8\">\n                                 <select name=\"bodyType\"  [(ngModel)]=\"editUser.bodyType\" class=\"form-control custom-input custom-control angle\" [ngModelOptions]=\"{standalone: true}\">\n                                     <option value='' disabled>--Select--</option>  \n                                     <option *ngFor=\"let body of selectedBody\" value={{body.name}}>{{body.name}}</option>  \n                                 </select>\n                              </div>\n                           </div>\n                           <div class=\"form-group row\" [ngClass]=\"{'has-error': (editUserForm.controls['height'].dirty && editUserForm.controls['height'].invalid)}\">\n                            <label class=\"col-sm-4 label-right label-top\">Height</label>\n                            <div class=\"col-sm-8\">\n                               <input class=\"form-control custom-input custom-control\" name=\"height\" id='height' [(ngModel)]=\"editUser.height\" value=\"{{editUserDetail.height}}\" type=\"text\" [formControl]=\"editUserForm.controls['height']\" minlength=\"1\" maxlength=\"3\"/>\n                               <div class=\"errMsg\" *ngIf=\"editUserForm.controls['height'].dirty && editUserForm.controls['height'].invalid\">\n                                   <span style='color:red' [ngClass]=\"{error:editUserForm.controls['height'].hasError('required')}\"  *ngIf=\"editUserForm.controls['height'].hasError('required')\">*Please enter height.</span>\n                                   <span style='color:red' [ngClass]=\"{error:editUserForm.controls['height'].hasError('pattern')}\"  *ngIf=\"editUserForm.controls['height'].hasError('pattern')\">*Please enter valid height.</span>\n                                   </div>\n                             </div>\n                         </div>\n                         <div class=\"form-group row\" [ngClass]=\"{'has-error': (editUserForm.controls['weight'].dirty && editUserForm.controls['weight'].invalid)}\">\n                          <label class=\"col-sm-4 label-right label-top\">Weight</label>\n                          <div class=\"col-sm-8\">\n                             <input class=\"form-control custom-input custom-control\" name=\"weight\" id='weight' [(ngModel)]=\"editUser.weight\" value=\"{{editUserDetail.weight}}\" type=\"text\" [formControl]=\"editUserForm.controls['weight']\" minlength=\"1\" maxlength=\"3\"/>\n                             <div class=\"errMsg\" *ngIf=\"editUserForm.controls['weight'].dirty && editUserForm.controls['weight'].invalid\">\n                                 <span style='color:red' [ngClass]=\"{error:editUserForm.controls['weight'].hasError('required')}\"  *ngIf=\"editUserForm.controls['weight'].hasError('required')\">*Please enter weight.</span>\n                                 <span style='color:red' [ngClass]=\"{error:editUserForm.controls['weight'].hasError('pattern')}\"  *ngIf=\"editUserForm.controls['weight'].hasError('pattern')\">*Please enter valid weight.</span>\n                                 </div>\n                           </div>\n                       </div>\n                            <div class=\"table-button text-center mt30\">\n                               <button (click)=\"saveChanges()\" class=\"btn btn-red\">Save </button>\n                               <button (click)=\"cancel()\" class=\"btn btn-danger\">Cancel</button>\n                            </div>\n                         </div>\n                      </form>\n                    </div>\n                </fieldset>\n              </div>        \n          </div>  \n        </div>\n </div>\n\n\n\n\n\n\n <!-- <form class=\"login_box_outer\" [formGroup]='editUserForm' novalidate>\n    <div class=\"common-detail-box\">\n       <div class=\"form-group row\" [ngClass]=\"{'has-error': (editUserForm.controls['name'].dirty && addUserForm.controls['name'].invalid)}\">\n          <label class=\"col-sm-4 label-right label-top\">Name</label>\n          <div class=\"col-sm-8\">\n             <input class=\"form-control\" id=\"name\" name=\"name\" [(ngModel)]=\"userDetail.name\" placeholder=\"Name\" type=\"text\" [formControl]=\"addUserForm.controls['name']\"  maxlength=\"20\"/>\n             <div class=\"errMsg\" *ngIf=\"addUserForm.controls['name'].dirty && addUserForm.controls['name'].invalid\">\n               <span style='color:red' [ngClass]=\"{error:addUserForm.controls['name'].hasError('required')}\" *ngIf=\"addUserForm.controls['name'].hasError('required')\">*Please enter name.</span>\n               <span style='color:red' [ngClass]=\"{error:addUserForm.controls['name'].hasError('minlength') && !addUserForm.controls['name'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['name'].hasError('minlength') && !addUserForm.controls['name'].hasError('pattern')\">*Name must be minimum 2 characters.</span>\n               <span style='color:red' [ngClass]=\"{error:addUserForm.controls['name'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['name'].hasError('pattern')\">*Please enter valid name.</span>\n             </div>\n           </div>\n       </div>\n       <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['email'].dirty && addUserForm.controls['email'].invalid)}\">\n          <label class=\"col-sm-4 label-right label-top\">Email</label>\n          <div class=\"col-sm-8\">\n             <input type=\"text\" name=\"email\" [(ngModel)]=\"userDetail.email\" id=\"email\" [formControl]=\"addUserForm.controls['email']\" class=\"form-control\" placeholder=\"Email\" maxlength=\"60\">\n             <div class=\"errMsg\" *ngIf=\"addUserForm.controls['email'].dirty && addUserForm.controls['email'].invalid\">\n               <span style='color:red' [ngClass]=\"{error:addUserForm.controls['email'].hasError('required')}\" *ngIf=\"addUserForm.controls['email'].hasError('required')\">*Please enter an email.</span>\n               <span style='color:red' [ngClass]=\"{error: addUserForm.controls['email'].hasError('pattern')}\"  *ngIf=\"addUserForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n               <span style='color:red' [ngClass]=\"{error: addUserForm.controls['email'].hasError('maxlength') && addUserForm.controls['email'].dirty}\" *ngIf=\"addUserForm.controls['email'].hasError('maxlength') && ! addUserForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n           </div>\n           </div>\n       </div>\n       <div class=\"form-group row\" [ngClass]=\"{'has-error': (editUserForm.controls['age'].dirty && editUserForm.controls['age'].invalid)}\">\n          <label class=\"col-sm-4 label-right label-top\">Age</label>\n          <div class=\"col-sm-8\">\n          <input class=\"form-control\" name=\"age\" id='age' [(ngModel)]=\"userDetail.age\" placeholder=\"Age\" type=\"text\" [formControl]=\"addUserForm.controls['age']\" minlength=\"1\" maxlength=\"3\"/>\n<div class=\"errMsg\" *ngIf=\"addUserForm.controls['age'].dirty && addUserForm.controls['age'].invalid\">\n<span style='color:red' [ngClass]=\"{error:addUserForm.controls['age'].hasError('required')}\"  *ngIf=\"addUserForm.controls['age'].hasError('required')\">*Please enter age.</span>\n<span style='color:red' [ngClass]=\"{error:addUserForm.controls['age'].hasError('pattern')}\"  *ngIf=\"addUserForm.controls['age'].hasError('pattern')\">*Please enter valid age.</span>\n</div>\n          </div>\n       </div>\n       \n       \n        <div class=\"form-group row\">\n         <label class=\"col-sm-4 label-right label-top\">Gender</label>\n         <div class=\"col-sm-8\">\n          <select (ngModelChange)=\"onSelect($event)\" class=\"form-control\" [(ngModel)]=\"userDetail.gender\" [ngModelOptions]=\"{standalone: true}\">  \n            <option value=\"select\" disabled>--Select--</option> \n             <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n         </select>  \n         </div>\n      </div>\n       \n       <div class=\"form-group row\">\n         <label class=\"col-sm-4 label-right label-top\">Body Type</label>\n         <div class=\"col-sm-8\">\n           \n          <select class=\"form-control\" name=\"bodyType\" [disabled]=\"!userDetail.gender\"  [(ngModel)]=\"userDetail.bodyType\" [ngModelOptions]=\"{standalone: true}\">\n              <option value='select' disabled>--Select--</option>  \n              <option *ngFor=\"let body of selectedBody\" value={{body.name}}>{{body.name}}</option>\n         </select>\n           \n         </div>\n      </div>\n\n       <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['height'].dirty && addUserForm.controls['height'].invalid)}\">\n           <label class=\"col-sm-4 label-right label-top\">height</label>\n           <div class=\"col-sm-8\">\n              <input class=\"form-control\" id=\"height\" name=\"height\" [(ngModel)]=\"userDetail.height\" placeholder=\"height\" type=\"text\" [formControl]=\"addUserForm.controls['height']\" maxlength=\"20\"/>\n              <div class=\"errMsg\" *ngIf=\"addUserForm.controls['height'].dirty && addUserForm.controls['height'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['height'].hasError('required')}\" *ngIf=\"addUserForm.controls['height'].hasError('required')\">*Please enter height.</span>\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['height'].hasError('minlength') && !addUserForm.controls['height'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['height'].hasError('minlength') && !addUserForm.controls['height'].hasError('pattern')\">*height must be minimum 2 characters.</span>\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['height'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['height'].hasError('pattern')\">*Please enter valid height.</span>\n              </div>\n            </div>\n        </div>\n        <div class=\"form-group row\" [ngClass]=\"{'has-error': (addUserForm.controls['weight'].dirty && addUserForm.controls['weight'].invalid)}\">\n           <label class=\"col-sm-4 label-right label-top\">weight</label>\n           <div class=\"col-sm-8\">\n              <input class=\"form-control\" id=\"weight\" name=\"weight\" [(ngModel)]=\"userDetail.weight\" placeholder=\"weight\" type=\"text\" [formControl]=\"addUserForm.controls['weight']\" maxlength=\"20\"/>\n              <div class=\"errMsg\" *ngIf=\"addUserForm.controls['weight'].dirty && addUserForm.controls['weight'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['weight'].hasError('required')}\" *ngIf=\"addUserForm.controls['weight'].hasError('required')\">*Please enter weight.</span>\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['weight'].hasError('minlength') && !addUserForm.controls['weight'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['weight'].hasError('minlength') && !addUserForm.controls['weight'].hasError('pattern')\">*weight must be minimum 2 characters.</span>\n                <span style='color:red' [ngClass]=\"{error:addUserForm.controls['weight'].hasError('pattern')}\" *ngIf=\"addUserForm.controls['weight'].hasError('pattern')\">*Please enter valid weight.</span>\n              </div>\n            </div>\n        </div>\n       <div class=\"table-button text-center mt30\">\n          <button class=\"btn btn-red\" (click)=\"save()\">Save </button>\n          <button (click)=\"cancel()\" class=\"btn btn-danger\">Cancel</button>\n       </div>\n    </div>\n  </form> -->"

/***/ }),

/***/ "./src/app/edit-user/edit-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(service, router, _location, formBuilder) {
        this.service = service;
        this.router = router;
        this._location = _location;
        this.formBuilder = formBuilder;
        this.condition = false;
        this.male = "Male";
        this.female = "Female";
        this.editUser = { "bodyType": "", "gender": "" };
        this.gender = [
            { id: 1, name: "Male" },
            { id: 2, name: "Female" }
        ];
        this.maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        this.femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editUserForm = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].pattern(/^[^\s][a-zA-Z ]*$/), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(2)])],
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].pattern(/^[A-Z0-9_]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].maxLength(50)])],
            age: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].pattern(/^[1-9][0-9]{1,7}$/)])],
            height: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].pattern(/^[1-9][0-9]{1,7}$/)])],
            weight: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].pattern(/^[1-9][0-9]{1,7}$/)])]
        });
        var credential = {
            "userId": localStorage.getItem("userId")
        };
        this.service.postApi('/userDetail', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data']);
                _this.editUserDetail = response['data'];
                if (_this.editUserDetail.gender == "Male") {
                    _this.editBody = _this.maleBodyType;
                }
                else if (_this.editUserDetail.gender == "Female") {
                    _this.editBody = _this.femaleBodyType;
                }
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    EditUserComponent.prototype.saveChanges = function () {
        var _this = this;
        var credential = {
            "userId": localStorage.getItem("userId"),
            "name": this.editUser.name,
            "email": this.editUser.email,
            "age": this.editUser.age,
            "bodyType": this.editUser.bodyType,
            "gender": this.editUser.gender,
            "height": this.editUser.height,
            "weight": this.editUser.weight,
        };
        this.service.postApi('/editUser', credential).subscribe(function (response) {
            console.log(JSON.stringify(credential));
            if (response['responseCode'] == 200) {
                console.log('success', response['responseMessage']);
                _this.router.navigate(['/user-management']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    EditUserComponent.prototype.cancel = function () {
        this._location.back();
    };
    EditUserComponent.prototype.onSelect = function (productId) {
        this.editUser.bodyType = "";
        this.condition = true;
        var maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        var femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
        this.selectedProduct = null;
        for (var i = 0; i < this.gender.length; i++) {
            if (this.gender[i].name == productId) {
                this.selectedProduct = this.gender[i];
            }
        }
        if (this.selectedProduct.name == "Male") {
            this.selectedBody = maleBodyType;
        }
        else {
            this.selectedBody = femaleBodyType;
        }
        this.editUser.bodyType = " ";
    };
    EditUserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-edit-user',
            template: __webpack_require__("./src/app/edit-user/edit-user.component.html"),
            styles: [__webpack_require__("./src/app/edit-user/edit-user.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormBuilder */]])
    ], EditUserComponent);
    return EditUserComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"beforelogin\">\n  <div class=\"logo\"><a><img src=\"assets/img/logo.png\"></a></div>\n</header>\n  <div class=\"before-login-wrapper\">\n     <div class=\"inner-content clearfix\">\n         <div class=\"login-main-content\">\n            <div class=\"before-login-logo\">\n             \n             </div>\n             <form class=\"login_box_outer\" [formGroup]='loginForm' novalidate>\n\n             <div class=\"login-content-box\">\n                 <h2 class=\"heading\">Login</h2>\n                  <div class=\"form-group\" [ngClass]=\"{'has-error': (loginForm.controls['email'].dirty && loginForm.controls['email'].invalid)}\">\n                    <label>Email Address <span class=\"require\">*</span></label>\n                     <input type=\"text\" name=\"email\" id=\"email\" [(ngModel)]=\"loginData.email\" [formControl]=\"loginForm.controls['email']\" class=\"form-control\" placeholder=\"Email\" maxlength=\"60\">\n                     <div class=\"errMsg\" *ngIf=\"loginForm.controls['email'].dirty && loginForm.controls['email'].invalid\">\n                      <span style='color:red' [ngClass]=\"{error:loginForm.controls['email'].hasError('required')}\" *ngIf=\"loginForm.controls['email'].hasError('required')\">*Please enter an email.</span>\n                      <span style='color:red' [ngClass]=\"{error: loginForm.controls['email'].hasError('pattern')}\"  *ngIf=\"loginForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n                      <span style='color:red' [ngClass]=\"{error: loginForm.controls['email'].hasError('maxlength') && loginForm.controls['email'].dirty}\" *ngIf=\"loginForm.controls['email'].hasError('maxlength') && ! loginForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n                  </div>\n                  </div> \n                  <div class=\"form-group\">\n                    <label>Password <span class=\"require\">*</span></label>\n                     <input type=\"password\" name=\"password\" id=\"password\" [(ngModel)]=\"loginData.password\" [formControl]=\"loginForm.controls['password']\" class=\"form-control\" placeholder=\"Password\" minlength=\"8\" maxlength=\"16\">\n                     <div class=\"errMsg\" *ngIf=\"loginForm.controls['password'].dirty && loginForm.controls['password'].invalid\">\n                      <span style='color:red' [ngClass]=\"{error:loginForm.controls['password'].hasError('required')}\" *ngIf=\"loginForm.controls['password'].hasError('required')\">*Please enter Password.</span>\n                      <span style='color:red' [ngClass]=\"{error: loginForm.controls['password'].hasError('minlength') && loginForm.controls['password'].dirty}\" *ngIf=\"loginForm.controls['password'].hasError('minlength')\">*Please enter minimum 8 characters.</span>\n                      <span style='color:red' [ngClass]=\"{error: loginForm.controls['password'].hasError('maxlength') && loginForm.controls['password'].dirty}\" *ngIf=\"loginForm.controls['password'].hasError('maxlength')\">*Please enter maximum 16 characters.</span>\n                    </div>\n                  </div> \n                  <div class=\"remeberme-block  clearfix \">\n                     <div class=\"pull-left\">\n                         <input type=\"checkbox\" id=\"subscribeNews\" name=\"remeberMe\" [(ngModel)]=\"loginData.rememberMe\" [formControl]=\"loginForm.controls['rememberMe']\" value=\"newsletter\">\n                      <label for=\"subscribeNews\">Remember me</label>\n                     </div>\n                  </div>\n                  <div class=\"button-box\">\n                     <button (click)=\"login()\" type=\"submit\" [disabled]=\"loginForm.invalid\" class=\"btn btn-red width100\">Login</button>\n                  </div>\n              </div>\n              </form>\n           </div>\n      </div>\n\n    </div>\n\n\n    <!-- <form [formGroup]=\"loginForm\" (ngSubmit)=\"dealerSubmit(dealerForm.value)\">\n            <div class=\"select-profile-img\">\n           \n            <img src=\"{{imageUrl}}\" >\n            <span class=\"camera fas fa-camera\"><input type=\"file\" (change)=\"fileSelect($event)\" accept=\"image/jpeg,image/jpg,image/png\"/></span>\n           </div>\n           \n           <div class=\"row\">\n             <div class=\"col-md-6\">\n             <div class=\"form-group\" [ngClass]=\"{'has-error': (dealerForm.controls['firstName'].dirty && dealerForm.controls['firstName'].invalid)}\">\n              <input class=\"form-control\" id=\"firstname\" placeholder=\"First Name\" type=\"text\" [formControl]=\"dealerForm.controls['firstName']\" maxlength=\"20\" />\n              <div class=\"errMsg\" *ngIf=\"dealerForm.controls['firstName'].dirty && dealerForm.controls['firstName'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['firstName'].hasError('required')}\" *ngIf=\"dealerForm.controls['firstName'].hasError('required')\">*Please enter first name.</span>\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['firstName'].hasError('minlength') && !dealerForm.controls['firstName'].hasError('pattern')}\" *ngIf=\"dealerForm.controls['firstName'].hasError('minlength') && !dealerForm.controls['firstName'].hasError('pattern')\">*First name must be minimum 2 characters.</span>\n                <span style='color:red' [ngClass]=\"{error:!dealerForm.controls['firstName'].hasError('minlength') && dealerForm.controls['firstName'].hasError('pattern')}\" *ngIf=\"!dealerForm.controls['firstName'].hasError('minlength') && dealerForm.controls['firstName'].hasError('pattern')\">*Please enter valid first name.</span>\n              </div>\n             </div>\n           </div>\n            <div class=\"col-md-6\">\n             <div class=\"form-group\" [ngClass]=\"{'has-error': (dealerForm.controls['lastName'].dirty && dealerForm.controls['lastName'].invalid)}\">\n              <input class=\"form-control\" id=\"lastname\" placeholder=\"Last Name\" type=\"text\" [formControl]=\"dealerForm.controls['lastName']\" maxlength=\"20\"/>\n              <div class=\"errMsg\" *ngIf=\"dealerForm.controls['lastName'].dirty && dealerForm.controls['lastName'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['lastName'].hasError('required')}\"  *ngIf=\"dealerForm.controls['lastName'].hasError('required')\">*Please enter last name.</span>\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['lastName'].hasError('minlength') && !dealerForm.controls['lastName'].hasError('pattern')}\"  *ngIf=\"dealerForm.controls['lastName'].hasError('minlength') && !dealerForm.controls['lastName'].hasError('pattern')\">*Last name must be minimum 2 characters.</span>\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['lastName'].hasError('pattern') && !dealerForm.controls['lastName'].hasError('minlength')}\"  *ngIf=\"dealerForm.controls['lastName'].hasError('pattern') && !dealerForm.controls['lastName'].hasError('minlength')\">*Please enter valid last name.</span>\n              </div>\n             </div>\n           </div>\n           \n           <div class=\"col-md-6\">\n             <div class=\"form-group\" [ngClass]=\"{'has-error': (dealerForm.controls['dealerName'].dirty && dealerForm.controls['dealerName'].invalid)}\">\n              <input class=\"form-control\" id=\"dealername\" placeholder=\"Dealership Name\" type=\"text\" [formControl]=\"dealerForm.controls['dealerName']\" maxlength=\"50\"/>\n              <div class=\"errMsg\" *ngIf=\"dealerForm.controls['dealerName'].dirty && dealerForm.controls['dealerName'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['dealerName'].hasError('required')}\"  *ngIf=\"dealerForm.controls['dealerName'].hasError('required')\">*Please enter dealership name.</span>\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['dealerName'].hasError('minlength') && !dealerForm.controls['dealerName'].hasError('pattern')}\"  *ngIf=\"dealerForm.controls['dealerName'].hasError('minlength') && !dealerForm.controls['dealerName'].hasError('pattern')\">*Dealership name must be minimum 3 characters.</span>\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['dealerName'].hasError('pattern') && !dealerForm.controls['dealerName'].hasError('minlength')}\"  *ngIf=\"dealerForm.controls['dealerName'].hasError('pattern') && !dealerForm.controls['dealerName'].hasError('minlength')\">*Please enter valid dealership name.</span>\n              </div>\n             </div>\n           </div>\n           \n           <div class=\"col-md-6\">\n             <div class=\"form-group\" [ngClass]=\"{'has-error': (dealerForm.controls['email'].dirty && dealerForm.controls['email'].invalid)}\">\n              <input class=\"form-control\" id='email' placeholder=\"Email ID\" type=\"text\" [formControl]=\"dealerForm.controls['email']\" maxlength=\"60\" />\n              <div class=\"errMsg\" *ngIf=\"dealerForm.controls['email'].dirty && dealerForm.controls['email'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['email'].hasError('required')}\" *ngIf=\"dealerForm.controls['email'].hasError('required')\">*Please enter an email.</span>\n                <span style='color:red' [ngClass]=\"{error: dealerForm.controls['email'].hasError('pattern')}\"  *ngIf=\"dealerForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n                <span style='color:red' [ngClass]=\"{error: dealerForm.controls['email'].hasError('maxlength') && dealerForm.controls['email'].dirty}\" *ngIf=\"dealerForm.controls['email'].hasError('maxlength') && ! dealerForm.controls['email'].hasError('pattern')\">*Please enter valid email.</span>\n\n              </div>\n             </div>\n           </div>\n           \n           <div class=\"col-md-6\">\n             <div class=\"form-group\" [ngClass]=\"{'has-error': (dealerForm.controls['phoneNo'].dirty && dealerForm.controls['phoneNo'].invalid)}\">\n              <input class=\"form-control\" id='phoneNo' placeholder=\"Contact No.\" type=\"text\" [formControl]=\"dealerForm.controls['phoneNo']\" maxlength=\"12\" minlength=\"10\"/>\n              <div class=\"errMsg\" *ngIf=\"dealerForm.controls['phoneNo'].dirty && dealerForm.controls['phoneNo'].invalid\">\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['phoneNo'].hasError('required')}\"  *ngIf=\"dealerForm.controls['phoneNo'].hasError('required')\">*Please enter contact no.</span>\n                <span style='color:red' [ngClass]=\"{error:dealerForm.controls['phoneNo'].hasError('pattern')}\"  *ngIf=\"dealerForm.controls['phoneNo'].hasError('pattern')\">*Please enter valid contact no.</span>\n              </div>\n             </div>\n           </div>\n           \n            <div class=\"col-md-6\">\n             <div class=\"form-group\">\n              <select class=\"form-control select_style2\" [formControl]=\"dealerForm.controls['country']\">\n                <option value=\"\">Select Country</option>\n                <option value=\"US\">US</option>\n                <option value=\"CANADA\">Canada</option>\n              </select>\n              <span style='color:red' [ngClass]=\"{error:dealerForm.controls['country'].hasError('required') &&  dealerForm.get('country').touched}\" *ngIf=\"dealerForm.controls['country'].hasError('required') &&  dealerForm.get('country').touched\">*Please select country.</span>\n             </div>\n           </div>\n           \n            <div class=\"col-md-6\">\n             <div class=\"form-group\" [ngClass]=\"{'has-error': (dealerForm.controls['pin'].dirty && dealerForm.controls['pin'].invalid)}\">\n              <input class=\"form-control\" id='pin' placeholder=\"Zip Code\" type=\"text\" [formControl]=\"dealerForm.controls['pin']\" maxlength=\"6\" (change)='checkfornum()'/>\n              <div class=\"errMsg\" *ngIf=\"dealerForm.controls['pin'].dirty && dealerForm.controls['pin'].invalid\">\n                \n                <span style='color:red' [ngClass]=\"{error: dealerForm.controls['pin'].hasError('required') && dealerForm.controls['pin'].touched}\" *ngIf=\"dealerForm.controls['pin'].hasError('required')\">*Please enter postal code.</span>\n              <span style='color:red' [ngClass]=\"{error: dealerForm.controls['pin'].hasError('minlength') && dealerForm.controls['pin'].dirty  && pinValid} \" *ngIf=\"dealerForm.controls['pin'].hasError('minlength') && !dealerForm.controls['pin'].hasError('pattern')  && pinValid\">*Postal code must be between 3 to 6 characters.</span>\n              <span style='color:red' [ngClass]=\"{error: dealerForm.controls['pin'].hasError('pattern') && dealerForm.controls['pin'].dirty}\" *ngIf=\"dealerForm.controls['pin'].hasError('pattern') && !dealerForm.controls['pin'].hasError(minlength)\">*Please enter valid postal code</span>\n              <span style='color:red' [ngClass]=\"{error: !dealerForm.controls['pin'].hasError('required') && dealerForm.controls['pin'].dirty && !pinValid}\" *ngIf=\"!dealerForm.controls['pin'].hasError('required') && !dealerForm.controls['pin'].hasError(minlength) && !pinValid\">*Please enter valid postal code.</span>\n            </div>\n             </div>\n           </div>\n           \n           <div class=\"col-md-6\">\n             <div class=\"form-group\">\n              <select class=\"form-control select_style2\" [formControl]=\"dealerForm.controls['dealerType']\">\n                <option  value=\"\">Select Your Dealership Type</option>\n                <option value=\"STANDARD\">Standard</option>\n                <option value=\"SPONSORED\">Sponsored</option>\n              </select>\n              <span style='color:red' [ngClass]=\"{error:dealerForm.controls['dealerType'].hasError('required')  &&  dealerForm.get('dealerType').touched}\" *ngIf=\"dealerForm.controls['dealerType'].hasError('required') &&  dealerForm.get('dealerType').touched\">*Please select dealership type.</span>\n             </div>\n           </div>\n           \n           <div class=\"col-md-6\">\n             <button type=\"submit\"  class=\"btn btn-green btn-large btn-block\" [disabled]=\"dealerForm.invalid\">PAY $100</button>\n           </div>\n           \n           </div>\n           \n         </form> -->"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_toastr__ = __webpack_require__("./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, formBuilder, service, toastr) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.service = service;
        this.toastr = toastr;
        this.isSubmitted = false;
        this.loginData = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].pattern(/^[A-Z0-9_]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].maxLength(50)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].maxLength(16), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].minLength(8)])],
            rememberMe: []
        });
        $(function () {
            $('#email,#password').on('keypress', function (e) {
                if (e.which == 32)
                    return false;
            });
        });
        this.loginData.email = localStorage.getItem("email");
        this.loginData.password = localStorage.getItem("password");
        this.loginData.rememberMe = true;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var credential = {
            "email": this.loginData.email,
            "password": this.loginData.password
        };
        this.service.loginPostApi('/login', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                _this.service.success(response['responseMessage']);
                console.log('success', response['responseMessage']);
                localStorage.setItem("adminId", response['data']._id);
                localStorage.setItem("token", response['data'].token);
                if (_this.loginData.rememberMe == true) {
                    localStorage.setItem('email', _this.loginData.email);
                    localStorage.setItem('password', _this.loginData.password);
                }
                _this.router.navigate(['/dashboard']);
            }
            else {
                _this.service.error('Invalid Email');
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_4_ngx_toastr__["b" /* ToastrService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/product-management/product-management.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product-management/product-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n  <app-side-menu></app-side-menu>\n<div class=\"right-section no-scroll\">\n  <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n  <div class=\"right-inner\">\n      \n    <h1 class=\"heading\">PRODUCT MANAGEMENT</h1>\n    <div class=\"filter-block\">\n          <fieldset class=\"global-fieldset\">\n              <legend>Product Board</legend>\n              <div class=\"filter-content\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6\">\n                       <div class=\"form-group\">\n                          <div class=\"search-icon\">\n                             <input type=\"text\" [(ngModel)]=\"searchProduct.data\" class=\"form-control max-wt-300 search-input\" placeholder=\"Search\">\n                             <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                          </div>\n                       </div>\n                    </div>\n                    <div class=\"col-sm-6\">\n                       <div class=\"btn-right\">\n                          <button class=\"btn btn-red btn-common\" (click)=\"addProduct()\">Add</button>\n                       </div>\n                    </div>\n                 </div>\n                 <div class=\"row\">\n                    <div class=\"col-sm-6\">\n                       <div class=\"form-group d-inline-block\">\n                          <div class=\"show-entries mb0\">\n                             <select class=\"form-control\" (ngModelChange)=\"onSelect($event)\" name=\"gender\" (change)=\"sort()\" [(ngModel)]=\"sortProduct.gender\" [ngModelOptions]=\"{standalone: true}\">\n                                <option value=\"\" >--Gender--</option>\n                                <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n                             </select> \n                          </div>\n                        </div>\n                        <div class=\"form-group d-inline-block\">\n                          <div class=\"show-entries mb0\">\n                             <select class=\"form-control\" name=\"bodyType\" (change)=\"sort()\" [(ngModel)]=\"sortProduct.bodyType\" [ngModelOptions]=\"{standalone: true}\">\n                                <option value=\"\" >--Body Type--</option>\n                                <option *ngFor=\"let body of selectedBody\" value={{body.name}}>{{body.name}}</option>\n                             </select>  \n                          </div>\n                        </div>\n                    </div>\n                 </div>\n                <div class=\"box box-blue\">\n            <div class=\"box-body\">\n                <div class=\"custom-table table-responsive\">\n              <table class=\"table  table-border\">\n                  <thead>\n                      <tr>\n                        <th>SNo.</th>\n                        <th>Gender</th>\n                        <th>Body Type</th>\n                        <th>Product Name</th>\n                        <th>Brand Name</th>\n                        <th>Action</th>\n                      </tr>\n                  </thead>\n                  <tbody>\n                      <tr *ngFor=\"let item of product | paginate: { itemsPerPage: 10, currentPage: p ,totalItems: total} ; let i = index \" [attr.data-index] =\"i\">\n                        <td *ngIf=\"p == 1\">{{i + 1}}</td>\n                        <td *ngIf=\"p > 1\">{{i + 1 + 10 * (p-1)}}</td>\n                        <td>{{item.productGender}}</td>\n                        <td>{{item.bodyType}}</td>\n                        <td>{{item.productName}}</td>\n                        <td>{{item.brandName}}</td>\n                        <td>\n                            <div class=\"action-btn\">\n                                <a class=\"btn btn-sm btn-success\" href=\"view-product.html\"><i class=\"fa fa-eye\"></i> View</a>\n                                <a class=\"btn btn-sm btn-primary\" href=\"edit-product.html\"><i class=\"fa fa-edit\"></i> Edit</a>\n                                <a class=\"btn btn-sm btn-danger\" (click)=\"delete(item._id)\"><i class=\"fa fa-trash\"></i> Delete</a>\n                            </div>  \n                        </td>\n                      </tr>\n                  </tbody>\n              </table>\n          </div>  \n                \n            </div>\n         </div>\n              </div>\n          </fieldset>\n      </div>\n        \n          <div class=\"custom-pagination\">\n                <pagination-controls (pageChange)=\"changePage($event)\" (change)=\"search(p)\"></pagination-controls>\n        </div>\n          \n      </div>\n</div>\n</div>\n<div id=\"delete\" class=\"modal fade\" data-easein=\"bounceIn\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"costumModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content common-detail-modal\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n                        ×\n                    </button>\n                </div>\n                <div class=\"modal-body\">\n                    <p class=\"modal-inner-text\">\n                       Are you sure you want to delete this product?\n                    </p>\n      \n                    <div class=\"button-box mt20\">\n                       <button class=\"btn btn-red mr10\" (click)=\"yes()\">Yes</button>\n                       <button class=\"btn btn-danger\" (click)=\"cancelDelete()\">No</button>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    \n                </div>\n            </div>\n        </div>\n      </div>\n      "

/***/ }),

/***/ "./src/app/product-management/product-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductManagementComponent = /** @class */ (function () {
    function ProductManagementComponent(router, service) {
        this.router = router;
        this.service = service;
        this.p = 1;
        this.searchProduct = { data: "" };
        this.sortProduct = { gender: "", bodyType: "" };
        this.gender = [
            { id: 1, name: "Male" },
            { id: 2, name: "Female" }
        ];
        this.maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        this.femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
    }
    ProductManagementComponent.prototype.ngOnInit = function () {
        this.displayProduct();
    };
    ProductManagementComponent.prototype.addProduct = function () {
        this.router.navigate(['/add-product']);
    };
    ProductManagementComponent.prototype.displayProduct = function () {
        var _this = this;
        var credential = {
            "page": this.p,
            "Search": this.searchProduct.data,
            "productGender": this.sortProduct.gender,
            "bodyType": this.sortProduct.bodyType
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/productList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data'].docs);
                _this.product = response['data'].docs;
                _this.total = response['data'].total;
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    ProductManagementComponent.prototype.sort = function () {
        this.displayProduct();
    };
    ProductManagementComponent.prototype.onSelect = function (productId) {
        this.sortProduct.bodyType = "";
        if (productId == "") {
            this.sortProduct.gender = "";
            this.sortProduct.bodyType = "";
            this.selectedBody = null;
        }
        if (productId == "Male") {
            this.selectedBody = this.maleBodyType;
        }
        else if (productId == "Female") {
            this.selectedBody = this.femaleBodyType;
        }
    };
    ProductManagementComponent.prototype.changePage = function (page) {
        this.p = page;
        this.displayProduct();
    };
    ProductManagementComponent.prototype.delete = function (productId) {
        this._id = productId;
        $('#delete').modal('show');
    };
    ProductManagementComponent.prototype.yes = function () {
        var _this = this;
        var credential = {
            "productId": this._id
        };
        this.service.postApi('/deleteProduct', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                _this.service.success(response['responseMessage']);
                console.log('success', response['responseMessage']);
                $('#delete').modal('hide');
                _this.displayProduct();
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    ProductManagementComponent.prototype.cancelDelete = function () {
        $('#delete').modal('hide');
    };
    ProductManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-product-management',
            template: __webpack_require__("./src/app/product-management/product-management.component.html"),
            styles: [__webpack_require__("./src/app/product-management/product-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */]])
    ], ProductManagementComponent);
    return ProductManagementComponent;
}());



/***/ }),

/***/ "./src/app/side-menu/side-menu.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/side-menu/side-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"header\">\n  <nav class=\"navbar navbar-default\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#profile-collapse\" aria-expanded=\"false\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      </button>\n    </div>\n  </nav>\t\n</div>\n<div class=\"left-section\">\n  <div class=\"menubox\">\n    <div class=\"mobmenu\">\n      <span></span>\n      <span></span>\n      <span></span>\n    </div>\n  </div>\n  <div class=\"left-header\">\n    <div class=\"logo\"><a><img src=\"assets/img/logo.png\"></a></div>\n  </div>\n      <div class=\"user-panel\">\n<!--              <figure class=\"view-inline\">\n           <a href=\"my-account.html\">\n            <img src=\"assets/img/profile.jpg\">\n            </a>\n         </figure>[ngClass]=\"{'active': }\" -->\n          <span class=\"view-inline user_name\">Admin Panel</span>\n      </div>\n  <div class=\"left-menu\">\n    <ul class=\"nav\">\n      <li><a [ngClass]=\"{'active': isActive == 'dashboard'  }\" (click)=\"tabManag('dashboard')\"><i class=\"fa fa-tachometer\"></i>DASHBOARD</a></li>\n      <li><a [ngClass]=\"{'active': isActive == 'user-management' || isActive == 'view-user' || isActive == 'edit-user' || isActive == 'add-user'  }\" (click)=\"tabManag('userManagement')\"><i class=\"fa fa-users\"></i>USER MANAGEMENT</a></li>\n      <li><a [ngClass]=\"{'active': isActive == 'brand-management'}\" (click)=\"tabManag('brandManagement')\"><i class=\"fa fa-angellist\"></i>BRAND MANAGEMENT</a></li>\n      <li><a [ngClass]=\"{'active': isActive == 'product-management'}\" (click)=\"tabManag('productManagement')\"><i class=\"fa fa-product-hunt\"></i>PRODUCT MANAGEMENT</a></li>\n      <li><a [ngClass]=\"{'active': isActive == 'style-management' }\" (click)=\"tabManag('styleManagement')\"><i class=\"fa fa-lastfm\"></i>STYLE MANAGEMENT</a></li>\n      <li><a [ngClass]=\"{'active': isActive == 'logout'}\" data-toggle=\"modal\" data-target=\"#logout_modal\" (click)=\"tabManag('logout')\"><i class=\"fa fa-sign-out\"></i>LOGOUT</a></li>\n    </ul>\n  </div>\n</div>\n\n<!-- <div class=\"modal fade global-modal reset-modal\" id=\"logout_modal\">\n  <div class=\"modal-dialog max-WT-500\">\n  <div class=\"modal-content\">\n             \n    <div class=\"modal-body  text-center\">\n    <div>\n        <div class=\"col-md-12\">\n            <h1 class=\"page_title\">Logout</h1>\n         </div>\n      <div class=\"col\">\n          <div class=\"row mb15\">\n              <label class=\"control-label col-md-12\">Are You Sure You Want To Log Out?</label>\n              <div class=\"col-md-12\">\n              </div>\n           </div>\n           <div class=\"row\">\n                  <div class=\"col-6\">\n                                <button (click)=\"logout()\" data-dismiss=\"modal\" class=\"btn btn-green btn-large btn-block\">YES</button>\n                              </div>\n                 <div class=\"col-6\">\n                    <button data-dismiss=\"modal\" class=\"btn btn-large btn-gray btn-block\">NO</button>\n                  </div>\n               </div>      \n              </div>\n    </div>\n    </div>\n</div>\n  </div>\n</div> -->\n\n<div id=\"logout_modal\" class=\"modal fade\" data-easein=\"bounceIn\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"costumModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n      <div class=\"modal-content common-detail-modal\">\n          \n          <div class=\"modal-body\">\n              <label class=\"modal-inner-text\">\n                Are You Sure You Want To Log Out?\n              </label>\n\n              <div class=\"button-box mt20\">\n                 <button class=\"btn btn-red mr10\" (click)=\"logout()\" data-dismiss=\"modal\">Yes</button>\n                 <button class=\"btn btn-danger\" data-dismiss=\"modal\">No</button>\n              </div>\n          </div>\n          <div class=\"modal-footer\">\n              \n          </div>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/side-menu/side-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SideMenuComponent = /** @class */ (function () {
    function SideMenuComponent(router) {
        this.router = router;
        this.currentURL = '';
        this.isActive = "";
    }
    SideMenuComponent.prototype.ngOnInit = function () {
        var url = window.location.href.split('/');
        var page = url[url.length - 1];
        this.isActive = page;
    };
    SideMenuComponent.prototype.tabManag = function (val) {
        var url = window.location.href.split('/');
        var page = url[url.length - 1];
        this.isActive = page;
        if (val == "dashboard") {
            this.router.navigate(['/dashboard']);
            //this.isActive= val;
        }
        else if (val == "userManagement") {
            this.router.navigate(['/user-management']);
            //this.isActive= val;
        }
        else if (val == "brandManagement") {
            this.router.navigate(['/brand-management']);
            //this.isActive= val;
        }
        else if (val == "productManagement") {
            this.router.navigate(['/product-management']);
            //this.isActive= val;
        }
        else if (val == "styleManagement") {
            this.router.navigate(['/style-management']);
        }
        //else if(val == "logout"){
        //   this.isActive= val
        // }
    };
    SideMenuComponent.prototype.logout = function () {
        // //window.location.href = window.location.origin;
        localStorage.setItem("token", "");
        this.router.navigate(['/login']);
        //history.pushState('',"","");
    };
    SideMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-side-menu',
            template: __webpack_require__("./src/app/side-menu/side-menu.component.html"),
            styles: [__webpack_require__("./src/app/side-menu/side-menu.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], SideMenuComponent);
    return SideMenuComponent;
}());



/***/ }),

/***/ "./src/app/style-management/style-management.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/style-management/style-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n<app-side-menu></app-side-menu>\n<div class=\"right-section no-scroll\">\n  <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n  <div class=\"right-inner\">\n      \n    <h1 class=\"heading\">STYLE MANAGEMENT</h1>\n    <div class=\"filter-block\">\n          <fieldset class=\"global-fieldset\">\n              <legend>Style Board</legend>\n              <div class=\"filter-content\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6\">\n                       <div class=\"form-group\">\n                          <div class=\"search-icon\">\n                             <input type=\"text\" [(ngModel)]=\"searchStyle.data\"  (keyup)=\"search()\" class=\"form-control max-wt-300 search-input\" placeholder=\"Search\">\n                             <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                          </div>\n                       </div>\n                    </div>\n                    <div class=\"col-sm-6\">\n                       <div class=\"btn-right\">\n                          <a class=\"btn btn-red btn-common\" href=\"#add_style\" data-toggle=\"modal\">Add</a>\n                       </div>\n                    </div>\n                 </div>\n                 <div class=\"row\">\n                    <div class=\"col-sm-6\">\n                        <div class=\"form-group d-inline-block\">\n                          <div class=\"show-entries mb0\">\n                                <select (ngModelChange)=\"onSelectSearch($event)\" name=\"gender\" (change)=\"sort()\" class=\"form-control\" [(ngModel)]=\"searchStyleTip.gender\" [ngModelOptions]=\"{standalone: true}\">  \n                                        <option value=\"\" >--Gender--</option> \n                                         <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n                                     </select>  \n                          </div>\n                        </div>\n                        <div class=\"form-group d-inline-block\">\n                          <div class=\"show-entries mb0\">\n                                <select class=\"form-control\" (ngModelChange)=\"onSelectSearchBody($event)\" name=\"bodyType\" (change)=\"sort()\" [(ngModel)]=\"searchStyleTip.bodyType\" [ngModelOptions]=\"{standalone: true}\">\n                                        <option value=\"\" >--Body Type--</option>  \n                                        <option *ngFor=\"let body of selectedBody\" value={{body.name}}>{{body.name}}</option>\n                                   </select> \n                          </div>\n                        </div>\n                        <div class=\"form-group d-inline-block\">\n                          <div class=\"show-entries mb0\">\n                                <select name=\"brand\" (change)=\"sort()\" class=\"form-control\" [(ngModel)]=\"searchStyleTip.brand\" [ngModelOptions]=\"{standalone: true}\">  \n                                        <option value=\"\" >--Brand--</option> \n                                         <option *ngFor=\"let item of searchStyleBrands\" value={{item}} >{{item}}</option>\n                                     </select>  \n                          </div>\n                        </div>\n                    </div>\n                 </div>\n                <div class=\"box box-blue\">\n                  <div class=\"box-body\">\n                    <div class=\"custom-table table-responsive\">\n                    <table class=\"table table-striped table-border table-color\">\n                      <thead>\n                          <tr>\n                            <th>SNo.</th>\n                            <th>Gender</th>\n                            <th>Body Type</th>\n                            <th> Brands</th>\n                          </tr>\n                      </thead>\n                      <tbody>\n                          <tr *ngFor=\"let style of styleTips | paginate: { itemsPerPage: 10, currentPage: p ,totalItems: total} ; let i = index \" [attr.data-index] =\"i\">\n                            <td *ngIf=\"p == 1\">{{i + 1}}</td>\n                            <td *ngIf=\"p > 1\">{{i + 1 + 10 * (p-1)}}</td>\n                            <td>{{style.styleGender}}</td>\n                            <td>{{style.bodyType}}</td>\n                            <td>{{style.brandName}}</td>\n                          </tr>\n                          <!-- <tr *ngFor=\"let userList of userData | paginate: { itemsPerPage: 10, currentPage: p ,totalItems: total} ; let i = index \" [attr.data-index] =\"i\">\n                            <td *ngIf=\"p == 1\">{{i + 1}}</td>\n                            <td *ngIf=\"p > 1\">{{i + 1 + 10 * (p-1)}}</td>\n                            <td>{{userList.name}}</td>\n                            <td>{{userList.email}}</td>\n                            <td>{{userList.age}}</td>\n                            <td>{{userList.gender}}</td>\n                            <td>{{userList.bodyType}}</td>\n                            <td>{{userList.height}}</td>\n                            <td>{{userList.weight}}</td>\n                            <td>{{userList.isSubscription}}</td>\n                          </tr> -->\n                     </tbody>\n                    </table>\n                  </div>  \n                </div>\n              </div>\n            </div>\n          </fieldset>\n      </div>\n        \n      <div class=\"custom-pagination\">\n        <pagination-controls (pageChange)=\"changePage($event)\"></pagination-controls>\n</div>\n          \n      </div>\n</div>\n</div>\n\n\n<div id=\"add_style\" class=\"modal fade\" data-easein=\"bounceIn\"  tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"costumModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog max-wt-800\">\n      <div class=\"modal-content\">\n          <div class=\"modal-header border0\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n                  ×\n              </button>\n          </div>\n          <div class=\"modal-body pt0\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Add Style Tip</legend>\n                 <div class=\"max-wt-400 mrgn-0-auto mt20 mb30\">\n                    <div class=\"form-group mb30\">\n                       <label>Gender:</label>\n                       <select (ngModelChange)=\"onSelectAdd($event)\" name=\"gender\" class=\"form-control\" [(ngModel)]=\"addStyleTip.gender\" [ngModelOptions]=\"{standalone: true}\">  \n                        <option value=\"\" >--Select--</option> \n                         <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n                     </select> \n                    </div>\n                    <div class=\"form-group mb30\">\n                       <label>Body Type:</label>\n                       <select class=\"form-control\" name=\"bodyType\" [(ngModel)]=\"addStyleTip.bodyType\" [ngModelOptions]=\"{standalone: true}\">\n                        <option value=\"\" >--Select--</option>  \n                        <option *ngFor=\"let body of selectedBodyAdd\" value={{body.name}}>{{body.name}}</option>\n                   </select>\n                    </div>\n                    <div class=\"form-group\">\n                       <label>Brand Name:</label>\n                       <select name=\"brand\" class=\"form-control\" [(ngModel)]=\"addStyleTip.brand\" [ngModelOptions]=\"{standalone: true}\">  \n                        <option value=\"\" >--Select--</option> \n                         <option *ngFor=\"let item of styleBrands\" value={{item}} >{{item}}</option>\n                     </select> \n                    </div>\n                    <div class=\"button-box mt40\">\n                       <button class=\"btn btn-red mr10 btn-common\" data-dismiss=\"modal\" (click)=\"addStyle()\">Add</button>\n                    </div>\n                 </div>\n              </fieldset>\n          </div>\n      </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/style-management/style-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StyleManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StyleManagementComponent = /** @class */ (function () {
    function StyleManagementComponent(service, router) {
        this.service = service;
        this.router = router;
        this.styleTips = [];
        this.searchStyle = { data: "" };
        this.searchStyleTip = { gender: "", bodyType: "", brand: "" };
        this.addStyleTip = { "gender": "", "bodyType": "", "brand": "" };
        this.p = 1;
        this.gender = [
            { id: 1, name: "Male" },
            { id: 2, name: "Female" }
        ];
        this.maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        this.femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
    }
    StyleManagementComponent.prototype.ngOnInit = function () {
        this.displayStyleTips();
    };
    StyleManagementComponent.prototype.displayStyleTips = function () {
        var _this = this;
        var credential = {
            "page": this.p,
            "search": this.searchStyle.data,
            "styleGender": this.searchStyleTip.gender,
            "bodyType": this.searchStyleTip.bodyType,
            "brandName": this.searchStyleTip.brand
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/styleTipList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data'].docs);
                _this.styleTips = response['data'].docs;
                _this.total = response['data'].total;
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                _this.service.error('Invalid Email');
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    StyleManagementComponent.prototype.changePage = function (page) {
        this.p = page;
        this.displayStyleTips();
    };
    StyleManagementComponent.prototype.search = function () {
        this.displayStyleTips();
    };
    StyleManagementComponent.prototype.sort = function () {
        this.displayStyleTips();
    };
    StyleManagementComponent.prototype.onSelectSearch = function (productId) {
        var _this = this;
        this.searchStyleTip.bodyType = "";
        this.searchStyleTip.brand = "";
        if (productId == "") {
            this.searchStyleTip.gender = "";
            this.searchStyleTip.bodyType = "";
            this.searchStyleTip.brand = "";
            this.selectedBody = null;
            this.searchStyleBrands = null;
        }
        if (productId == "Male") {
            this.selectedBody = this.maleBodyType;
        }
        else if (productId == "Female") {
            this.selectedBody = this.femaleBodyType;
        }
        var credential = {
            "styleGender": productId
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/styleBrandList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data']);
                _this.searchStyleBrands = response['data'];
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    StyleManagementComponent.prototype.onSelectSearchBody = function (productId) {
        var _this = this;
        this.searchStyleBrands = null;
        var credential = {
            "bodyType": productId
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/styleBrandList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data']);
                _this.searchStyleBrands = response['data'];
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    StyleManagementComponent.prototype.onSelectAdd = function (productId) {
        var _this = this;
        this.addStyleTip.bodyType = "";
        this.addStyleTip.brand = "";
        if (productId == "") {
            this.addStyleTip.gender = "";
            this.addStyleTip.bodyType = "";
            this.addStyleTip.brand = "";
            this.selectedBodyAdd = null;
            this.styleBrands = null;
        }
        if (productId == "Male") {
            this.selectedBodyAdd = this.maleBodyType;
        }
        else if (productId == "Female") {
            this.selectedBodyAdd = this.femaleBodyType;
        }
        var credential = {
            "productGender": productId,
            "bodyType": this.addStyleTip.bodyType
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/bodyTypeBrandList', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data']);
                _this.styleBrands = response['data'];
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    StyleManagementComponent.prototype.addStyle = function () {
        var _this = this;
        this.p = 1;
        var credential = {
            "createdBy": localStorage.getItem("adminId"),
            "styleGender": this.addStyleTip.gender,
            "brandName": this.addStyleTip.brand,
            "bodyType": this.addStyleTip.bodyType,
        };
        this.service.postApi('/addNewStyleTip', credential).subscribe(function (response) {
            console.log(JSON.stringify(credential));
            if (response['responseCode'] == 200) {
                _this.service.success(response['responseMessage']);
                console.log('success', response['responseMessage']);
                _this.displayStyleTips();
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                _this.service.error(response['responseMessage']);
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
        this.addStyleTip.gender = "";
        this.addStyleTip.brand = "";
        this.addStyleTip.bodyType = "";
    };
    StyleManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-style-management',
            template: __webpack_require__("./src/app/style-management/style-management.component.html"),
            styles: [__webpack_require__("./src/app/style-management/style-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], StyleManagementComponent);
    return StyleManagementComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-management.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n<app-side-menu></app-side-menu>\n<div class=\"right-section\">\n  <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n  <div class=\"right-inner\">\n      \n    <h1 class=\"heading\">USER MANAGEMENT</h1>\n    <div class=\"filter-block\">\n          <fieldset class=\"global-fieldset\">\n              <legend>User Board</legend>\n              <div class=\"filter-content\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6\">\n                       <div class=\"form-group\">\n                          <div class=\"search-icon\">\n                             <input type=\"text\" [(ngModel)]=\"searchData.data\"  (keyup)=\"search()\" class=\"form-control max-wt-300 search-input\" placeholder=\"Search\">\n                             <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                          </div>\n                       </div>\n                    </div>\n                    <!-- <div class=\"col-sm-6\">\n                       <div class=\"btn-right\">\n                          <button class=\"btn btn-red btn-common\" (click)=\"addUser()\">Add</button>\n                       </div>\n                    </div> -->\n                 </div>\n                 <div class=\"row\">\n                    <div class=\"col-sm-6\">\n                       <div class=\"form-group d-inline-block\">\n                          <div class=\"show-entries mb0\">\n                                <select (ngModelChange)=\"onSelect($event)\" (change)=\"sort()\" class=\"form-control\" [(ngModel)]=\"searchDataBody.gender\" [ngModelOptions]=\"{standalone: true}\">  \n                                        <option value=\"\" >--Gender--</option> \n                                         <option *ngFor=\"let gen of gender\" value={{gen.name}} >{{gen.name}}</option>\n                                     </select>  \n                          </div>\n                        </div>\n                        <div class=\"form-group d-inline-block\">\n                          <div class=\"show-entries mb0\">\n                                <select class=\"form-control\" name=\"bodyType\" (change)=\"sort()\" [(ngModel)]=\"searchDataBody.bodyType\" [ngModelOptions]=\"{standalone: true}\">\n                                        <option value=\"\" >--Body Type--</option>  \n                                        <option *ngFor=\"let body of selectedBody\" value={{body.name}}>{{body.name}}</option>\n                                   </select> \n                          </div>\n                        </div>\n                    </div>\n                 </div>\n                <div class=\"box box-blue\">\n            <div class=\"box-body\">\n                <div class=\"custom-table table-responsive\">\n              <table class=\"table table-striped table-border\">\n                  <thead>\n                      <tr>\n                        <th>SNo.</th>\n                        <th>Name</th>\n                        <th>Email</th>\n                        <th>Age</th>\n                        <th>Gender</th>\n                        <th>Body Type</th>\n                        <th>Height</th>\n                        <th>Weight</th>\n                        <th>Type</th>\n                        <th>Action</th>\n                      </tr>\n                  </thead>\n                  <tbody>\n                      <tr *ngFor=\"let userList of userData | paginate: { itemsPerPage: 10, currentPage: p ,totalItems: total} ; let i = index \" [attr.data-index] =\"i\">\n                        <td *ngIf=\"p == 1\">{{i + 1}}</td>\n                        <td *ngIf=\"p > 1\">{{i + 1 + 10 * (p-1)}}</td>\n                        <td>{{userList.name}}</td>\n                        <td>{{userList.email}}</td>\n                        <td>{{userList.age}}</td>\n                        <td>{{userList.gender}}</td>\n                        <td>{{userList.bodyType}}</td>\n                        <td>{{userList.height}}</td>\n                        <td>{{userList.weight}}</td>\n                        <td>{{userList.isSubscription}}</td>\n                        <td>\n                            <div class=\"action-btn\">\n                                <button class=\"btn btn-sm btn-success\" (click)=\"view(userList._id)\"><i class=\"fa fa-eye\"></i> View</button>\n                                <!-- <button class=\"btn btn-sm btn-primary\" (click)=\"edit(userList._id)\"><i class=\"fa fa-edit\"></i> Edit</button> -->\n                                <button class=\"btn btn-sm btn-danger\" (click)=\"delete(userList._id)\" ><i class=\"fa fa-trash\"></i> Delete</button>\n                            </div>  \n                        </td>\n                      </tr>\n                     \n                  </tbody>\n              </table>\n             \n          </div>  \n                \n            </div>\n         </div>\n              </div>\n          </fieldset>\n      </div>\n      <!-- <pagination-controls (pageChange)=\"p = $event\"></pagination-controls> -->\n          <div class=\"custom-pagination\">\n                  <pagination-controls (pageChange)=\"changePage($event)\" (change)=\"search(p)\"></pagination-controls>\n          </div>\n          \n      </div>\n</div>\n</div>\n\n<div id=\"delete\" class=\"modal fade\" data-easein=\"bounceIn\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"costumModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n      <div class=\"modal-content common-detail-modal\">\n          <div class=\"modal-header\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n                  ×\n              </button>\n          </div>\n          <div class=\"modal-body\">\n              <p class=\"modal-inner-text\">\n                 Are you sure you want to delete this product?\n              </p>\n\n              <div class=\"button-box mt20\">\n                 <button class=\"btn btn-red mr10\" (click)=\"yes()\">Yes</button>\n                 <button class=\"btn btn-danger\" (click)=\"cancelDelete()\">No</button>\n              </div>\n          </div>\n          <div class=\"modal-footer\">\n              \n          </div>\n      </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/user-management/user-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(router, service) {
        this.router = router;
        this.service = service;
        this.p = 1;
        this.searchData = { data: "" };
        this.searchDataBody = { gender: "", bodyType: "" };
        this.userData = [];
        this.gender = [
            { id: 1, name: "Male" },
            { id: 2, name: "Female" }
        ];
        this.maleBodyType = [
            { id: 1, name: "Slim Jim" },
            { id: 2, name: "Muscle Man" },
            { id: 3, name: "Big Guy" },
            { id: 4, name: "Bulky" }
        ];
        this.femaleBodyType = [
            { id: 1, name: "Rectangle" },
            { id: 2, name: "Peer" },
            { id: 3, name: "Triangle" },
            { id: 4, name: "Hourglass" }
        ];
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        if (this.searchDataBody.gender == " ") {
            this.searchDataBody.bodyType = "";
        }
        this.displayUser();
    };
    UserManagementComponent.prototype.onSelect = function (productId) {
        if (productId == "") {
            this.searchDataBody.gender = "";
            this.searchDataBody.bodyType = "";
            this.selectedBody = null;
        }
        this.searchDataBody.bodyType = "";
        this.selectedProduct = null;
        for (var i = 0; i < this.gender.length; i++) {
            if (this.gender[i].name == productId) {
                this.selectedProduct = this.gender[i];
            }
        }
        if (this.selectedProduct.name == "Male") {
            this.selectedBody = this.maleBodyType;
        }
        else {
            this.selectedBody = this.femaleBodyType;
        }
    };
    // addUser() {
    //   this.p = 1
    //    this.router.navigate(['/add-user'])
    // }
    UserManagementComponent.prototype.delete = function (userId) {
        this._id = userId;
        $('#delete').modal('show');
    };
    UserManagementComponent.prototype.yes = function () {
        var _this = this;
        var credential = {
            "userId": this._id
        };
        this.service.postApi('/deleteUser', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                _this.service.success(response['responseMessage']);
                console.log('success', response['responseMessage']);
                $('#delete').modal('hide');
                _this.displayUser();
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    UserManagementComponent.prototype.cancelDelete = function () {
        $('#delete').modal('hide');
    };
    UserManagementComponent.prototype.search = function () {
        this.displayUser();
    };
    UserManagementComponent.prototype.sort = function () {
        this.displayUser();
    };
    UserManagementComponent.prototype.view = function (id) {
        localStorage.setItem('userId', id);
        this.router.navigate(['/view-user']);
    };
    // edit(id) {
    //   localStorage.setItem('userId',id)
    // this.router.navigate(['/edit-user'])
    // }
    UserManagementComponent.prototype.changePage = function (page) {
        this.p = page;
        this.displayUser();
    };
    UserManagementComponent.prototype.displayUser = function () {
        var _this = this;
        var credential = {
            "page": this.p,
            "search": this.searchData.data,
            "gender": this.searchDataBody.gender,
            "bodyType": this.searchDataBody.bodyType
        };
        for (var val in credential) {
            if (credential[val] == '') {
                delete credential[val];
            }
        }
        this.service.postApi('/getAllUsers', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data'].docs);
                _this.userData = response['data'].docs;
                _this.total = response['data'].total;
                for (var i = 0; i < _this.userData.length; i++) {
                    if (_this.userData[i].isSubscription == false) {
                        _this.userData[i].isSubscription = 'UnPaid';
                    }
                    else {
                        _this.userData[i].isSubscription = 'Paid';
                    }
                }
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    UserManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user-management',
            template: __webpack_require__("./src/app/user-management/user-management.component.html"),
            styles: [__webpack_require__("./src/app/user-management/user-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */]])
    ], UserManagementComponent);
    return UserManagementComponent;
}());



/***/ }),

/***/ "./src/app/view-user/view-user.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/view-user/view-user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mainbox\">\n  <app-side-menu></app-side-menu>\n<div class=\"right-section\">\n  <div class=\"copyrights\">Copyright © 2018 App name All Rights Reserved.</div>\n  <div class=\"right-inner\">\n            <div class=\"filter-block\">\n              <fieldset class=\"global-fieldset\">\n                 <legend>Edit User</legend>\n                  <div class=\"filter-content\">\n                      \n                       <div class=\"common-detail-box\">\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-6  label-right\">Name</label>\n                             <div class=\"col-sm-6\">\n                                {{viewUserDetail.name}}\n                             </div>\n                          </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-6 label-right\">Email</label>\n                             <div class=\"col-sm-6\">\n                                {{viewUserDetail.email}}\n                             </div>\n                          </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-6 label-right\">Age</label>\n                             <div class=\"col-sm-6\">\n                                {{viewUserDetail.age}}\n                             </div>\n                          </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-6 label-right\">Gender</label>\n                             <div class=\"col-sm-6\">\n                                {{viewUserDetail.gender}}\n\n                             </div>\n                          </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-6 label-right\">Body Type</label>\n                             <div class=\"col-sm-6\">\n                                {{viewUserDetail.bodyType}}\n                             </div>\n                          </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-6 label-right\">Height</label>\n                             <div class=\"col-sm-6\">\n                                {{viewUserDetail.height}}\n                             </div>\n                          </div>\n                          <div class=\"form-group row\">\n                             <label class=\"col-sm-6 label-right\">Weight</label>\n                             <div class=\"col-sm-6\">\n                                {{viewUserDetail.weight}}\n                             </div>\n                          </div>\n                          <div class=\"table-button text-center mt30\">\n                             <!-- <button (click)=\"editUser()\" class=\"btn btn-red\">Edit </button> -->\n                             <button (click)=\"cancel()\" class=\"btn btn-danger\">Cancel</button>\n                          </div>\n                       </div>\n\n                  </div>\n              </fieldset>\n            </div>        \n        </div>  \n      </div>\n</div>\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/view-user/view-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewUserComponent = /** @class */ (function () {
    function ViewUserComponent(service, router) {
        this.service = service;
        this.router = router;
    }
    ViewUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var credential = {
            "userId": localStorage.getItem("userId")
        };
        this.service.postApi('/userDetail', credential).subscribe(function (response) {
            if (response['responseCode'] == 200) {
                console.log('success', response['data']);
                _this.viewUserDetail = response['data'];
            }
            else if (response['responseCode'] == 402) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else if (response['responseCode'] == 403) {
                _this.service.error(response['responseMessage']);
                _this.router.navigate(['/login']);
            }
            else {
                console.log('Failure', response['responseMessage']);
            }
        }, function (error) {
            console.log('something went wrong');
        });
    };
    ViewUserComponent.prototype.editUser = function () {
        this.router.navigate(['/edit-user']);
    };
    ViewUserComponent.prototype.cancel = function () {
        this.router.navigate(['/user-management']);
    };
    ViewUserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-view-user',
            template: __webpack_require__("./src/app/view-user/view-user.component.html"),
            styles: [__webpack_require__("./src/app/view-user/view-user.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], ViewUserComponent);
    return ViewUserComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map