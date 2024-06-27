import { createFilterCategoryAction, fetchJobApplicationForRecruiter, fetchJobApplicationsForCandidate, fetchJobsForCandidateAction, fetchJobsForRecruiterAction, fetchProfileAction } from "@/actions";
import JobsListing from "@/components/job-listing"
import { currentUser } from "@clerk/nextjs/server"


const JobsPage = async ({searchParams}) => {

    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    const jobList = profileInfo?.role === 'candidate'
        ? await fetchJobsForCandidateAction(searchParams)
        : await fetchJobsForRecruiterAction(user?.id);


    const getJobApplicationList = profileInfo?.role === 'candidate'
        ? await fetchJobApplicationsForCandidate(user?.id)
        : await fetchJobApplicationForRecruiter(user?.id)

    const fetchFilterCategories = await createFilterCategoryAction();

    return (
        <JobsListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
            jobApplications={getJobApplicationList}
            filterCategories={fetchFilterCategories}
        />
    )
}

export default JobsPage