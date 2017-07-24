"use strict";

// Home scripts


// On load animations
function load() {
  var navDown = document.querySelectorAll("nav");
  var fadeIn = document.querySelectorAll(".fade-in");
  var slideInLeft = document.querySelectorAll(".slide-in-left");
  var slideInBottom = document.querySelectorAll(".slide-in-bottom");
  var slideInLeftDelay = document.querySelectorAll(".slide-in-left-delay");

  // Nav slide down
  TweenMax.to(navDown, 2, {
    y: 0,
    ease: Power3.easeInOut
  }).timeScale(1);

  // Slide in from bottom
  TweenMax.to(slideInBottom, 2, {
    y: 0,
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
    delay: 1.8,
    ease: Power0.easeNone
  }).timeScale(1);

  setTimeout(function () {
    $("#canvas").removeClass("hidden");
    stepCanvas();
  }, 1800);
};

// Top animations
var transitioning = false;
var mainBg = document.querySelector(".main-bg");
var colourChange = document.querySelectorAll(".change-colour");
var slideOutLeft = document.querySelectorAll(".slide-out-left");
var slideOutLeftFade = document.querySelectorAll(".slide-out-left-fade");
var services = document.querySelector(".services");

function scrollDetect(e) {

  // scroll up
  if (e.deltaY < 0 && window.scrollY < 20 && transitioning == false) {

    transitioning = true;

    // BG slide in left
    TweenMax.to(slideOutLeft, 1, {
      x: "0%",
      ease: Power3.easeInOut,
      onComplete: function onComplete() {
        transitioning = false;
      }
    }).timeScale(1);

    // Nav link colour change
    TweenMax.to(colourChange, 1, {
      color: "#000000",
      fill: "#000000",
      ease: Power3.easeInOut
    }).timeScale(1);

    // Title slide in from left width fade and delay
    TweenMax.to(slideOutLeftFade, 0.8, {
      x: "0%",
      opacity: 1,
      delay: 0.8,
      ease: Power1.easeNone
    }).timeScale(1);

    // Services fade out
    TweenMax.to(services, 0.5, {
      opacity: 0,
      ease: Power0.easeIn
    }).timeScale(1);

    // Services text fade in
    TweenMax.to(".service-text", 0.5, {
      opacity: 0,
      ease: Power0.easeNone
    }).timeScale(1);

    // Bubbles fade out
    TweenMax.staggerTo(".bubble", 1, {
      opacity: 0,
      scale: "0",
      ease: Back.easeInOut
    }, 0.4);

    // Retract BG
    TweenMax.to(mainBg, 0.4, {
      maxHeight: "100vh",
      zIndex: "1",
      ease: Linear.easeNone
    }).timeScale(1);

    // Canvas fade in
    TweenMax.to("#canvas", 0.5, {
      opacity: 1,
      delay: 1.5,
      ease: Power0.easeNone
    }).timeScale(1);

    $("#canvas").removeClass("hidden");
    stepCanvas();
  }

  // scroll down
  if (e.deltaY > 0 && transitioning == false && window.scrollY < window.innerHeight) {

    transitioning = true;

    // Canvas fade out
    TweenMax.to("#canvas", 0.5, {
      opacity: 0,
      ease: Power0.easeNone
    }).timeScale(1);

    setTimeout(function () {
      $("#canvas").addClass("hidden");
    }, 500);

    // BG slide out left
    TweenMax.to(slideOutLeft, 1, {
      x: "-100%",
      ease: Power3.easeInOut,
      onComplete: function onComplete() {
        transitioning = false;
      }
    }).timeScale(1);

    // Nav link colour change
    TweenMax.to(colourChange, 1, {
      color: "#ffffff",
      fill: "#ffffff",
      ease: Power3.easeInOut,
      delay: 0.1
    }).timeScale(1);

    // Title slide in from left width fade and delay
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
      delay: 1.4,
      ease: Power0.easeNone
    }).timeScale(1);

    // Bubbles fade in
    TweenMax.staggerTo(".bubble", 1.2, {
      opacity: 1,
      scale: "1",
      delay: 1.4,
      ease: Back.easeInOut
    }, 0.3);

    // Expand BG
    TweenMax.to(mainBg, 0.4, {
      maxHeight: "10000px",
      zIndex: "2",
      delay: 1,
      ease: Power3.easeInOut
    }).timeScale(1);
  }
};

