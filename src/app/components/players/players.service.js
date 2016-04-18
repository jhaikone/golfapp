export class PlayersService {
  constructor() {
    this.players = new Array(4);
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }
}
