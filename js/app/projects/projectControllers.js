angular.module("projects.controllers", ['firebase'])
    .controller('ProjectCtrl', ['$scope', '$routeParams', 'angularFire',
        function($scope, $routeParams, angularFire) {
            $scope.projectId = $routeParams.projectId;
            $scope.project = {};
            $scope.selection = {};
            var path = app.settings.firebaseUrl + 'projects/' + $scope.projectId;
            angularFire(new Firebase(path),$scope,'project');
        }
    ])
    .controller('ProjectListCtrl', ['$scope', 'angularFire',
        function($scope, angularFire) {
            $scope.projects = {};
            $scope.addProject = function() {
                var guid = utils.newGuid();
                $scope.projects[guid] = {
                    "id": guid,
                    "name": $scope.project_name,
                    "isPublic": false,
                    "details": {
                        "blah": "boo"
                    },
                    "classes": [{
                        "name": "class1",
                        "desc": "something"
                    }]
                };
            }
            var path = app.settings.firebaseUrl + 'projects';
            angularFire(new Firebase(path),$scope,'projects');
        }
    ]);
