'use client'

import { Fragment, useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"

const CandidateJobCart = ({ jobItem }) => {

  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}>
        <CommonCard
          icon={<JobIcon />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            <Button onClick={() => setShowJobDetailsDrawer(true)} className="flex h-11 items-center justify-center px-5">
              View details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-900">
                {jobItem.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button className="flex h-11 items-center justify-center px-5" >Apply</Button>
                <Button
                  onClick={() => setShowJobDetailsDrawer(false)}
                  className="flex h-11 items-center justify-center px-5">Cancel</Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium text-gray-600">
            {jobItem?.description}
            <span className="ml-4 text-xl font-normal text-gray-500">{jobItem?.location}</span>
          </DrawerDescription>
          <div className="mt-6 w-[150px] flex justify-center items-center h-[40px] bg-black rounded-[4px]">
            <h2 className="text-xl font-bold text-white">{jobItem?.type} Time</h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">Expirience: {jobItem?.expirience}</h3>
          <div className="flex gap-4 mt-6">
            {
              jobItem?.skills.split(',').map(skillItem => (
                <div className="w-[100px] flex justify-center items-center h-[35] bg-black rounded-[4px]">
                  <h2 className="text-[13px] font-medium text-white">{skillItem}</h2>
                </div>
              ))
            }
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  )
}

export default CandidateJobCart