import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


const OnBoardPage = async () => {

    //get the auth user from clerk
    const user = await currentUser();

    //fetch the profile info
    const profileInfo = await fetchProfileAction(user?.id);

    if (profileInfo?._id) {
        if (profileInfo?.role === 'recruiter' &&
            !profileInfo?.isPremiumUser
        ) {
            redirect('/membership')
        } else {
            redirect('/')
        }
    } else {
        return <OnBoard />
    }
}

export default OnBoardPage