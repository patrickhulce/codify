(function(codeGeneration) {
    var INDENT = "   ";
    var LINE_BREAK = "\n";

    var appendWithIndent = function(base, adtl) {
        for (var i = 0; i < adtl.length; i++) {
            base.push(INDENT + adtl[i]);
        }
    }

    var decorateDoc = function(docLines, title, description) {
        docLines.splice(0, 0, '"""' + title);
        docLines.splice(1, 0, '' + flatten(description));
        docLines.push('"""');
    }

    var variablize = function(text) {
        text = text.toLowerCase();
        text = text.replace(/[^a-z0-9 ]+/g, "");
        return text.replace(/\s+/g, "_");
    }

    var flatten = function(text) {
    	if(text === undefined) return "";
        return text.replace(/\s+/g, " ");
    }

    var headerLines = function(the_class) {
        return ["class " + the_class.name + "(object):"];
    };

    var allPropertyLines = function(properties) {
    	if(properties === undefined) return [];
        var lines = [];
        var body = [];
        var doc = [];
        lines.push("def __init__(self");

        for (var i = 0; i < properties.length; i++) {
            var name = variablize(properties[i].name);
            var type = variablize(properties[i].type);
            lines[0] += ", " + name;
            body.push("self." + name + " = " + name);
            doc.push(name + " (" + type + ") -- " + flatten(properties[i].description));
        }
        lines[0] += "):";
        decorateDoc(doc,"Constructor");
        appendWithIndent(lines, doc);
        appendWithIndent(lines, body);
        return lines;
    };

    var methodLines = function(method) {
        var name = variablize(method.name);
        var type = variablize(method.type);
        var declare = "def " + name + "(self";
        var doc = [];
        var args = method.arguments;
        for (var i = 0; i < args.length; i++) {
            var argName = variablize(args[i].name);
            var argType = variablize(args[i].type);
            declare += ", " + argName;
            doc.push(name + " (" + argType + ") -- " + flatten(args[i].description));
        }
        var lines = [declare + "):"];
        decorateDoc(doc,method.name + " returns (" + type + ")",method.description);
        doc.push("pass");
        appendWithIndent(lines, doc);
        return lines;
    };

    var allMethodLines = function(methods) {
    	if(methods === undefined) return [];
    	var lines = [];
    	for(var i=0;i<methods.length;i++) {
    		lines.push('');
    		lines.push.apply(lines,methodLines(methods[i]));
    		lines.push('');
    	}
    	return lines;
    };


    codeGeneration.python = {
        codeFromClass: function(the_class) {
        	if(the_class === undefined) return "";
            var lines = headerLines(the_class);
            lines.push('');
            appendWithIndent(lines,allPropertyLines(the_class.properties));
            lines.push('');
            appendWithIndent(lines,allMethodLines(the_class.methods));
            return lines.join(LINE_BREAK);
        }
    };
})(window.codeGeneration = window.codeGeneration || {})
