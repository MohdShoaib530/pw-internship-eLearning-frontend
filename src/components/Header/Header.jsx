import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Icons/sm-high-resolution-logo-transparent.png';
import { logoutUser, refreshAccessToken } from '../../redux/slices/authSlice';
import { CgProfile } from 'react-icons/cg';
import { RxReader } from 'react-icons/rx';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { HiCog, HiLogout, HiViewGrid } from 'react-icons/hi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, data, role } = useSelector((state) => state?.auth);
  const settings = [
    {
      name: 'My Profile',
      slug: '/user/profile',
      active: isLoggedIn,
      icon: <CgProfile />
    },

    {
      name: 'My Dashboard',
      slug: '/dashboard',
      active: isLoggedIn,
      icon: <HiViewGrid />
    },

    {
      name: 'Settings',
      slug: '/settings',
      active: isLoggedIn,
      icon: <HiCog />
    },
    {
      name: 'My Courses',
      slug: '/my-courses',
      active: isLoggedIn,
      icon: <RxReader />
    },
    {
      name: 'Support',
      slug: '/support',
      active: isLoggedIn,
      icon: <MdOutlineSupportAgent />
    },
    {
      name: 'Logout',
      slug: '/logout',
      active: isLoggedIn,
      icon: <HiLogout />
    },
    {
      name: 'Create Course',
      slug: '/course/create',
      active: isLoggedIn,
      icon: <MdOutlineCreateNewFolder />
    }
  ];
  const navItems = [
    {
      name: ' About Us',
      slug: '/about-us'
    },
    {
      name: ' Contact Us',
      slug: '/contact-us'
    }
  ];
  const navigate = useNavigate();

  const logout = async () => {
    const res = await dispatch(logoutUser());
    console.log('res', res);
    if (res.payload.message === 'jwt expired') {
      await dispatch(refreshAccessToken());
    }
  };
  return (
    <nav className=' hidden lg:flex z-50 w-full relative'>
      <div className=' bg-gray-900 text-gray-300 p-1 px-3  fixed flex items-center w-full justify-between z-50 mt-2'>
        {/* Logo */}
        <Link to={'/'}>
          <img src={logo} alt='' width={35} />
        </Link>
        {/* Navigation Links */}
        <div className='flex items-center justify-evenly w-6/12 '>
          <Link to={'/'}>Home</Link>
          {/* courses */}

          <div className='dropdown dropdown-hover'>
            <div tabIndex={0} role='button'>
              Courses
            </div>
            <ul
              tabIndex={0}
              className=' bg-base-100  dropdown-content z-[1] menu p-2  w-52 shadow '
            >
              <li>
                <Link to='/courses'>DSA to development</Link>
              </li>
              <li>
                <Link to='/courses'>Newly Launched</Link>
              </li>
              <li>
                <Link to='/courses'>Artificial Intelligence</Link>
              </li>
              <li>
                <Link to='/courses'>All courses</Link>
              </li>
            </ul>
          </div>
          {/* tutorials */}
          <div className='dropdown dropdown-hover '>
            <div tabIndex={0} role='button'>
              Tutorials
            </div>
            <ul
              tabIndex={0}
              className='bg-base-100  dropdown-content z-[1] menu p-2  w-52 shadow'
            >
              <li>
                <Link to='/courses'>Data Structures & Algorithms</Link>
              </li>
              <li>
                <Link to='/courses'>Python</Link>
              </li>
              <li>
                <Link to='/courses'>ML & Data Science</Link>
              </li>
              <li>
                <Link to='/courses'>System Design</Link>
              </li>
              <li>
                <Link to='/courses'>Interview</Link>
              </li>
              <li>
                <Link to='/courses'>Web Development</Link>
              </li>
              <li>
                <Link to='/courses'>Devops & Linux</Link>
              </li>
            </ul>
          </div>
          {/* practice */}
          <div className='dropdown dropdown-hover '>
            <div tabIndex={0} role='button' className=' m-1 '>
              Practice
            </div>
            <ul
              tabIndex={0}
              className='bg-base-100  dropdown-content z-[1] menu p-2  w-52 shadow'
            >
              <li>
                <Link to='/courses'>Practice Coding Problems</Link>
              </li>
              <li>
                <Link to='/courses'>All DSA Problems</Link>
              </li>
              <li>
                <Link to='/courses'>Problems of the day</Link>
              </li>
            </ul>
          </div>
          {navItems.map((item) => (
            <Link key={item.slug} to={item.slug} className=' m-1'>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Sign Up and Sign In Buttons */}
        {isLoggedIn ? (
          <div className='w-fit'>
            <div className='dropdown dropdown-end '>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar btn-sm'
              >
                <div className=' rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src={
                      data?.avatar?.secure_url
                        ? data?.avatar?.secure_url
                        : 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-100  z-[1] mt-2 w-52 p-2 shadow '
              >
                {settings.map((setting) =>
                  setting.active ? (
                    <li key={setting.slug}>
                      {setting.slug === '/logout' ? (
                        <button onClick={logout}>
                          <span className='badge'>{setting.icon}</span>
                          <Link>
                            <span>{setting.name}</span>
                          </Link>{' '}
                        </button>
                      ) : (
                        <Link to={`${setting.slug}`}>
                          <span className='badge'>{setting.icon}</span>
                          <span>{setting.name}</span>
                        </Link>
                      )}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-evenly gap-2'>
            <Link to='/signup'>
              <button className='btn btn-primary btn-sm'>Sign Up</button>
            </Link>
            <Link to='/signin'>
              <button className='btn btn-secondary btn-sm'>Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Header;
