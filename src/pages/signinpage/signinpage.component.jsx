import React from 'react';
import SignIn from '../../components/signin/signin.component'
import SignUp from '../../components/signup/signup.component'

import './signinpage.styles.scss';

const SignInPage = () => (
    <div className='signinpage'>
    <SignIn className = 'signin'/>

    <SignUp className='signup'/>
    </div>

);
export default SignInPage;