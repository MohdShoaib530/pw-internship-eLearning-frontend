import { Link } from 'react-router-dom';

function SignupRoleCard({ image, title, data, className }) {
  return (
    <Link to={'/signup'} state={data}>
      <div
        className={`card w-full bg-gray-600 text-gray-100 shadow-xl gap-y-3 ${className}`}
      >
        <figure className={`px-10 pt-5 h-20 ${className}`}>
          <img src={image} alt={title} className='rounded-xl h-16' />
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title'>{title}</h2>
          <p>{data}</p>
        </div>
      </div>
    </Link>
  );
}

export default SignupRoleCard;
