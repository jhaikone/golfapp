export function GoHeaderDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
        left: '=?',
        middle: '=?',
        right: '=?'
    },
    template: `
      <div class="go-header md-primary">
        <div class="menu-content">
          <span class="text-left">{{left}}</span>
          <span class="text-middle">{{middle}}</span>
          <span class="text-right">{{right}}</span>
          </div>

      </div>
    `,
    replace:true,
    controller: GoHeaderController,
    controllerAs: 'header'
  };

  return directive;
}

class GoHeaderController {
  constructor () {
    'ngInject';


  }
}
