angular.module("classes.controllers", ['firebase', 'ui.utils'])
    .controller('ClassListCtrl', ['$scope',
        function($scope) {
            $scope.addClass = function() {
                if ($scope.project.classes === undefined) $scope.project.classes = {};
                var guid = utils.newGuid();
                $scope.project.classes[guid] = {
                    "id": guid,
                    "name": $scope.className,
                    "description": "desc"
                };
                $scope.className = "";
            }
        }
    ])
    .controller('ClassCtrl', ['$scope', 'angularFire', '$timeout',
        function($scope, angularFire, $timeout) {
            $scope.getClass = function() {
                var project = $scope.project;
                var classId = $scope.selection.classId;
                if(project === undefined 
                    || classId === undefined
                    || project.classes === undefined) return undefined;
                return project.classes[classId];
            };
            $scope.getPreview = function() {
                return codeGeneration.python.codeFromClass($scope.getClass());
            };
            $timeout(function() {
                $scope.cleanView = true;
            },1000);

            $scope.$watch('cleanView',function(newVal) {
                    $(".toggle-editing").each(function() {
                        this.contentEditable = newVal === false;
                    });
            });
        }
    ]);
