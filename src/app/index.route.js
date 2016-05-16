export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('navbar', {
        abstract: true,
        template: `
          <div class="span12 ui-view-container">
            <div class="well" ui-view></div>
          </div>
        `
    })
    .state('navbar.home', {
      url: '/home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('navbar.setup', {
      url: '/setup',
      templateUrl: 'app/setup/setup.html',
      controller: 'SetupController',
      controllerAs: 'setup'
    })

    .state('navbar.game', {
      url: '/game',
      templateUrl: 'app/game/game.html',
      controller: 'GameController',
      controllerAs: 'game'
    })

    .state('navbar.play', {
      url: '/play',
      templateUrl: 'app/play/play.html',
      controller: 'PlayController',
      controllerAs: 'play'
    })
    ;

  $urlRouterProvider.otherwise('/setup');
}
