import './reactApp.jsx';
import my from '../js/my';
import '../css/main.scss';

import Vue from 'vue';
import VueApp from './VueApp.vue';

new Vue({
	el: '#vue-root',
	render: (h) => h(VueApp),
});

console.log('webpack!!');
my();
