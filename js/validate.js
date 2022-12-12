import { checkStringLength } from './util.js';
import { MAX_COMMENT_LENGTH, MaxHashtag, ErrorMessage } from './consts.js';


const submitButton = document.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const makeUniqueHashtags = (hashtag) => {
  const uniq = new Set(hashtag);
  return hashtag.length === uniq.size;
};

let errorMessage = '';

const error = () => errorMessage;

const hashtagsHandler = (string) => {
  errorMessage = '';

  const inputText = string.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputHashtags = inputText.split(/\s+/);

  if(inputHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputHashtags.some((item) => item.indexOf('#', 1) >= 1),
      error: ErrorMessage.SPACE_SEPARATION,
    },

    {
      check: inputHashtags.length > MaxHashtag.COUNT,
      error: ErrorMessage.HASHTAG_MAX_COUNT,
    },

    {
      check: inputHashtags.some((item) => item[0] !== '#'),
      error: ErrorMessage.START,
    },

    {
      check: inputHashtags.some((item) => item.length > MaxHashtag.LENGTH),
      error: ErrorMessage.HASHTAG_MAX_LENTH,
    },

    {
      check: inputHashtags.some((item) => !/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item)),
      error: ErrorMessage.UBNORMAL_SYMBOLS,
    },

    {
      check: !makeUniqueHashtags(inputHashtags),
      error: ErrorMessage.REPEAT_ERROR,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const commentHandler = (string) => {
  errorMessage = '';

  const inputText = string.trim();

  if(!inputText) {
    return true;
  }

  const rule = {
    check: !checkStringLength(inputText, MAX_COMMENT_LENGTH),
    error: ErrorMessage.COMMENT_MAX_LENGTH,
  };

  const isInvalid = rule.check;
  if(isInvalid) {
    errorMessage = rule.error;
  }
  return !isInvalid;
};

const onCommentDisableSubmitBtn = () => {
  submitButton.disabled = !pristine.validate();
};

const onHashtagDisableSubmitBtn = () => {
  submitButton.disabled = !pristine.validate();
};

export { onCommentDisableSubmitBtn , commentHandler, hashtagsHandler, pristine, error, onHashtagDisableSubmitBtn };
