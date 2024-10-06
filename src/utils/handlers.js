import { refs } from './refs';

function handleStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
}

export { handleStartBtnClick };
