import { fetchJobsForRecruiterAction, fetchProfileAction } from "@/actions";
import JobsListing from "@/components/job-listing"
import { currentUser } from "@clerk/nextjs/server"


const JobsPage = async () => {

    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    const jobList = await fetchJobsForRecruiterAction(user?.id);

    console.log(jobList, 'Ignat');

    return (
        <JobsListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
        />
    )
}

export default JobsPage