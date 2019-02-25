import Vue from 'vue';
import Vuex from 'vuex';

import current from './modules/current';
import lastten from './modules/lastten';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        current,
        lastten
    }
});


