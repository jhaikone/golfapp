export class PlayersService {
  constructor() {
    //this.players = new Array(4);
    this.players = [
      {
        id: 24244,
        hcp: 36,
        name:"Juuso"
      },
      {
        id: 33442,
        hcp: 20,
        name:"Jesse"
      },
    ];

    /*
    {
      id: 3,
      hcp: 20,
      name:"Jake"
    },
    {
      id: 4,
      hcp: 20,
      name:"Jari"
    }*/

    this.points = {};
    this.scores = {};

    this.players.forEach((player) => {
      this.points[player.id] = [];
      this.scores[player.id] = {strokes: 0, putts: 0};
    });

  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }

  setPoints(players) {
    players.forEach((player) => {
      let id = player.id;

      if(this.points[id])

      this.points[id].push(player);

      this.scores[id].strokes = this.scores[id].strokes + (player.strokes || 0);
      this.scores[id].putts = this.scores[id].putts + (player.putts || 0);
      console.log('scoreeeeeeeeee', this.scores [id]);
    });
  }

  removeOldScore(players) {
    players.forEach((player) => {
      let id = player.id;

      this.scores[id].strokes = this.scores[id].strokes - (player.strokes || 0);
      this.scores[id].putts = this.scores[id].putts - (player.putts || 0);
    });
  }

  getPoints() {
    return this.points;
  }

  getScores() {
    return this.scores;
  }

}
