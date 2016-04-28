const fairway = 1;

export class GameController {

  constructor($scope, GameService, PlayersService, $log) {
    'ngInject'

    this.noResult = false;
    this.gameData = GameService.getGameSetup();
    this.totalPlayers = PlayersService.getPlayers();

    this.players = this._copyPlayers(0);

    this.holes = this.gameData.course.holes;

    this.index = 0;
    this.playerIndex = 0;

    this.playersCount = this.totalPlayers.length;

    let objectPlayers = [];

    this.totalPlayers.forEach( (player)=> {
      objectPlayers.push({putts: 0, sandStrokes: 0, penalties: 0, noResult: false});
    })

    this.model = {
      players: objectPlayers
    };

    $scope.$watchCollection(() =>  [this.model.players[this.playerIndex].putts, this.model.players[this.playerIndex].sandStrokes, this.model.players[this.playerIndex].penalties], () => {
        console.log('changing');
        this.calculateStrokes();
    });


    $scope.$watch(() => this.model.players[this.playerIndex].strokes, (oldValue, newValue) => {
        if(oldValue < newValue) {
            this.reduceStrokes();
        }
    });

  }

  nextPlayer() {
    if(this.playerIndex < this.totalPlayers.length-1 ) {
      this.playerIndex = this.playerIndex + 1;
      this.players = this._copyPlayers(this.playerIndex);
    }
  }

  previousPlayer() {
    if(this.playerIndex > 0 ) {
      this.playerIndex = this.playerIndex - 1;
      this.players = this._copyPlayers(this.playerIndex);
    }
  }

  goToPlayer(index) {
    this.playerIndex = index;
    this.players = this._copyPlayers(this.playerIndex);
  }

  reduceStrokes() {
      if(this.model.players[this.playerIndex].strokes < this._getTotal() ) {
          if(this.model.players[this.playerIndex].penalties) {
              this.model.players[this.playerIndex].penalties = this.model.players[this.playerIndex].penalties - 1;
              this.reduceStrokes();
              return;
          }
          if(this.model.players[this.playerIndex].sandStrokes) {
              this.model.players[this.playerIndex].sandStrokes = this.model.players[this.playerIndex].sandStrokes - 1;
              this.reduceStrokes();
              return;
          }
          if (this.model.players[this.playerIndex].putts) {
              this.model.players[this.playerIndex].putts = this.model.players[this.playerIndex].putts - 1;
              this.reduceStrokes();
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
    
  }

  getPar() {
    return 'Par ' + this.getHole().par;
  }

  getHole() {
    return this.holes[this.index];
  }

  getHoleHeader() {
    let holeNumber = this.index +1;
    return 'Väylä' + ' ' + holeNumber;
  }

  clearDrive() {
      this.model.fairway = false;
      this.model.toLeft = false;
      this.model.toRight = false;
  }

  _getTotal() {
      let putts = this.model.players[this.playerIndex].putts || 0;
      let sandStrokes = this.model.players[this.playerIndex].sandStrokes || 0;
      let penalties =this.model.players[this.playerIndex].penalties || 0;

      return putts + sandStrokes + penalties + fairway;
  }

  _copyPlayers(index) {
    return  angular.copy([this.totalPlayers[index]])
  }

}
