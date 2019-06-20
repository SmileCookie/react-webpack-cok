import React from 'react';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import Header from './header';
import { logout } from '../../redux/module/session'
import { fetchAssetsDetail, fetchAssetsTotal ,fetchrWalletTotal} from '../../redux/module/assets'
import {chooseSectionType} from '../../redux/module/header'
import {fetchIntegral} from '../../redux/module/level'
import { setLang } from '../../redux/module/language'
import { setMoney } from '../../redux/module/money'

import { modifyFoot } from '../../redux/module/trade'

const mapStateToProps = (state) => {
    return {
        session: state.session,
        assets: state.assets,
        integral:state.level.integral,
        money:state.money,
        footStau:state.trade.footStau,
        header:state.header
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchAssetsDetail: () => {
            dispatch(fetchAssetsDetail());
        },
        fetchAssetsTotal: () => {
            dispatch(fetchAssetsTotal());
        },
        fetchrWalletTotal:()=>{
            dispatch(fetchrWalletTotal());
        },
        logout: () => {
            dispatch(logout());
        },
        fetchIntegral:()=>{
            dispatch(fetchIntegral());
        },
        setMoney:(name)=>{
            dispatch(setMoney(name))
        },
        modifyFoot:(type) => {
            dispatch(modifyFoot(type))
        },
        chooseSectionType:(data) =>{
            dispatch(chooseSectionType(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);