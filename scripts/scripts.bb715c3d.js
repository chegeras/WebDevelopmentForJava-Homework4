!function(){"use strict";angular.module("auction",["ngRoute","restangular"]).config(["$routeProvider",function(a){var b=function(a){return a+" | Auction"};a.when("/",{templateUrl:"views/home.html",controller:"HomeController",controllerAs:"ctrl",title:b("Home")}).when("/search",{templateUrl:"views/search.html",controller:"SearchController",controllerAs:"ctrl",title:b("Search")}).when("/product/:productId",{templateUrl:"views/product.html",controller:"ProductController",controllerAs:"ctrl",title:b("Product Details"),resolve:{product:["$route","ProductService",function(a,b){var c=parseInt(a.current.params.productId);return b.getProductById(c)}]}}).otherwise({redirectTo:"/"})}]).config(["RestangularProvider",function(a){a.setBaseUrl("/data"),a.setRequestSuffix(".json")}]).run(["$rootScope",function(a){a.$on("$routeChangeStart",function(b,c){a.pageTitle=c.$$route.title,a.currentDate=new Date})}])}(),function(){"use strict";var a=function(a){var b=this;b.products=[],a.getProducts().then(function(a){b.products=a})};a.$inject=["ProductService"],angular.module("auction").controller("HomeController",a)}(),function(){"use strict";var a=function(a){this.product=a};a.$inject=["product"],angular.module("auction").controller("ProductController",a)}(),function(){"use strict";var a=function(a){var b=this;b.products=[],a.find().then(function(a){b.products=a})};a.$inject=["ProductService"],angular.module("auction").controller("SearchController",a)}(),function(){"use strict";var a=function(){return{scope:!1,restrict:"A",link:function(a,b){b.datepicker()}}};angular.module("auction").directive("auctionDatepicker",a)}(),function(){"use strict";var a=function(){return{scope:!1,restrict:"E",templateUrl:"views/partial/FooterDirective.html"}};angular.module("auction").directive("auctionFooter",a)}(),function(){"use strict";var a=function(){return{scope:!1,restrict:"E",templateUrl:"views/partial/NavbarDirective.html"}};angular.module("auction").directive("auctionNavbar",a)}(),function(){"use strict";var a=function(){return{scope:{minPrice:"@",maxPrice:"@",lowPrice:"=",highPrice:"="},restrict:"E",templateUrl:"views/partial/PriceRangeDirective.html",link:function(a,b){var c=angular.element(b).find("input[type=text]"),d=a.minPrice||0,e=a.maxPrice||500;a.lowPrice=a.lowPrice||d,a.highPrice=a.highPrice||e,c.slider({min:d,max:e,value:[a.lowPrice,a.highPrice]}),c.on("slideStop",function(b){a.$apply(function(){a.lowPrice!==b.value[0]&&(a.lowPrice=b.value[0]),a.highPrice!==b.value[1]&&(a.highPrice=b.value[1])})});var f=function(){return c.slider("getValue")},g=function(a,b){c.slider("setValue",[a,b])};a.$watch("lowPrice",function(a){g(a||d,f()[1])}),a.$watch("highPrice",function(a){g(f()[0],a||e)})}}};angular.module("auction").directive("auctionPriceRange",a)}(),function(){"use strict";var a=function(){return{scope:{currentDate:"@"},restrict:"E",templateUrl:"views/partial/SearchFormDirective.html",link:function(a){a.currentDate=new Date}}};angular.module("auction").directive("auctionSearchForm",a)}(),function(){"use strict";var a=function(a){this.Restangular=a};a.$inject=["Restangular"],a.prototype={getProducts:function(){return this.Restangular.all("products").getList()},find:function(a){return this.Restangular.all("products").getList(a)},getProductById:function(a){return this.Restangular.one("products",a).get()}},angular.module("auction").service("ProductService",a)}();