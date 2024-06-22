import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: String,
    role: String,
    email: String,
    isPremiumUser: Boolean,
    membershipType: String,
    membershipStartDate: String,
    membershipEndDate: String,
    recruiterInfo: {
        name: String,
        companyName: String,
        companyRole: String
    },
    candidateInfo: {
        name: String,
        currentJobLocation: String,
        preferedJobLocation: String,
        currentSalary: String,
        noticePeriod: String,
        skills: String,
        currentCompany: String,
        previousCompanies: String,
        totalExpirience: String,
        college: String,
        collegeLocation: String,
        graduatedYear: String,
        linkedInProfile: String,
        githubProfile: String,
        resume: String
    }
})

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

export default Profile;