import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from "../../actions/authActions";
import FormInput from '../common/FormInput';
import validate from '../../utils/formValidator'
import Loader from '../common/Loader';

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(values) {
        this.props.login(values)
            .then(() => {
                if(this.props.loggedIn) {
                    this.context.router.history.push('/dashboard');
                }
            });
    }

    onChange(event) {
        let fields = {};
        fields[event.target.name] = event.target.value;
        this.setState(fields);
    }

    render() {
        const { handleSubmit, loading } = this.props;
        let button = '';

        if (loading) {
            button = <div className="center-align"><Loader size="small"/></div>;
        } else {
            button = <button type="submit" className="btn btn-large formBtn waves-effect waves-dark deep-purple">Log In</button>;
        }

        return(
            <div className="row container formsContainer loginContainer wow fadeInRight">
                <div className="col s8 offset-s2 landingForm">
                    <div className="col s12">
                        <h3>Log In</h3>
                    </div>

                    <form onSubmit={handleSubmit(this.onSubmit)} onChange={this.onChange}>
                        <FormInput
                            type="email"
                            label="Email"
                            name="email"
                            required="required"/>

                        <FormInput
                            type="password"
                            label="Password"
                            name="password"
                            required="required"/>

                        <div className="input-field col s12">
                            { button }
                        </div>
                    </form>

                    <div className="col s12">
                        <p className="center-align ">
                            Already have an account? <Link to="/register" className="formLink">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

// Pull in the React Router context so router is available on this.context.router.
LoginForm.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return { loading: state.auth.loading, loggedIn: state.auth.loggedIn }
}

export default reduxForm({
    validate,
    form: 'SignInForm'
})(connect(mapStateToProps, { login })(LoginForm));