window.addEventListener('wheel', scrollDetect);

// Services button function
$('.scrollDown').click(function () {
  if (transitioning == false) {

    transitioning = true;

    // Canvas fade out
    TweenMax.to("#canvas", 0.5, {
      opacity: 0,
      ease: Power0.easeNone
    }).timeScale(1);

    setTimeout(function () {
      $("#canvas").addClass("hidden");
    }, 500);

    // BG slide out left
    TweenMax.to(slideOutLeft, 1, {
      x: "-100%",
      ease: Power3.easeInOut,
      onComplete: function onComplete() {
        transitioning = false;
      }
    }).timeScale(1);

    // Nav link colour change
    TweenMax.to(colourChange, 1, {
      color: "#ffffff",
      fill: "#ffffff",
      ease: Power3.easeInOut,
      delay: 0.1
    }).timeScale(1);

    // Title slide in from left width fade and delay
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
      delay: 1.4,
      ease: Power0.easeNone
    }).timeScale(1);

    // Bubbles fade in
    TweenMax.staggerTo(".bubble", 1.2, {
      opacity: 1,
      scale: "1",
      delay: 1.4,
      ease: Back.easeInOut
    }, 0.3);

    // Expand BG
    TweenMax.to(mainBg, 0.4, {
      maxHeight: "10000px",
      zIndex: "2",
      delay: 1,
      ease: Power3.easeInOut
    }).timeScale(1);
  }
});

// Service bubbles animation
var serviceBubbles = document.querySelectorAll(".bubble");

$(serviceBubbles).hover(function () {
  TweenMax.to($(this).find('.outer-full'), 1, { scale: 1.2, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.outer-top'), 1, { scale: 1.1, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.inner-left'), 1, { scale: 0.9, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.inner-right'), 1, { scale: 0.9, transformOrigin: "center center", ease: Back.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.glow'), 1, { opacity: 1, ease: Back.easeOut });
  TweenMax.to($(this).find('.outer-full'), 10, { rotation: '360', transformOrigin: "center 49%", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
  TweenMax.to($(this).find('.outer-top'), 3.5, { rotation: '-360', transformOrigin: "center center", ease: Power2.easeInOut, repeat: -1 }).timeScale(1);
  TweenMax.to($(this).find('.inner-left'), 5, { rotation: '-360', transformOrigin: "center center", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
  TweenMax.to($(this).find('.inner-right'), 5, { rotation: '360', transformOrigin: "center center", ease: Linear.easeNone, repeat: -1 }).timeScale(1);
}, function () {
  TweenMax.to($(this).find('.outer-full'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.outer-top'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.inner-left'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.inner-right'), .5, { scale: 1, transformOrigin: "center center", ease: Linear.easeOut }).timeScale(1);
  TweenMax.to($(this).find('.glow'), .3, { opacity: 0.5, ease: Back.easeOut });
  TweenMax.to($(this).find('.outer-full'), .3, { rotation: '0', transformOrigin: "center 49%", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
  TweenMax.to($(this).find('.outer-top'), .3, { rotation: '0', transformOrigin: "center center", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
  TweenMax.to($(this).find('.inner-left'), .3, { rotation: '0', transformOrigin: "center center", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
  TweenMax.to($(this).find('.inner-right'), .3, { rotation: '0', transformOrigin: "center center", ease: Linear.easeIn, repeat: 0 }).timeScale(1);
});

// Service card aniations
// init controller
// var controller = new ScrollMagic.Controller();

// var scene = new ScrollMagic.Scene({
// 							triggerElement: "#card1"
// 						})
// 						.setTween(".service-card", 0.5, {scale: 1, opacity: 1}) // trigger a TweenMax.to tween
// 						.addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
// 						.addTo(controller);