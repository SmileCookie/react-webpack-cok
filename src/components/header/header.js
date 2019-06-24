/**
 * @file é€šç”¨å¯¼èˆª
 * @author Ray
 * @time 2017-09-29
 */
import React from 'react';
import Logo from '../../assets/image/base/logo-btcwinex.png'
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { FormattedMessage,injectIntl } from 'react-intl';
import './header.less';

//coinList: state.account.detail,
@connect(
    state => ({
      
    }),
    (dispatch) => {
        return {
           
        }
    }
)
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
       this.jmp = this.jmp.bind(this)
       this.ch = window.location.href;
    }

    
    componentDidMount() {
       
    }

    jmp(url = ''){
        
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
        
    }
   

    render() {
        const {formatMessage} = this.props.intl
        const ch = this.ch;
        return (
            <header className="header up-mx-wp">
                <div className="contain clearfix">
                    <div className="header-left">
                        <a className="logo" href="/">
                            <img  src={Logo} />
                        </a>
                        {/* <ul className="nav clearfix">
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

                        </ul> */}
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(injectIntl(Header));