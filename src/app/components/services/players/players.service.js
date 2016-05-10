export class PlayersService {
  constructor() {
    //this.players = new Array(4);
    this.players = [
      {
        id: 1,
        hcp: 36,
        name:"Juuso"
      },
      {
        id: 2,
        hcp: 20,
        name:"Jesse"
      },
      {
        id: 3,
        hcp: 20,
        name:"Jake"
      },
      {
        id: 4,
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
