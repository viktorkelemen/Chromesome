
    $( function () {

        var dev = {},
            current = undefined;

        dev.cd = function (element) {

            var selected;

            if (current !== undefined) {

                if (element === "..") {
                    selected = $(current).parent()[0];
                } else if (element === ".") {
                    selected = current;
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

            var selected = $(element)[0];

            if (selected !== undefined) {
                return ($(selected).text());
            } else {
                return element + " not found.";
            }
        };

        dev.load = function (file) {

            $.getScript(file, function (data, status) {
                console.log(file + " is successfully loaded.");
            });

            return file + " is loading.";
        };

        dev.pwd = function () {
            return current;
        }


        // var target = console.__proto__;
        var target = window;

        $([["cd", dev.cd],
          ["cat", dev.cat],
          ["load", dev.load]
        ]).each( function iterate(index, element) {
            if (target[element[0]] === undefined) {
                target[element[0]] = element[1];
            }
        });


        $([["ls", dev.ls],
          ["pwd", dev.pwd]
        ]).each( function iterate(index, element) {
            if (target[element[0]] === undefined) {
                target.__defineGetter__(element[0], element[1]);
            }
        });

        // goes to HTML
        cd("html");
    });

