/**
 * otc config
 * @author luchao.ding
 */
// development, production
const ENV = process.env.NODE_ENV;
//域名、url相关


const BaseConfig = {
    api: '/api',
    axiosTimeout: 0,

    //获取资金数据间隔时间
    FETCH_ACCOUNT_INTERVAL: 5000,
    //默认法币
    DEFAULT_MONEY : "USD",
    CONF_MONEY:{
                USD:"$",
                CNY:"¥",
                EUR:"€", 
                GBP:"£", 
                AUD:"A$"
    },

    // 交易相关 url
    TRADEGEADURL :["/bw/trade","/bw/multitrade","/bw/announcements","/bw/news","/bw/newsDetail","/bw/announcementsDetail","/bw/margin"],



    defaultData: '--',
};

const Configs = {
    production: {
        
    },
    development: {

    }
};

const configs = {...BaseConfig, ...Configs[ENV]};

export default configs;

//otc+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//url相关
const LOCATION = window.location;
const PROTOCOL = LOCATION["protocol"];
export const DOMAIN_BASE = document.domain.split('.').slice(-2).join('.');
export const DOMAIN_VIP = PROTOCOL + "//" + LOCATION["host"];
export const DOMAIN_TRANS = PROTOCOL + "//" + "t." + DOMAIN_BASE;
export const DOMAIN_COOKIE = "." + DOMAIN_BASE;

//默认法币
export const DEFAULT_MONEY = "USD";
export const CONF_MONEY={
                            USD:"$",
                            CNY:"¥",
                            EUR:"€", 
                            GBP:"£", 
                            AUD:"A$"
                        }
//cookie 相关
export const COOKIE_MONEY = "currency";
//cookie过期天数
export const COOKIE_EXPIRED_DAYS = 3000;


//otc+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++