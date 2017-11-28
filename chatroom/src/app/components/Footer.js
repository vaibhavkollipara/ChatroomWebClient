import React, { Component } from 'react';
import githubIcon from '../assets/images/github.png';


const Footer = () => {
    return(
                <div className="Footer">
                    Vaibhav Kollipara<br/>
                    <a target="_blank" href="https://github.com/vaibhavkollipara/ChatroomWebClient"><img src={`/${githubIcon}`} /></a>
                </div>
          );
};
export default Footer;
