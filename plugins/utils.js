const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export default ({}, inject) => {
  inject('deepCopy', deepCopy);
};
