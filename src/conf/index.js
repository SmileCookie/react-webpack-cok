/**
 * otc config
 * @author luchao.ding
 */
// development, production
const ENV = process.env.NODE_ENV;

const BaseConfig = {
    api: '/api',
    axiosTimeout: 0,
};

const Configs = {
    production: {
        
    },
    development: {

    }
};

const configs = {...BaseConfig, ...Configs[ENV]};

export default configs;