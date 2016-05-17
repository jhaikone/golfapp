export function GoStrokeInputDirective() {
  'ngInject';

    let directive = {
        restrict: 'E',
        scope: {
            strokeLabel: '=',
            maxStrokes: '=',
            minStrokes: '=',
            defaultStrokes: '=',
            primary: '=?',
            ngModel: '='
        },
        template: `
        <md-toolbar class="go-custom go-stroke-input">
          <div class="md-toolbar-tools">
              <span class="go-text-color">{{ctrl.label}}</span>

              <div class="stroke-number-container">
                <span ng-show="ngModel" class="stroke-number" ng-class="{'md-primary': ctrl.primary}" ng-model="ngModel">{{ctrl.$scope.ngModel}}<span>
              </div>
                  <span flex> </span>
              <div class="stroke-buttons-container">
              <md-button class="md-fab md-primary" ng-click="::ctrl.decrease()">-</md-button>
              <md-button class="md-fab md-primary" ng-click="::ctrl.increase()">+</md-button>
              </div>
          </div>
        </md-toolbar>
        `,
        replace:true,
        controller: GoStrokeInputController,
        controllerAs: 'ctrl'
    };

  return directive;
}

class GoStrokeInputController {
  constructor ($scope) {
    'ngInject';

    this.$scope = $scope;

    this.label = $scope.strokeLabel;

    this.maxStrokes = $scope.maxStrokes;
    this.minStrokes = $scope.minStrokes;
    this.defaultStrokes = $scope.defaultStrokes;

    this.primary = $scope.primary;
  }

  decrease() {
    this._initModel();

    if (this.$scope.ngModel > this.minStrokes) {
      this.$scope.ngModel = this.$scope.ngModel - 1;
    }
  }

  increase() {
    this._initModel(true);

    if (this.$scope.ngModel < this.maxStrokes) {
      this.$scope.ngModel = this.$scope.ngModel + 1;
    }
  }

  /**
   * default value is par if plus button is pressed
   * default value is par minus one if minus is pressed
   */
  _initModel(isIncreasing) {
    if(!this.$scope.ngModel) {
      this.$scope.ngModel = isIncreasing ? this.defaultStrokes-1 : this.defaultStrokes;

    }
  }

}
