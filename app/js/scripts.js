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


// Change nav colour on contact form
function navRecolour() {
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
      ease:Power3.easeInOut,
    }).timeScale(1);

    TweenMax.to(colourChangeOnce, 0.5, {
      color: "#000000",
      fill: "#000000",
      ease:Power3.easeInOut,
    }).timeScale(1);

  } else {

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
};

window.addEventListener('scroll', navRecolour);

// Scroll to contact form
$(".contactScroll").click(function() {
    $('html, body').animate({
        scrollTop: $(".contact").offset().top
    }, 500);
});