let $canvas = document.querySelector('#c1');
let ctx = $canvas.getContext('2d');

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

$canvas.width = windowWidth;
$canvas.height = windowHeight;

let action = false;
let coords = [];
let lineWidth = '10';
let color = '#000';
let brush = 'cursor: url(../img/brush.svg) 0 25, auto';
let eraser = 'cursor: url(../img/eraser.svg) 0 25, auto';

ctx.lineWidth = lineWidth;

$canvas.style = brush;

if (!!localStorage.getItem('coords')) {
  coords = JSON.parse(localStorage.getItem('coords'));
  ctx.beginPath();
  // replay();
} else {
  coords = [];
}


$canvas.addEventListener('mousedown', function (e) {
  action = true;

});

$canvas.addEventListener('mouseup', function (e) {
  action = false;
  coords.push('mouseup');
  ctx.beginPath();

  // localStorage.setItem('coords', JSON.stringify(coords));
});

document.querySelector('.palette').addEventListener('click', function (e) {
  $canvas.style = brush;
  color = e.target.getAttribute('data-color');

  ctx.beginPath();

  document.querySelectorAll('.color.active').forEach(function (item) {
    item.classList.remove('active');
  });

  e.target.classList.add('active');
});

document.querySelector('.brush-box').addEventListener('click', function (e) {
  let target = e.target.closest('.weight');
  lineWidth = target.getAttribute('data-weight')

  $canvas.style = brush;

  ctx.beginPath();

  document.querySelectorAll('.weight.active').forEach(function (item) {
    item.classList.remove('active');
  });

  document.querySelectorAll('.eraser-width.active').forEach(function (item) {
    item.classList.remove('active');
  });

  target.classList.add('active');

});

document.querySelector('.eraser-box').addEventListener('click', function (e) {
  let target = e.target.closest('.eraser-width');
  lineWidth = target.getAttribute('data-eraser');

  document.querySelectorAll('.eraser-width.active').forEach(function (item) {
    item.classList.remove('active');
  });

  document.querySelectorAll('.color.active').forEach(function (item) {
    item.classList.remove('active');
  });

  document.querySelectorAll('.weight.active').forEach(function (item) {
    item.classList.remove('active');
  });

  target.classList.add('active');
  color = '#ffffff';
  $canvas.style = eraser;

});



$canvas.addEventListener('mousemove', function (e) {
  if (action) {

    let x = e.pageX;
    let y = e.pageY;

    coords.push({
      x: x,
      y: y,
      color: color,
      lineWidth: lineWidth
    });


    ctx.fillStyle = color;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);

  }

});


function reset() {
  ctx.clearRect(0, 0, windowWidth, windowHeight);
  localStorage.clear();
}

function replay() {
  ctx.clearRect(0, 0, windowWidth, windowHeight);
  let timer = setInterval(function () {

    let currentCoords = coords.shift();

    if (!coords.length) {
      clearInterval(timer);
      ctx.beginPath();

      return;
    }

    ctx.fillStyle = currentCoords.color;

    ctx.strokeStyle = currentCoords.color;
    ctx.lineWidth = currentCoords.lineWidth;

    if (currentCoords == 'mouseup') ctx.closePath();

    ctx.lineTo(currentCoords.x, currentCoords.y);
    ctx.stroke();



    ctx.beginPath();
    ctx.arc(currentCoords.x, currentCoords.y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(currentCoords.x, currentCoords.y);

  }, 5);
}

// document.querySelector('.fas.fa-video').addEventListener('click', replay);
document.querySelector('.trash-btn').addEventListener('click', reset);

