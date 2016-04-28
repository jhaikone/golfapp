export function GoSwitch() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
        label: '=',
        value: '='
    },
    template: `
    <md-toolbar class="go-custom">
      <div class="md-toolbar-tools">
          <span class="go-text-color">{{label}}</span>
          <span flex></span>
          <md-switch class="md-primary" ng-model="value"></md-switch>
      </div>
    </md-toolbar>
    `
  };

  return directive;
}
