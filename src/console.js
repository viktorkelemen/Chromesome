/*!
 * Chromesome Chrome Developer Toolbar extension
 *
 * Copyright (c) 2010 Viktor Kelemen
 */
var chromesomeInit = function () {


    var STR_CONSTANTS = [ "body", "html", "head", "script", "link", "div",
                          "h1", "h2", "h3", "h4", "p", "strong", "span", "a" ];


    var current = undefined;

    var lastResult = undefined;

    function selectNode(nodeDescription) {

        var selected;

        // it's an object
        if (typeof nodeDescription === "object") {
           selected = nodeDescription;
        } else if (current != null) {

            if (nodeDescription === "..") {
                selected = current.parentNode;
            } else if (nodeDescription === ".") {
                selected = current;
            } else if (nodeDescription === "/") {
                selected = document;
            } else {
                selected = current.querySelector(nodeDescription);
            }

        } else {
            selected = document.querySelector(nodeDescription);
        }

        return selected;
    }

    /**
    * Changes the current node to the first childnode that matches the nodeDescription
    *
    * @param nodeDescription {String}
    * @return HtmlNode
    */
    function cd(nodeDescription) {

        var selected;

        selected = selectNode(nodeDescription);


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
    * @return {String} number of elements
    */
    function ls() {

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

           lastResult = result;

           result.forEach( function (element, index, array) {
               console.log(element);
           })
           return result.length + " node(s)";
        }
    }

    /**
    * Shows the content of a childnode
    *
    * @param nodeDescription {String}
    * @return {String}
    */
    function cat(nodeDescription) {


        var selected;

        selected = selectNode(nodeDescription);

        if (selected != null && selected.innerHTML !== undefined) {
            return selected.innerHTML;
        } else {
            return nodeDescription + " not found.";
        }

    }

    /**
    * Loads a JavaScript file
    *
    * @param fileName {String}
    * @param successHandler {Function}
    */
    function load(fileName, successHandler) {

        return "Not implemented yet";
    }


    /**
    * Return the current node
    *
    * @return {HtmlNode}
    */
    function pwd() {

        return current;
    }

    /**
    * Shows all the script elements found in the DOM
    *
    * @return {Array}
    */
    function scripts() {

        var result = [],
            scripts = document.getElementsByTagName('script');

        for (var i = 0; i < scripts.length; i++)  {
            result.push(scripts[i]);
        }

        result.forEach( function (element, index, array) {
            console.log(element);
        })
        return result.length + " script node(s)";
    }

    /**
    * Removes the first childnode that matches the nodeDescription
    *
    * @param nodeDescription {String}
    */
    function rm(nodeDescription) {

        var selected;

        selected = selectNode(nodeDescription);

        if (selected !== undefined) {
            if (selected.parentNode !== undefined) {
                selected.parentNode.removeChild(selected);
                return nodeDescription + " removed";
            }
        } else {
            return nodeDescription + " not found.";
        }
    }

    /*
    * Shows all the script elements found in the DOM
    */
    function csss() {

        return "Not implemented yet";
    }


    // we put everything into the global namespace
    // this will change
    var target = window;

    ([["cd", cd],
      ["cat", cat],
      ["load", load],
      ["rm", rm]
    ]).forEach( function iterate(element, index, array) {
        if (target[element[0]] === undefined) {
            target[element[0]] = element[1];
        }
    });

    ([["ls", ls],
      ["pwd", pwd],
      ["scripts", scripts],
      ["csss", csss]
    ]).forEach( function iterate(element, index, array) {
        if (target[element[0]] === undefined) {

            Object.defineProperty( target, element[0], {
              get: function(){ return element[1](); }
            });
        }
    });

    // constants, this should be refactored later
    STR_CONSTANTS.forEach( function iterate(element, index, array) {
        // we overwrite everything,
        if (target[element] === undefined) {
            target[element] = element;
        } else {
            console.warn(element + " is already defined.");
        }
    });


    // last result getter
    Object.defineProperty( target, "result", {
      get: function(){ return lastResult; }
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

