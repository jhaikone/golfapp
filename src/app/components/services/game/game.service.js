const GAME_MODES = [
    {mode: "POINTS", name:"Pistebogey"},
    {mode: "STROKES", name:"Lyöntipeli"}
];

export class GameService {
  constructor(CoursesMock, PlayersService) {
    'ngInject'

    //TODO: remove this when done
    this.CoursesMock = CoursesMock;

    this.PlayersService = PlayersService;

    this.results = [];
    this.results.push(this._createPlayerModel());

    this.gameSetup = {
      mode: GAME_MODES[0]
    }

  }

  _createPlayerModel(lastHole = false) {
    let objectPlayers = [];
    let totalPlayers = this.PlayersService.getPlayers();

    totalPlayers.forEach( (player)=> {
      objectPlayers.push({name: player.name, putts: 0, sandStrokes: 0, penalties: 0, noResult: false});
    })

    return {
      players: objectPlayers,
      lastHole: lastHole
    };
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

  addHoleResult(model, index) {
    this.results[index] = model;
    if(index === this.results.length-1) {
      this.results.push(this._createPlayerModel(this.isLastHole));
    }
  }

  get isLastHole() {
    return 1 === this.gameSetup.course.holes.length -this.results.length;
  }

  getPreviousHole(index) {
    if(index < 0) {
      index = 0;
    }
    return this.results[index];
  }

  getHoleResults(index) {
    return this.results[index];
  }

  get playedHoles() {
    return this.results.length-1
  };

}
