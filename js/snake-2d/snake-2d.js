(function(window) {
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      w = canvas.width,
      h = canvas.height,
      cw = 10,

      direction,
      score,
      snake,
      snake_size,
      food,
      loop;

  window.addEventListener('keydown', function(e) {


    switch(e.keyCode) {
      // left
      case 37:
        if (direction != 'E') direction = 'W';
        break;
      // up
      case 38:
        if (direction != 'S') direction = 'N';
        break;
      // right
      case 39:
        if (direction != 'W') direction = 'E';
        break;
      // down
      case 40:
        if (direction != 'N') direction = 'S';
        break;

      // r
      case 82:
      default:
        break;
    }
  }, false);

  function init() {
    direction = "E";
    score = 0;
    snake = [];
    snake_size = 5;

    for (var i = snake_size - 1; i >= 0; i--) {
      snake.push({
        x: i,
        y: 0
      })
    }

    draw_food();

    if (typeof loop != "undefined") clearInterval(loop);

    loop = setInterval(draw, 60);
  }

  function draw() {
    ctx.fillStyle = "whitesmoke";
    ctx.fillRect(0, 0, w, h);

    var dx = snake[0].x,
        dy = snake[0].y;

    switch(direction) {
      case "N":
        dy--; break;
      case "S":
        dy++; break;
      case "E":
        dx++; break;
      case "W":
        dx--; break;
      default:
        break;
    }

    if (check_collision(dx, dy, snake)) {
      init();
      return;
    }

    if (dx == food.x && dy == food.y) {
      score++;
      draw_food();

    } else {
      snake.pop();
    }

    var tail = {
      x: dx,
      y: dy
    }
    snake.unshift(tail);
    var st = 0;
    for (var i = 0; i < snake.length; i++) {
      draw_cell(snake[i].x, snake[i].y, "blue");
    }

    draw_cell(food.x, food.y, "red");

    draw_score();
  }

  function draw_score() {
    ctx.fillStyle = "black";
    ctx.fillText(score, w - 20, h - 20);
  }


  function draw_food() {
    food = {
      x: Math.round(Math.random() * (w - cw) / cw),
      y: Math.round(Math.random() * (h - cw) / cw)
    }
  }

  function check_collision(dx, dy, snake) {
    // out of bounds
    if (dx < 0 || dy < 0 || dx >= w / cw || dy >= h / cw) return true;
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x == dx && snake[i].y == dy) return true;
    }
    return false;
  }

  function draw_cell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cw, y * cw, cw, cw);
    ctx.strokeStyle = "whitesmoke";
    ctx.strokeRect(x * cw, y * cw, cw, cw);
  }

  init();






})(window)
