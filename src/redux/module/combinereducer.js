/**
 * merge all mode to combinereducer
 * @author luchao.ding
 */
import {combineReducers} from 'redux';

import test from './test';
import language from './language';

export default combineReducers({
    test,
    language,
});
