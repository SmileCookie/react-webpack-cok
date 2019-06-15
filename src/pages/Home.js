import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.less'

export default class Count extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props);
        return (
            <div className="home abc ssl">
                <Link to="/count/cd"> count </Link>
              <h1 className="h-txt">This is Home----> Page!!!</h1>
            </div>
        )
    }
}