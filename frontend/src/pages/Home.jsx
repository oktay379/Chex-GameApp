import React, { useContext } from 'react';
import { userContext } from '../App';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(userContext);

  return (
    <>
      <div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10'>
        <h1 className='text-3xl font-bold text-white mb-10'>Which Game Do You Wanna Play?</h1>
        <div className='flex gap-10'>
          <Link to='/tictac' className='text-center'>
            <span className='block text-xl font-semibold text-white mb-3'>XOX</span>
            <img
              className='mb-5 h-40 w-40 rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnSFS7RhIAKRX9FC6ZcODEPvg-UlPSfSLAvQ&usqp=CAU'
              alt='xox'
            />
          </Link>
          <Link to='/wordgame' className='text-center'>
            <span className='block text-xl font-semibold text-white mb-3'>Spelling Bee</span>
            <img
              className='mb-5 h-40 w-40 rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300'
              src='https://www.montgomeryschoolsmd.org/contentassets/bba1b4cf3da947b4a152ce2ec8132a66/spelling-bee.png'
              alt='bee'
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
