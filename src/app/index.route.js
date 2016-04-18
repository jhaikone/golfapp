export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('navbar', {
        abstract: true,
        template: `
        <div>
          <header>
            <acme-navbar creation-date="main.creationDate"></acme-navbar>
          </header>
          <div class="span12 ui-view-container">
            <div class="well" ui-view></div>
          </div>
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
    ;

  $urlRouterProvider.otherwise('/home');
}
