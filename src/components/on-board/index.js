'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import CommonForm from "../common-form";
import { candidateOnBoardFormControlls, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControls } from "@/utils";
import { createProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseApiKey = process.env.SUPABASE_API_KEY;

const supabaseClient = createClient('https://vsdmckvnxmvftiirgyim.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZG1ja3ZueG12ZnRpaXJneWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyOTY2NDgsImV4cCI6MjAzNDg3MjY0OH0.kbTAYL2q3zOZo10mFFwLoDoMK2porv55wx_RgXhFxvI');

const OnBoard = () => {


    const [currentTab, setCurrentTab] = useState('candidate');
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);

    const [file, setFile] = useState(null);

    const currentAuthUser = useUser();
    const { user } = currentAuthUser;

    const handleFileChange = (event) => {
        event.preventDefault();
        setFile(event.target.files[0])
    }

    const handleUploadPdfToSupabase = async () => {
        const { data, error } = await supabaseClient.storage
            .from('job-board')
            .upload(`/public/${file.name}`, {
                cacheControl: '3600',
                upset: false
            });
        console.log(data, error);
        if (data) {
            setCandidateFormData({
                ...candidateFormData,
                resume: data.path
            })
        }
    }

    useEffect(() => {
        if (file) {
            handleUploadPdfToSupabase()
        }
    }, [file])

    const handleTabChange = (value) => {
        setCurrentTab(value);
    }

    const handleRecruiterFormValidation = () => {
        return recruiterFormData
            && recruiterFormData.name.trim() !== ''
            && recruiterFormData.companyName.trim() !== ''
            && recruiterFormData.companyRole.trim() !== ''
    }

    const handleCandidateFormValidation = () => {
        return Object.keys(candidateFormData)
            .every(key => candidateFormData[key]
                .trim() !== '')
    }

    const createProfile = async () => {
        const data = currentTab === 'candidate' ? {
            candidateInfo: candidateFormData,
            role: 'candidate',
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        } : {
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
                        action={createProfile}
                        formControlls={candidateOnBoardFormControlls}
                        buttonText={"Onboard as candidate"}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        handleFileChange={handleFileChange}
                        isBtnDisabled={!handleCandidateFormValidation()}
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