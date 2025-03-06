import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDates]) {
        if (selectedDates <= Date.now()) {
          refs.btnStart.setAttribute('disabled', true);
          return Notiflix.Notify.failure('Please choose a date in the future');
        }
        refs.btnStart.removeAttribute('disabled');
        Notiflix.Notify.success('Date was picked');
      },
    };

flatpickr('#datetime-picker', options);

const refs = {
    inputTime: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer')
  };

refs.btnStart.setAttribute("disabled", true)

const timer = {
    intervalId: null,
    isActive: false,
    start(){
        if(this.isActive){
            return;
        }
        const startTime = new Date(refs.inputTime.value).getTime();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const difTime = startTime - currentTime;
            const time = convertMs(difTime);

            updateTimer(time);
            if(difTime <= 0 ){
                updateTimer();
                clearInterval(this.intervalId)
                this.isActive = false
                Notiflix.Notify.success('Time is out');
            }
        }, 1000)
    },
}

function updateTimer({ days = 0, hours = 0, minutes = 0, seconds = 0 } = {}){
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

refs.btnStart.addEventListener('click', ()=>{
    refs.btnStart.setAttribute("disabled", true);
    timer.start();
})

function addLeadingZero(value){
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  





