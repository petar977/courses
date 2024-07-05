"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/formatPrice";

interface CourseEnrollButton {
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({price, courseId}:CourseEnrollButton) => {
    return (
        <Button className="w-full md:w-auto" size="sm">
            Enroll for {formatPrice(price)}
        </Button>
    )
}