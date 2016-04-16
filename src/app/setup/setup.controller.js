export class SetupController {
  constructor (PlayersService) {
    'ngInject';

    this.PlayersService = PlayersService;

    this.maxPlayers = new Array(4);
    this.players = this.PlayersService.getPlayers();
  }

  accept() {
    this.PlayersService.setPlayers(this.players);
    console.log('accepting', this.players);
  }

}
