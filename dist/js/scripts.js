"use strict";

//JS Main
$(".bubble").hover(function () {
  TweenLite.to($(".outer-full"), 1.2, { scale: 1.2, transformOrigin: "center center", ease: Back.easeOut });
}, function () {
  TweenLite.to($(".outer-full"), 1, { scale: 1, transformOrigin: "center center", ease: Back.easeOut });
});