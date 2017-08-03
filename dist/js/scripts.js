'use strict';

// Common scripts for every page
var html = document.querySelector('html');
var nav = document.querySelector('nav .container');
var darkNavAreas = [];
window.pageYOffset = 0;

window.onload = function () {
  if (document.querySelector('#canvas')) {
    initCanvas();
  }
  navLoad();
  load();
  getDarkNavAreas();
};

function navLoad() {
  var delay = window.location.pathname === '/' ? 0.5 : 0;
  // Nav slide down
  TweenMax.to($('nav'), 1, {
    y: 0,
    delay: delay,
    ease: Power3.easeInOut
  }).timeScale(1);
}

function getDarkNavAreas() {
  darkNavAreas = [];
  document.querySelectorAll('.dark-nav').forEach(function (area) {
    // Build array of top/bottoms of any .dark-nav divs on the page
    var bounds = area.getBoundingClientRect();
    var navBounds = nav.getBoundingClientRect();
    var navOffset = navBounds.top + navBounds.height / 2;
    darkNavAreas.push([bounds.top + window.scrollY - navOffset, bounds.bottom + window.scrollY - navOffset]);
  });
}

// Change nav colour over areas with .dark-nav class
function navRecolour(e) {
  getDarkNavAreas();
  var onWhiteSection = false;
  darkNavAreas.forEach(function (area) {
    if (window.scrollY >= area[0] && window.scrollY <= area[1]) {
      onWhiteSection = true;
    }
  });

  if (onWhiteSection) {
    $('nav').addClass('dark');
  } else {
    $('nav').removeClass('dark');
  }
}

window.addEventListener('scroll', function (e) {
  return navRecolour(e);
});
window.addEventListener('resize', getDarkNavAreas());

// Mobile menu scripts {
var mobileMenuBtn = document.querySelector(".mobile-menu-btn");

if (html.classList.contains("touch") | window.innerWidth <= 1020) {

  $(mobileMenuBtn).click(function () {

    if (mobileMenuBtn.classList.contains("closed")) {

      $(mobileMenuBtn).removeClass('closed');
      $(mobileMenuBtn).addClass('open');

      TweenMax.to(".mobile-menu", 0.4, {
        transform: "translateX(0)",
        ease: Power1.easeOut
      }).timeScale(1);

      TweenMax.to("html", 0.1, {
        overflowY: "hidden",
        ease: Power1.easeOut
      }).timeScale(1);

      TweenMax.to(".logo-mobile", 0.2, {
        fill: "#ffffff",
        delay: 0.2,
        ease: Power1.easeOut
      }).timeScale(1);
    } else {

      $(mobileMenuBtn).removeClass('open');
      $(mobileMenuBtn).addClass('closed');

      TweenMax.to(".mobile-menu", 0.4, {
        xPercent: 140,
        ease: Power1.easeOut
      }).timeScale(1);

      TweenMax.to("html", 0.1, {
        overflowY: "auto",
        ease: Power1.easeOut
      }).timeScale(1);

      TweenMax.to(".logo-mobile", 0.2, {
        fill: "#000000",
        ease: Power1.easeOut
      }).timeScale(1);
    }
  });

  // Correctly size mobile menu wrapper
  var menuWrapper = document.querySelector(".menu-wrapper");
  menuWrapper.style.height = window.innerHeight + 'px';
};