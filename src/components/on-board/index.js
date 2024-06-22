'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import CommonForm from "../common-form";
import { candidateOnBoardFormControlls, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControls } from "@/utils";
import { createProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";

const OnBoard = () => {


    const [currentTab, setCurrentTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);

    const currentAuthUser = useUser();
    const { user } = currentAuthUser;

    const handleTabChange = (value) => {
        setCurrentTab(value);
    }

    const handleRecruiterFormValidation = () => {
        return recruiterFormData
            && recruiterFormData.name.trim() !== ''
            && recruiterFormData.companyName.trim() !== ''
            && recruiterFormData.companyRole.trim() !== ''
    }

    const createProfile = async () => {
        const data = {
            recruiterInfo: recruiterFormData,
            role: 'recruiter',
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        };

        await createProfileAction(data, '/onboard')
    }

    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome to onboarding</h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm
                        formControlls={candidateOnBoardFormControlls}
                        buttonText={"Onboard as candidate"}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                    />
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm
                        formControlls={recruiterOnBoardFormControls}
                        buttonText={'Onboard as recruiter'}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFormData}
                        isBtnDisabled={!handleRecruiterFormValidation()}
                        action={createProfile}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default OnBoard