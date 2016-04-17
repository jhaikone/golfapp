export class SetupController {
  constructor (PlayersService, GameService, CoursesMock, $log) {
    'ngInject';

    this.PlayersService = PlayersService;
    this.CoursesMock = CoursesMock;
    this.$log = $log;
    this.courses = this.CoursesMock.getCourses();
    this.gameModes = GameService.getModes();
    this.model = {};

    this.maxPlayers = new Array(4);
    this.players = this.PlayersService.getPlayers();
  }

  accept() {
    this.PlayersService.setPlayers(this.players);
    this.$log.log('accepting', this.model.players);
    this.$log.log('courses', this.courses);
    this.$log.log('chosen course', this.model.course);
    this.$log.log('chosen tee', this.model.tee);
    this.$log.log('model', this.model);
  }

}
