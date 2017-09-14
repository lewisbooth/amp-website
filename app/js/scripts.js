// Common scripts for every page
var html = document.querySelector('html');
var nav = document.querySelector('nav .container');
var darkNavAreas = [];
var pageYOffset = 0;

window.onload = function() {
    if (document.querySelector('#canvas')) { 
      initCanvas(); 
    }
    navLoad();
    load();
    getDarkNavAreas();
    initPageTransitions();
};

function initPageTransitions() {
  var transition = document.querySelector('.page-transition')
  var links = document.querySelectorAll('.page-transition-link')
  for (i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
      e.preventDefault();
      var linkLocation = links[i].getAttribute('href')
      transition.classList.add('page-transition-active');
      setTimeout(function(e) {
        window.location.replace(linkLocation)
      }, 500)
    })
  }
}

function navLoad() {
  var delay = window.location.pathname === '/' ? 0.5 : 0;
  // Nav slide down
  TweenMax.to($('nav'), 1, {
      y: 0,
      delay: delay,
      ease:Power3.easeInOut
  }).timeScale(1);
};

function getDarkNavAreas() {
  darkNavAreas = [];
  var darkNav = document.querySelectorAll('.dark-nav');
  
  for (var i = 0; i < darkNav.length; i++) {
    // Build array of top/bottoms of any .dark-nav divs on the page
    var bounds = darkNav[i].getBoundingClientRect();
    var navBounds = nav.getBoundingClientRect();
    var navOffset = navBounds.top + navBounds.height / 2;
    darkNavAreas.push([bounds.top + (document.documentElement.scrollTop + document.body.scrollTop) - navOffset, bounds.bottom + (document.documentElement.scrollTop + document.body.scrollTop) - navOffset]);
  };
};

// Change nav colour over areas with .dark-nav class
function navRecolour(e) {  
  getDarkNavAreas();
  var onWhiteSection = false;
  for (var i = 0; i < darkNavAreas.length; i++) {
    if ((document.documentElement.scrollTop + document.body.scrollTop) >= darkNavAreas[i][0] && (document.documentElement.scrollTop + document.body.scrollTop) <= darkNavAreas[i][1] ) {
      onWhiteSection = true;
    }
  };

  if (onWhiteSection) { 
    $('nav').addClass('dark') 
  } else { 
    $('nav').removeClass('dark') 
  }
}

window.addEventListener('scroll', function (e) { navRecolour(e) });
window.addEventListener('resize', getDarkNavAreas());


// Mobile menu scripts
var mobileMenuBtn = document.querySelector(".mobile-menu-btn");

if (html.classList.contains("touch") | window.innerWidth <= 1020) {

   $(mobileMenuBtn).click(function(){

    if (mobileMenuBtn.classList.contains("closed")) {

      $(mobileMenuBtn).removeClass('closed');
      $(mobileMenuBtn).addClass('open');

      TweenMax.to(".mobile-menu", 0.4, {
        transform: "translateX(0)",
        ease:Power1.easeOut
      }).timeScale(1);

      TweenMax.to("html", 0.1, {
        overflowY: "hidden",
        ease:Power1.easeOut
      }).timeScale(1);
      
      TweenMax.to(".logo-mobile", 0.2, {
        fill: "#ffffff",
        ease:Power1.easeOut
      }).timeScale(1);

    } else {

      $(mobileMenuBtn).removeClass('open');
      $(mobileMenuBtn).addClass('closed');

      TweenMax.to(".mobile-menu", 0.4, {
        xPercent: 140,
        ease:Power1.easeOut
      }).timeScale(1);

      TweenMax.to("html", 0.1, {
        overflowY: "auto",
        ease:Power1.easeOut
      }).timeScale(1);
      
      TweenMax.to(".logo-mobile", 0.2, {
        fill: "#000000",
        ease:Power1.easeOut
      }).timeScale(1);

    }

   });

   // Correctly size mobile menu wrapper
   var menuWrapper = document.querySelector(".menu-wrapper");
   menuWrapper.style.height = `${window.innerHeight}px`;
   
};