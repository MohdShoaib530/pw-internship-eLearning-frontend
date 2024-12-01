import React from 'react';

import { Signup as SignUpComponent } from '../components/index.js';
import { useLocation } from 'react-router-dom';

function Signup() {
  const state = useLocation();
  return (
    <div className='w-full'>
      <SignUpComponent userRole={state} />
    </div>
  );
}

export default Signup;
