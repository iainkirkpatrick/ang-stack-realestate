'use strict';

describe('Service: properties', function () {

  // load the service's module
  beforeEach(module('demoappApp'));

  // instantiate service
  var properties;
  beforeEach(inject(function (_properties_) {
    properties = _properties_;
  }));

  it('should do something', function () {
    expect(!!properties).toBe(true);
  });

});
