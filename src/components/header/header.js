/**
 * @file é€šç”¨å¯¼èˆª
 * @author Ray
 * @time 2017-09-29
 */
import React from 'react';
import Logo from '../../assets/image/base/logo-btcwinex.png'
import { Link,withRouter } from 'react-router';
import { connect } from 'react-redux'
import { FormattedMessage,injectIntl } from 'react-intl';

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
    }

    
    componentDidMount() {
       
    }

    jmp(url = ''){
        url && (window.location.href = url);
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
        return (
            <header className="header up-mx-wp">
                asdddad
            </header>
        )
    }
}

export default withRouter(injectIntl(Header));