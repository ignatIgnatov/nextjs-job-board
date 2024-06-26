'use server'

import connectToDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";


//create profile action
export const createProfileAction = async (formData, pathToRevalidate) => {

    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);

}

//fetch profile action
export const fetchProfileAction = async (id) => {
    await connectToDB();
    const result = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(result));
}

//create job action
export const createJobAction = async (formData, pathToRevalidate) => {
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate);
}

//fetch recruiter jobs
export const fetchJobsForRecruiterAction = async (id) => {
    await connectToDB();
    const result = await Job.find({ recruiterId: id });

    return JSON.parse(JSON.stringify(result));
}

//fetch all jobs
export const fetchJobsForCandidateAction = async () => {
    await connectToDB();
    const result = await Job.find();

    return JSON.parse(JSON.stringify(result));
}

//create job application
export const createJobApplicationAction = async (data, pathToValidate) => {
    await connectToDB();
    await Application.create(data);
    revalidatePath(pathToValidate);
}

//fetch job applications for candidate
export const fetchJobApplicationsForCandidate = async (candidateId) => {
    await connectToDB();
    const result = await Application.find({ candidateUserId: candidateId });

    return JSON.parse(JSON.stringify(result));
}

//fetch job applications for recruiter
export const fetchJobApplicationForRecruiter = async (recruiterId) => {
    await connectToDB();
    const result = await Application.find({ recruiterUserId: recruiterId });

    return JSON.parse(JSON.stringify(result));
}


//update job application
export const updateJobApplicationAction = async (data, pathToValidate) => {
    await connectToDB();
    const { recruiterUserId,
        name,
        email,
        candidateUserId,
        status,
        jobId,
        _id,
        jobAppliedData
    } = data;

    await Application.findOneAndUpdate(
        { _id: _id },
        {
            recruiterUserId,
            name,
            email,
            candidateUserId,
            status,
            jobId,
            jobAppliedData
        },
        { new: true }
    );
    revalidatePath(pathToValidate);
}


//get candidate details by id
export const getCandidateDetailsByIdAction = async (currentCandidateId) => {
    await connectToDB();
    const result = await Profile.findOne({ userId: currentCandidateId });

    return JSON.parse(JSON.stringify(result));
}


