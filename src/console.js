/*!
 * Chromesome Chrome Developer Toolbar extension
 *
 * Copyright (c) 2010 Viktor Kelemen
 * Dual licensed under the MIT and GPL licenses.
 */
var chromesomeInit = function () {


    var dev = {},
        current = undefined;

    /**
    * Changes the current node to the first childnode that matches the nodeDescription
    *
    * @param nodeDescription {String}
    * @return HtmlNode
    */
    function cd (nodeDescription) {

        var selected;

        if (current !== undefined) {

            if (nodeDescription === "..") {
                selected = current.parentNode;
            } else if (nodeDescription === ".") {
                selected = current;
            } else if (nodeDescription === "/") {
                selected = document;
            } else {
                selected = current.getElementsByTagName(nodeDescription)[0];
            }

        } else {
            selected = document.getElementsByTagName(nodeDescription)[0];
        }

        if (selected !== undefined) {
            current = selected;
            return current;
        } else {
            return nodeDescription + " not found.";
        }
    }

    /**
    * Lists the childnodes of the current node
    *
    * @return {Array}
    */
    function ls () {
        
        var result = [],
            l = 0,
            txt = "",
            children, element;

        if (current === undefined) {
            return [];
        }

        if (current === undefined || !current.hasChildNodes()) {
            return [];
        } else {
           children = current.childNodes;
           for (var i = 0; i < children.length; i++)  {
               element = children[i];
               if (element !== undefined) {
                   if (element.nodeType === 3) {
                       txt = (element.nodeValue || "").replace( /^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
                       if (txt.length > 0) {
                           result.push(txt);
                       }
                   } else {
                       result.push(element);
                   }
               }
           }

           return result;
        }
    }

        dev.cat = function (element) {

            // not implemented yet
            // var selected;
            //
            // if (current !== undefined) {
            //     selected = $(element)[0];
            //     if (selected !== undefined) {
            //         return ($(selected).text());
            //     } else {
            //         return element + " not found.";
            //     }
            // }
            return "Not implemented yet";
        };

        dev.load = function (file, successHandler) {

            // var rnd = Math.random();
            // $.getScript(file + "?rnd=" + rnd, function (data, status) {
            //     console.log(file + " is successfully loaded.");
            //     if (successHandler !== undefined) {
            //         successHandler();
            //     }
            // });
            //
            // return file + " is loading.";
            return "Not implemented yet";
        };

        dev.pwd = function () {
            return current;
        };

        dev.scripts = function () {

            var result = [],
                scripts = document.getElementsByTagName('script');

            for (var i = 0; i < scripts.length; i++)  {
                result.push(scripts[i]);
            }

            return result;
        };

        dev.rm = function (element) {

            // var selected;
            //
            // if (current !== undefined) {
            //     selected = $(element, current)[0];
            //     if (selected !== undefined) {
            //         return ($(selected).remove());
            //     } else {
            //         return element + " not found.";
            //     }
            // }
            return "Not implemented yet";

        };


        dev.csss = function () {

            // var result = [];
            // $("link[rel=stylesheet]").each( function iterate(index, element) {
            //     result.push($(element).attr("href"));
            // });
            //
            // return result;
            return "Not implemented yet";
        };

        // var target = console.__proto__;
        var target = window;

        ([["cd", cd],
          ["cat", dev.cat],
          ["load", dev.load],
          ["rm", dev.rm]
          // ["_reload", dev._reloadConsole]
        ]).forEach( function iterate(element, index, array) {
            if (target[element[0]] === undefined) {
                target[element[0]] = element[1];
            }
        });

        ([["ls", ls],
          ["pwd", dev.pwd],
          ["scripts", dev.scripts],
          ["csss", dev.csss]
        ]).forEach( function iterate(element, index, array) {
            if (target[element[0]] === undefined) {
                target.__defineGetter__(element[0], element[1]);
            }
        });


        // constants, this should be refactored later
        (["html","head", "body", "script", "link", "div","h1","h2","h3","h4","p","strong","span","a"]).forEach( function iterate(element, index, array) {
            // we overwrite everything, yeah
            target[element] = element;
        });


        // goes to the document
        current = document;
};

// inserting it to the DOM
var script = document.createElement("script"),
    head = document.getElementsByTagName('head')[0];
if (head !== undefined) {
    head.appendChild(script);
    script.appendChild(document.createTextNode('('+ chromesomeInit +')();'));
}

