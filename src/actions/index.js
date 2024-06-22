'use server'

import connectToDB from "@/database"
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";


//create profile action
export const createProfileAction = async (formData, pathToRevalidate) => {

    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);

}


export const fetchProfileAction = async (id) => {
    await connectToDB();
    const result = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(result));
}