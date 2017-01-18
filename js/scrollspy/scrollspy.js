(function() {
  var start = document.querySelectorAll('.article')[0].offsetTop;
  var end = document.querySelectorAll('.footer')[0].offsetTop;
  var progress = document.querySelectorAll('.progress')[0];
  var percent = document.getElementById('percent');

  window.onscroll = function() {
    console.log('scrolling');
    if (pageYOffset < start) {
      progress.style.width = "0%";
      percent.innerHTML = "0%";
      return;
    }

    var perc = Math.round(((pageYOffset - start) / end) * 100);
    if (perc <= 100) {
      progress.style.width = perc + "%";
      percent.innerHTML = perc + "%";
    } else {
      progress.style.width = "100%";
      percent.innerHTML = "100%";
    }

  };
})();
