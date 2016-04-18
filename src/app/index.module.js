/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { SetupController } from './setup/setup.controller';
import { PlayersService } from '../app/components/players/players.service';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { CoursesMock } from '../app/components/courses/courses.mock';
import { GameService } from '../app/components/gameModes/game.service';
import { GameController } from './game/game.controller';

angular.module('golfapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngResource', 'ui.router', 'ngMaterial', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('PlayersService', PlayersService)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('GameService', GameService)
  .service('CoursesMock', CoursesMock)
  .controller('MainController', MainController)
  .controller('GameController', GameController)
  .controller('SetupController', SetupController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
