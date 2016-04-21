const fairway = 1;

export class GameController {

  constructor($scope, GameService) {
    'ngInject'

    this.noResult = false;
    this.gameData = GameService.getGameSetup();

    this.holes = this.gameData.course.holes;

    this.index = 0;
    this.model = {};

    $scope.$watchCollection(() =>  [this.model.putts, this.model.sandStrokes, this.model.penalties], () => {
        console.log('changing');
        this.calculateStrokes();
    });


    $scope.$watch(() => this.model.strokes, (oldValue, newValue) => {
        if(oldValue < newValue) {
            this.reduceStrokes();
        }
    });

  }

  reduceStrokes() {
      if(this.model.strokes < this._getTotal() ) {
          if(this.model.penalties) {
              this.model.penalties = this.model.penalties - 1;
              this.reduceStrokes();
              return;
          }
          if(this.model.sandStrokes) {
              this.model.sandStrokes = this.model.sandStrokes - 1;
              this.reduceStrokes();
              return;
          }
          if (this.model.putts) {
              this.model.putts = this.model.putts - 1;
              this.reduceStrokes();
              return;
          }
      }
  }


  calculateStrokes() {
      let strokes = this.model.strokes;
      if(!strokes) {return};

      let total = this._getTotal();
      
      if (total > strokes) {
          this.model.strokes = total;
          return;
      }

  }

  _getTotal() {
      let putts = this.model.putts || 0;
      let sandStrokes = this.model.sandStrokes || 0;
      let penalties =this.model.penalties || 0;

      return putts + sandStrokes + penalties + fairway;
  }


  accept() {
    console.log(this.noResult)
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

}
