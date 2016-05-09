const fairway = 1;

export class GameController {

  constructor($scope, GameService, $log, $timeout) {
    'ngInject'

    this.GameService = GameService;
    this.gameData = this.GameService.getGameSetup();

    this.holes = this.gameData.course.holes;

    this.holeIndex = 0;
    this.playerIndex = 0;

    this.model = this.GameService.getHoleResults(0);
    this.players = this._copyPlayers(0);

    this.playersCount = this.model.players.length;
    this.$scope = $timeout;

    $scope.$watchCollection(() =>  [this.model.players[this.playerIndex].putts, this.model.players[this.playerIndex].sandStrokes, this.model.players[this.playerIndex].penalties], () => {
        this.calculateStrokes();
    });


    $scope.$watch(() => this.model.players[this.playerIndex].strokes, (oldValue, newValue) => {
        if(oldValue < newValue) {
            this.reduceStrokes();
        }
    });

  }

  nextPlayer() {
    if(this.playerIndex < this.model.players.length-1 ) {
      this.playerIndex = this.playerIndex + 1;
    } else {
      this.playerIndex = 0;
    }
    this.players = this._copyPlayers(this.playerIndex);
  }

  previousPlayer() {
    if(this.playerIndex > 0 ) {
      this.playerIndex = this.playerIndex - 1;
    } else {
      this.playerIndex = this.model.players.length-1;
    }
    this.players = this._copyPlayers(this.playerIndex);
  }

  goToPlayer(index) {
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
      if(!strokes) {return};

      let total = this._getTotal();

      if (total > strokes) {
          this.model.players[this.playerIndex].strokes = total;
          return;
      }

  }

  accept() {
    this.GameService.addHoleResult(this.model, this.holeIndex);
    this.holeIndex = this.GameService.playedHoles;
    this._updateView();
  }

  finish() {
    console.log('do finish here');
  }

  _updateView() {
    this.playerIndex = 0;
    this.model = this.GameService.getHoleResults(this.holeIndex);
    this.players = [this.model.players[0]];
  }

  previousHole() {
    if(this.holeIndex > 0) {
      this.holeIndex--;
      this._updateView();
    }
  }

  nextHole() {
    if(this.GameService.playedHoles > this.holeIndex) {
      this.holeIndex++;
      this._updateView();
    }


  }

  getPar() {
    return 'Par ' + this.getHole().par;
  }

  getHole() {
    return this.holes[this.holeIndex];
  }

  getHoleHeader() {
    let holeNumber = this.holeIndex +1;
    return 'Väylä' + ' ' + holeNumber;
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
    return  angular.copy([this.model.players[index]])
  }

}
