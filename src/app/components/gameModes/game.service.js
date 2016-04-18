const GAME_MODES = [
    {mode: "POINTS", name:"Pistebogey"},
    {mode: "STROKES", name:"Lyöntipeli"}
];

export class GameService {
  constructor() {
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
    return this.gameSetup;
  }

}
