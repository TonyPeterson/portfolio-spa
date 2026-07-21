$(document).ready(function () {
    $('.menu-toggle .burger').on('click', function () {
        $('.grid-cta, .grid-scroller, .grid-menu').toggleClass('closed');
        //$(".device-legend, .global-controls, .back, .ribbon hr").slideToggle(100);
        $('.explore-glyphs .glyph').toggleClass('open');
    });
    $('.menu-toggle .arrow').on('click', function () {
        $('.scroller').addClass('out');
        $('.scroller.explore').removeClass('out');
        $('.menu-toggle .burger, .menu-toggle .arrow').toggleClass('hidden');
        $(".poi").css("display", "none");
        $('.explore-glyphs .glyph').addClass('open');
        $('.config-glyphs .glyph').removeClass('open');
        $('.device-legend > div').addClass('out');
        $('.explore-glyphs').removeClass('out');
        $('.grid-cta button').addClass('out');
        $('.grid-cta button.config').removeClass('out');
        $('.global-controls .hotspots').addClass('disabled');
        $('.tour-controls').addClass('hidden');
    });

    $('.clickable').eq(0).on('click', function () {
        $('.v2').toggle();
        $('.grid-menu').addClass('alt');
        $('.glyph.environment').css('display', 'grid');
        $(this).addClass('on');
        $('.sticky-title.mice, .sticky-title.keyboard, .sticky-title.pen, .sticky-title.audio').parent().addClass('v2');
        $('.compare-checkbox').toggle();
    });

    $('.clickable').eq(1).on('click', function () {
        $('.grid-menu, .grid-scroller, .grid-cta').toggleClass('staggered');
        $(this).toggleClass('on');
    });

    $('.clickable').eq(2).on('click', function () {
        $('.modal').css('display', 'grid');
        $(this).toggleClass('on');
    });

    $('.menucard.screensize').hover(function () {
        $('.config-glyphs .glyph.size').addClass('selected');
    }, function () {
        $('.config-glyphs .glyph.size').removeClass('selected');
    });
    $('.menucard.colorselect').hover(function () {
        $('.config-glyphs .glyph.color').addClass('selected');
    }, function () {
        $('.config-glyphs .glyph.color').removeClass('selected');
    });
    $('.menucard.typecover').hover(function () {
        $('.config-glyphs .glyph.keyboard').addClass('selected');
    }, function () {
        $('.config-glyphs .glyph.keyboard').removeClass('selected');
    });
    $('.menucard.mouse').hover(function () {
        $('.config-glyphs .glyph.mice').addClass('selected');
    }, function () {
        $('.config-glyphs .glyph.mice').removeClass('selected');
    });
    $('.menucard.pen').hover(function () {
        $('.config-glyphs .glyph.pen').addClass('selected');
    }, function () {
        $('.config-glyphs .glyph.pen').removeClass('selected');
    });
    $('.menucard.headphones').hover(function () {
        $('.config-glyphs .glyph.audio').addClass('selected');
    }, function () {
        $('.config-glyphs .glyph.audio').removeClass('selected');
    });
    $('.menucard.dock').hover(function () {
        $('.config-glyphs .glyph.dock').addClass('selected');
    }, function () {
        $('.config-glyphs .glyph.dock').removeClass('selected');
    });

    $('.tour-controls .chevron, .tour-controls .tour-title').on("click keypress", function () {
        $('.tour-controls .tour-title, .tour-controls .play-bar').toggleClass('out');
        $('.tour-controls .chevron svg').toggleClass('left');

    });

    $('.modal .tutorial .close').on("click keypress", function () {
        $('.modal').toggle();
    });

});