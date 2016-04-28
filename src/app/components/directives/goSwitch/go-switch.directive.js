export function GoSwitch() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
        label: '=',
        ngModel: '='
    },
    template: `
    <md-toolbar class="go-custom">
      <div class="md-toolbar-tools">
          <span class="go-text-color">{{label}}</span>
          <span flex></span>
          <md-switch class="md-primary" ng-model="ngModel"></md-switch>
      </div>
    </md-toolbar>
    `,
    replace: true
  };

  return directive;
}
