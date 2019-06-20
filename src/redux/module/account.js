import axios from 'axios'
import { DOMAIN_VIP } from '../../conf'
import { TH } from '../../utils'
const REQUEST_MANAGE_ACCOUNT = 'btcwinex/manage/REQUEST_MANAGE_ACCOUNT';
const RECIEVE_MANAGE_ACCOUNT = 'btcwinex/manage/RECIEVE_MANAGE_ACCOUNT';
const JUMP_MANAGE_CHARGE = 'btcwinex/manage/JUMP_MANAGE_CHARGE';
const JUMP_MANAGE_DOWNLOAD = 'btcwinex/manage/JUMP_MANAGE_DOWNLOAD';
const REQUEST_MANAGE_ACCOUNT_RECORD = 'btcwinex/manage/REQUEST_MANAGE_ACCOUNT_RECORD';
const RECIEVE_MANAGE_ACCOUNT_RECORD = 'btcwinex/manage/RECIEVE_MANAGE_ACCOUNT_RECORD';

export const requestManageInfo = () => ({
    type:REQUEST_MANAGE_ACCOUNT
})

export const receiveManageInfo = (record) => {
    return {
        type:RECIEVE_MANAGE_ACCOUNT,
        payload:{
            record:record
        }
    }
}

export const fetchManageInfo = () => (dispatch) => {
    dispatch(requestManageInfo())
    return axios.get(DOMAIN_VIP+"/manage/getAssetsDetail")
                .then(res => {
                    const rs = eval(res["data"]);
                    try{
                        const rs = eval(res["data"]);
                        
                        for(let i in rs){
                            TH(rs[i].balance);
                            TH(rs[i].canCharge);
                            TH(rs[i].canWithdraw);
                            TH(rs[i].coinFullNameEn);
                            TH(rs[i].freeze);
                            TH(rs[i].fundsType);
                            TH(rs[i].imgUrl);
                            TH(rs[i].propTag);
                            TH(rs[i].total);
                            TH(rs[i].unitTag);
                            TH(rs[i].usdExchange);
                            //throw new Error("参数必须是数字")
                        }
                        dispatch(receiveManageInfo(rs));
                        
                    } catch(e){

                    }
                })
}

export const requestManageRecord = () => ({
    type:REQUEST_MANAGE_ACCOUNT_RECORD
})

export const receiveManageRecord = (record) => {
    return {
        type:RECIEVE_MANAGE_ACCOUNT_RECORD,
        payload:{
            manageList:record.list
        }
    }
}

export const fetchManageRecord = () => dispatch => {
     dispatch(requestManageRecord())
     return axios.get(DOMAIN_VIP+"/manage/account/billDetail").
                  then(res => {
                      
                      dispatch(receiveManageRecord(res.data.datas))
                  })
}

const initialManageInfo = {
    record:{
        isloading: false,
        isloaded:false,
        data:null
    },
    detail:{
        isloading: false,
        isloaded:false,
        data:null
    },
}

const reducer = (state = initialManageInfo,action) => {
    switch (action.type){
        case REQUEST_MANAGE_ACCOUNT:
            return Object.assign({},state,{
                detail:Object.assign({},state.detail,{
                    isloading:true
                })
            })
        case RECIEVE_MANAGE_ACCOUNT:
            return Object.assign({},state,{
                detail:Object.assign({},state.detail,{
                    isloading:false,
                    isloaded:true,
                    data:action.payload.record
                })
            })
        case REQUEST_MANAGE_ACCOUNT_RECORD:
             return Object.assign({},state,{
                record:Object.assign({},state.record,{
                    isloading:true
                })
             })
        case RECIEVE_MANAGE_ACCOUNT_RECORD:
            return Object.assign({},state,{
                record:Object.assign({},state.record,{
                    isloading:false,
                    isloaded:true,
                    data:action.payload.manageList
                })
            })
        default:
            return state;
    }
}


export default reducer;

















