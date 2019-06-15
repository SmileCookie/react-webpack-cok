/**
 * axios
 * @author luchao.ding
 */
import axios from 'axios'
import confs from 'conf';

export default axios.create({
    baseURL: confs.api,
    timeout: confs.axiosTimeout,
    
});
