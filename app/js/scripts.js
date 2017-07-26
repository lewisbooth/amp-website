// Generic scripts

var html = document.querySelector('html');

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

// Disable animations on touchscreen
if (html.classList.contains("no-touch")) {

// Change nav colour on contact form
function navRecolour() {
  if (window.scrollY < 500) { return; }
  var navHeight = document.querySelector('.nav').offsetHeight;
  var colourChange = document.querySelectorAll('.change-colour');
  var colourChangeOnce = document.querySelectorAll('.change-colour2');
  var contactTop = document.querySelector('.contact');
  var contactBottom = (contactTop.offsetTop + contactTop.offsetHeight) - (navHeight / 2);
  var isNotScrolledPast = (window.scrollY + window.innerHeight) > contactBottom;

  if (isNotScrolledPast) {

    TweenMax.to(colourChange, 0.5, {
      color: "#000000",
      fill: "#000000",
      ease: Linear.easeNone
    }).timeScale(1);

    TweenMax.to(colourChangeOnce, 0.5, {
      color: "#000000",
      fill: "#000000",
      ease: Linear.easeNone
    }).timeScale(1);

  } else {

    TweenMax.to(colourChange, 0.5, {
      color: "#ffffff",
      fill: "#ffffff",
      ease: Linear.easeNone
    }).timeScale(1);

    TweenMax.to(colourChangeOnce, 0.5, {
      color: "#ffffff",
      fill: "#ffffff",
      ease: Linear.easeNone
    }).timeScale(1);

      TweenMax.to(colourChange, 0.5, {
        color: "#ffffff",
        fill: "#ffffff",
        ease:Power3.easeInOut,
      }).timeScale(1);

      TweenMax.to(colourChangeOnce, 0.5, {
        color: "#ffffff",
        fill: "#ffffff",
        ease:Power3.easeInOut,
      }).timeScale(1);

    }
  }
window.addEventListener('scroll', navRecolour);
}



// Scroll to contact form
$(".contactScroll").click(function() {
    $('html, body').animate({
        scrollTop: $(".contact").offset().top
    }, 500);
});