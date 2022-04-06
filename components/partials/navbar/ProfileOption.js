import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'
import { BiUserCircle, BiBookmark } from 'react-icons/bi'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
export const ProfileOption = ({isProfileMenu}) => {
  return (
    <div className={`profile ${isProfileMenu ? 'block' : 'hidden' } z-20 font-extralight Option absolute bottom-0 right-0 rounded-md mt-[64px] w-64 h-[14.2rem] top-0 bg-white px-3 py-2 shadow-full`}>
        <div className='profile cursor-pointer my-4 flex items-center '>
            <BiUserCircle className='text-xl'/>
            <span className='mx-2'>Profile</span>
        </div>
        <div className='profile cursor-pointer my-4 flex items-center '>
            <BiBookmark className='text-xl'/>
            <span className='mx-2'>Saved</span>
        </div>
        <div className='profile cursor-pointer my-4 flex items-center '>
            <AiOutlineSetting className='text-xl'/>
            <span className='mx-2'>Settings</span>
        </div>
        <div className='profile cursor-pointer my-4 flex items-center '>
            <BiRefresh className='text-xl'/>
            <span className='mx-2'>Switch Accounts</span>
        </div>
        {/* devider  */}
        <div className='w-full my-2 h-[1px] bg-gray-300' />
        {/* logout button  */}
        <button onClick={signOut} className='logout'>
            Logout
        </button>
        {/* above arrow design */}
        <div className='h-5 w-5  rotate-45 absolute top-0 -mt-2 bg-white -z-10 right-4 shadow-arrow' />
    </div>
  )
}
