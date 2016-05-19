export function HoleDirective() {
  'ngInject';

    let directive = {
        restrict: 'E',
        scope: {
          index: '<',
          hideScrollY: '<'
        },
        templateUrl: 'app/components/directives/hole/hole.html',
        replace: true,
        bindToController: true,
        controller: HoleController,
        controllerAs: 'game'

    };

  return directive;
}

const fairway = 1;

class HoleController {
  constructor($rootScope, $scope, GameService, $log, $element) {
    'ngInject'

      this.GameService = GameService;
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$log = $log;

      this.$element = $element;
      this.playerIndex = 0;

      this.model = this.GameService.result;
      this.players = this._copyPlayers(0);

      this.playersCount = this.model.players.length;

      this.slideDirection = 'right';

      $scope.$watchCollection(() =>  [this.model.players[this.playerIndex].putts, this.model.players[this.playerIndex].sandStrokes, this.model.players[this.playerIndex].penalties], () => {
          this.calculateStrokes();
      }, false);

      $scope.$watch(() => this.model.players[this.playerIndex].strokes, (oldValue, newValue) => {
          if(oldValue < newValue) {
              this.reduceStrokes();
          }
      });

      $scope.$watch(() => $scope.game.index, (value) => {
        this.model = this.GameService.results[value+1];
        let slideElement = this.$element[0].querySelector('.slide-content');
        if (slideElement) {
          slideElement.scrollTop = 0;
        }
      });

  }

  goToPlayer(index) {
    if(index === this.playerIndex) {
      return;
    }
    this.slideDirection = index > this.playerIndex ? 'right' : 'left';
    this.playerIndex = index;
    this.players = this._copyPlayers(this.playerIndex);
  }

  reduceStrokes() {
      if(this.model.players[this.playerIndex].strokes < this._getTotal() ) {
          if(this.model.players[this.playerIndex].penalties) {
              this.model.players[this.playerIndex].penalties = this.model.players[this.playerIndex].penalties - 1;
              return;
          }
          if(this.model.players[this.playerIndex].sandStrokes) {
              this.model.players[this.playerIndex].sandStrokes = this.model.players[this.playerIndex].sandStrokes - 1;
              return;
          }
          if (this.model.players[this.playerIndex].putts) {
              this.model.players[this.playerIndex].putts = this.model.players[this.playerIndex].putts - 1;
              return;
          }
      }
  }

  calculateStrokes() {
      let strokes = this.model.players[this.playerIndex].strokes;

      if (!strokes) {
        return;
      }

      let total = this._getTotal();

      if (total > strokes) {
          this.model.players[this.playerIndex].strokes = total;
          return;
      }

  }

  previousHole() {
    this.$rootScope.$broadcast('update-hole', 'previous');
  }

  nextHole() {
    this.$rootScope.$broadcast('update-hole', 'next');
  }

  getPar() {
    return this.GameService.getPar(this.$scope.game.index);
  }

  getHole() {
    return parseInt(this.$scope.game.index+1);
  }

  clearDrive() {
      this.model.players[this.playerIndex].fairway = false;
      this.model.players[this.playerIndex].toLeft = false;
      this.model.players[this.playerIndex].toRight = false;
  }

  isRecentHole() {
    return this.holeIndex === this.GameService.playedHoles;
  }

  outOfBounds() {
    return this.index < 0 || this.index > this.GameService.holes.length-1;
  }

  _getTotal() {
      let putts = this.model.players[this.playerIndex].putts || 0;
      let sandStrokes = this.model.players[this.playerIndex].sandStrokes || 0;
      let penalties =this.model.players[this.playerIndex].penalties || 0;

      return putts + sandStrokes + penalties + fairway;
  }

  _copyPlayers(index) {
    return angular.copy([this.model.players[index]]);
  }
}
