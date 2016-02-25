'use strict';

describe('Service: FireChat', function () {

  // load the service's module
  beforeEach(module('shldzchatApp'));

  // instantiate service
  var FireChat;
  beforeEach(inject(function (_FireChat_) {
    FireChat = _FireChat_;
  }));

  it('should do something', function () {
    expect(!!FireChat).toBe(true);
  });

});
