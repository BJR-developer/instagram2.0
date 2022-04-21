import React from 'react'
import { useSession } from 'next-auth/react'
export const DailyStory = () => {
  const { data:session } = useSession();
  const { name,image,email } = session.user;
    return (
    <div className='story commonBox mb-5 py-2 px-2 w-[614px] md:w-[100vw] h-[100px] m-auto flex items-center justify-start'>
        <div className='person w-[78px]'>
            <div className='imgField m-auto rounded-full p-[2px] w-[60px] h-[60px] bg-gradient-to-b from-[#db3e8a] to-[#f8873b] '>
                <img src="/images/profile/elon.jpg" alt="elon musk" className="w-[56px] h-[56px] object-cover object-center rounded-full bg-white p-[2px]" />
            </div>
            <h4 className=' overflow-ellipsis text-center overflow-hidden whitespace-nowrap tracking-[0.01em] text-xs text-gray-600'>Elon Musk</h4>
        </div>
        <div className='person w-[78px]'>
            <div className='imgField m-auto rounded-full p-[2px] w-[60px] h-[60px] bg-gradient-to-b from-[#db3e8a] to-[#f8873b] '>
                <img src="/images/profile/mark.jpg" alt="mark zuckerberg" className="w-[56px] h-[56px] object-cover object-center rounded-full bg-white p-[2px]" />
            </div>
            <h4 className=' overflow-ellipsis text-center overflow-hidden whitespace-nowrap tracking-[0.01em] text-xs text-gray-600'>mark zuckerberg</h4>
        </div>
        <div className='person w-[78px]'>
            <div className='imgField m-auto rounded-full p-[2px] w-[60px] h-[60px] bg-gradient-to-b from-[#db3e8a] to-[#f8873b] '>
                <img src="/images/profile/sundar.webp" alt="Sundar Pichai" className="w-[56px] h-[56px] object-cover object-center rounded-full bg-white p-[2px]" />
            </div>
            <h4 className=' overflow-ellipsis text-center overflow-hidden whitespace-nowrap tracking-[0.01em] text-xs text-gray-600'>Sundar Pichai</h4>
        </div>
        <div className='person w-[78px]'>
            <div className='imgField m-auto rounded-full p-[2px] w-[60px] h-[60px] bg-gradient-to-b from-[#db3e8a] to-[#f8873b] '>
                <img src="/images/profile/jeff.jpg" alt="Jeff Bezos" className="w-[56px] h-[56px] object-cover object-center rounded-full bg-white p-[2px]" />
            </div>
            <h4 className=' overflow-ellipsis text-center overflow-hidden whitespace-nowrap tracking-[0.01em] text-xs text-gray-600'>Jeff Bezos</h4>
        </div>
    </div>
  )
}
