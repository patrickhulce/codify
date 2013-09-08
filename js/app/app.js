var app = {
    settings: {
        'firebaseUrl': 'https://codify.firebaseio.com/'
    }
};

angular.module("codify", ['projects.controllers', 'classes.controllers', 'properties.controllers', 'methods.controllers', 'app.utils', 'firebase'])
    .config(function($routeProvider) {
        console.log("route provider config");
        $routeProvider.when('/projects', {
            templateUrl: 'partials/pages/projects.html',
            controller: "ProjectListCtrl"
        }).when('/projects/:projectId', {
            templateUrl: 'partials/pages/project.html',
            controller: "ProjectCtrl"
        }).otherwise({
        	template: '<div></div>',
            controller: 'ExternalController'
        });
    })
    .controller('AppController', ['$scope', 'angularFireAuth',
        function($scope, angularFireAuth) {
        	var ref = new Firebase("http://codify.firebaseio.com/");
            angularFireAuth.initialize(ref, {
                scope: $scope,
                name: "user"
            });
            $scope.login = function() {
            	angularFireAuth.login('facebook');
            };
            $scope.logout = function() {
            	angularFireAuth.logout();
            }
            $scope.shareUrl = function(projectId) {
            	return "http://codify.tk/#/projects/" + projectId;
            };
        }
    ])
    .controller('ExternalController',['$window', function($window) {
    	window.location = "/landing.html";
    }]);
