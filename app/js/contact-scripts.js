// On load animations
function load() {

  // Title height to 50vh
  TweenMax.to($(".top-title"), 1, {
    css: {
        paddingBottom: "0",
    },
    ease:Power3.easeInOut
  }).timeScale(1);

  // Fade in title
  TweenMax.to($("#fade-in"), 0.5, {
    opacity: 1,
    delay: 1,
    ease:Power3.easeInOut
  }).timeScale(1);

  // Fade in contact details
  TweenMax.to($("#fade-in2"), 0.5, {
    opacity: 1,
    delay: 1.5,
    ease:Power3.easeInOut
  }).timeScale(1);

};