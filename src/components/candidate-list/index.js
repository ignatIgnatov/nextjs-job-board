'use client'

import { Fragment } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { getCandidateDetailsByIdAction, updateJobApplicationAction } from "@/actions"
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseApiKey);

const CandidateList = ({
    jobApplications,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    showCurrentCandidateModel,
    setShowCurrentCandidateModel }) => {

    const handleFetchCandidateDetails = async (getCurrentCandidateId) => {
        const data = await getCandidateDetailsByIdAction(getCurrentCandidateId);

        if (data) {
            setCurrentCandidateDetails(data);
            setShowCurrentCandidateModel(true);
        }
    }

    const handlePreviewResume = () => {
        const { data } = supabaseClient.storage
            .from('job-board-public')
            .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

        const a = document.createElement('a');
        a.href = data?.publicUrl;
        a.setAttribute('download', 'Resume.pdf');
        a.setAttribute('target', '_blank');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleUpdateJobStatus = async (getCurrentStatus) => {
        let copyJobApplicants = [...jobApplications];
        const indexOfCurrentJobApplicant = copyJobApplicants.findIndex(item => item.candidateUserId === currentCandidateDetails.userId);
        console.log(indexOfCurrentJobApplicant);
        const jobApplicantsToUpdate = {
            ...copyJobApplicants[indexOfCurrentJobApplicant],
            status: copyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
        }

        console.log(jobApplicantsToUpdate);

        await updateJobApplicationAction(jobApplicantsToUpdate, '/jobs')
    }

    return (
        <Fragment>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                    jobApplications && jobApplications.length > 0 ?
                        jobApplications.map(item =>
                            <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                                <div className="px-4 my-6 flex justify-between items-center">
                                    <h3 className="text-lg font-bold">{item?.name}</h3>
                                    <Button
                                        onClick={() => handleFetchCandidateDetails(item?.candidateUserId)}
                                        className="flex h-11 items-center justify-center px-5">
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        )
                        : null}
            </div>
            <Dialog
                open={currentCandidateDetails}
                onOpenChange={() => {
                    setCurrentCandidateDetails(null);
                    setShowCurrentCandidateModel(false);
                }}
            >
                <DialogContent>
                    <div>
                        <h1>{currentCandidateDetails?.candidateInfo?.name},{" "}{currentCandidateDetails?.email}</h1>
                        <p>{currentCandidateDetails?.candidateInfo?.currentCompany}</p>
                        <p>{currentCandidateDetails?.candidateInfo?.currentJobLocation}</p>
                        <p>Total expirience: {currentCandidateDetails?.candidateInfo?.totalExpirience} Years</p>
                        <p>Salary: {currentCandidateDetails?.candidateInfo?.currentSalary} USD</p>
                        <p>Notice period: {currentCandidateDetails?.candidateInfo?.noticePeriod} Days</p>
                        <div>
                            Previous companies:
                            <div className="flex flex-wrap gap-4 mt-2 mb-4">
                                {
                                    currentCandidateDetails?.candidateInfo?.previousCompanies.split(',').map(skillItem => (
                                        <div className="w-[100px] flex justify-center items-center h-[35] bg-black rounded-[4px]">
                                            <h2 className="text-[13px] font-medium text-white">{skillItem}</h2>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            Skills:
                            <div className="flex flex-wrap gap-4 mt-2 mb-4">
                                {
                                    currentCandidateDetails?.candidateInfo?.skills.split(',').map(skillItem => (
                                        <div className="w-[100px] flex justify-center items-center h-[35] bg-black rounded-[4px]">
                                            <h2 className="text-[13px] font-medium text-white">{skillItem}</h2>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={handlePreviewResume} className="flex h-11 items-center justify-center px-5">Resume</Button>
                        <Button
                            onClick={() => { handleUpdateJobStatus('Selected') }}
                            className="disabled:opacity-55 flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplications
                                    .find(
                                        (item) => item.candidateUserId === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes('Selected') || jobApplications
                                        .find(
                                            (item) => item.candidateUserId === currentCandidateDetails?.userId
                                        )
                                        ?.status.includes('Rejected')
                                    ? true
                                    : false
                            }
                        >
                            {
                                jobApplications
                                    .find(
                                        (item) => item.candidateUserId === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes('Selected')
                                    ? 'Selected'
                                    : 'Select'
                            }
                        </Button>
                        <Button
                            onClick={() => { handleUpdateJobStatus('Rejected') }}
                            className="disabled:opacity-55 flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplications
                                    .find(
                                        (item) => item.candidateUserId === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes('Selected') || jobApplications
                                        .find(
                                            (item) => item.candidateUserId === currentCandidateDetails?.userId
                                        )
                                        ?.status.includes('Rejected')
                                    ? true
                                    : false
                            }
                        >
                            {
                                jobApplications
                                    .find(
                                        (item) => item.candidateUserId === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes('Rejected')
                                    ? 'Rejected'
                                    : 'Reject'
                            }
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default CandidateList