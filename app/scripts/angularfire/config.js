angular.module('firebase.config', [])
  .constant('FBURL', 'https://shldzchat.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['twitter'])

  .constant('loginRedirectPath', '/login');
