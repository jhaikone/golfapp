const GAME_MODES = [
    {mode: "POINTS", name:"Pistebogey"},
    {mode: "STROKES", name:"Lyöntipeli"}
];

export class GameService {
  constructor(CoursesMock) {
    'ngInject'

    //TODO: remove this when done
    this.CoursesMock = CoursesMock;

    this.gameSetup = {
      mode: GAME_MODES[0]
    }
  }

  getModes() {
    return GAME_MODES;
  }

  setGameSetup(gameModel) {
    this.gameSetup = gameModel;
  }

  getGameSetup() {
    if(this.gameSetup.course) {
      return this.gameSetup
    }
    this.gameSetup.course = this.CoursesMock.getCourses()[0];
    return this.gameSetup;
  }

}
