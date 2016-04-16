export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('navbar', {
        abstract: true,
        template: '<div><header><acme-navbar creation-date="main.creationDate"></acme-navbar></header><ui-view></ui-view></div>'
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
    ;

  $urlRouterProvider.otherwise('/home');
}
