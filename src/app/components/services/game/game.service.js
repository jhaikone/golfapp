const GAME_MODES = [
    {mode: "POINTS", name:"Pistebogey"},
    {mode: "STROKES", name:"Lyöntipeli"}
];

export class GameService {
  constructor(CoursesMock, PlayersService, $log) {
    'ngInject'

    //TODO: remove this when done
    this.CoursesMock = CoursesMock;

    this.$log = $log;
    this.PlayersService = PlayersService;

    this.gameSetup = {
      mode: GAME_MODES[0]
    }

    this.results = [];
    this.holeIndex = 0;
    this.holes = this.getGameSetup().course.holes;
    this.holes.forEach((hole) => {
      this.results.push(this._createPlayerModel());
    });
    this.result = this.results[0];
    this.$log.log('holes', this.results);

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
      this.results.push(this._createPlayerModel());

    } else {
      this.PlayersService.removeOldScore(this.results[index].players);
    }

    this.PlayersService.setPoints(this.results[index].players);

  }

  finishCourse(model, index) {
    this.results[index] = model;
    this.PlayersService.setPoints(this.results[index].players);
    this.calculateStrokes();
  }

  get isLastHole() {
    return this.holes.length-1 === this.holeIndex;
  }

  getPreviousHole(index) {
    if(index < 0) {
      index = 0;
    }
    return this.results[index];
  }

  getHoleResults(index) {
    if(index) {
      return this.results[index];
    }
    return this.results[this.holeIndex];

  }

  get playedHoles() {
    return this.results.length-1
  }

  calculateStrokes() {
    this.$log.log(this.PlayersService.getScores());
  }

  getPar(index) {
    return this.holes[index].par;
  }

  updateHoleIndex(direction) {
    if(direction === 'previous' && this.holeIndex > 0) {
      this.holeIndex--;
    } else if(direction === 'next' && this.holeIndex < 18) {
      this.holeIndex++;
    }
    this.result = this.results[this.holeIndex];
    this.$log.log('updatedHoleIndex', this.holeIndex);
    this.$log.log('thisresult', this.result);
  }

  _createPlayerModel() {
     let objectPlayers = [];
     let totalPlayers = this.PlayersService.getPlayers();

     totalPlayers.forEach( (player)=> {
       objectPlayers.push({name: player.name, id: player.id, putts: 0, sandStrokes: 0, penalties: 0, noResult: false});
     })

     return {
       players: objectPlayers
     };
   }

}
