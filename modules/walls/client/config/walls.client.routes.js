(function () {
  'use strict';

  angular
    .module('walls')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('walls', {
        abstract: true,
        url: '/walls',
        template: '<ui-view/>'
      })
      .state('walls.list', {
        url: '',
        templateUrl: 'modules/walls/client/views/list-walls.client.view.html',
        controller: 'WallsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Walls List'
        }
      })
      .state('walls.jobs', {
        url: '/jobs',
        templateUrl: 'modules/walls/client/views/list-jobs-walls.client.view.html',
        controller: 'WallsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'artist'],
          pageTitle: 'Walls List'
        }
      })
      .state('walls.create', {
        url: '/create',
        templateUrl: 'modules/walls/client/views/form-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: newWall
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Walls Create'
        }
      })
      .state('custom-form', {
        url: '/mural-request-custom-form',
        templateUrl: 'modules/walls/client/views/custom-form.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: newWall
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Walls Create'
        }
      })
      .state('walls.edit', {
        url: '/:wallId/edit',
        templateUrl: 'modules/walls/client/views/form-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Wall {{ wallResolve.name }}'
        }
      })
         // route to show our basic form (/form)
        .state('form', {
          url: '/form',
          templateUrl: 'modules/walls/client/views/form-view/form.html'//,
            //controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
          url: '/profile',
          templateUrl: 'modules/walls/client/views/form-view/form-profile.html'
        })

        // url will be /form/interests
        .state('form.interests', {
          url: '/interests',
          templateUrl: 'modules/walls/client/views/form-view/form-interests.html'
        })

        // url will be /form/payment
        .state('form.payment', {
          url: '/payment',
          templateUrl: 'modules/walls/client/views/form-view/form-payment.html'
        })







      .state('walls.view', {
        url: '/:wallId',
        templateUrl: 'modules/walls/client/views/view-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          pageTitle: 'Wall {{ wallResolve.name }}'
        }
      })
      .state('walls.quote', {
        url: '/:wallId/quote',
        templateUrl: 'modules/walls/client/views/quote-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          pageTitle: 'Wall quote'
        }
      })

      .state('walls.match', {
        url:'/:wallId/match',
        templateUrl: 'modules/walls/client/views/match-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          pageTitle: 'Quote Project'
        }
      })
      ;
/*
      .state('walls.match',{
        url:'/walls/:wallId/match',
        templateUrl: '/modules/walls/client/views/quote-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve:{
          wallResolve: ['$stateParams', function($stateParams){
            return get({wallId: $stateParams.wallId});
          }]
        }
      });
Breaks entire wall section of menu, controller won't route properly
*/
  }

  getWall.$inject = ['$stateParams', 'WallsService'];

  function getWall($stateParams, WallsService) {
    return WallsService.get({
      wallId: $stateParams.wallId
    }).$promise;
  }

  newWall.$inject = ['WallsService'];

  function newWall(WallsService) {
    return new WallsService();
  }
}());
