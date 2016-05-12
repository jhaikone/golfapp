export function BottomBar() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: `
      <div class="bottom-bar">
        <div class="content" ng-transclude></div>
      </div>
    `,
    replace:true,
    transclude: true,
    controller: BottomBarController,
    controllerAs: 'ctrl'
  };

  return directive;
}

class BottomBarController {
  constructor () {
    'ngInject';

  }
}
