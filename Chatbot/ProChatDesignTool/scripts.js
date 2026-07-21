$(document).ready(function () {

    setTimeout(function () {
        $(".prochat").removeClass("hidden");
    }, 300);

    $("#mydiv").mousedown(function () {
        $(this).addClass("lift");
    });

    $("#mydiv").mouseup(function () {
        $(this).removeClass("lift");
    });

    var popup = $(".prochat");

    $("input:radio").click(function () {
        $(popup)
            .removeClass("blur-one blur-two colorful aligned")
            .addClass(this.value);
    });

    // $("#darkblur").click(function () {
    // 	$(popup).toggleClass("blur-one");
    // 	$("#blackborder").toggleClass("hidden");
    // 	$(this).toggleClass("on");
    // });

    // $("#blackborder").click(function () {
    // 	$(popup).toggleClass("border");
    // 	$(this).toggleClass("on");
    // });

    // $("#lightblur").click(function () {
    // 	$(popup).toggleClass("blur-two");
    // 	$("#whiteborder").toggleClass("hidden");
    // 	$(this).toggleClass("on");
    // });

    // $("#whiteborder").click(function () {
    // 	$(popup).toggleClass("border");
    // 	$(this).toggleClass("on");
    // });

    $("#bottom").click(function () {
        $(popup).toggleClass("bottom");
        $(this).toggleClass("on");
    });

    $("#right").click(function () {
        $(popup).removeClass("rounded").toggleClass("right");
        $(this).toggleClass("on");
        $("#rounded").removeClass("on");
    });

    $("#noimage").click(function () {
        $(popup).toggleClass("noimage");
        $(this).toggleClass("on");
    });

    // $("#colorful").click(function () {
    // 	$(popup).toggleClass("colorful");
    // 	$(this).toggleClass("on");
    // });

    // $("#aligned").click(function () {
    // 	$(popup).toggleClass("aligned");
    // 	$(this).toggleClass("on");
    // });

    $("#ribbon").click(function () {
        $(popup).removeClass("smaller").toggleClass("ribbon");
        $("#smaller").removeClass("on");
        $(this).toggleClass("on");
    });

    $("#smaller").click(function () {
        $(popup).removeClass("ribbon").toggleClass("smaller");
        $("#rounded").toggleClass("hidden");
        $("#ribbon").removeClass("on");
        $(this).toggleClass("on");
    });

    $("#persistant").click(function () {
        $(".questions").toggleClass("hidden");
        $(this).toggleClass("on");
    });

    $("#rounded").click(function () {
        $(popup).toggleClass("rounded").toggleClass("right");
        $(this).toggleClass("on");
        $("#right").toggleClass("on");
    });

    $('#altimage').click(function () {
        $(popup).removeClass('noimage').find('img').toggle();
        $(this).toggleClass("on");
        $("#noimage").removeClass('on');
    });

    $("#animatefromright").click(function () {
        $(popup).removeClass("animatefromright");
        setTimeout(function () {
            $(popup).addClass("animatefromright");
        }, 10);
    });

    $("#animate").click(function () {
        $("svg path, svg circle").addClass("path");
        setTimeout(function () {
            $("svg path, svg circle").removeClass("path");
        }, 3000);
    });

    // Make the DIV element draggable:
    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});