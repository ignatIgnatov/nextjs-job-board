import { fetchProfileAction } from '@/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Home = async () => {

  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) {
    redirect('/onboard')
  }

  return (
    <div>Home</div>
  )
}

export default Home;
