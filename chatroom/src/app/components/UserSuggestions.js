import React from 'react';
import Transition from './Transition';

const UserSuggestions = ({userSuggestions,addAction}) => {

    const renderSuggestions = () => {

        return userSuggestions.map(user => {
                    return (
                            <div key={user.email} className="userSuggestionItem" onClick={() => {addAction(user.username);}}>
                                    <div>{user.fullname}</div>
                                    <div>{user.email}</div>
                            </div>
                    );
                });
    }

    return(
        <div className="UserSuggestions">
            <Transition>
            {renderSuggestions()}
            </Transition>
        </div>
    );

}

export default UserSuggestions;
