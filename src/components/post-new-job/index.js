'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import CommonForm from "../common-form"
import { initialPostNewJobFormData, postNewJobFormControlls } from "@/utils"
import { createJobAction } from "@/actions"

const PostNewJob = ({ profileInfo, user }) => {

    const [showJobDialog, setShowJobDialog] = useState(false);
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo?.companyName
    })

    const handlePostNewJobBtnValid = () => {
        return Object.keys(jobFormData).every((control) => jobFormData[control].trim() !== '');
    }

    const handleCreateJob = async () => {
        createJobAction({
            ...jobFormData,
            recruiterId: user?.id,
            applicants: []
        }, '/jobs');

        setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName
        });
        setShowJobDialog(false);
    }

    return (
        <div>
            <Button onClick={() => setShowJobDialog(true)} className="disabled: opacity-60 flex h-11 items-center justify-center px-5">
                Post a Job
            </Button>
            <Dialog open={showJobDialog} onOpenChange={() => {
                setShowJobDialog(false);
                setJobFormData({
                    ...initialPostNewJobFormData,
                    companyName: profileInfo?.recruiterInfo?.companyName
                })
            }}>
                <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Post New Job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm
                                buttonText={'Add'}
                                formData={jobFormData}
                                setFormData={setJobFormData}
                                formControlls={postNewJobFormControlls}
                                isBtnDisabled={!handlePostNewJobBtnValid()}
                                action={handleCreateJob}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostNewJob