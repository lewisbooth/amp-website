"use strict";

var transitioning = false;

// Disable animations on touchscreen
if (html.classList.contains("no-touch") && window.innerWidth > 1020) {

  // On load animations
  var load = function load() {

    var getQueryString = function getQueryString(field, url) {
      var href = url ? url : window.location.href;
      var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
      var string = reg.exec(href);
      return string ? string[1] : null;
    };

    if (getQueryString('ref') === 'services') {
      scrollDown();
    } else {
      transitioning = true;
      canvas.classList.remove("hidden");

      // Slide in from bottom
      TweenMax.to(slideInBottom, 1, {
        y: 0,
        delay: 0.5,
        ease: Power3.easeInOut
      }).timeScale(1);

      // Slide in from left
      TweenMax.to(slideInLeft, 1, {
        x: 0,
        ease: Power3.easeInOut
      }).timeScale(1);

      // Fade in
      TweenMax.to(fadeIn, 1, {
        opacity: 1,
        ease: Power3.easeInOut
      }).timeScale(1);

      // Slide in from left width fade and delay
      TweenMax.to(slideInLeftDelay, 0.6, {
        x: 0,
        opacity: 1,
        delay: 0.8,
        ease: Power1.easeNone
      }).timeScale(1);

      // Canvas fade in
      TweenMax.to("#canvas", 0.8, {
        opacity: 1,
        delay: 1.6,
        onComplete: function onComplete() {
          transitioning = false;
        },
        ease: Power0.easeNone
      }).timeScale(1);
    }

    window.addEventListener('wheel', scrollDetect);
  };

  var scrollDetect = function scrollDetect(e) {

    serviceSliderAnimations(e);
    if (transitioning) {
      return;
    }
    if (e.deltaY < 0 && document.documentElement.scrollTop + document.body.scrollTop === 0 && canvas.classList.contains('hidden')) {
      scrollUp();
    }
    if (e.deltaY > 0 && document.documentElement.scrollTop + document.body.scrollTop === 0 && !canvas.classList.contains('hidden')) {
      scrollDown();
    }
  };

  var scrollDown = function scrollDown() {
    if (transitioning) {
      return;
    }
    transitioning = true;
    setTimeout(function () {
      transitioning = false;
    }, 2800);

    $(".scrollDown").addClass("transitioned");

    // Canvas fade out
    TweenMax.to(canvas, 0.3, {
      opacity: 0,
      ease: Power0.easeNone,
      display: "none",
      onComplete: function onComplete() {
        canvas.classList.add("hidden");
        $('nav').removeClass('dark-split');
      }
    }).timeScale(1);

    // BG slide out left
    TweenMax.to(slideOutLeft, 1, {
      x: "-100%",
      ease: Power3.easeInOut
    }).timeScale(1);

    // Title slide out from left width fade and delay
    TweenMax.to(slideOutLeftFade, 0.4, {
      x: "-10%",
      opacity: 0,
      ease: Power0.easeNone
    }).timeScale(1);

    // Services fade in
    TweenMax.to(services, 0.5, {
      opacity: 1,
      delay: 1,
      ease: Power0.easeNone
    }).timeScale(1);

    // Services text fade in
    TweenMax.to(".service-text", 0.8, {
      opacity: 1,
      delay: 0.6,
      ease: Power0.easeNone
    }).timeScale(1);

    // Bubbles fade in
    TweenMax.staggerTo(".bubble", 1.2, {
      opacity: 1,
      scale: "1",
      delay: 1.2,
      ease: Back.easeInOut
    }, 0.3);

    // Expand BG
    TweenMax.to(mainBg, 0, {
      maxHeight: "10000px",
      zIndex: "2",
      delay: 1,
      ease: Power3.easeInOut
    }).timeScale(1);

    // Remove scroll down arrow
    TweenMax.to(".scroll-wrapper", 0.2, {
      opacity: 0,
      ease: Power0.easeNone,
      display: "none"
    }).timeScale(1);
  };

  var scrollUp = function scrollUp() {
    if (transitioning) {
      return;
    }
    transitioning = true;
    setTimeout(function () {
      transitioning = false;
    }, 1500);

    mainBg.style.maxHeight = "100vh";
    mainBg.style.zIndex = "1";

    $(".scrollDown").removeClass("transitioned");

    // BG slide in left
    TweenMax.to(slideOutLeft, 1, {
      x: "0%",
      ease: Power3.easeInOut,
      delay: 0
    }).timeScale(1);

    // Title slide in from left width fade and delay
    TweenMax.to(slideOutLeftFade, 0.6, {
      x: "0%",
      opacity: 1,
      delay: 1.2,
      ease: Power1.easeOut
    }).timeScale(1);

    // Services fade out
    TweenMax.to(services, 0.5, {
      opacity: 0,
      onComplete: function onComplete() {
        $('nav').addClass('dark-split');
      },
      ease: Power0.easeIn
    }).timeScale(1);

    // Bubbles fade out
    TweenMax.to(".bubble", 0.5, {
      opacity: 0,
      scale: "0",
      ease: Back.easeInOut
    }).timeScale(1);

    // Canvas fade in
    TweenMax.to(canvas, 0.5, {
      opacity: 1,
      delay: 1.5,
      ease: Power0.easeNone,
      display: "block",
      onStart: function onStart() {
        canvas.classList.remove("hidden");
      }
    }).timeScale(1);

    // Add scroll down arrow
    TweenMax.to(".scroll-wrapper", 0.2, {
      opacity: 1,
      ease: Power0.easeNone,
      display: "block"
    }).timeScale(1);
  };

  var getServiceSliderAreas = function getServiceSliderAreas() {

    serviceSliderAreas = [];

    for (var i = 0; i < serviceSliders.length; i++) {
      var bounds = serviceSliders[i].getBoundingClientRect();
      var navBounds = nav.getBoundingClientRect();
      var navOffset = navBounds.top + navBounds.height / 2;
      serviceSliderAreas.push([bounds.top + window.scrollY - navOffset, bounds.bottom + window.scrollY - navOffset]);
    }
  };

  // Service card animations
  var serviceSliderAnimations = function serviceSliderAnimations(e, i) {
    var scrollY = window.scrollY;
    var windowHeight = window.innerHeight;

    for (var i = 0; i < serviceSliders.length; i++) {
      var bounds = serviceSliders[i].getBoundingClientRect();
      var sliderY = bounds.top + scrollY;
      var sliderHeight = serviceSliders[i].offsetHeight;

      if (bounds.top <= windowHeight - sliderHeight / 2 && bounds.top > -Math.abs(sliderHeight / 2)) {
        serviceSliders[i].classList.remove('slide-out');
        serviceSliders[i].querySelector('video').play();
      } else {
        // serviceSliders[i].classList.add('slide-out');
        serviceSliders[i].querySelector('video').pause();
      }
    };
  };

  // Services button function


  // Top animations
  var mainBg = document.querySelector(".main-bg");
  var colourChange = document.querySelectorAll(".change-colour");
  var slideOutLeft = document.querySelectorAll(".slide-out-left");
  var slideOutLeftFade = document.querySelectorAll(".slide-out-left-fade");
  var services = document.querySelector(".services");
  var navDown = document.querySelector("nav");
  var fadeIn = document.querySelectorAll(".fade-in");
  var slideInLeft = document.querySelectorAll(".slide-in-left");
  var slideInBottom = document.querySelectorAll(".slide-in-bottom");
  var slideInLeftDelay = document.querySelectorAll(".slide-in-left-delay");;

  ;

  var serviceSliderAreas = [];
  var serviceSliders = document.querySelectorAll('.service-card');

  ;

  getServiceSliderAreas();
  window.addEventListener('resize', getServiceSliderAreas());$('.scrollDown').click(function () {
    if ($(this).hasClass('transitioned')) {
      $('html, body').animate({
        scrollTop: 1
      }, 500);
    } else {
      scrollDown();
    }
  });

  // Scroll to contact form
  $(".contactScroll").click(function () {
    $('html, body').animate({
      scrollTop: $('.contact').position().top
    }, 500);
  });

  // Service bubbles animation
  var serviceBubbles = document.querySelectorAll(".bubble");

  $(serviceBubbles).hover(function () {
    TweenMax.to($(this), 1, { scale: 1.1, transformOrigin: "center center", force3D: true, ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-full'), 1, { scale: 1.2, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), 1, { scale: 1.1, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), 1, { scale: 0.9, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), 1, { scale: 0.9, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-full'), 10, { rotation: '360', transformOrigin: "center 49%", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), 3.5, { rotation: '-360', transformOrigin: "center center", ease: Power2.easeInOut, repeat: -1 }).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), 5, { rotation: '-360', transformOrigin: "center center", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), 5, { rotation: '360', transformOrigin: "center center", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
  }, function () {
    TweenMax.to($(this), 1, { scale: 1, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-full'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-full'), .3, { rotation: '0', transformOrigin: "center 49%", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), .3, { rotation: '0', transformOrigin: "center center", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), .3, { rotation: '0', transformOrigin: "center center", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), .3, { rotation: '0', transformOrigin: "center center", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
  });

  // Service bubble scrolls to
  // var cardMargin = parseInt($('#card1').css('margin-bottom'));


  $(".bubble-1").click(function () {
    var card1 = document.querySelector('#card1');
    $('html, body').animate({
      scrollTop: $('#card1').position().top + ($('#card1').height() - window.innerHeight) / 2
    }, 800, serviceSliderAnimations);
  });

  $(".bubble-2").click(function () {
    $('html, body').animate({
      scrollTop: $('#card2').position().top + ($('#card2').height() - window.innerHeight) / 2
    }, 1100, serviceSliderAnimations);
  });

  $(".bubble-3").click(function () {
    $('html, body').animate({
      scrollTop: $('#card3').position().top + ($('#card3').height() - window.innerHeight) / 2
    }, 1400, serviceSliderAnimations);
  });

  $(".bubble-4").click(function () {
    $('html, body').animate({
      scrollTop: $('#card4').position().top + ($('#card4').height() - window.innerHeight) / 2
    }, 1700, serviceSliderAnimations);
  });
}

// Mobile scripts {
if (html.classList.contains("touch") | window.innerWidth <= 1020) {

  // Full screen top section
  var titleSection = document.querySelector('.home-title');
  var navHeight = document.querySelector('.nav').offsetHeight;
  titleSection.style.height = window.innerHeight + "px";
  // titleSection.style.transform =  `translateY(-${navHeight}px)`;

  $('.scrollDown').click(function () {

    var card = document.querySelector("#card1");
    var style = card.currentStyle || window.getComputedStyle(card);
    var cardBottomMargin = style.marginBottom;
    var cardScrollOffset = parseInt(cardBottomMargin, 10);

    $('html, body').animate({
      scrollTop: $("#card1").offset().top - cardScrollOffset
    }, 600);
  });

  var slideInLeftDelay = document.querySelectorAll(".slide-in-left-delay");
  var slideInDown = document.querySelectorAll(".mobile-bg");
  var navDown = document.querySelector("nav");

  // Slide in left with fade and delay
  TweenMax.to(slideInLeftDelay, 0.6, {
    x: 0,
    opacity: 1,
    delay: 0.8,
    ease: Power1.easeNone
  }).timeScale(1);

  // Slide in mobile bg from top
  TweenMax.to(slideInDown, 1, {
    top: 0,
    ease: Power3.easeInOut
  }).timeScale(1);

  // $('video').prop("controls", true);
};