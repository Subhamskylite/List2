import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        console.log("<><><><><><><>", this.props);

        this.props.logout();
    }

    render() {
        const { loggedIn } = this.props;

        const userLinks = (
            <div className="menu">
                <Link to="" className="item">Profile</Link>
                <div className="divider"/>
                <a href="#" onClick={this.logout} className="item">Sign Out</a>
            </div>
        );

        const guestLinks = (
            <div className="menu">
                <Link to="/register" className="item">Sign Up</Link>
                <div className="divider"/>
                <Link to="/login" className="item">Log In</Link>
            </div>
        );

        return (
            <div>
                <div className="ui inverted huge borderless fixed fluid menu">
                    <a className="header item">Shopping List App</a>
                    <div className="right menu">
                        <div className="item">
                            <Link to="/dashboard" className="item">Dashboard</Link>
                        </div>
                        <div className="ui simple dropdown item">
                            <img className="ui avatar image" src={process.env.PUBLIC_URL + '/img/avatar.png'} alt="avatar"/>
                            <i className="dropdown icon"/>
                            { loggedIn ? userLinks : guestLinks }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Navigation.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return { loggedIn: state.auth.loggedIn }
}

export default connect(mapStateToProps, { logout })(Navigation);
