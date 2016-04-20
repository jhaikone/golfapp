export function GoStrokeInputDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: `
    <md-toolbar class="go-custom">
      <div class="md-toolbar-tools">
          <span class="go-text-color">Lyönnit</span>
          <div class="stroke-number-container">
          <input class="stroke-number" class="number" ng-model="strokes"/>
          </div>
          <div class="stroke-buttons-container">
          <md-button class="md-fab md-mini" ng-click="game.accept()">-</md-button>
          <md-button class="md-fab md-mini" ng-click="game.accept()">+</md-button>
          </div>
      </div>
    </md-toolbar>
    `,
    replace:true,
    controller: GoStrokeInputController,
    controllerAs: 'stroke'
  };

  return directive;
}

class GoStrokeInputController {
  constructor () {
    'ngInject';


  }
}
