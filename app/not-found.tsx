import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col m-auto items-center gap-y-5'>
            <h2 className='text-6xl font-semibold'>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">
                <Button variant="link">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}