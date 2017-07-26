"use strict";

// Home scripts

var html = document.querySelector('html');
var transitioning = false;

// Disable animations on touchscreen
if (html.classList.contains("no-touch")) {

  // On load animations
  var load = function load() {

    transitioning = true;
    canvas.classList.remove("hidden");

    // Nav slide down
    TweenMax.to(navDown, 1, {
      y: 0,
      delay: 0.5,
      ease: Power3.easeInOut
    }).timeScale(1);

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

    window.addEventListener('wheel', scrollDetect);
  };

  var scrollDetect = function scrollDetect(e) {
    if (transitioning) {
      return;
    }
    if (e.deltaY < 0 && window.scrollY === 0 && canvas.classList.contains('hidden')) {
      scrollUp();
    }
    if (e.deltaY > 0 && window.scrollY === 0 && !canvas.classList.contains('hidden')) {
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
      }
    }).timeScale(1);

    // BG slide out left
    TweenMax.to(slideOutLeft, 1, {
      x: "-100%",
      ease: Power3.easeInOut
    }).timeScale(1);

    // Nav link colour change
    TweenMax.to(colourChange, 1, {
      color: "#ffffff",
      fill: "#ffffff",
      ease: Power3.easeInOut,
      delay: 0.1
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
      delay: 0.5
    }).timeScale(1);

    // Nav link colour change
    TweenMax.to(colourChange, 1, {
      color: "#000000",
      fill: "#000000",
      ease: Power3.easeInOut,
      delay: 0.6
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
  var slideInLeftDelay = document.querySelectorAll(".slide-in-left-delay");

  window.onload = function () {
    initCanvas();
    load();
  };;

  ;

  $('.scrollDown').click(function () {
    scrollDown();
  });

  $('.scrollDown').click(function () {
    if (this.classList.contains("transitioned")) {
      $('html, body').animate({
        scrollTop: $(".services").offset().top
      }, 600);
    }
  });

  // Service bubbles animation
  var serviceBubbles = document.querySelectorAll(".bubble");

  $(serviceBubbles).hover(function () {
    TweenMax.to($(this).find('.outer-full'), 1, { scale: 1.2, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), 1, { scale: 1.1, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), 1, { scale: 0.9, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), 1, { scale: 0.9, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
    TweenMax.to($(this).find('.outer-full'), 10, { rotation: '360', transformOrigin: "center 49%", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), 3.5, { rotation: '-360', transformOrigin: "center center", ease: Power2.easeInOut, repeat: -1 }).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), 5, { rotation: '-360', transformOrigin: "center center", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), 5, { rotation: '360', transformOrigin: "center center", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
  }, function () {
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
  var card = document.querySelector("#card1");
  var style = card.currentStyle || window.getComputedStyle(card);
  var cardBottomMargin = style.marginBottom;
  var cardScrollOffset = parseInt(cardBottomMargin, 10);

  $(".bubble-1").click(function () {
    $('html, body').animate({
      scrollTop: $("#card1").offset().top - cardScrollOffset
    }, 600);
  });

  $(".bubble-2").click(function () {
    $('html, body').animate({
      scrollTop: $("#card2").offset().top - cardScrollOffset
    }, 600);
  });

  $(".bubble-3").click(function () {
    $('html, body').animate({
      scrollTop: $("#card3").offset().top - cardScrollOffset
    }, 600);
  });

  $(".bubble-4").click(function () {
    $('html, body').animate({
      scrollTop: $("#card4").offset().top - cardScrollOffset
    }, 600);
  });

  // init controller
  var controller = new ScrollMagic.Controller();

  // Scene 1
  var tween1 = TweenMax.staggerFromTo("#text1", 1, { x: -150, opacity: 0 }, { x: 0, opacity: 1 }, 1);

  var scene1 = new ScrollMagic.Scene({ triggerElement: "#card1" }).setTween(tween1).addTo(controller);

  // Scene 2
  var tween2 = TweenMax.staggerFromTo("#text2", 1, { x: 150, opacity: 0 }, { x: 0, opacity: 1 }, 1);

  var scene2 = new ScrollMagic.Scene({ triggerElement: "#card2" }).setTween(tween2).addTo(controller);

  // Scene 3
  var tween2 = TweenMax.staggerFromTo("#text3", 1, { x: -150, opacity: 0 }, { x: 0, opacity: 1 }, 1);

  var scene2 = new ScrollMagic.Scene({ triggerElement: "#card3" }).setTween(tween2).addTo(controller);

  // Scene 4
  var tween2 = TweenMax.staggerFromTo("#text4", 1, { x: 150, opacity: 0 }, { x: 0, opacity: 1 }, 1);

  var scene2 = new ScrollMagic.Scene({ triggerElement: "#card4" }).setTween(tween2).addTo(controller);
}

// Mobile scripts {
if (html.classList.contains("touch")) {

  // Full screen top section
  var titleSection = document.querySelector('.home-title');

  var navHeight = document.querySelector('.nav').offsetHeight;

  titleSection.style.height = "calc(100vh - " + navHeight + "px)";
  titleSection.style.transform = "translateY(-" + navHeight / 2 + "px)";

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
  var slideInDown1 = document.querySelectorAll(".slide-in-down1");
  var slideInDown2 = document.querySelectorAll(".slide-in-down2");

  // Slide in left with fade and delay
  TweenMax.to(slideInLeftDelay, 0.6, {
    x: 0,
    opacity: 1,
    delay: 0.8,
    ease: Power1.easeNone
  }).timeScale(1);

  // Slide top bg in from top
  TweenMax.to(slideInDown2, 0.8, {
    y: 0,
    ease: Power3.easeInOut
  }).timeScale(1);

  // Slide in mobile bg from top
  TweenMax.to(slideInDown1, 0.3, {
    y: 0,
    delay: 0.39,
    ease: Power3.easeInOut
  }).timeScale(1);
};