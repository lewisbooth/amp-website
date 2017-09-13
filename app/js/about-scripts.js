// On load animations
function load() {

  // Title height to 50vh
  TweenMax.to($(".top-title"), 1, {
    css: {
        paddingBottom: "0",
    },
    delay: 0.2,
    ease: Power2.easeOut
  }).timeScale(1);

  // Pop-in spinner
  $(".spinner").removeClass('spinner-pop-out')

  // Fade in title
  TweenMax.to($("#fade-in-1"), 0.5, {
    opacity: 1,
    delay: 1,
    ease: Power3.easeInOut
  }).timeScale(1);

  // Fade in title
  TweenMax.to($("#fade-in-2"), 0.5, {
    opacity: 1,
    delay: 1.8,
    ease: Power3.easeInOut
  }).timeScale(1);

};