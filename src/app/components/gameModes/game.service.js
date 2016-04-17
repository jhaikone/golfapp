const GAME_MODES = [
    {mode: "POINTS", name:"Pistebogey"},
    {mode: "STROKES", name:"Lyöntipeli"},
];

export class GameService {

  getModes() {
    return GAME_MODES;
  }

}
