/*$(function() {*/

    /*Beginning of class declarations.*/

    /*Range class Contructor.*/
    function Range(first, second, reverse) {

        /*Declared object to house private properties.*/
        var properties = {};

        /*Placing result of reverse in properties object just for sake
        **of consistency.*/
        properties.reverse = reverse;

        /*Didn't want to specify which argument was lower,
        **and upper limit, so this checks to see which is lower,
        **and assigns that to be lower limit, and assigns the other
        **to be upper.*/
        if(first < second) {
            properties.lo = first;
            properties.hi = second;
        }
        else {
            properties.lo = second;
            properties.hi = first;
        };

        /*rand method. Gets random value between limits.*/
        this.rand = function() {
            var upper, lower, diff, vtr, fullcircle = 360;
            if(properties.reverse) {
                upper = properties.lo;
                lower = properties.hi;
                diff = fullcircle - properties.hi + properties.lo;
                vtr = (Math.floor(Math.random()*diff)+lower);
                if(vtr > fullcircle) vtr -= fullcircle;
                return vtr;
            };
            lower = properties.lo;
            upper = properties.hi - lower;
            return (Math.floor(Math.random()*upper)+lower);
        };

        /*Methods used to retrieve private properties.*/;
        this.getProperties = function() {
            return properties;
        };
        this.getLowerLimit = function() {
            return properties.lo;
        };
        this.getUpperLimit = function() {
            return properties.hi;
        };
        /*End of methods used to retrieve private properties.*/

    /*End Range class constructor.*/
    };

    /*Color class Contructor.*/
    function Color(instance) {

        /*Declared object to house private properties, and some variables just
        **to house some values temporarily.*/
        var properties = {}, upper, lower, reverse;

        /*If instance is object, and not null, assume that it's a re-instantiation,
        **and assign variable passed into function to instance.*/
        if(typeof instance === 'object' && instance!==null){
            properties = instance;
        }

        /*If it isn't, the required properties must be filled in using on page forms,
        **and calculations.*/
        else {
            /*Begin data retrieval from on page form.*/

            upper = parseInt($('.hue .upper input').val());
            lower = parseInt($('.hue .lower input').val());
            reverse = upper < lower;
            properties.hue = Color.prototype.setter(upper, lower, reverse);

            upper = parseInt($('.sat .upper input').val());
            lower = parseInt($('.sat .lower input').val());
            properties.sat = Color.prototype.setter(upper, lower, false);

            upper = parseInt($('.lig .upper input').val());
            lower = parseInt($('.lig .lower input').val());
            properties.lig = Color.prototype.setter(upper, lower, false);

        /*End of data retrieval from on page form.*/
        };

        /*Contruct HSL function from hue, saturation, and lightness
        **variables.*/
        properties.hsl = (function() {
            var hslString = "hsl(" + properties.hue + ", ";
            hslString += properties.sat + "%, ";
            hslString += properties.lig + "%)";
            return hslString;
        })();

        /*Get RGB function from HSL.*/
        properties.rgb = (function() {

            /*All values need to be in between 0 and 1, so hue, saturation, and
            **lightness are divided by max value to bring values within range.*/
            var h = properties.hue/360;
            var s = properties.sat/100;
            var l = properties.lig/100;

            /*Some variables used to store red, blue, and green components.*/
            var r,g,b;

            /*If saturation = 0, color is achromatic with each
            **red, green, and blue component equaling the lumination * 255.
            **Rounded to int for convenience.*/
            if(s===0) {
                r = g = b = Math.round(l*255);
            }
            /*If not, color needs to be calculated.*/
            else {

                /*Couple of temporary variables used to store needed values.*/
                var t,u;

                /*Function namespace used to convert hue to red, green, and blue
                **components.*/
                var hue2Component = function(hue) {

                    /*Variable needed to return value.*/
                    var vtr;

                    /*Hue needs to be in between 0 and 1. If it isn't, add or
                    **subtract 1 as needed.*/
                    if(hue<0) hue += 1;
                    if(hue>1) hue -= 1;

                    /*Depending on value of hue, return specific value.*/
                    if(hue<1/6) vtr = u+(t-u)*6*hue;
                    else if(hue<1/2) vtr = t;
                    else if(hue<2/3) vtr = u+(t-u)*(2/3-hue)*6;
                    else vtr = u;

                    /*Multiply variable by 255, round, and return.*/
                    return Math.round(vtr*255);

                /*End of hue2Component function namespace.*/
                };

                /*Depending on value of lumination, we need different values
                **calculated from saturation, and lumination.*/
                l < .5 ? t = l*(s+1) : t = -1*l*s+s+l;
                u = 2*l-t;

                /*Calculate components.*/
                r = hue2Component(h+1/3);
                g = hue2Component(h);
                b = hue2Component(h-1/3);

            /*End of function to prepare RGB function in string form.*/
            };

            /*Contruct RGB function from red, green, and blue
            **calculated values.*/
            var rgbString = "rgb(" + r + ", " + g;
            rgbString += ", " + b +")";
            return rgbString;

        /*End rgb function construction.*/
        })();

        /*Constructs message to be displayed about color.*/
        properties.message = (function() {
            var info = "This is the color " + properties.hsl;
            info += " or, in RGB, " + properties.rgb + ".";
            return info;
        })();

        /*If index is undefined, color is new, and needs an index number, and
        needs to increment the static variable index.*/
        if(properties.index===undefined) {
            properties.index = Color.prototype.index;
            Color.prototype.index += 1;
        };

        /*Methods that return the value of private variables.
        **Start.*/
        this.getProperties = function() {
            return properties;
        };
        this.getMessage = function() {
            return properties.message;
        };
        this.getHSL = function() {
            return properties.hsl;
        };
        this.getRGB = function() {
            return properties.rgb;
        };
        this.getHue = function() {
            return properties.hue;
        };
        this.getSat = function() {
            return properties.sat;
        };
        this.getLig = function() {
            return properties.lig;
        };
        this.getIndex = function() {
            return properties.index;
        };
        this.getId = function() {
            return properties.id;
        };
        /*End of methods used to return private properties.*/

        /*Method that saves the color to the database.
        **The argument supplied here is a jQuery Object that is used to
        **display information about how the request to save went.*/
        this.saveColor = function(jqObject) {

            /*If this particular instance has an ID, it already exists in the database
            **so, there really is no need to save it again.*/
            if(properties.id) {
                jqObject.text("No need. Color already exists in database.");
                return 0;
            }

            /*Create XMLHttpRequest instance, and declare variable to hold data to send
            **to the server. The data to be sent is just the color, and the upper and lower
            **limits used to create the hue, saturation, and lumination.*/
            var xhr = new XMLHttpRequest(), dts = "h=" + properties.hue;
            dts += "&s=" + properties.sat;
            dts += "&l=" + properties.lig;

            /*Sending through the POST method, and declaring what file on the server to call.*/
            xhr.open("POST", "./PHP/SaveColor.php");

            /*A couple of headers for content type and length. Pretty standard.*/
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-length", dts.length);

            /*Call back function to be used upon ready state change.*/
            xhr.onreadystatechange = function() {

                /*Checks to see if request is ready to be processed.*/
                if(this.readyState===4 && this.status===200) {

                    /*Gets content type sent by server to see how data should be handled.*/
                    var ContentTypeHeader = this.getResponseHeader("Content-type");

                    /*If content type is json, we can safely run this bit.*/
                    if(ContentTypeHeader==="application/json") {

                        /*Change json text into an object.*/
                        var response = JSON.parse(this.responseText);

                        /*Prepare message about how server call went.*/
                        var message = "Request was sent successfully. The server ";
                        message += "says the request " + response.text;

                        /*Display message.*/
                        jqObject.fadeOut(1000, function() {
                            $(this).html(message);
                        }).fadeIn(1000);

                        /*If server call was successful, assign id attached to database row to object,
                        **change functionality button text to delete, show check mark denoting that color
                        **exists in database and re-instantiate class.*/
                        if(response.success) {
                            properties.id = response.id;
                            $('.check').css("visibility", "visible");
                            //$('.func').html("delete");
                            newColor(properties, true);
                        }

                        /*Message to user changes to server message, then fades out before previous text
                        fades in.*/
                        jqObject.fadeOut(3000, function() {
                            $(this).text(properties.message);
                        }).fadeIn(3000);

                    }

                    /*If content type is not declared as json, display verbatim.*/
                    else jqObject.html(this.responseText);
                }
            };

            /*Send request to server.*/
            xhr.send(dts);

        /*End of saveColor method.*/
        };

        /*Method that deletes the color from the database.
        **The argument supplied here is a jQuery Object that is used to
        **display information about how the request to delete went.*/
        this.deleteColor = function(jqObject) {

            /*If this particular object's ID is a falsy value, it is not in the database
            **so, there really is no need to delete it.*/
            if(!(properties.id)) {
                jqObject.text("Color is not in database.");
                return 0;
            };

            /*Create instance of XMLHttpRequest class, and define data to be sent
            **to server which is the ID number needed to delete row from database.*/
            var xhr = new XMLHttpRequest(), dts = "id=" + properties.id;

            /*Data transfer method, and server file to send data to.*/
            xhr.open("POST", "./PHP/DeleteColor.php");

            /*A couple of headers for content type and length. Pretty standard.*/
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-length", dts.length);

            /*Call back function to be used upon ready state change.*/
            xhr.onreadystatechange = function() {

                /*Checks to see if request is ready to be processed.*/
                if(this.readyState===4 && this.status===200) {

                    /*Gets content type sent by server to see how data should be handled.*/
                    var ContentTypeHeader = this.getResponseHeader("Content-type");

                    /*If content type is json, we can safely run this bit.*/
                    if(ContentTypeHeader==="application/json") {

                        /*Change json text into an object.*/
                        var response = JSON.parse(this.responseText);

                        /*Prepare message about how server call went.*/
                        var message = "Request was sent successfully. The server ";
                        message += "says the request " + response.text;

                        /*Display message.*/
                        jqObject.fadeOut(1000, function() {
                            $(this).html(message);
                        }).fadeIn(1000);

                        /*If server call was successful, assign undefined to id property, hide
                        **check mark denoting save status, check functionality button to display
                        **save text, and run newColor, to re-instantiate class.*/
                        if(response.success) {
                            properties.id = undefined;
                            $('.check').css("visibility", "hidden");
                            //$('.func').text("save");
                            newColor(properties, true);
                        };

                        /*Message to user changes to server message, then fades out before previous text
                        fades in.*/
                        jqObject.fadeOut(3000, function() {
                            $(this).text(properties.message);
                        }).fadeIn(3000);

                    }

                    /*If content type is not declared as json, display verbatim.*/
                    else jqObject.html(this.responseText);
                }
            };

            /*Send request to server.*/
            xhr.send(dts);

        /*End of deleteColor method.*/
        };

        /*Function namespace used to display color, and change color of
        **functionality button.*/
        this.displayColor = function(options) {

            /*Define some needed variables.*/
            var settings, hsl = properties.hsl, defaults = {
                jqColorObject : $('.color'),
                jqInfoObject : $('.info'),
                //jqFuncObject : $('.func'),
                jqCheckObject : $('.check'),
            };

            /*If supplied argument is an object, combine with defaults to
            **produce settings. If not, settings equal defaults.*/
            if(typeof options==='object') {
                settings = $.extend({}, defaults, options);
            }
            else settings = defaults;

            /*Displays color.*/
            settings.jqColorObject.css({backgroundColor : hsl,
                boxShadow : 'inset 0px 0px 3px black'
            });

            /*Displays information about color.*/
            settings.jqInfoObject.text(properties.message);

            /*Object that represents CSS information for functionality button
            **when not being hovered over.*/
            var normalCSS = {
                cursor : "pointer",
                backgroundColor : hsl,
                borderColor : hsl,
                color : "white"
            };

            /*Object that represents CSS information for functionality button
            **when being hovered over.*/
            var hoverCSS = {
                cursor : "pointer",
                backgroundColor : "white",
                color : hsl
            };

            /*Replaces CSS for functionality button.*/
            //settings.jqFuncObject.css(normalCSS);

            /*Handles CSS for when the mouse hovers over button.*/
            /*settings.jqFuncObject.hover(function() {
                $(this).css(hoverCSS);
            }, function() {
                $(this).css(normalCSS);
            });*/

            /*If ID is undefined, then color has not been saved.
            **Make sure check mark is hidden, and functionality button
            **says save.*/
            if(properties.id===undefined) {
                settings.jqCheckObject.css("visibility", "hidden");
                //settings.jqFuncObject.text("save");
            }

            /*If not, color has been saved. Display checkmark, and
            **change functionality button to say delete.*/
            else {
                settings.jqCheckObject.css("visibility", "visible");
                //settings.jqFuncObject.text("delete");
            };

        /*End of displayColor method.*/
        };

    /*End of Color Class Constructor.*/
    };

    /*Defining static variables in the Color prototype for use
    **by entire class.*/
    Color.prototype = {
        /*To define next index for objects to use.*/
        index : 0,
        /*A static function used to return a random number in
        **between arguments.*/
        setter : function(upper, lower, reverse) {
            var range = new Range(upper, lower, reverse);
            return range.rand();
        },
    };

    /*End of class declarations.*/

    /*Some needed high level variables.*/
    var colors = [], currentColor, safe = true;

    /*Function namespace used to check values of
    **text inputs to be sure they're in range.*/
    var valCheck = function() {

        /*If the caller is not a jqObject, abort.*/
        if(!($(this))) {
            return;
        }

        /*Get some data stored alongside element, and
        **make them available in an object.*/
        var settings = {
            lower : $(this).data().lower,
            upper : $(this).data().upper
        };

        /*Get value of textbox.*/
        var value = $(this).val();

        /*Some CSS settings for use in error case.*/
        var errorCSS = {
            color : "hsl(349, 91%, 49%)",
            backgroundColor : "hsl(349, 91%, 29%)",
            fontWeight : "bold"
        };

        /*Some CSS settings for use in normal case.*/
        var normalCSS = {
            color: "white",
            backgroundColor: "hsl(113, 74%, 30%)",
            fontWeight : "normal"
        };

        /*Using some regex and comparisons in order to check value.*/
        if(value.match(/\d{1,}/) && !(value<settings.lower || value>settings.upper)) {

                /*Value ok. Apply normal CSS settings, and make sure script knows.*/
                $(this).css(normalCSS);
                safe = true;
        }
        else {

            /*Value not okay. Apply error CSS settings, and make sure script knows.*/
            $(this).css(errorCSS);
            safe = false;
        };

    /*End valCheck function namespace.*/
    };


    /*Function namespace called to manage set up of color object.*/
    var newColor = function(instance, skipArray) {

        /*Create Color object.*/
        var newColor = new Color(instance);

        if(!(skipArray)) {
            newColor.displayColor();
            colors.push(newColor);
            $('.next').css("visibility","hidden");
        }

        /*If color already exists, and only a re-instantiation is occuring,
        **set currentColor variable equal to new object created, and update
        **array position with new object as well.*/
        else colors[newColor.getIndex()] = newColor;

        /*Make currentColor to reference new color object created.*/
        currentColor = newColor;

        /*If more than one Color object exists, make arrow to scroll through colors
        **visible.*/
        if(colors.length>1) $('.prev').css("visibility","visible");

    /*End newColor function namespace.*/
    };

    /*If new button is clicked, run newColor if safe deems it okay to do so.*/
    $('.new').click(function() {
        if(!safe) {
            var message = "<span class='failure'>";
            message += "Double check the options. Someone is out of range.";
            message += "</span>";
            $('.info').html(message);
            if(currentColor) {
                setTimeout(function() {
                    currentColor.displayColor();
                }, 3000);
            }
            return;
        }
        newColor();
    });

    /*If functionality button is clicked, determine action to take depending on status of
    **current color. If currentColor has an ID, delete from database, and if it doesn't,
    **save color to database.
    $('.func').click(function() {
        if(currentColor.getId()===undefined) {
            currentColor.saveColor($('.info'));
        }
        else currentColor.deleteColor($('.info'));
    });*/

    /*This function namespace will setup the css on the buttons with predefined colors or
    **random colors depending on what you pass to it. You must pass a jQuery object exclusively,
    **or as part of an object under the property jqObject.*/
    var buttonSetup = function(options) {

        /*A message to the user in case jQuery object isn't passed correctly.*/
        var message = "Need to pass jQuery object to function buttonSetup. ";
        message += "Either pass jQuery object exclusively or pass object with jqObject property ";
        message += "that is a jQuery object.";

        /*If no object is passed, abort function, and display message.*/
        if(typeof options !== 'object' ) {
            console.log(message);
            return;
        }

        /*Define the function defaults, and a variable that the options and defaults will be
        **merged into.*/
        var settings, defaults = {
            hover : "white",
            hueU : 360,
            hueL : 0,
            satU : 75,
            satL : 25,
            lumU : 75,
            lumL : 25,
        };

        /*Is options an instance of jQuery? If so, use defaults, and use the jqObject.*/
        if(options instanceof $) {
            settings = defaults;
            settings.jqObject = options;
        }

        /*If not, we just have to be sure that options has the necessary property before
        **continuing.*/
        else {
            if(!(options.jqObject instanceof $)) {
                console.log(message);
                return;
            }

            /*Merge defaults, and options into new object called settings.*/
            settings = $.extend({}, defaults, options);
        }

        /*A function namespace used to produce random color.*/
        var colorString = (function() {

            /*If settings.color is a string, just use that instead of coming
            **up with a random color. This can be any color string.*/
            if(typeof settings.color==='string') {
                return settings.color;
            }

            /*Use Range objects to come up with random colors inside the
            **limits given by settings.*/
            var hue = new Range(settings.hueU, settings.hueL);
            var sat = new Range(settings.satU, settings.satL);
            var lum = new Range(settings.lumU, settings.lumL);

            /*Construct hsl string.*/
            var hslString = "hsl(" + hue.rand() + ", ";
            hslString += sat.rand() + "%, ";
            hslString += lum.rand() + "%)";

            /*Return that hsl string.*/
            return hslString;

        /*End colorString function namespace.*/
        })();


        /*Some CSS settings for use when the element is hovered over.*/
        var hoverCSS = {
            backgroundColor : settings.hover,
            color : colorString
        };

        /*Some CSS settings for use when the element is hovered over.*/
        var normalCSS = {
            backgroundColor : colorString,
            borderColor : colorString,
            color : settings.hover
        };

        /*Attach CSS settings to element.*/
        settings.jqObject.css(normalCSS);

        /*Add CSS settings to hover events.*/
        settings.jqObject.hover(function() {
            $(this).css(hoverCSS);
        }, function() {
            $(this).css(normalCSS);
        });

    /*End buttonSetup function namespace.*/
    };

    $('.prev').click(function() {
        currentColor = colors[currentColor.getIndex() - 1];
        currentColor.displayColor();
        $('.next').css("visibility","visible");
        if(currentColor.getIndex()===0) $(this).css("visibility","hidden");
    });

    $('.next').click(function() {
        currentColor = colors[currentColor.getIndex() + 1];
        currentColor.displayColor();
        $('.prev').css("visibility","visible");
        if(currentColor.getIndex()===colors.length-1) $(this).css("visibility","hidden");
    });

    /*//This button no longer exists.
    $('.load').click(function() {
        $('.arrow').css("visibility","hidden");
        colors.length = Color.prototype.index = 0;
        var dts = "getcolors=true";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./PHP/GetColors.php");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", dts.length);
        xhr.onreadystatechange = function() {
            if(this.readyState===4 && this.status===200) {
                var ContentTypeHeader = this.getResponseHeader("Content-type");
                if(ContentTypeHeader==="application/json") {
                    var responseText = JSON.parse(this.responseText);
                    for (var j = 0 ; j < responseText.colors.length ; j += 1) {
                        newColor(responseText.colors[j]);
                    };
                }
                else $('.info').html(this.responseText);
            }
        };
        xhr.send(dts);
    });

    buttonSetup({
        jqObject : $('.load'),
        color : "hsl(195, 84%, 32%)"
    });
    */

    buttonSetup({
        jqObject : $('.new'),
        color : "hsl(195, 84%, 32%)"
    });

    $('.hue input[type="text"]').data({
        upper : 359,
        lower : 0
    });

    $('.sat input[type="text"]').data({
        upper : 100,
        lower : 0
    });

    $('.lum input[type="text"]').data({
        upper : 100,
        lower : 0
    });

    $('.control input[type="text"]').change(valCheck);

    $('.hue .lower input[type="text"]').val("0");
    $('.hue .upper input[type="text"]').val("359");
    $('.sat .lower input[type="text"]').val("25");
    $('.sat .upper input[type="text"]').val("100");
    $('.lig .lower input[type="text"]').val("25");
    $('.lig .upper input[type="text"]').val("75");

/*});*/
