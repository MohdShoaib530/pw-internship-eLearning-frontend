import React from 'react';
import signupRoles from '../constants/signupRoles.js';
import SignupRoleCard from '../components/SignUpRoleCard.jsx';

function SignUpRole() {
  return (
    <div className='mt-24 justify-center items-center flex flex-col px-2 mb-5 lg:mb-40'>
      <h1 className='text-2xl mb-5'>
        Choose your role: for testing purpose only
      </h1>
      <div className='flex sm:grid-cols-3 gap-y-5 gap-5 '>
        {signupRoles.map((card, index) => (
          <SignupRoleCard
            className={
              'cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
            }
            key={index}
            image={card.image}
            data={card.data}
          />
        ))}
      </div>
    </div>
  );
}

export default SignUpRole;
