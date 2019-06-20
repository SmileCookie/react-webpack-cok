/**
 * @file é€šç”¨å¯¼èˆª
 * @author Ray
 * @time 2017-09-29
 */
import React from 'react';
import { fetchManageInfo, } from '../../redux/module/account'
import { Link,browserHistory,withRouter } from 'react-router';
import { FormattedMessage,injectIntl } from 'react-intl';
import LanguageToggle from '../../../components/languageToggle'
import HeaderTrade from './headerTrade'
import { FETCH_ACCOUNT_INTERVAL, COOKIE_LAN, CONF_MONEY, TRADEGEADURL } from '../../conf/index'
import { cutDigits } from '../../../utils'
import Logo from '../../assets/image/base/logo-btcwinex.png'
import './header.less';
import cookie from 'js-cookie'
import {formatURL} from '../../../utils/index'
import { connect } from 'react-redux'
const BigNumber = require('big.js')
//coinList: state.account.detail,
@connect(
    state => ({
        coinList: state.account.detail,
        record: state.account.record,
        total: state.assets.total,
        lang: state.language.locale,
        moneylogo: state.money.locale,
        moneyrate: state.money.rate.exchangeRateUSD,
        assets: state.assets,
        money: state.money,
        user: state.session.user,
    }),
    (dispatch) => {
        return {
            fetchManageInfo: (cb) => {
                dispatch(fetchManageInfo()).then(cb)
            }
        }
    }
)
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFundDropdown: false,
            showUserDropdown: false,
            chooseSection:props.header.chooseItem,
            isHaveChooseStyle:false,
            op: true,
            riw:""
        };
        this.userLogout = this.userLogout.bind(this)
        this.hideTradeHead = this.hideTradeHead.bind(this)
        this.chooserSection = this.chooserSection.bind(this)
        this.checkUrl = this.checkUrl.bind(this);
        this.sw = this.sw.bind(this);
        this.hd = this.hd.bind(this);
        this.jmp = this.jmp.bind(this);
        this.ch = window.location.href;
    }

    jmp(url = ''){
        url && (window.location.href = url);
    }
    
    sw(){
        this.setState({
            op: true
        })
    }
    hd(){
        this.setState({
            op: false
        })
    }
    componentDidMount() {
        console.log(this.props)
        this.props.fetchManageInfo();
        this.interval = setInterval(() => {
            this.props.fetchManageInfo();
        }, FETCH_ACCOUNT_INTERVAL)
        this.hideTradeHead(this.props.location.pathname)
        this.checkUrl();
        if(cookie.get("zlan")=="jp"){
            this.setState({
                riw: "nav clearfix haiw",
            })
        }else{
            this.setState({
                riw: "nav clearfix",
            })
        }
        if(this.props.session.user){
            this.props.fetchAssetsTotal();
            this.props.fetchrWalletTotal();
            this.props.fetchAssetsDetail()
            this.interval = setInterval(()=>{
                this.props.fetchAssetsTotal();
                this.props.fetchrWalletTotal();
                this.props.fetchAssetsDetail()
            },FETCH_ACCOUNT_INTERVAL)
        }
    }

    formatFundsDetail(result) {
        BigNumber.RM = 0;
        let record = [];
        let i = 0;
        try{
            let exchangeRate = this.props.moneyrate[this.props.moneylogo.name]
            if (result && exchangeRate) {
                for (let key in result) {
                    var funds = result[key];
                    record[i] = {};
                    //console.log(result)
                    var total = funds.total;
                    // console.log(total)
                    var usdExchange = funds.usdExchange != "--" && exchangeRate ? funds.usdExchange * total * exchangeRate : 0;
                    // console.log(usdExchange)
                    record[i].valuation = new BigNumber(usdExchange ? usdExchange : 0).toFixed(2);
                    i++;
                }
            }
        } catch(e){
            
        }
        return record;
    }

    componentWillReceiveProps(nextProps) {  
        if(nextProps.user){
            setTimeout(() => {
                var sum = new BigNumber(0);
                this.formatFundsDetail(nextProps.coinList.data).forEach((item)=>{
                    var n = item.valuation != 0 ? item.valuation : 0;
                    if(!isNaN(n)){
                        sum = sum.plus(n)
                    }
                })
                this.tosum = sum + '';
                this.forceUpdate();
            });
        }
        if(nextProps.session.user && !this.props.session.user){
            this.props.fetchAssetsTotal();
            this.props.fetchrWalletTotal();
        }
        if(nextProps.location.pathname != this.props.location.pathname){
            this.hideTradeHead(nextProps.location.pathname)
            this.checkUrl();
        }

        if(this.ch !== window.location.href){
            this.ch = window.location.href;
            //this.forceUpdate(); //刷新头部导航状态
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
        
    }

    componentDidUpdate(){
        let cp = this.props.location.pathname.split("/");
        const dm = !this.dm ? (this.dm = document.getElementById("rs")) : this.dm;

        cp = cp[cp.length - 1] ? cp[cp.length - 1] : cp[cp.length - 2];

        if(['trade', 'multitrade', 'announcements', 'news'].includes(cp)){
            dm.setAttribute("class", "trade-wps")
        } else {
            dm.removeAttribute("class");
        }
    }
    
    toggleFundDropdown() {
        this.setState({
            showFundDropdown: this.state.showFundDropdown?false:true
        });
    }
    toggleUserDropdown() {
        this.setState({
            showUserDropdown: this.state.showUserDropdown?false:true
        });
    }
    userLogout(e){
        clearInterval(this.interval);
        // this.props.logout(); 
    }
    setMoney(name){
        // console.log(name)
        this.props.setMoney(name);
    }

    hideTradeHead(path){
        const hideState = TRADEGEADURL.filter((item,index,arr) => {
            return path.includes(item)
        })
        const footStauBool = hideState.length>0?true:false;
        this.props.modifyFoot(footStauBool)
    }
    chooserSection(type){
         this.props.chooseSectionType(type)
         this.setState({
            chooseSection:type
         })
    }
    checkUrl(){
        let pathName = browserHistory.getCurrentLocation().pathname;
        if(pathName.indexOf('trade') > 0 || pathName.indexOf('multitrade') > 0 || pathName.indexOf('announcements') > 0 || pathName.indexOf('news') > 0){
             this.setState({
                isHaveChooseStyle:true
            })
        }else{
            this.setState({
                isHaveChooseStyle:false
            })
        }
    }

    render() {
        const { user } = this.props.session;
        const {chooseItem} = this.props.header;
        const {formatMessage} = this.props.intl;
        const ch = this.ch;
        // console.log(this.props)
        const { assets, money, footStau } = this.props;
        let moneyNow = money.locale.name.toUpperCase();
        let {chooseSection,isHaveChooseStyle,op} = this.state;
        let total = 0;
        try{
            if(money.rate.exchangeRateUSD){
                //total = assets.total?cutDigits(assets.total.total_legal_tender*money.rate.exchangeRateUSD[moneyNow],2):''
                total = this.tosum;
            }
        } catch(e){}
        return (
            <header className="header up-mx-wp">
                <div className="contain clearfix">
                    <div className="header-left">
                        <a className="logo" href="/">
                            <img  src={Logo} />
                        </a>
                        <ul className={ this.state.riw}>
                            <li>
                                <Link title={formatMessage({id:"币币交易中心"})} onClick={()=>{this.jmp("/bw/trade/")}} className={ch.includes("/trade") ? 'bbyh-choosed' : ''} >
                                    <FormattedMessage id="币币交易中心"/>
                                </Link>
                            </li>

                            <li className="hot">
                                <Link title={formatMessage({id:"多屏看板"})} onClick={()=>{this.jmp("/bw/multitrade")}}  className={ch.includes("/multitrade") ? 'bbyh-choosed' : ''} >
                                    <FormattedMessage id="多屏看板"/>
                                </Link>
                            </li>

                            <li>
                                <Link title={formatMessage({id:"公告"})} onClick={()=>{this.jmp("/bw/announcements")}}  className={ch.includes("/announcements") ? 'bbyh-choosed' : ''}>
                                    <FormattedMessage id="公告"/>
                                </Link>
                            </li>

                            <li>
                                <Link title={formatMessage({id:"新闻"})} onClick={()=>{this.jmp("/bw/news")}}  className={ch.includes("/news") ? 'bbyh-choosed' : ''}>
                                    <FormattedMessage id="新闻"/>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="header-right">
                        <LanguageToggle theme="mobile" />
                        {
                            user&&cookie.get("zloginStatus")!=4? (
                                <div className="nav-manage">
                                    <div>
                                        <div id="bbyh-moneyIn" style={{color:'#FFFFFF'}}><Link to="/bw/manage/account/currency"><i className="iconfont icon-zichanguanli-moren"></i><FormattedMessage id="资产管理"/></Link></div>
                                    </div>
                                    <div>
                                        <div onClick={() =>{browserHistory.push(formatURL('/entrust/current'))}}><i className="iconfont icon-weituoguanli-moren"></i><FormattedMessage id="委托管理"/></div>
                                    </div>
                                    <div className="nav-manage-banlence">
                                        <div>
                                            <Link to="/bw/mg/">
                                                <i className="iconfont icon-zhanghu-moren"></i>
                                                <i className="per-icon-jiao"></i>
                                            </Link>
                                        </div>
                                        <ul>
                                            <li className="big-menu">
                                                <Link to="/bw/mg/">
                                                    <p><FormattedMessage id="用户中心"/></p>
                                                    <i>{user.username}</i>
                                                    <em className="vip-grade"></em>                                
                                                </Link>
                                            </li>
                                            <li className="big-menu">
                                                <Link to="/bw/manage/account/">
                                                    <p className="gray"><FormattedMessage id="资产折算"/>:</p> 
                                                    <i className="light">
                                                        {total}
                                                        &nbsp;{moneyNow}
                                                    </i>
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="/login/logout/" target="_self"><FormattedMessage id="退出登录" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ):(    
                                <div className="nav-account">
                                    <Link className="btn-login"  to="/bw/login"><FormattedMessage id="登录" /></Link>
                                    <Link className="btn-signup" to="/bw/signup"><FormattedMessage id="注册" /></Link>
                                </div>
                            )
                        }
                        <div className="nav-manage">
                            <div className="nav-manage-money">
                                <div onMouseEnter={this.sw}>
                                    <i className="coinkey-now"><FormattedMessage id={moneyNow} /></i>
                                    <i className="per-icon-jiao"></i>
                                </div>
                                {op&&<ul>
                                        {Object.keys(CONF_MONEY).map((key, index) => {
                                            return <li key={key} onClick={()=>{this.setMoney(key)}}>
                                                        <a onClick={this.hd} href="javascript:void(0);" style={{position:'relative'}}>
                                                            <i style={{position:"absolute"}} className="coinkey">{CONF_MONEY[key]}</i>
                                                            <span style={{display:'block',paddingLeft:"40px"}}>
                                                                <FormattedMessage id={key.toUpperCase()} />   
                                                            </span>    
                                                        </a>
                                                    </li>
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                        </div>
                        <LanguageToggle theme="white" />
                    </div>
                    
                    {footStau&&<HeaderTrade />}
                </div>
            </header>
        )
    }
}

export default withRouter(injectIntl(Header));