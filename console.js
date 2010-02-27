// Object.defineProperty( obj, "name", {
//    get: function(){ return name; },
//    set: function(value){ name = value; }
//  });


    var DEV = {};
    var current;
    $( function () {

        var cd = function (element) {

            var selected;

            if (current !== undefined) {
                selected = $(element, current)[0];
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
        var ls = function () {

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

        var cat = function (element) {

            var selected = $(element)[0];

            if (selected !== undefined) {
                return ($(selected).text());
            } else {
                return element + " not found.";
            }
        };
        
        var load = function (file) {
            
            $.getScript(file, function (data, status) {
                console.log(file + " is successfully loaded.");
            });
            
            return file + " is loading.";            
        };


        window.cd = cd;
        window.__defineGetter__("ls", ls);
        window.cat = cat;
        window.load = load;


        cd("body");

    });
