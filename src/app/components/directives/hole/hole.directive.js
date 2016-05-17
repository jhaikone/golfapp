export function HoleDirective() {
  'ngInject';

    let directive = {
        restrict: 'E',
        scope: {
          index: '<'
        },
        templateUrl: 'app/components/directives/hole/hole.html',
        replace: true,
        bindToController: true,
        controller: HoleController,
        controllerAs: 'game',
        link: function (scope, element) {

        }

    };

  return directive;
}

const fairway = 1;

class HoleController {
  constructor($scope, GameService, $log) {
    'ngInject'

    this.GameService = GameService;
    this.gameData = this.GameService.getGameSetup();
    this.$scope = $scope;
    this.$log = $log;

    this.holes = this.gameData.course.holes;
    this.$log.log($scope.game.index);
    this.playerIndex = 0;

    this.model = this.GameService.getHoleResults($scope.game.index);
    console.log('molde', this.model);
    this.players = this._copyPlayers(0);
    this.$log.log('plauers', this.players);

    this.playersCount = this.model.players.length;

    this.slideDirection = 'right';

    $scope.$watchCollection(() =>  [this.model.players[this.playerIndex].putts, this.model.players[this.playerIndex].sandStrokes, this.model.players[this.playerIndex].penalties], () => {
        this.calculateStrokes();
    });

    $scope.$watch(() => this.model.players[this.playerIndex].strokes, (oldValue, newValue) => {
        if(oldValue < newValue) {
            this.reduceStrokes();
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

  accept() {
    this.GameService.addHoleResult(this.model, this.holeIndex);
    this.$log.log('model', this.model);
    this.holeIndex = this.GameService.playedHoles;
    this.slideDirection = 'right';
    this._updateView();
  }

  finish() {
    this.$log.log('do finish here');
    this.GameService.finishCourse(this.model, this.holeIndex);
  }

  _updateView() {
    this.playerIndex = 0;
    this.model = this.GameService.getHoleResults(this.holeIndex);
    this.players = [this.model.players[0]];
  }

  previousHole() {
    if(this.holeIndex > 0) {
      this.holeIndex--;
      this.slideDirection = 'left';
      this._updateView();
    }
  }

  nextHole() {
    if(this.GameService.playedHoles > this.holeIndex) {
      this.holeIndex++;
      this.slideDirection = 'right';
      this._updateView();
    }
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
