/**
 * otc config
 * @author luchao.ding
 */
// development, production
const ENV = process.env.NODE_ENV;

const BaseConfig = {

};

const Configs = {
    production: {
        
    },
    development: {

    }
};

const configs = {...BaseConfig, ...Configs[ENV]};

export default configs;