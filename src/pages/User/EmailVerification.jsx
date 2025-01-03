import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { emailVerification } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';

function EmailVerification() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = {
    email: state?.email
  };

  const sendEmail = async () => {
    try {
      const emailResponse = await dispatch(emailVerification(userData));
      console.log('emailResponse', emailResponse);
      if ((emailResponse.payload.message = 'Email is already verified')) {
        toast.success('Email is already verified');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error sending email verification:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-3 md:w-[60vw] gap-y-3'>
      <div className='card w-96 shadow-xl hover:shadow-2xl border border-black'>
        <div className='card-body'>
          <h2 className='card-title'>Verify Email To Activate Your Account</h2>
          <p>
            Please verify your email {state?.email} by clicking on the
            verification link sent to your registered email.
          </p>
          <p>
            Can&apos;t find the email we have sent to you? Please check your
            spam folder. Remove us from the spam folder to receive further
            communication emails.
          </p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary' onClick={sendEmail}>
              RESEND EMAIL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
