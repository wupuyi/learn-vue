// var base = require('./base');
// es6
import {open} from './base';
import '../css/base.css';

if(open) {
    document.body.innerHTML = `<a href="signup.html">注册</a>`;
}