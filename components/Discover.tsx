import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../utils/constants'

const Discover = () => {
    const router = useRouter();
    const { topic } = router.query;

    const activeTopicStyle = "xl:border-2 hover:bg-primary xl:border-[#1c54ad] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#1c54ad]"

    const topicStyle = "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"

    return (
        <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
                Popular Topics
            </p>
            <div className='flex gap-0 xl:gap-3 flex-wrap'>
                {topics.map((item) => (
                    <Link href={`/?topic=${item.name}`} key={item.name}>
                        <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                            <span className='font-bold text-2xl hidden xl:block xl:text-md'>
                                {item.icon}
                            </span>
                            <span className='font-light xl:font-medium text-sm xl:text-md capitalize'>
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Discover