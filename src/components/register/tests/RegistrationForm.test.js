import expect from 'expect';
import {shallow} from 'enzyme';
import React from 'react';
import * as sinon from "sinon";
import {RegistrationForm} from '../RegistrationForm';

describe('Test Cases For RegistrationForm', () => {
    function setup(loading) {
        const props = {
            actions: { register: sinon.spy() },
            loading: loading,
            registered: false,
            handleSubmit: sinon.spy()
        };

        return shallow(<RegistrationForm {...props} />);
    }

    it('renders a wrapper div', () => {
        const wrapper = setup(false);
        expect(wrapper.find('.landingContent').length).toBe(1);
    });
    it('renders form correctly', () => {
        const wrapper = setup(false);
        expect(wrapper.find('Form').length).toBe(1);
    });
    it('loads correctly when logging in', () => {
        const wrapper = setup(true);
        expect(wrapper.find('Button').prop('loading')).toEqual(true);
    });
});
