export class PlayersService {
  constructor() {
    //this.players = new Array(4);
    this.players = [
      {
        hcp: 36,
        name:"Juuso"
      },
      {
        hcp: 20,
        name:"Jesse"
      },
      {
        hcp: 20,
        name:"Jake"
      },
      {
        hcp: 20,
        name:"Jari"
      }
    ]
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }
}
