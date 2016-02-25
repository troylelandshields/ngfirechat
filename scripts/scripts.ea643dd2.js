"use strict";angular.module("shldzchatApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase","firebase.ref","firebase.auth"]),angular.module("shldzchatApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("firebase.config",[]).constant("FBURL","https://shldzchat.firebaseio.com").constant("SIMPLE_LOGIN_PROVIDERS",["twitter"]).constant("loginRedirectPath","/login"),angular.module("firebase.ref",["firebase","firebase.config"]).factory("Ref",["$window","FBURL",function(a,b){return new a.Firebase(b)}]),angular.module("shldzchatApp").controller("ChatCtrl",["FireChatSvc","$routeParams","Ref","$firebaseArray",function(a,b,c,d){var e=this,f=b.roomId;a.enterRoom(f),e.messages=d(c.child("chat").child("room-messages").child(f).limitToLast(10)),e.addMessage=function(b){a.sendMessage(f,b,"default")}}]),angular.module("shldzchatApp").filter("reverse",function(){return function(a){return angular.isArray(a)?a.slice().reverse():[]}}),function(){angular.module("firebase.auth",["firebase","firebase.ref"]).factory("Auth",["$firebaseAuth","Ref",function(a,b){return a(b)}])}(),angular.module("shldzchatApp").controller("LoginCtrl",["$scope","Auth","$location",function(a,b,c){function d(){c.path("/account")}function e(b){a.err=b}a.oauthLogin=function(c){a.err=null,b.$authWithOAuthPopup(c,{rememberMe:!0}).then(d,e)},a.anonymousLogin=function(){a.err=null,b.$authAnonymously({rememberMe:!0}).then(d,e)}}]),angular.module("shldzchatApp").controller("AccountCtrl",["$scope","user","Auth","Ref","$firebaseObject","$timeout",function(a,b,c,d,e,f){a.user=b,a.logout=function(){c.$unauth()},a.messages=[];var g=e(d.child("users/"+b.uid));g.$bindTo(a,"profile")}]),angular.module("shldzchatApp").directive("ngShowAuth",["Auth","$timeout",function(a,b){return{restrict:"A",link:function(c,d){function e(){b(function(){d.toggleClass("ng-cloak",!a.$getAuth())},0)}d.addClass("ng-cloak"),a.$onAuth(e),e()}}}]),angular.module("shldzchatApp").directive("ngHideAuth",["Auth","$timeout",function(a,b){return{restrict:"A",link:function(c,d){function e(){b(function(){d.toggleClass("ng-cloak",!!a.$getAuth())},0)}d.addClass("ng-cloak"),a.$onAuth(e),e()}}}]),angular.module("shldzchatApp").config(["$routeProvider","SECURED_ROUTES",function(a,b){a.whenAuthenticated=function(c,d){return d.resolve=d.resolve||{},d.resolve.user=["Auth",function(a){return a.$requireAuth()}],a.when(c,d),b[c]=!0,a}}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl as vm"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl as vm"}).whenAuthenticated("/account",{templateUrl:"views/account.html",controller:"AccountCtrl as vm"}).whenAuthenticated("/chat",{templateUrl:"views/chatrooms.html",controller:"ChatroomsCtrl as vm"}).whenAuthenticated("/chat/:roomId",{templateUrl:"views/chat.html",controller:"ChatCtrl as vm"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","Auth","SECURED_ROUTES","loginRedirectPath",function(a,b,c,d,e){function f(a){!a&&g(b.path())&&b.path(e)}function g(a){return d.hasOwnProperty(a)}c.$onAuth(f),a.$on("$routeChangeError",function(a,c,d,f){"AUTH_REQUIRED"===f&&(console.log("Redirect to login"),b.path(e))})}]).constant("SECURED_ROUTES",{}),angular.module("shldzchatApp").controller("ChatroomsCtrl",["$scope","FireChatSvc",function(a,b){var c=this;c.retrieveRoomList=function(){c.chatrooms=[],b.getRoomList(function(b){Object.keys(b).forEach(function(a){c.chatrooms.push(b[a])}),a.$apply()})},c.createChatroom=function(a){b.createRoom(a,"public",function(a){c.retrieveRoomList()})},c.retrieveRoomList()}]),angular.module("shldzchatApp").factory("FireChatSvc",["Ref","Auth",function(a,b){var c=b.$getAuth(),d=c.uid,e=c[c.provider].username,f=new Firechat(a.child("chat"));return f.setUser(d,e,function(a){f.resumeSession()}),f}]);