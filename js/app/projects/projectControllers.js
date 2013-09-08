angular.module("projects.controllers", ['firebase'])
    .controller('ProjectCtrl', ['$scope', '$routeParams', 'angularFire',
        function($scope, $routeParams, angularFire) {
            $scope.projectId = $routeParams.projectId;
            $scope.project = {};
            $scope.selection = {};
            var path = app.settings.firebaseUrl + 'projects/' + $scope.projectId;
            angularFire(new Firebase(path),$scope,'project').then(function(){
            	var id = 'foo';
            	for(var key in $scope.project.classes) {
            		id = key;
            		break;
            	}
            	console.log("Found key being " + id);
            	if(id == 'foo') return;
            	$scope.selection.classId = id;
            });
        }
    ])
    .controller('ProjectListCtrl', ['$scope', 'angularFire',
        function($scope, angularFire) {
            $scope.projects = {};
            $scope.addProject = function() {
                var guid = utils.newGuid();
                $scope.projects[guid] = {
                    "id": guid,
                    "name": $scope.projectName,
                    "public": true
                };
            }
            var path = app.settings.firebaseUrl + 'projects';
            angularFire(new Firebase(path),$scope,'projects');
        }
    ]);
