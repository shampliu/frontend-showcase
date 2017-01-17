(function() {
  var start = document.querySelectorAll('.article')[0].offsetTop;
  var end = document.querySelectorAll('.footer')[0].offsetTop;
  var progress =document.querySelectorAll('.progress')[0];

  window.onscroll = function() {
    console.log('scrolling');
    if (pageYOffset < start) {
      progress.style.width = "0%";
      return;
    }

    var perc = Math.round(((pageYOffset - start) / end) * 100);
    if (perc <= 100) {
      progress.style.width = perc + "%";
    } else {
      progress.style.width = "100%";
    }

  };
})();
