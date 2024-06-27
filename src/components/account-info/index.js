'use client'

import { candidateOnBoardFormControlls, initialCandidateAccountFormData, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControls } from "@/utils"
import { useEffect, useState } from "react"
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

const AccountInfo = ({ profileInfo }) => {

    const [candidateFormData, setCandidateformData] = useState(initialCandidateAccountFormData);
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);

    useEffect(() => {
        if (profileInfo?.role === 'recruiter') {
            setRecruiterFormData(profileInfo?.recruiterInfo);
        }

        if (profileInfo?.role === 'candidate') {
            setCandidateformData(profileInfo?.candidateInfo);
        }

    }, [profileInfo]);

    const handleUpdateAccount = async () => {
        await updateProfileAction(profileInfo?.role === 'candidate'
            ? {
                _id: profileInfo?._id,
                userId: profileInfo?.userId,
                role: profileInfo?.role,
                email: profileInfo?.email,
                isPremiumUser: profileInfo?.isPremiumUser,
                membershipType: profileInfo?.membershipType,
                membershipStartDate: profileInfo?.membershipStartDate,
                membershipEndDate: profileInfo?.membershipEndDate,
                candidateInfo: {
                    ...candidateFormData,
                    resume: profileInfo?.candidateInfo?.resume
                }
            }
            : {
                _id: profileInfo?._id,
                userId: profileInfo?.userId,
                role: profileInfo?.role,
                email: profileInfo?.email,
                isPremiumUser: profileInfo?.isPremiumUser,
                membershipType: profileInfo?.membershipType,
                membershipStartDate: profileInfo?.membershipStartDate,
                membershipEndDate: profileInfo?.membershipEndDate,
                recruiterInfo: {
                    ...recruiterFormData
                }
            },
            '/account'
        )
    }

    return (
        <div className="mx-auto max-w-txl">
            <div className="flex items-baseline justify-between pb-6 border-b pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">Account Details</h1>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <CommonForm
                        action={handleUpdateAccount}
                        formControlls={
                            profileInfo?.role === 'candidate'
                                ? candidateOnBoardFormControlls.filter((formControl) => formControl.name !== 'resume')
                                : recruiterOnBoardFormControls
                        }
                        formData={profileInfo?.role === 'candidate'
                            ? candidateFormData
                            : recruiterFormData}
                        setFormData={profileInfo?.role === 'candidate'
                            ? setCandidateformData
                            : setRecruiterFormData}
                        buttonText={'Update Profile'}
                    />
                </div>
            </div>
        </div>

    )
}

export default AccountInfo