import React from 'react';
import PropTypes from 'prop-types';
import Transition from './Transition';

const Members = ({members}) => {

    const renderMembers = () => {
        return members.map(member => {
                    return(
                            <div key={member.email} className="memberItem">
                                <div>{member.name}</div>
                                <div>{member.email}</div>
                            </div>
                    );
            });
    }

    return(
        <div className="Members">
            {renderMembers()}
        </div>
    );

}

Members.propTypes = {
    members : PropTypes.arrayOf(PropTypes.shape(
            "name" : PropTypes.string,
            "email" : PropTypes.string
        ))
};

export default Members;
