/**
 * merge all mode to combinereducer
 * @author luchao.ding
 */
import {combineReducers} from 'redux';

import test from './test';
import language from './language';
import account from './account';
import assets from './assets'
import header from './header'
import level from './level'
import money from './money'
import trade from './trade'
import session  from './session'


export default combineReducers({
    test,
    language,
    account,
    assets,
    header,
    level,
    money,
    trade,
    session
});
