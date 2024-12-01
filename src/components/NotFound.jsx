import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center gap-2 w-full h-screen bg-gradient-to-b  from-stone-600 to-stone-900'>
      <div className='flex items-center justify-center w-full h-auto'>
        <h1 className='text-9xl font-bold text-white tracking-widest'>404</h1>
      </div>
      <h1 className='text-4xl'>Something's missing.</h1>
      <p>
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.
      </p>
      <button className='btn btn-outline' onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}

export default NotFound;
