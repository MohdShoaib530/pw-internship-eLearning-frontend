// File: src/pages/Support.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return toast.error('all fields are required');
    }

    if (formData.name.length < 3) {
      return toast.error('Name must be atleast 3 characters');
    }

    if (formData.message.length < 20) {
      return toast.error('message should be atleast 20 characters');
    }

    if (!isEmail(formData.email)) {
      return toast.error('Please enter a valid email');
    }

    try {
      const response = axiosInstance.post('/contact', formData);
      toast.promise(response, {
        loading: 'Sending your message',
        success: 'message sent successfully, we will contact soon',
        error: 'Something went wrong!'
      });
      const result = await response;
      console.log('resutl', result);

      if (result?.data?.message) {
        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  }
  return (
    <div className='min-h-screen mt-20 md:mt-28 bg-gray-700 text-gray-100 flex items-center justify-center p-4'>
      <div className='max-w-xl w-full bg-gray-800 rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold text-gray-100 mb-4 text-center'>
          Support
        </h2>
        <p className=' mb-6 text-center'>
          If you have any questions or need assistance, please fill out the form
          below and our support team will get back to you shortly.
        </p>
        <form action='' noValidate onSubmit={onFormSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block  font-bold mb-2'>
              Name
            </label>
            <input
              value={formData.name}
              onChange={handleUserInput}
              type='text'
              required
              name='name'
              id='name'
              placeholder='Enter your Name..'
              className='w-full px-3 py-2 border bg-gray-700 border-white   rounded-lg '
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block  font-bold mb-2'>
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleUserInput}
              type='email'
              required
              name='email'
              id='email'
              placeholder='Enter your email..'
              className='w-full px-3 py-2 border bg-gray-700 border-white   rounded-lg '
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='message' className='block  font-bold mb-2'>
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={handleUserInput}
              required
              name='message'
              id='message'
              placeholder='Enter your message..'
              className='w-full px-3 py-2 border bg-gray-700 border-white     rounded-lg '
              rows='4'
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
