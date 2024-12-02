import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { GiMoneyStack } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeLayout from '../../layouts/HomeLayout.jsx';
import { getAllCourses } from '../../redux/slices/courseSlice.js';
import { deleteCourseById } from '../../redux/slices/courseSlice.js';
import { getPaymentRecord } from '../../redux/slices/paymentSlice.js';
import { getStatsData } from '../../redux/slices/statsSlice.js';
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUserCount, subscribedCount } = useSelector(
    (state) => state?.stats
  );
  const myCourses = useSelector((state) => state?.course?.courseData);
  console.log('mycourses', myCourses);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state?.payment
  );

  const userData = {
    labels: ['Registered User', 'Enrolled User'],
    fontColor: 'white',
    datasets: [
      {
        label: 'User Details',
        data: [allUserCount, subscribedCount],
        backgroundColor: ['yellow', 'green'],
        borderWidth: 1,
        borderColor: ['yellow', 'green']
      }
    ]
  };

  const salesData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    fontColor: 'white',
    datasets: [
      {
        label: 'Sales / Month',
        data: monthlySalesRecord,
        backgroundColor: ['red'],
        borderColor: ['white'],
        borderWidth: 2
      }
    ]
  };

  async function onCourseDelete(id) {
    const userConfirm = window.confirm(
      'Are you sure want  to delete the course'
    );
    if (!userConfirm) {
      return;
    }
    const res = await dispatch(deleteCourseById(id));
    if (res?.payload?.success) {
      await dispatch(getAllCourses());
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <div className='bg-black min-h-[90vh] pt-16 flex flex-col flex-wrap gap-10  text-white '>
      <h1 className='text-3xl lg:text-5xl text-yellow-600 shadow-2xl text-center font-semibold'>
        Admin Dashboard
      </h1>

      {/* main top div */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 m-auto mx-auto'>
        {/* main top left */}
        <div className='flex flex-col items-center gap-10 p-5 shadow-lg rounded-md'>
          <div className='w-80 h-80'>
            <Pie data={userData}></Pie>
          </div>

          <div className='grid grid-cols-2 gap-5'>
            <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
              <div className='flex flex-col items-center'>
                <p className='font-semibold'>Registered Users</p>
                <h3 className='text-4xl font-bold'>{allUserCount}</h3>
              </div>
              <FaUsers className='text-yellow-500 text-5xl' />
            </div>
            <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
              <div className='flex flex-col items-center'>
                <p className='font-semibold'>Subscribed Users</p>
                <h3 className='text-4xl font-bold'>{subscribedCount}</h3>
              </div>
              <FaUsers className='text-yellow-500 text-5xl' />
            </div>
          </div>
        </div>

        {/* main top right */}
        <div className='flex flex-col gap-10 items-center rounded-md shadow-lg p-5'>
          <div className='h-80 w-full relative'>
            <Bar className='absolute bottom-0 h-80 w-full' data={salesData} />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
              <div className='flex flex-col items-center'>
                <p className='font-semibold'>Subscription Count</p>
                <h3 className='text-4xl font-bold'>{allPayments?.count}</h3>
              </div>
              <FcSalesPerformance className='text-yellow-500 text-5xl' />
            </div>
            <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
              <div className='flex flex-col items-center'>
                <p className='font-semibold'>Total Revenue</p>
                <h3 className='text-4xl font-bold'>
                  {allPayments?.count * 499}
                </h3>
              </div>
              <GiMoneyStack className='text-green-500 text-5xl' />
            </div>
          </div>
        </div>
      </div>

      {/* main bottom div */}
      <div className='px-4 w-full self-center flex flex-col flex-wrap items-center justify-center gap-10 mb-10'>
        <div className='flex flex-col gap-3 md:flex-row w-full items-center justify-between'>
          <h1 className='text-center text-3xl font-semibold'>
            Courses overview
          </h1>

          <button
            onClick={() => {
              navigate('/course/create');
            }}
            className='w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer'
          >
            Create new course
          </button>
        </div>

        <div className='overflow-x-auto w-full'>
          <table className='table-auto w-full border-collapse border border-gray-900'>
            <thead className='bg-gray-700'>
              <tr>
                <th className='px-4 py-2 border border-gray-300 text-left'>
                  S No
                </th>
                <th className='px-4 py-2 border border-gray-300 text-left'>
                  Course Title
                </th>
                <th className='px-4 py-2 border border-gray-300 text-left'>
                  Course Category
                </th>
                <th className='px-4 py-2 border border-gray-300 text-left'>
                  Instructor
                </th>
                <th className='px-4 py-2 border border-gray-300 text-left'>
                  Total Lectures
                </th>
                <th className='px-4 py-2 border border-gray-300 text-center'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {myCourses?.map((course, idx) => (
                <tr key={course._id} className='hover:bg-gray-700'>
                  <td className='px-4 py-2 border border-gray-300 text-center'>
                    {idx + 1}
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    <textarea
                      readOnly
                      value={course?.title}
                      className='w-full h-auto bg-transparent resize-none border border-gray-200 p-2 rounded-md'
                    ></textarea>
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {course?.category}
                  </td>
                  <td className='px-4 py-2 border border-gray-300'>
                    {course?.mentor}
                  </td>
                  <td className='px-4 py-2 border border-gray-300 text-center'>
                    {course?.numberOfLectures}
                  </td>
                  <td className='px-4 py-2 border border-gray-300 text-center'>
                    <div className='flex justify-center items-center gap-2'>
                      <button
                        className='bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-white text-lg py-1 px-3 rounded-md flex items-center'
                        onClick={() =>
                          navigate('/course/displaylectures', {
                            state: { ...course }
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>
                      <button
                        className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-white text-lg py-1 px-3 rounded-md flex items-center'
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
