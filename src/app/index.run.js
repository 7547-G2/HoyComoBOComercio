(function() {
  'use strict';

  angular
    .module('hoyComo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
