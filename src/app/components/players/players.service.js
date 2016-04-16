export class PlayersService {
  constructor() {
    this.players = [];
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }
}
