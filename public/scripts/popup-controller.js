'use strict';

angular.module('Estacionar')

.controller('PopupController',
    ['$scope', '$uibModalInstance', 'message',
    function ($scope, $uibModalInstance, message) {
        $scope.message = message;
        $scope.fecharModal = function() {
            $uibModalInstance.dismiss('cancel');
        }
    }]);
