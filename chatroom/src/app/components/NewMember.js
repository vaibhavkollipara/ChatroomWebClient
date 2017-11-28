import React from 'react';
import UserSuggestions from './UserSuggestions';

import ErrorMessage from './ErrorMessage';
import Transition from './Transition';

const NewMember = ({nameChangeHandler, userSuggestions, addAction ,error}) =>{
    return(
        <div className="NewMember">
            <Transition>
            {
                error &&
                <ErrorMessage message={error}/>
            }
            </Transition>
            <form className="newMemberForm" onSubmit={(e)=>{console.log(userSuggestions);e.preventDefault();}}>
                   <div className="form-group">
                    <input autoFocus type="text" onChange={nameChangeHandler} className="form-control" placeholder="search by name or email" />
                    </div>
            </form>
            <UserSuggestions userSuggestions={userSuggestions} addAction={addAction}/>
        </div>
    );

}

export default NewMember;
