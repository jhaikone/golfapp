export class GameController {

  constructor(GameService) {
    'ngInject'

    this.noResult = false;
    this.gameData = GameService.getGameSetup();
    //this.holes = this.gameData.course.holes;
    console.log(this.gameData);
    this.index = 0;
  }

  accept() {
    console.log(this.noResult)
  }

  getPar() {
    return 'Par 4';
    //return 'Par ' + this._getHole().par;
  }

  _getHole() {
    return this.holes[this.index];
  }

  getHoleHeader() {
    let holeNumber = this.index +1;
    return 'Väylä 1';
    //return 'Väylä' + ' ' + holeNumber;
  }

}
