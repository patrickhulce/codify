angular.module("properties.controllers", ['ui.utils'])
    .controller('PropertyListCtrl', ['$scope',
        function($scope) {
            $scope.addProperty = function() {
                var classId = $scope.selection.classId;
                if ($scope.project.classes[classId].properties === undefined)
                    $scope.project.classes[classId].properties = [];
                $scope.project.classes[classId].properties.push({
                    "name": "Name",
                    "type": "string",
                    "description": "Default description"
                });
            }

            $scope.moveProperty = function(index,offset) {
                var classId = $scope.selection.classId;
                var arr = $scope.project.classes[classId].properties;
                utils.move(arr,index,offset);
            };

            $scope.deleteProperty = function(index) {
                var classId = $scope.selection.classId;
                $scope.project.classes[classId].properties.splice(index,1);
            };
        }
    ]);
