const _ = require('lodash');

export default ({}, inject) => {
  inject('_', _);
};
