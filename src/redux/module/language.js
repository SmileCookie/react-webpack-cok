import cookie from 'js-cookie';
import confs from 'conf';
import axios from 'nets';

const SET_LANG = 'btcwinex/language/SET_LANG';

const initialLanguageState = {
    locale: 'zh'
}

const reducer = (state = initialLanguageState, action) => {
   switch(action.type) {
       case SET_LANG:
           return Object.assign({}, state, {
               locale: action.payload
           });
       default:
           return state;
   }
}

export default reducer;