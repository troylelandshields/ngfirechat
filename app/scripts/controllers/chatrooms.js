'use strict';

/**
 * @ngdoc function
 * @name shldzchatApp.controller:ChatroomsCtrl
 * @description
 * # ChatroomsCtrl
 * Controller of the shldzchatApp
 */
angular.module('shldzchatApp')
  .controller('ChatroomsCtrl', function ($scope, FireChatSvc) {
    var vm = this;
    
    vm.retrieveRoomList = function() {
      vm.chatrooms = [];
      
      FireChatSvc.getRoomList(function(listsObj){
        Object.keys(listsObj).forEach(function(r){
          vm.chatrooms.push(listsObj[r]);  
        });
        
        $scope.$apply();
      });
    }
    
    vm.createChatroom = function(roomName){
      FireChatSvc.createRoom(roomName, "public", function(roomId){
        vm.retrieveRoomList();
      });
    };
    
    vm.retrieveRoomList();
  });
