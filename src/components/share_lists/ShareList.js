import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as shareActions from '../../actions/shareActions';
import * as friendActions from '../../actions/friendActions';
import Navigation from "../common/Navigation";
import PreLoader from '../common/PreLoader';
import FriendList from './FriendList';

class ShareList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            limit: 20,
            total_lists: null
        };

        this.shareList = this.shareList.bind(this);
    }

    componentWillMount() {
        this.props.friendActions.getFriends(this.state.activePage, this.state.limit);
    }

    shareList(e) {
        const list_id = this.props.match.params.id;

        e.preventDefault();

        let fields = {};
        fields['list_id'] = list_id;
        fields[e.target.friend_id.name] = e.target.friend_id.value;

        this.props.shareActions.shareList(fields);
    }

    render() {
        const { match, friends, loading } = this.props;
        const list_id = match.params.id;

        if (!friends || loading) {
            return(
                <PreLoader />
            );
        }

        let friendList = '';
        if (_.isEmpty(friends)) {
            friendList = <p>You currently have no friends</p>;
        } else {
            friendList = <FriendList list_id={list_id} friends={friends} shareList={this.shareList}/>;
        }

        return(
            <div className="content">
                <Container>
                    <Navigation />

                    <Segment basic>
                        <h1>Select Friends To Share With</h1>

                        { friendList }
                    </Segment>
                </Container>
            </div>
        );
    }
}

ShareList.propTypes = {
    friends: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return { friends: state.friends, loading: state.friends.loading };
}

function mapDispatchToProps(dispatch) {
    return {
        shareActions: bindActionCreators(shareActions, dispatch),
        friendActions: bindActionCreators(friendActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareList);