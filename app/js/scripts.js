//JS Main
const serviceBubbles = document.querySelectorAll(".bubble");

    $(serviceBubbles).hover(
      function() {
        TweenMax.to($(this).find('.outer-full'), 1, {scale:1.2, transformOrigin: "center center", ease:Back.easeOut});
        TweenMax.to($(this).find('.outer-top'), 1, {scale:1.1, transformOrigin: "center center", ease:Back.easeOut});
        TweenMax.to($(this).find('.inner-left'), 1, {scale:0.9, transformOrigin: "center center", ease:Back.easeOut});
        TweenMax.to($(this).find('.inner-right'), 1, {scale:0.9, transformOrigin: "center center", ease:Back.easeOut});
        TweenMax.to($(this).find('.glow'), 1, {opacity: 1, ease:Back.easeOut});
        TweenMax.to($(this).find('.outer-full'), 10, {rotation:'360', transformOrigin: "center 49%", ease:Linear.easeNone,repeat:-1}).timeScale(1);
        TweenMax.to($(this).find('.outer-top'), 3.5, {rotation:'-360', transformOrigin: "center center", ease: Power2.easeInOut, repeat:-1}).timeScale(1);
        TweenMax.to($(this).find('.inner-left'), 5, {rotation:'-360', transformOrigin: "center center", ease:Linear.easeNone,repeat:-1}).timeScale(1);
        TweenMax.to($(this).find('.inner-right'), 5, {rotation:'360', transformOrigin: "center center", ease:Linear.easeNone,repeat:-1}).timeScale(1);
      },
      function() {
        TweenMax.to($(this).find('.outer-full'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut}); 
        TweenMax.to($(this).find('.outer-top'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut});  
        TweenMax.to($(this).find('.inner-left'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut});
        TweenMax.to($(this).find('.inner-right'), .5, {scale:1, transformOrigin: "center center", ease:Linear.easeOut});
        TweenMax.to($(this).find('.glow'), .3, {opacity: 0.5, ease:Back.easeOut});
        TweenMax.to($(this).find('.outer-full'), .3, {rotation:'0', transformOrigin: "center 49%", ease:Linear.easeIn,repeat:0}).timeScale(1);
        TweenMax.to($(this).find('.outer-top'), .3, {rotation:'0', transformOrigin: "center center", ease:Linear.easeIn,repeat:0}).timeScale(1);
        TweenMax.to($(this).find('.inner-left'), .3, {rotation:'0', transformOrigin: "center center", ease:Linear.easeIn,repeat:0}).timeScale(1);
        TweenMax.to($(this).find('.inner-right'), .3, {rotation:'0', transformOrigin: "center center", ease:Linear.easeIn,repeat:0}).timeScale(1);
      }
    );