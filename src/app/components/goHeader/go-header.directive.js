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
        <div class="text-left">
          <span>{{left}}</span>
        </div>
        <div class="text-middle">
          <span>{{middle}}</span>
        </div>
        <div class="text-right">
          <span>{{right}}</span>
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
