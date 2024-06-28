'use server'

import connectToDB from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);


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
export const fetchJobsForCandidateAction = async (filterParams = {}) => {
    await connectToDB();

    let updatedParams = {};
    Object.keys(filterParams).forEach(filterKey => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(',') }
    });

    const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {});
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


//create filter categories
export const createFilterCategoryAction = async () => {
    await connectToDB();
    const result = await Job.find({});

    return JSON.parse(JSON.stringify(result));
}

//update profile action
export const updateProfileAction = async (data, pathToValidate) => {
    await connectToDB();

    const { userId, role, email,
        isPremiumUser,
        membershipType,
        membershipStartDate,
        membershipEndDate,
        recruiterInfo,
        candidateInfo, _id } = data;

    await Profile.findOneAndUpdate(
        { _id: _id },
        {
            userId, role, email, isPremiumUser, membershipType, membershipStartDate, membershipEndDate, recruiterInfo, candidateInfo
        },
        { new: true }
    );

    revalidatePath(pathToValidate);
}

//create stripe price id based on tier selection
export const createPriceIdAction = async (data) => {
    const session = await stripe.prices.create({
        currency: 'usd',
        unit_amount: data?.amount * 100,
        recurring: {
            interval: 'year'
        },
        product_data: {
            name: 'Premium Plan'
        }
    });

    return {
        success: true,
        id: session?.id
    }
}

//create payment logic
export const createStripePaymentAction = async (data) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: data?.lineItems,
        mode: 'subscription',
        success_url: 'http://localhost:3000/membership' + '?status=success',
        cancel_url: 'http://localhost:3000/membership' + '?status=cancel'
    });

    return {
        success: true,
        id: session?.id
    }
}


