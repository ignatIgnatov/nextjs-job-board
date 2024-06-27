import queryString from "query-string";

export const recruiterOnBoardFormControls = [
    {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
        componentType: 'input'
    },
    {
        label: 'Company Name',
        name: 'companyName',
        placeholder: 'Enter your company name',
        componentType: 'input'
    },
    {
        label: 'Company Role',
        name: 'companyRole',
        placeholder: 'Enter your company role',
        componentType: 'input'
    }
];


export const initialRecruiterFormData = {
    name: '',
    companyName: '',
    companyRole: ''
}


export const candidateOnBoardFormControlls = [
    {
        label: 'Resume',
        name: 'resume',
        componentType: 'file'
    },
    {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter your name',
        componentType: 'input'
    },
    {
        label: 'Current company',
        name: 'currentCompany',
        placeholder: 'Enter your current company',
        componentType: 'input'
    },
    {
        label: 'Current Job Location',
        name: 'currentJobLocation',
        placeholder: 'Enter your current job location',
        componentType: 'input'
    },
    {
        label: 'Prefered Job Location',
        name: 'preferedJobLocation',
        placeholder: 'Enter your prefered job location',
        componentType: 'input'
    },
    {
        label: 'Current Salary',
        name: 'currentSalary',
        placeholder: 'Enter your current salary',
        componentType: 'input'
    },
    {
        label: 'Notice Period',
        name: 'noticePeriod',
        placeholder: 'Enter your notice period',
        componentType: 'input'
    },
    {
        label: 'Skills',
        name: 'skills',
        placeholder: 'Enter your skills',
        componentType: 'input'
    },
    {
        label: 'Previous Companies',
        name: 'previousCompanies',
        placeholder: 'Enter your previous companies',
        componentType: 'input'
    },
    {
        label: 'Total Expirience',
        name: 'totalExpirience',
        placeholder: 'Enter your total expirience',
        componentType: 'input'
    },
    {
        label: 'College',
        name: 'college',
        placeholder: 'Enter your college',
        componentType: 'input'
    },
    {
        label: 'College Location',
        name: 'collegeLocation',
        placeholder: 'Enter your college location',
        componentType: 'input'
    },
    {
        label: 'Graduated Year',
        name: 'graduatedYear',
        placeholder: 'Enter your graduated year',
        componentType: 'input'
    },
    {
        label: 'LinkedIn Profile',
        name: 'linkedInProfile',
        placeholder: 'Enter your LinkedIn profile',
        componentType: 'input'
    },
    {
        label: 'Github Profile',
        name: 'githubProfile',
        placeholder: 'Enter your Github profile',
        componentType: 'input'
    },

];

export const initialCandidateFormData = {
    resume: '',
    name: '',
    currentJobLocation: '',
    preferedJobLocation: '',
    currentSalary: '',
    noticePeriod: '',
    skills: '',
    currentCompany: '',
    previousCompanies: '',
    totalExpirience: '',
    college: '',
    collegeLocation: '',
    graduatedYear: '',
    linkedInProfile: '',
    githubProfile: ''
}

export const initialCandidateAccountFormData = {
    name: '',
    currentJobLocation: '',
    preferedJobLocation: '',
    currentSalary: '',
    noticePeriod: '',
    skills: '',
    currentCompany: '',
    previousCompanies: '',
    totalExpirience: '',
    college: '',
    collegeLocation: '',
    graduatedYear: '',
    linkedInProfile: '',
    githubProfile: ''
}

export const postNewJobFormControlls = [
    {
        label: 'Company Name',
        name: 'companyName',
        placeholder: 'Company name',
        componentType: 'input',
        disabled: true
    },
    {
        label: 'Title',
        name: 'title',
        placeholder: 'Job Title',
        componentType: 'input'
    },
    {
        label: 'Type',
        name: 'type',
        placeholder: 'Job Type',
        componentType: 'input'
    },
    {
        label: 'Location',
        name: 'location',
        placeholder: 'Job Location',
        componentType: 'input'
    },
    {
        label: 'Expirience',
        name: 'expirience',
        placeholder: 'Expirience',
        componentType: 'input'
    },
    {
        label: 'Description',
        name: 'description',
        placeholder: 'Description',
        componentType: 'input'
    },
    {
        label: 'Skills',
        name: 'skills',
        placeholder: 'Skills',
        componentType: 'input'
    },
]

export const initialPostNewJobFormData = {
    companyName: '',
    title: '',
    type: '',
    location: '',
    expirience: '',
    description: '',
    skills: ''
}

export const filterMenuDataArray = [
    {
        id: 'companyName',
        label: 'Company Name'
    },
    {
        id: 'title',
        label: 'Title'
    },
    {
        id: 'type',
        label: 'Type'
    },
    {
        id: 'location',
        label: 'Location'
    },
];


export const formUrlQuery = ({ params, dataToAdd }) => {
    let currentUrl = queryString.parse(params);

    if (Object.keys(dataToAdd).length > 0) {
        Object.keys(dataToAdd).map((key) => {
            if (dataToAdd[key].length === 0) {
                delete currentUrl[key];
            } else {
                currentUrl[key] = dataToAdd[key].join(",")
            }
        })
    }

    return queryString.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl
        },
        {
            skipNull: true
        }
    )
}