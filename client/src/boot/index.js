import React from 'react';
import Injector from 'lib/Injector';
import applyTransform from './applyTransform';
import registerComponents from './registerComponents';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
});
