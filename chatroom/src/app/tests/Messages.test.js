import React from 'react'
import {shallow, configure} from 'enzyme';
import { expect} from 'chai';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Messages from '../components/Messages';

describe("Messages Test", ()=>{
    const messages = [
        {message: "Hello",sender: "User One", timestamp: "123"},
        {message: "Hi",sender: "User Two", timestamp: "453"},
    ];
    const userfullname = "User One";
    const error = null;
    const wrapper = shallow(<Messages messages={messages} userfullname={userfullname} error={error}/>);

    it('should have two children', ()=>{
        expect(wrapper.children()).to.have.length(2);
    });

    it('first child should have class myMessageItem',() =>{
        expect(wrapper.childAt(0).hasClass('myMessageItem')).to.equal(true);
    });

    it('second child should have class messageItem',() =>{
        expect(wrapper.childAt(1).hasClass('messageItem')).to.equal(true);
    });
});
