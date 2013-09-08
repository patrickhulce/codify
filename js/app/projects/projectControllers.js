angular.module("projects.controllers", ['firebase', 'app.utils'])
    .controller('ProjectCtrl', ['$scope', '$routeParams', 'angularFire',
        function($scope, $routeParams, angularFire) {
            $scope.projectId = $routeParams.projectId;
            $scope.project = {};
            $scope.selection = {};
            var path = app.settings.firebaseUrl + 'projects/' + $scope.projectId;
            angularFire(new Firebase(path), $scope, 'project').then(function() {
                var id = 'foo';
                for (var key in $scope.project.classes) {
                    id = key;
                    break;
                }
                if (id == 'foo') return;
                $scope.selection.classId = id;
            });
            if ($scope.user && $scope.user.id) {
                var path = app.settings.firebaseUrl + 'users/' + $scope.user.id + '/projects/' + $scope.projectId;
                var ref = new Firebase(path);
                ref.child('timestamp').set(new Date().getTime());
                angularFire(ref.child('name'), $scope, 'project.name');
            }
        }
    ])
    .controller('ProjectListCtrl', ['$scope', '$location', 'angularFire',
        function($scope, $location, angularFire) {

            $scope.projects = {};

            var projectBaseUrl = app.settings.firebaseUrl + "projects";

            $scope.addProject = function() {
                var guid = utils.newGuid();
                var ref = new Firebase(projectBaseUrl);
                var project = {
                    "id": guid,
                    "name": $scope.projectName,
                    "timestamp": new Date().getTime()
                };
                ref.child(guid).set(project);
                $scope.projects[guid] = project;
                $location.path('/projects/' + guid);
            }
            var unbind = null;
            $scope.$watch('user.id', function(newVal) {
                console.log("User ID " + newVal);
                if (newVal === undefined) return;
                if (unbind) {
                    unbind();
                    unbind = null;
                }
                var path = app.settings.firebaseUrl + 'users/' + newVal + '/projects';
                angularFire(new Firebase(path), $scope, 'projects').then(function(disassociate) {
                    unbind = disassociate;
                });
            });
        }
    ]);
