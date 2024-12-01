import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TbWorld } from 'react-icons/tb';
import { CiCreditCard2 } from 'react-icons/ci';
import { refreshAccessToken } from '../../redux/slices/authSlice';
import { deleteCourseById } from '../../redux/slices/courseSlice';
import { Rating, RatingStar } from 'flowbite-react';

function CourseDetails() {
  const { state } = useLocation();
  const { role, data, isLoggedIn } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteCourse() {
    const res = await dispatch(deleteCourseById(state._id));
    console.log('res', res);
    if (res.payload.message === 'jwt expired') {
      await dispatch(refreshAccessToken());
    }
    if (res.payload.success === true) {
      navigate('/courses');
    }
  }
  function checkout() {
    if (!isLoggedIn) {
      toast.error('Please login to continue');
      navigate('/signin');
    } else {
      navigate('/checkout');
    }
  }
  return (
    <div className='text-gray-300 flex flex-col items-center justify-center  bg-gray-800 w-full  pt-24 pb-16 px-5'>
      <div className='flex lg:flex-row flex-col  gap-10  relative w-full'>
        <div className='space-y-2 text-left text-xl w-full flex flex-col items- justify-start '>
          <h1 className='text-4xl font-bold  mb-3 text-start '>
            {state?.title}
          </h1>
          <p className='text-lg text-left'>{state?.description}</p>
          <Rating>
            <button className='btn btn-xs mr-1 bg-yellow-700 text-gray-200'>
              BestSeller{' '}
            </button>
            <RatingStar />
            <p className='ml-2 text-sm font-bold '>4.95</p>
            <span className='mx-1.5 h-1 w-1 rounded-full bg-gray-100 ' />
            <a href='#' className='text-sm font-medium'>
              (73 ratings ) 1280 students
            </a>
          </Rating>
          <p className='text-base'>Created By: {state?.mentor}</p>
          <p className='text-base flex flex-row items-center gap-1'>
            <HiOutlineExclamationCircle /> last updated 08/08/2024
            <TbWorld /> English <CiCreditCard2 /> English(auto), Hindi(auto)
          </p>
          <span className='text-base'>
            No of Lectures: {state.numberOfLectures}
          </span>
          <span className='text-base '>
            Name of Instructor:{' '}
            <span className='underline'>{state.mentor}</span>
          </span>
          {role === 'admin' || data?.subscription?.status === 'active' ? (
            <button
              onClick={() =>
                navigate('/course/displaylectures', { state: { ...state } })
              }
              className='btn btn-primary'
            >
              Watch Lectures
            </button>
          ) : (
            <button onClick={() => checkout()} className='btn btn-secondary'>
              Checkout
            </button>
          )}
          {role === 'admin' && (
            <button onClick={deleteCourse} className=' btn-warning btn'>
              Delete Course
            </button>
          )}
        </div>
        <div className='space-y-5 w-auto lg:w-full '>
          {state.thumbnail && (
            <img
              src={state.thumbnail.secure_url}
              alt='thumbnail'
              className='w-full h-72 rounded-lg '
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
