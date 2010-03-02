
var chromesomeInit = function () {


        var dev = {},
            current = undefined;

        dev.cd = function (element) {

            var selected;

            if (current !== undefined) {

                if (element === "..") {
                    selected = $(current).parent()[0];
                } else if (element === ".") {
                    selected = current;
                } else if (element === "/") {
                    selected = $(document)[0];
                } else {
                    selected = $(element, current)[0];
                }

            } else {
                selected = $(element)[0];
            }

            if (selected !== undefined) {
                current = selected;
                return current;
            } else {
                return element + " not found.";
            }
        };

        dev.ls = function () {

            var result = [],
                l = 0,
                txt = "";

            $(current).contents().each( function iterate(index, element) {
                if (element !== undefined) {
                    if (element.nodeType === 3) {
                        txt = $.trim(element.nodeValue);
                        if (txt.length > 0) {
                            result.push(txt);
                        }
                    } else {
                        result.push(element);
                    }
                }

            });
            return result;
        };

        dev.cat = function (element) {

            var selected;

            if (current !== undefined) {
                selected = $(element)[0];
                if (selected !== undefined) {
                    return ($(selected).text());
                } else {
                    return element + " not found.";
                }
            }
        };

        dev.load = function (file, successHandler) {

            var rnd = Math.random();
            $.getScript(file + "?rnd=" + rnd, function (data, status) {
                console.log(file + " is successfully loaded.");
                if (successHandler !== undefined) {
                    successHandler();
                }
            });

            return file + " is loading.";
        };

        dev.pwd = function () {
            return current;
        };

        dev.scripts = function () {

            var result = [];
            $("script").each( function iterate(index, element) {
                result.push($(element).attr("src"));
            });

            return result;
        };

        dev.rm = function (element) {

            var selected;

            if (current !== undefined) {
                selected = $(element, current)[0];
                if (selected !== undefined) {
                    return ($(selected).remove());
                } else {
                    return element + " not found.";
                }
            }
        };

        // dev._reloadConsole = function () {
        //
        //     return dev.load("console.js", function () {
        //         DEVELOPER_TOOLBAR_EXTENSIONS.init();
        //     });
        // };

        dev.csss = function () {

            var result = [];
            $("link[rel=stylesheet]").each( function iterate(index, element) {
                result.push($(element).attr("href"));
            });

            return result;
        };

        // var target = console.__proto__;
        var target = window;

        ([["cd", dev.cd],
          ["cat", dev.cat],
          ["load", dev.load],
          ["rm", dev.rm]
          // ["_reload", dev._reloadConsole]
        ]).forEach( function iterate(element, index, array) {
            if (target[element[0]] === undefined) {
                target[element[0]] = element[1];
            }
        });

        ([["ls", dev.ls],
          ["pwd", dev.pwd],
          ["scripts", dev.scripts],
          ["csss", dev.csss]
        ]).forEach( function iterate(element, index, array) {
            if (target[element[0]] === undefined) {
                target.__defineGetter__(element[0], element[1]);
            }
        });


        // constants, this should be refactored later
        (["html","div","h1","h2","h3","h4","p","strong","span","a"]).forEach( function iterate(element, index, array) {
            target[element] = element;
        });


        // goes to HTML
        // cd(document);
};

var script = $("<script/>")[0];
$("head")[0].appendChild(script);
script.appendChild(document.createTextNode('('+ chromesomeInit +')();'));

