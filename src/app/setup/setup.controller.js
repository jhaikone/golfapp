export class SetupController {
  constructor (PlayersService, GameService, CoursesMock, $log, $state) {
    'ngInject';

    this.PlayersService = PlayersService;
    this.GameService = GameService;
    this.CoursesMock = CoursesMock;
    this.$log = $log;
    this.$state = $state;

    this.courses = this.CoursesMock.getCourses();
    this.gameModes = this.GameService.getModes();

    this.players = this.PlayersService.getPlayers();
    this.game = this.GameService.getGameSetup();
  }

  accept() {
    this.GameService.setGameSetup(this.game);
    this.PlayersService.setPlayers(this.players);
    this.$state.go('navbar.game');
  }

  setDefaultTee(course) {
    if(course && course.tees) {
      this.game.tee = course.tees[course.tees.length-1];
    }
  }

  setDefaultHCP(player) {
    this.$log.log('player', player);
    if(player && player.name !== '' && player.hcp === null) {
      player.hcp = 36;
    } else if(!player) {
      player.hcp = null;
    }
  }

}
