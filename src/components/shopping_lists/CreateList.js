import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Header, Form, Grid } from 'semantic-ui-react';
import Notifications from 'react-notify-toast';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createList } from "../../actions/shoppingListActions";
import FormInput from '../common/FormInput';
import validate from '../../utils/formValidator';
import Navigation from '../common/Navigation';

class CreateList extends Component {
    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        this.props.createList(values, () => {
            this.context.router.history.push('/dashboard');
        });
    }

    render() {
        const { handleSubmit, loading } = this.props;

        let button = '';

        if (loading) {
            button = <Button type='submit' disabled loading color='purple' className='fluid'>Create</Button>;
        } else {
            button = <Button type='submit' color='purple' className='fluid'>Create</Button>;
        }

        return(
            <div className="content">
                <Notifications />

                <Container className="ui center aligned">
                    <Navigation header="Shopping Lists"/>

                    <Header as="h1" content='Create Shopping List' />

                    <Grid centered columns='2'>
                        <Grid.Column>
                            <Form onSubmit={handleSubmit(this.onSubmit)}>
                                <FormInput
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    required="required"
                                    icon="tag"/>

                                <FormInput
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    icon="align left"/>

                                { button }
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

// Pull in the React Router context so router is available on this.context.router.
CreateList.contextTypes = {
    router: PropTypes.object
};

CreateList.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return { loading: state.shoppingLists.loading };
}

export default reduxForm({
    validate,
    form: 'CreateListForm'
})(connect(mapStateToProps, { createList })(CreateList));
