'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }


      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        if($scope.authentication.user.roles[0] === 'user'){
          $state.go('customer-homepage');
        }
        else if($scope.authentication.user.roles[0] === 'artist'){
          $state.go('artist-homepage');
        }else if($scope.authentication.user.roles[0] === 'admin'){
          $state.go('walls.list');
        }else{
          $state.go('home');
        }

      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;


        // And redirect to the previous or home page
        if($scope.authentication.user.roles[0] === 'user'){
          $state.go('customer-homepage');
        }
        else if($scope.authentication.user.roles[0] === 'artist'){
          $state.go('artist-homepage');
        }else if($scope.authentication.user.roles[0] === 'admin'){
          $state.go('walls.list');
        }else{
          $state.go('home');
        }
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };

    $scope.contactform = function(isValid){

      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var data = ({
        contactName : $scope.userForm.firstName.$$rawModelValue,
        contactEmail : $scope.userForm.email.$$rawModelValue,
        contactMsg : $scope.userForm.message.$$rawModelValue
      });

      $http.post('/api/auth/contact-us', data).
        success(function(data, status, headers, config) {
          $state.go('home', $state.previous.params);
        }).
        error(function(data, status, headers, config) {
        });

    };
  }
]);
