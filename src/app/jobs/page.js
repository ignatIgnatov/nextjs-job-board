import { fetchJobApplicationForRecruiter, fetchJobApplicationsForCandidate, fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction } from "@/actions";
import JobsListing from "@/components/job-listing"
import { currentUser } from "@clerk/nextjs/server"


const JobsPage = async () => {

    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    const jobList = profileInfo?.role === 'candidate'
        ? await fetchJobsForCandidateAction()
        : await fetchJobsForRecruiterAction(user?.id);


    const getJobApplicationList = profileInfo?.role === 'candidate'
        ? await fetchJobApplicationsForCandidate(user?.id)
        : await fetchJobApplicationForRecruiter(user?.id)

    return (
        <JobsListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
            jobApplications={getJobApplicationList}
        />
    )
}

export default JobsPage