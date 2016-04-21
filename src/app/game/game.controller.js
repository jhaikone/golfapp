export class GameController {

  constructor(GameService) {
    'ngInject'

    this.noResult = false;
    this.gameData = GameService.getGameSetup();
    console.log(this.gameData);
    this.holes = this.gameData.course.holes;
    console.log(this.gameData);
    this.index = 0;
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

}
