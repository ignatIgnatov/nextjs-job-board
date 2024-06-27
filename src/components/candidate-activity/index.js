'use client'

import CommonCard from "../common-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const CandidateActivity = ({ jobList, jobApplicants }) => {

    const uniqueStatusArray = [... new Set(jobApplicants.map(item => item.status).flat(1))]

    return (
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-950">Your Activity</h1>
                    <TabsList>
                        {
                            uniqueStatusArray.map(status => <TabsTrigger value={status}>{status}</TabsTrigger>)
                        }
                    </TabsList>
                </div>
                <div className="bp-24 pt-6">
                    <div className="conatiner mx-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">
                            {
                                uniqueStatusArray.map(status =>
                                    <TabsContent value={status}>
                                        {
                                            jobList
                                                .filter((item) =>
                                                    jobApplicants
                                                        .filter((application) => application.status.indexOf(status) > -1)
                                                        .findIndex(filterItemByStatus => item._id === filterItemByStatus.jobId) > -1
                                                )
                                                .map(finalFilteredItem =>
                                                    <CommonCard
                                                        title={finalFilteredItem?.title}
                                                        description={finalFilteredItem?.companyName} />
                                                )
                                        }
                                    </TabsContent>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}

export default CandidateActivity