export class SetupController {
  constructor (PlayersService, CoursesMock, $log) {
    'ngInject';

    this.PlayersService = PlayersService;
    this.CoursesMock = CoursesMock;
    this.$log = $log;
    this.courses = this.CoursesMock.getCourses();

    this.maxPlayers = new Array(4);
    this.players = this.PlayersService.getPlayers();
  }

  accept() {
    this.PlayersService.setPlayers(this.players);
    this.$log.log('accepting', this.players);
    this.$log.log('courses', this.courses);
  }

}
