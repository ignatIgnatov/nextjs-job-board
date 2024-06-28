'use client'

import { membershipPlans } from "@/utils"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import { createPriceIdAction, createStripePaymentAction, updateProfileAction } from "@/actions"
import { loadStripe } from "@stripe/stripe-js"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const stripePublisablehKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripePublisablehKey);

const Membership = ({ profileInfo }) => {

    const pathName = useSearchParams();

    const handlePayment = async (getCurrentPlan) => {
        const stripe = await stripePromise;
        const extractPriceId = await createPriceIdAction({
            amount: Number(getCurrentPlan?.price)
        });

        if (extractPriceId) {
            sessionStorage.setItem('currentPlan', JSON.stringify(getCurrentPlan));
            const result = await createStripePaymentAction({
                lineItems: [
                    {
                        price: extractPriceId?.id,
                        quantity: 1
                    }
                ]
            });

            await stripe.redirectToCheckout({
                sessionId: result?.id
            })
        }
    }

    const updateProfile = async () => {
        const fetchCurrentPlanFromSessionStorrage = JSON.parse(sessionStorage.getItem('currentPlan'));

        await updateProfileAction({
            ...profileInfo,
            isPremiumUser: true,
            membershipType: fetchCurrentPlanFromSessionStorrage?.type,
            membershipStartDate: new Date().toString(),
            membershipEndDate: new Date(
                new Date().getFullYear() + fetchCurrentPlanFromSessionStorrage?.type === 'basic'
                    ? 1
                    : fetchCurrentPlanFromSessionStorrage?.plan === 'teams'
                        ? 2
                        : 5,
                new Date().getMonth(),
                new Date().getDate()
            )
        }, '/membership')
    }

    useEffect(() => {
        if (pathName.get('status') === 'success') {
            updateProfile()
        }
    }, [pathName]);

    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">
                    {
                        profileInfo?.isPremiumUser ? 'You are a Premium user' : 'Choose your best plan'
                    }

                </h1>
                <div>
                    {
                        profileInfo?.isPremiumUser ?
                            <Button className="flex h-11 items-center justify-center px-5">
                                {
                                    membershipPlans.find(planItem => planItem.type === profileInfo.membershipType).heading
                                }
                            </Button> : null
                    }
                </div>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            membershipPlans.map((plan, index) => <CommonCard
                                icon={
                                    <div className="flex justify-between">
                                        <div>
                                            <JobIcon />
                                        </div>
                                        <h1 className="font-bold text-2xl">{plan.heading}</h1>
                                    </div>
                                }
                                title={`$ ${plan.price} /yr`}
                                description={plan.type}
                                footerContent={
                                    profileInfo?.membershipType === 'enterprise' ||
                                        (profileInfo?.membershipType === 'basic' && index === 0) ||
                                        (
                                            profileInfo?.membershipType === 'teams' && index >= 0 && index < 2
                                        )
                                        ? null :
                                        <Button
                                            onClick={() => handlePayment(plan)}
                                            className="flex h-11 items-center justify-center px-5"
                                        >
                                            {
                                                profileInfo?.membershipType === 'basic' || profileInfo?.membershipType === 'teams'
                                                    ? 'Update Plan'
                                                    : 'Get Premium'
                                            }
                                        </Button>
                                }
                            />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership