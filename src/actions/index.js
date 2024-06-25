'use server'

import connectToDB from "@/database"
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

