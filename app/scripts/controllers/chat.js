'use strict';
/**
 * @ngdoc function
 * @name shldzchatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('shldzchatApp')
  .controller('ChatCtrl', function (FireChatSvc, $routeParams, Ref, $firebaseArray) {
    var vm = this;
    var roomId = $routeParams.roomId;
    
    FireChatSvc.enterRoom(roomId);
    
    vm.messages = $firebaseArray(Ref.child("chat").child("room-messages").child(roomId).limitToLast(10));
    
    vm.addMessage = function(msg){
      FireChatSvc.sendMessage(roomId, msg, "default");
    };
    
  });