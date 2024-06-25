'use client'

import { Fragment } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"

const CandidateJobCart = ({ jobItem }) => {
  return (
    <Fragment>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        description={jobItem?.companyName}
        footerContent={
          <Button className="flex h-11 items-center justify-center px-5">
            View details
          </Button>
        }

      />
    </Fragment>
  )
}

export default CandidateJobCart