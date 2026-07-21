$(document).ready(function () {
  function a11yClick(event) {
    if (event.type === "click") {
      return true;
    } else if (event.type === "keypress") {
      var code = event.charCode || event.keyCode;
      if (code === 32 || code === 13) {
        return true;
      }
    } else {
      return false;
    }
  }

  $("#addtocart").click(function () {
    $(".threedsurface").toggle();
    $(".surfaceimage").toggle();
  });

  $(".tray-trigger").on("click keypress", function () {
    $(".pocmenu, .threed-scene").toggleClass("hide");
    $(".chevron").toggleClass("right");
  });

  $(".dark-trigger, .global-controls .glyph.light").on("click keypress", function () {
    $(".pocmenu, .threedsurface, .tour-trigger, body").addClass("dark");
  });

  $(".light-trigger").on("click keypress", function () {
    $(".pocmenu, .threedsurface, .tour-trigger, body").removeClass("dark");
    $(".dark-trigger").toggle();
    $(this).toggle();
  });

  $(".selection-box, .color-selector .color, .device").on(
    "click keypress",
    function () {
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
    }
  );

  $(".color").on("click keypress", function () {
    $(".color-name").css("display", "none");
    $(this).find('.color-name').css('display', 'block');
  });

  $(".color.black").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/Surface_Pro_7_Blk_FPO.glb");
    $(".poi").css("display", "block");
  });

  $(".color.platinum, .surface-pro-seven, .selection-container.pro7").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/Surface_Pro_7_Platinum2.glb");
    $(".color").removeClass("selected");
    $(".color.platinum").addClass("selected");
    $(".pocmenu-title h1").text('Surface Pro 7');
    $('.grid-cta .config').removeClass('mouse');
    $('.grid-cta .config').addClass('device');
  });

  $(".surface-laptop-three, .selection-container.lap3").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/SurfaceLaptop3_13Inches_Platinum3.glb");
    $(".poi").css("display", "none");
    $("h1.title").text("Surface Laptop 3");
    $('.grid-cta .config').removeClass('mouse');
    $('.grid-cta .config').addClass('device');
  });

  $(".surface-laptop-go").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/Silas_IceBlue_05.glb");
    $(".poi").css("display", "none");
    $("h1.title").text("Surface Laptop Go");
  });

  $(".selection-container.mouse1").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/ArcMouse_Black_02.glb");
    $('.grid-cta .config').removeClass('device');
    $('.grid-cta .config').addClass('mouse');
    $("h1.title").text("Surface Arc Mouse");
  });

  $(".env.home-office").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/Mod_2_A_31_Export.gltf");
    $(".threedsurface").attr('skybox-image', 'images/canada_montreal_pierre_kitchen.jpg');
  });

  $(".selection-box.lighthouse").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/SurfacePro7AndMobileMouse1.glb");
    $(".poi").css("display", "block");
    $(".poi.hidden").removeClass('hidden');
  });

  $(".annotation .wallpaper-img.three").on("click keypress", function () {
    $(".threedsurface").attr("src", "models/SurfacePro7AndMobileMouse2.glb");
    $(".poi").css("display", "block");
  });

  $(".surface-pro-seven").on("click keypress", function () {
    $("h1.title").text("Surface Pro 7");
  });

  $(".poi-trigger").on("click keypress", function () {
    $(".poi").toggle();
    $(this).toggleClass("selected");
  });

  $(".tour-trigger").on("click keypress", function () {
    $(".playbar").toggleClass("out");
    $(this).toggleClass("in");
  });

  $(".chatbot-button").on("click keypress", function () {
    $(".chatbot").toggle();
  });

  $(".hoverleftzone").on("click keypress", function () {
    $(".hovermenu-left").toggleClass("shown");
  });

  $(".pocmenu-title .title").on("click keypress", function () {
    $(".pocmenu").toggleClass("open");
    $(".device-selection").slideToggle(200);
  });

  $(".pocmenu-cards").scroll(function () {
    $(".pocmenu").removeClass("open");
    $(".device-selection").slideUp(500);
  });

  $('.profiles .custom').on("click keypress", function () {
    $('.selection-box').removeClass('selected');
    $(this).addClass('selected');
    $('.screensize').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.colorselect').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.config').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.typecover').find('.selection-box:nth-of-type(5)').addClass('selected');
    $('.mouse').find('.selection-box:nth-of-type(8)').addClass('selected');
    $('.pen').find('.selection-box:nth-of-type(5)').addClass('selected');
    $('.headphones').find('.selection-box:nth-of-type(3)').addClass('selected');
    $('.dock').find('.selection-box:nth-of-type(2)').addClass('selected');
    $('.office').find('.selection-box:nth-of-type(4)').addClass('selected');
    $('.complete').find('.selection-box:nth-of-type(4)').addClass('selected');
  });

  $('.profiles .student').on("click keypress", function () {
    $('.selection-box').removeClass('selected');
    $(this).addClass('selected');
    $('.screensize').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.colorselect').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.config').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.typecover').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.mouse').find('.selection-box:nth-of-type(8)').addClass('selected');
    $('.pen').find('.selection-box:nth-of-type(5)').addClass('selected');
    $('.headphones').find('.selection-box:nth-of-type(3)').addClass('selected');
    $('.dock').find('.selection-box:nth-of-type(2)').addClass('selected');
    $('.office').find('.selection-box:nth-of-type(4)').addClass('selected');
    $('.complete').find('.selection-box:nth-of-type(4)').addClass('selected');
  });

  $('.profiles .business').on("click keypress", function () {
    $('.selection-box').removeClass('selected');
    $(this).addClass('selected');
    $('.screensize').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.colorselect').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.config').find('.selection-box:nth-of-type(3)').addClass('selected');
    $('.typecover').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.mouse').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.pen').find('.selection-box:nth-of-type(5)').addClass('selected');
    $('.headphones').find('.selection-box:nth-of-type(3)').addClass('selected');
    $('.dock').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.office').find('.selection-box:nth-of-type(4)').addClass('selected');
    $('.complete').find('.selection-box:nth-of-type(4)').addClass('selected');
  });

  $('.profiles .gamer').on("click keypress", function () {
    $('.selection-box').removeClass('selected');
    $(this).addClass('selected');
    $('.screensize').find('.selection-box:nth-of-type(2)').addClass('selected');
    $('.colorselect').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.config').find('.selection-box:nth-of-type(6)').addClass('selected');
    $('.typecover').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.mouse').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.pen').find('.selection-box:nth-of-type(5)').addClass('selected');
    $('.headphones').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.dock').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.office').find('.selection-box:nth-of-type(4)').addClass('selected');
    $('.complete').find('.selection-box:nth-of-type(4)').addClass('selected');
  });

  $('.profiles .creative').on("click keypress", function () {
    $('.selection-box').removeClass('selected');
    $(this).addClass('selected');
    $('.screensize').find('.selection-box:nth-of-type(2)').addClass('selected');
    $('.colorselect').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.config').find('.selection-box:nth-of-type(7)').addClass('selected');
    $('.typecover').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.mouse').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.pen').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.headphones').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.dock').find('.selection-box:nth-of-type(1)').addClass('selected');
    $('.office').find('.selection-box:nth-of-type(4)').addClass('selected');
    $('.complete').find('.selection-box:nth-of-type(4)').addClass('selected');
  });


  $('.selection-box').on("click keypress", function () {
    var sum = 0;
    var items = $('.selected .price').length;
    var name = $(this).closest('.menucard').find('h2').text().replace('Add ', '');

    $('.selected .price').each(function () {
      sum += parseFloat($(this).text().replace(/[^\d.,]/g, ''));
    });
    console.log(sum);
    console.log(items);
    console.log(name);
    $('.pocmenu-buy .total').text(sum.toLocaleString());
    $('.pocmenu-buy .items').text(items.toLocaleString());
    if (name.slice(0, 11) == $('.receipt ul').find('li').last().text().slice(0, 11)) {
      $('.receipt ul').find('li').last().css('text-decoration', 'line-through');
      $('.receipt ul').append('<li>' + name + ": " + $(this).children('.price').text());
    } else {
      $('.receipt ul').append('<li>' + name + ": " + $(this).children('.price').text());
    }

  });

  $('.modal-window .close').on("click keypress", function () {
    $('.modal').fadeOut();
  });

  $('.modal-window .selection-box').on("click keypress", function () {
    $('.modal-footer .next').css('opacity', '1');
  });

  var next = $('.modal-footer .next');

  next.on("click keypress", function () {
    var page = $('.page.current');
    var nextpage = $('.page.current').next('.page');
    var book = $('.page-container');

    book.animate({
      scrollLeft: book.scrollLeft() + nextpage.offset().left
    }, 300);
    nextpage.addClass('current');
    page.eq(0).removeClass('current');
    $('.modal-footer .next').css('opacity', '0.3');
  });

  $("[slot='hotspot-one']").on("click keypress", function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $('.annotation.one').addClass('out');
      setTimeout(function () {
        $('.annotation.one').removeClass('out selected');
      }, 300);
    } else {
      $('.annotation.selected').not('.annotation.one').addClass('out');
      $('.annotation.one').addClass('selected');
      $('.poi').not(this).removeClass('selected');
      $(this).toggleClass('selected');
      setTimeout(function () {
        $('.annotation.out').removeClass('out selected');
      }, 300);
    }
  });

  $("[slot='hotspot-two']").on("click keypress", function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $('.annotation.two').addClass('out');
      setTimeout(function () {
        $('.annotation.two').removeClass('out selected');
      }, 300);
    } else {
      $('.annotation.selected').not('.annotation.two').addClass('out');
      $('.annotation.two').addClass('selected');
      $('.poi').not(this).removeClass('selected');
      $(this).toggleClass('selected');
      setTimeout(function () {
        $('.annotation.out').removeClass('out selected');
      }, 300);
    }
  });

  $("[slot='hotspot-three']").on("click keypress", function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $('.annotation.three').addClass('out');
      setTimeout(function () {
        $('.annotation.three').removeClass('out selected');
      }, 300);
    } else {
      $('.annotation.selected').not('.annotation.three').addClass('out');
      $('.annotation.three').addClass('selected');
      $('.poi').not(this).removeClass('selected');
      $(this).toggleClass('selected');
      setTimeout(function () {
        $('.annotation.out').removeClass('out selected');
      }, 300);
    }
  });

  $("[slot='hotspot-four']").on("click keypress", function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $('.annotation.four').addClass('out');
      setTimeout(function () {
        $('.annotation.four').removeClass('out selected');
      }, 300);
    } else {
      $('.annotation.selected').not('.annotation.four').addClass('out');
      $('.annotation.four').addClass('selected');
      $('.poi').not(this).removeClass('selected');
      $(this).toggleClass('selected');
      setTimeout(function () {
        $('.annotation.out').removeClass('out selected');
      }, 300);
    }
  });

  $("[slot='hotspot-five']").on("click keypress", function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $('.annotation.five').addClass('out');
      setTimeout(function () {
        $('.annotation.five').removeClass('out selected');
      }, 300);
    } else {
      $('.annotation.selected').not('.annotation.five').addClass('out');
      $('.annotation.five').addClass('selected');
      $('.poi').not(this).removeClass('selected');
      $(this).toggleClass('selected');
      setTimeout(function () {
        $('.annotation.out').removeClass('out selected');
      }, 300);
    }
  });

  $("[slot='hotspot-six']").on("click keypress", function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $('.annotation.six').addClass('out');
      setTimeout(function () {
        $('.annotation.six').removeClass('out selected');
      }, 300);
    } else {
      $('.annotation.selected').not('.annotation.six').addClass('out');
      $('.annotation.six').addClass('selected');
      $('.poi').not(this).removeClass('selected');
      $(this).toggleClass('selected');
      setTimeout(function () {
        $('.annotation.out').removeClass('out selected');
      }, 300);
    }
  });

  let close = $('.annotation .close');

  close.on("click keypress", function () {
    $('.annotation.selected').addClass('out');
    $('.poi').removeClass('selected');
    setTimeout(function () {
      $('.annotation.out').removeClass('selected out');
    }, 300);
  });


  $("button.slide.right").on("click keypress", function () {
    $('.threedsurface.two').attr('camera-target', parseInt($('.threedsurface.two').attr('camera-target').split(' ')[0].replace(/\D/g, '')) + 30 + 'm 3m auto');
    if ($('.threedsurface.two').attr('camera-target') == '13m 3m auto') {
      $("button.slide.left").css('display', 'none');
    } else {
      $("button.slide.left").css('display', 'block');
    }
    if ($('.threedsurface.two').attr('camera-target') == '103m 3m auto') {
      $("button.slide.right").css('display', 'none');
    } else {
      $("button.slide.right").css('display', 'block');
    }
  });

  $("button.slide.left").on("click keypress", function () {
    $('.threedsurface.two').attr('camera-target', parseInt($('.threedsurface.two').attr('camera-target').split(' ')[0].replace(/\D/g, '')) - 30 + 'm 3m auto');
    if ($('.threedsurface.two').attr('camera-target') == '13m 3m auto') {
      $("button.slide.left").css('display', 'none');
    } else {
      $("button.slide.left").css('display', 'block');
    }
    if ($('.threedsurface.two').attr('camera-target') == '103m 3m auto') {
      $("button.slide.right").css('display', 'none');
    } else {
      $("button.slide.right").css('display', 'block');
    }
  });

  $('.compare-checkbox').on('click keypress', function () {
    $(this).not('.disabled').toggleClass('selected');
    if ($('.compare-checkbox.selected').length >= 1) {
      $('.compare-container').removeClass('none');
      $('.compare-container .num').text(' 1 of 2');
    } else {
      $('.compare-container').addClass('none');
      $('.compare-container .num').text('');
    }
    if ($('.compare-checkbox.selected').length >= 2) {
      $('.compare-container button').css({
        'opacity': '1',
        'cursor': 'pointer'
      }).addClass('ready').attr('onclick', "window.location.href='Compare/index.html'");
      $('.compare-checkbox:not(.selected)').addClass('disabled');
      $('.compare-container .num').text(' 2 of 2');
    } else {
      $('.compare-container button').css({
        'opacity': '1',
        'cursor': 'default'
      }).removeClass('ready').attr('onclick', '');
      $('.compare-checkbox').removeClass('disabled');
    }
  });

  $('.glyph:not(.hamburger-toggle .glyph)').on("click keypress", function () {
    $('.ribbon .glyph').removeClass('selected');
    $(this).addClass('selected');
  });

  $('.device-legend .explore-glyphs .glyph').each(function (i) {
    $(this).on("click keypress", function () {
      var titles = $('.scroller.explore .sticky-title:not(.duo):not(.accessories)');

      //THIS JS ISN'T WORKING CORRECT... RETHINK
      //IT'S GETTING CURRENT POSITION NOT INITIAL 
      $('.scroller.explore').animate({
        scrollTop: titles.eq(i).position().top
      });
    });
  });

  $('.scroller').scroll(function () {
    $('.sticky-title').each(function () {
      if ($(this).offset().top == 56) {
        $(this).addClass('stuck');
      } else {
        $(this).removeClass('stuck');
      }
    });

    if ($('.sticky-title.tablet').hasClass('stuck')) {
      $('.grid-ribbon .glyph').removeClass('selected');
      $('.glyph.tablet').addClass('selected');
    } else if ($('.sticky-title.laptop').hasClass('stuck')) {
      $('.grid-ribbon .glyph').removeClass('selected');
      $('.glyph.laptop').addClass('selected');
    } else if ($('.sticky-title.duo').hasClass('stuck')) {
      $('.grid-ribbon .glyph').removeClass('selected');
      $('.glyph.duo').addClass('selected');
    } else if ($('.sticky-title.mice').hasClass('stuck')) {
      $('.grid-ribbon .glyph').removeClass('selected');
      $('.glyph.mice').addClass('selected');
    } else if ($('.sticky-title.keyboard').hasClass('stuck')) {
      $('.grid-ribbon .glyph').removeClass('selected');
      $('.glyph.keyboard').addClass('selected');
    } else if ($('.sticky-title.pen').hasClass('stuck')) {
      $('.grid-ribbon .glyph').removeClass('selected');
      $('.glyph.pen').addClass('selected');
    } else if ($('.sticky-title.audio').hasClass('stuck')) {
      $('.grid-ribbon .glyph').removeClass('selected');
      $('.glyph.audio').addClass('selected');
    }
  });

  $(".environment").on("click keypress", function () {
    $('.scroll-menu').removeClass('open');
    $('.environment-menu').addClass('open');
    $('.device-legend').addClass('inactive');
  });

  $('.device-legend').on("click keypress", function () {
    $('.environment-menu').removeClass('open');
    $('.scroll-menu').addClass('open');
    $(this).removeClass('inactive');
  });

  $('.selection-container').on("click keypress", function () {
    $('.selection-container').removeClass('selected');
    $(this).addClass('selected');
  });

  $('.grid-cta .config').on("click keypress", function () {
    $('.scroller').addClass('out');
    $('.menu-toggle .burger').addClass('hidden');
    $('.menu-toggle .arrow').removeClass('hidden');
    $('.explore-glyphs .glyph').removeClass('open');
    $('.config-glyphs .glyph').addClass('open');
    $('.device-legend > div').addClass('out');
    $('.grid-cta button').addClass('out');
    $('.grid-cta button.cart').removeClass('out');
    $('.global-controls .hotspots').removeClass('disabled');
    $('.tour-controls').removeClass('hidden');
    if ($(this).hasClass('mouse')) {
      console.log('mouse');
      $('.scroller.three.configuration').removeClass('out');
      $('.config-glyphs.mouse').removeClass('out');
    } else {
      console.log('device');
      $('.scroller.two.configuration').removeClass('out');
      $(".poi").css("display", "block");
      $('.config-glyphs.device').removeClass('out');
    }

  });

  $(".pocmenu-title .glyph").on("click keypress", function () {
    $('.pocmenu').removeClass('out');
    $('grid-menu, .grid-scroller, .grid-cta').removeClass('closed');
    $('.grid-ribbon .glyph').addClass('open');
    $(".poi").css("display", "none");
  });

  $('.global-controls .glyph.environment').on("click keypress", function () {
    $('.scroller').addClass('out');
    $('.scroller.environment').removeClass('out');
  });

});