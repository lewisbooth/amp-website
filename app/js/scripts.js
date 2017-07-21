// Home scripts


// On load animations
window.onload = function() {
    const navDown = document.querySelectorAll("nav");
    const fadeIn = document.querySelectorAll(".fade-in");
    const slideInLeft = document.querySelectorAll(".slide-in-left");
    const slideInBottom = document.querySelectorAll(".slide-in-bottom");
    const slideInLeftDelay = document.querySelectorAll(".slide-in-left-delay");

    // Nav slide down
    TweenMax.to(navDown, 2, {
      y: 0,
      ease:Power3.easeInOut
    }).timeScale(1);

    // Slide in from bottom
    TweenMax.to(slideInBottom, 2, {
      y: 0,
      ease:Power3.easeInOut
    }).timeScale(1);

    // Slide in from left
    TweenMax.to(slideInLeft, 1, {
      x: 0,
      ease:Power3.easeInOut
    }).timeScale(1);

    // Fade in
    TweenMax.to(fadeIn, 1, {
      opacity: 1,
      ease:Power3.easeInOut
    }).timeScale(1);

    // Slide in from left width fade and delay
    TweenMax.to(slideInLeftDelay, 0.8, {
      x: 0,
      opacity: 1,
      delay: 0.8,
      ease:Power1.easeNone
    }).timeScale(1);

};


// Top animations
let transitioning = false;

function scrollDetect(e) {

  var mainBg = document.querySelector(".main-bg");
  var slideOutLeft = document.querySelectorAll(".slide-out-left");
  var slideOutLeftFade = document.querySelectorAll(".slide-out-left-fade");
  var services = document.querySelector(".services");

  // scroll up
  if ((e.deltaY < 0) && window.scrollY < 20 && transitioning == false) {

    transitioning = true;

    // BG slide in left
    TweenMax.to(slideOutLeft, 1, {
      x: "0%",
      ease:Power3.easeInOut,
      onComplete: function() { transitioning = false }
    }).timeScale(1);

    // Title slide in from left width fade and delay
    TweenMax.to(slideOutLeftFade, 0.8, {
      x: "0%",
      opacity: 1,
      delay: 0.8,
      ease:Power1.easeNone
    }).timeScale(1);

    // Services fade out
    TweenMax.to(services, 0.5, {
      opacity: 0,
      ease:Power0.easeIn
    }).timeScale(1);

    // Services text fade in
    TweenMax.to(".service-text", 0.5, {
      opacity: 0,
      ease:Power0.easeNone
    }).timeScale(1);

    // Bubbles fade out
    TweenMax.staggerTo(".bubble", 1, {
      opacity: 0,
      scale: "0",
      ease:Back.easeInOut
    }, 0.2);

    // Expand BG
    TweenMax.to(mainBg, 0.4, {
      maxHeight: "100vh",
      zIndex: "1",
      ease: Linear.easeNone,
    }).timeScale(1);

  }

  // scroll down
  if ((e.deltaY > 0) && transitioning == false) {

    transitioning = true;

    // BG slide out left
    TweenMax.to(slideOutLeft, 1, {
      x: "-100%",
      ease:Power3.easeInOut,
      delay: 0.2,
      onComplete: function() { transitioning = false }
    }).timeScale(1);

    // Title slide in from left width fade and delay
    TweenMax.to(slideOutLeftFade, 0.4, {
      x: "-10%",
      opacity: 0,
      ease:Power0.easeNone
    }).timeScale(1);

    // Services fade in
    TweenMax.to(services, 0.5, {
      opacity: 1,
      delay: 1,
      ease:Power0.easeNone
    }).timeScale(1);

    // Services text fade in
    TweenMax.to(".service-text", 0.8, {
      opacity: 1,
      delay: 1,
      ease:Power0.easeNone
    }).timeScale(1);

    // Bubbles fade in
    TweenMax.staggerTo(".bubble", 1.2, {
      opacity: 1,
      scale: "1",
      delay: 1.2,
      ease:Back.easeInOut
    }, 0.2);

    // Expand BG
    TweenMax.to(mainBg, 0.4, {
      maxHeight: "10000px",
      zIndex: "2",
      delay: 1,
      ease: Power3.easeInOut,
    }).timeScale(1);

  }

};

window.addEventListener('wheel', scrollDetect);


// Service bubbles animation
const serviceBubbles = document.querySelectorAll(".bubble");

$(serviceBubbles).hover(
  function() {
    TweenMax.to($(this).find('.outer-full'), 1, {scale:1.2, transformOrigin: "center center", ease:Back.easeOut}).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), 1, {scale:1.1, transformOrigin: "center center", ease:Back.easeOut}).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), 1, {scale:0.9, transformOrigin: "center center", ease:Back.easeOut}).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), 1, {scale:0.9, transformOrigin: "center center", ease:Back.easeOut}).timeScale(1);
    TweenMax.to($(this).find('.glow'), 1, {opacity: 1, ease:Back.easeOut});
    TweenMax.to($(this).find('.outer-full'), 10, {rotation:'360', transformOrigin: "center 49%", ease:Linear.easeNone,repeat:-1}).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), 3.5, {rotation:'-360', transformOrigin: "center center", ease: Power2.easeInOut, repeat:-1}).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), 5, {rotation:'-360', transformOrigin: "center center", ease:Linear.easeNone,repeat:-1}).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), 5, {rotation:'360', transformOrigin: "center center", ease:Linear.easeNone,repeat:-1}).timeScale(1);
  },
  function() {
    TweenMax.to($(this).find('.outer-full'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut}).timeScale(1); 
    TweenMax.to($(this).find('.outer-top'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut}).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut}).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut}).timeScale(1);
    TweenMax.to($(this).find('.glow'), .3, {opacity: 0.5, ease:Back.easeOut});
    TweenMax.to($(this).find('.outer-full'), .3, {rotation:'0', transformOrigin: "center 49%", ease:Linear.easeIn,repeat:0}).timeScale(1);
    TweenMax.to($(this).find('.outer-top'), .3, {rotation:'0', transformOrigin: "center center", ease:Linear.easeIn,repeat:0}).timeScale(1);
    TweenMax.to($(this).find('.inner-left'), .3, {rotation:'0', transformOrigin: "center center", ease:Linear.easeIn,repeat:0}).timeScale(1);
    TweenMax.to($(this).find('.inner-right'), .3, {rotation:'0', transformOrigin: "center center", ease:Linear.easeIn,repeat:0}).timeScale(1);
  }
);




// Generic scripts

// Textarea expand
var textarea = document.querySelector('textarea');

                
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
};

textarea.addEventListener('keydown', autosize);