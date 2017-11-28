import React from 'react';
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

export default Members;
