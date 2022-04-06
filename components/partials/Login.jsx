import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export const Login = ({proId,proName}) => {
  return (
    <div className='login w-[100vw] h-[100vh] -mt-10 flex items-center justify-center flex-col'>
        <Image 
        src={`/images/insta.png`}
        alt={'instagram logo png'}
        width={200}
        height={200}
        />
        <button onClick={() => signIn(proId , {callbackUrl:"/"})} className='Login transition-all duration-700 bg-gradient-to-r from-[#7b22b7] to-[#de933f] hover:-mt-1 px-10 py-5 rounded-2xl text-white text-4xl mt-10 roboto font-bold leading-10 text'>
            {proName}
        </button>
    </div>
  )
}
