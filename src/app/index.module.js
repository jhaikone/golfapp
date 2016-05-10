/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { MainController } from './main/main.controller';
import { SetupController } from './setup/setup.controller';

import { PlayersService } from '../app/components/services/players/players.service';
import { GameService } from '../app/components/services/game/game.service';

import { GoHeaderDirective } from '../app/components/directives/goHeader/go-header.directive';
import { GoStrokeInputDirective } from '../app/components/directives/goStrokeInput/go-stroke-input.directive';
import { GoSwitch } from '../app/components/directives/goSwitch/go-switch.directive';

import { GameController } from './game/game.controller';

import { CoursesMock } from '../app/components/courses/courses.mock';

angular.module('golfapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngResource', 'ui.router', 'ngMaterial', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-green')
      .accentPalette('blue-grey')
      .warnPalette('red');
  })
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('GameController', GameController)
  .controller('SetupController', SetupController)

  .service('PlayersService', PlayersService)
  .service('GameService', GameService)
  
  .directive('goHeader', GoHeaderDirective)
  .directive('goSwitch', GoSwitch)
  .directive('goStrokeInput', GoStrokeInputDirective)

  .service('CoursesMock', CoursesMock);
