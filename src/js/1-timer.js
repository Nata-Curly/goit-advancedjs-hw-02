import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { convertMs, addLeadingZero } from '../utils/helpers';
import { refs } from '../utils/refs';

let userSelectedDate = null;
let intervalId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate && userSelectedDate > new Date()) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = () => {
  const diff = userSelectedDate - new Date();
  if (diff <= 0) {
    refs.input.disabled = false;
    clearInterval(intervalId);
    iziToast.success({
      title: 'OK',
      message: 'Finish!',
    });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(diff);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
};

refs.startBtn.addEventListener('click', handleStartBtnClick);

function handleStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  intervalId = setInterval(timer, 1000);
}
