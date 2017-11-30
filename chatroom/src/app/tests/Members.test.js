import React from 'react'
import {shallow, configure} from 'enzyme';
import { expect} from 'chai';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Members from '../components/Members';

describe('Members Tests',()=>{
    const members = [
        {name: "user1",email:"user1@chatroom.com"}
    ];

    const wrapper = shallow(<Members members={members} />);

    it('should have class Members',() => {
        expect(wrapper.hasClass('Members')).to.equal(true);
    });

    it('should have 1 child',() => {
        expect(wrapper.children()).to.have.length(1);
    });

    it('should have memberItem class as child', () => {
        expect(wrapper.childAt(0).hasClass('memberItem')).to.equal(true);
    });
});
