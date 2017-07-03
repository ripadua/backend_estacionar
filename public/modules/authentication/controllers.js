'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', '$uibModal',
    function ($scope, $rootScope, $location, AuthenticationService, $uibModal) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.status == 200) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else if (response.status = 401) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'modalAlert.html',
                        size: 'sm',
                        controller: 'PopupController',
                        resolve: {
                            message: function() {
                                return 'Usuário e/ou senha inválidos.';
                            }
                        }
                    });
                } else {

                }
            });
        };
    }]);
