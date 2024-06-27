import { fetchProfileAction } from '@/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import HomepageButton from '@/components/homepage-button';

const Home = async () => {

  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) {
    redirect('/onboard')
  }

  return (
    <Fragment>
      <div className='bg-white'>
        <div className='relative w-full'>
          <div className='min-h-screen flex'>
            <div className='container m-auto p-0'>
              <div className='flex items-center flex-wrap gap-12 lg:gap-0'>
                <div className='lg:w-5/12 space-y-8'>
                  <span className='flex space-x-2'>
                    <span className='block w-14 mb-2 border-b-2 border-gray-700'></span>
                    <span className='font-medium text-gray-600'>One Stop Solution to find Jobs</span>
                  </span>
                  <h1 className='text-4xl font-bold md:text:6xl'>
                    The Best <br /> Job Portal App
                  </h1>
                  <p className='text-xl text-gray-700'>
                    Find Best Jobs From Top Product Companies and Build Your Career
                  </p>
                  <div className='flex space-x-4'>
                    <HomepageButton user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
                  </div>
                </div>
                <div className='hidden relative md:block lg:w-7/12'>
                  <img
                    src='https://credcv.com/wp-content/uploads/2021/08/Why-you-should-create-a-job-portal-for-your-organizations-website_033e017b0_3963.jpg'
                    alt='Job Portal'
                    className='relative ml-auto'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home;
