/* global Firechat */
'use strict';

/**
 * @ngdoc service
 * @name shldzchatApp.FireChat
 * @description
 * # FireChat
 */
angular.module('shldzchatApp')
  .factory('FireChatSvc', ['Ref', 'Auth', function(Ref, Auth){
    var auth = Auth.$getAuth();
    var userId = auth.uid;
    var userName = auth[auth.provider].username;
    
    var chat = new Firechat(Ref.child("chat"));
    chat.setUser(userId, userName, function(user) {
      chat.resumeSession();
    });
    
    return chat;
    
  }]);
