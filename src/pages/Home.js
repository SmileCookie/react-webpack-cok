import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.less'

import {connect} from 'react-redux';
import {doAdd} from 'reduxs/test';

import confs from 'conf';
import axios from 'nets';

@connect(
    state => ({test: state.test}),
    {
        doAdd
    }
)
export default class Count extends Component {
    constructor(props) {
        super(props);

        console.log(axios, 'yyyy');
        axios.get('sdfsdf', () => {
            console.log(1111);
        })
    }

    render() {
        console.log(this.props);
        console.log(confs, '----->');
        return (
            <div className="home abc ssl">
                <Link to="/count/cd"> count @@@ {this?.a?.b?.c?.d} -- 1 </Link>
              <h1 className="h-txt">This  v----v is Home----> Page!!!--{this.props.test.a}</h1>
              <input type="button" onClick={this.props.doAdd} />
            </div>
        )
    }
}