angular.module("methods.controllers", ['ui.utils'])
    .controller('MethodListCtrl', ['$scope',
        function($scope) {
            $scope.addMethod = function() {
                var classId = $scope.selection.classId;
                if ($scope.project.classes[classId].methods === undefined)
                    $scope.project.classes[classId].methods = [];
                $scope.project.classes[classId].methods.push({
                    "name": "Name",
                    "type": "string",
                    "description": "Default description"
                });
            }

            $scope.moveMethod = function(index,offset) {
                var classId = $scope.selection.classId;
                var arr = $scope.project.classes[classId].methods;
                utils.move(arr,index,offset);
            };

            $scope.deleteMethod = function(index) {
                var classId = $scope.selection.classId;
                $scope.project.classes[classId].methods.splice(index,1);
            };
        }
    ])
    .controller('MethodCtrl', ['$scope',
        function($scope) {
            $scope.addArgument = function() {
                console.log($scope.method);
                var classId = $scope.selection.classId;
                if ($scope.method.arguments === undefined)
                    $scope.method.arguments = [];
                $scope.method.arguments.push({
                    "name": "Name",
                    "type": "string",
                    "description": "Default description"
                });
            }

            $scope.moveArgument = function(index,offset) {
                var arr = $scope.method.arguments;
                utils.move(arr,index,offset);
            };

            $scope.deleteArgument = function(index) {
                $scope.method.arguments.splice(index,1);
            };
        }
    ]);
