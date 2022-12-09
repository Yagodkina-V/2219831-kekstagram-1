import { isEscKey } from './util.js';

const showAlert = (isError) => {
  const templateName = isError ? 'error' : 'success';
  const template = document.querySelector(`#${templateName}`).content.querySelector('section');
  template.classList.add('js-message');
  const popup = template.cloneNode(true);
  popup.style.zIndex = 100;
  document.body.append(popup);
  const button = popup.querySelector('button');
  document.addEventListener('keydown', onWindowEscKeydown);
  button.addEventListener('click', () => {
    popup.remove();
  });
};

function onWindowEscKeydown(evt) {
  const message = document.querySelector('.js-message');
  if (isEscKey(evt)) {
    document.removeEventListener('keydown', onWindowEscKeydown);
    message.remove();
  }
}

export {showAlert};
