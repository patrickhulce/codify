(function(utils) {
    var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    utils.newGuid = function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    utils.groupBy = function(list, groupFunc) {
        var groups = [];
        var groupings = {};
        for (var i = 0; i < list.length; i++) {
            var group = groupFunc(list[i]);
            if (groups.indexOf(group) == -1) {
                groups.push(group);
                groupings[group] = [];
            }
            groupings[group].push(list[i]);
        }
        var result = [];
        for (var i = 0; i < groups.length; i++) {
            result.push(groupings[groups[i]]);
        }
        return result;
    };

    utils.move = function(arr, index, offset) {
        var toIndex = index + offset;
        toIndex = Math.max(toIndex, 0);
        toIndex = Math.min(toIndex, arr.length);
        var el = arr.splice(index, 1)[0];
        arr.splice(toIndex, 0, el);
    }

    angular.module('app.utils', [])
        .directive('contenteditable', function() {
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    var tabbed = false;
                    var seen = false;
                    // view -> model
                    elm.on('blur', function() {
                        scope.$apply(function() {
                            ctrl.$setViewValue(elm.text());
                        });
                        console.log("blurred with " + elm.text());
                    });

                    ctrl.$render = function(value) {
                        var model = scope.$eval(attrs['ngModel']);
                        elm.html(model);
                    }

                    // add enter listener
                    elm.on('keydown', function(evt) {
                        if (evt.which == 13) {
                            elm.blur();
                        }
                    });

                    var model = scope.$eval(attrs['ngModel']);
                    elm.html(model);
                }
            };
        })
        .filter('toArray', function() {
            return function(input, attribute) {
                if (!angular.isObject(input)) return input;

                var array = [];
                for (var objectKey in input) {
                    array.push(input[objectKey]);
                }
                return array;
            }
        });



})(window.utils = window.utils || {});
