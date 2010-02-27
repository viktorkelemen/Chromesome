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

            var result = "",
                l = 0;

            $(current).contents().each( function iterate(index, element) {
                if (element !== undefined) {
                    if (element.nodeType === 3) {
                        result = $.trim(element.nodeValue);
                        if (result.length > 0) {
                            console.log(result);
                            l++;
                        }
                    } else {
                        console.log(element);
                        l++;
                    }
                }

            });
            return "it has " + l + " children";
        };

        var cat = function (element) {

            var selected = $(element)[0];

            if (selected !== undefined) {
                return ($(selected).text());
            } else {
                return element + " not found.";
            }
        }


        window.cd = cd;
        window.__defineGetter__("ls", ls);
        window.cat = cat;


        cd("body");

    });
