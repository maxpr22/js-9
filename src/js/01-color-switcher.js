const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let interval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let randomHexColor = getRandomHexColor();

refs.buttonStart.addEventListener('click', onStartClick);
refs.buttonStop.addEventListener('click', onStopClick);

function onStartClick(evt) {
  evt.target.setAttribute('disabled', 'true');
  refs.buttonStop.removeAttribute('disabled');
  interval = setInterval(() => {
    let randomHexColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomHexColor;
  }, 1000);
}

function onStopClick(evt) {
  clearInterval(interval);
  evt.target.setAttribute('disabled', 'true');
  refs.buttonStart.removeAttribute('disabled');
}
