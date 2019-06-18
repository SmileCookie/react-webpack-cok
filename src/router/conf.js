/**
 * router config
 * @description router config all router setting in this file
 * @author luchao.ding
 */
import React from 'react';

// test component
import Home from "../pages/demoPage";
import Count from "../pages/Count";

// lazy component
import Lazy from './lazy';
const Cd = Lazy(React.lazy(() => import('../pages/cd')));

// 根
const ROOTPATH = '/';
// 平根
const COUNTPATH = '/count'
    const COUNTCD = COUNTPATH + '/cd';


export default [
    {
        path: ROOTPATH,
        components: Home,
        key: 'Home',
        exact: true,
    },{
        path: COUNTPATH,
        components: Count,
        key: 'Count',
        routes: [
            {
                path: COUNTCD,
                components: Cd,
                key: 'cd',
                exact: true,
            }
        ]
    }
];