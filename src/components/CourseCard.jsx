import { Link, useNavigate } from 'react-router-dom';

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/course/description/', { state: { ...data } })}
      className='card card-compact bg-base-100 w-96 shadow-xl h-80'
    >
      <figure>
        <img
          src={data?.thumbnail?.secure_url}
          alt='course thumbnail'
          className='w-full '
        />
      </figure>
      <div className='card-body h-[50%]'>
        <h2 className='card-title '>{data?.title}</h2>
        <div className='card-actions justify-end'>
          <button className='btn btn-outline'>Explore</button>
          <button className='btn btn-outline'>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
