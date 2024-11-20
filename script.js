const $canvas = document.querySelector('canvas');
const $ctx = $canvas.getContext('2d');

const resizeCanvas = () => {
  $canvas.width = document.documentElement.scrollWidth;
  $canvas.height = document.documentElement.scrollHeight;
};

const generateColor = () => {
  return `rgba(${[...Array(3)]
    .map(() => Math.floor(Math.random() * 200 + 55))
    .join(',')},0.8)`;
};

const drawCanvas = (x, y, size, color, angle) => {
  $ctx.save();
  $ctx.translate(x, y);
  $ctx.rotate(angle);
  $ctx.beginPath();
  $ctx.moveTo(0, 0);
  $ctx.fillStyle = color;
  $ctx.quadraticCurveTo(size / 2, -size, size, 0);
  $ctx.fill();
  $ctx.restore();
};

function addTextToTheCanvas() {
  $ctx.beginPath();
  $ctx.fillStyle = '#000';
  $ctx.font = '3.5vw sans-serif';
  $ctx.textAlign = 'center';
  $ctx.textBaseline = 'middle';
  $ctx.letterSpacing = '1px';
  $ctx.fillText(
    'Click to create a Propeller',
    $canvas.width / 2,
    $canvas.height / 2
  );
}

$canvas.addEventListener('click', e => {
  const x = e.clientX;
  const y = e.clientY;

  const numberOfPetals = Math.floor(Math.random() * 6 + 5);
  const size = Math.floor(Math.random() * 40 + 20);
  const color = generateColor();

  for (let i = 0; i < numberOfPetals; i++) {
    const angle = i * ((Math.PI * 2) / numberOfPetals);
    drawCanvas(x, y, size, color, angle);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  drawCanvas();
  addTextToTheCanvas();

  window.addEventListener('resize', e => {
    resizeCanvas();
    drawCanvas();
    addTextToTheCanvas();
  });
});
