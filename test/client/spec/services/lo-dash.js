'use strict';

describe('Service: loDash', function () {

  // load the service's module
  beforeEach(module('demoappApp'));

  // instantiate service
  var loDash;
  beforeEach(inject(function (_loDash_) {
    loDash = _loDash_;
  }));

  it('should do something', function () {
    expect(!!loDash).toBe(true);
  });

});
