import Image from 'next/image'
import React , { useState } from 'react'
import { useSession } from 'next-auth/react'
import { FiSearch } from 'react-icons/fi'
import { AiFillHome, AiOutlinePlus, AiFillHeart , AiOutlineHeart } from 'react-icons/ai'
import { RiMessengerLine,RiMessengerFill } from 'react-icons/ri'
import { MdExplore , MdOutlineExplore } from 'react-icons/md'
import { BsPlusSquareFill , BsPlusSquare } from 'react-icons/bs'
import { ProfileOption } from './navbar/ProfileOption'
import { useRouter } from 'next/router'
import { CreateNewPost } from '../homebar/post/CreateNewPost'
import { useDispatch } from 'react-redux'
import { isCreatePost } from '../../redux/actions'

export const Navbar = () => {
    const [ isActive, setActive ] = useState(false)
    const [ isProfileMenu, setMenu ] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch();
    const { data:session } = useSession();
    const handleMenu = () =>{
        if(isProfileMenu){
            setMenu(false)
        }else{
            setMenu(true)
        }
    }
    const createPost = () =>{
        dispatch(isCreatePost(true))
    }
    return (
        <div className=' w-full shadow-full' >
        <header className='Navbar relative w-[1024px] lg:w-auto m-auto py-2 px-3 flex justify-between items-center'>
            <div className='leftside w-1/3 md:w-auto mt-2 ip:hidden'>
                <Image
                    onClick={()=>{router.push('/')}}
                    src='/images/logo.png'
                    alt="instagram2.0 logo"
                    height={29}
                    width={103}
                    className=' cursor-pointer'
                />
            </div>
            <div className='middle md:hidden  w-1/3 md:w-auto'>
                <div className='searchbbar bg-[#efefef] py-1 px-4 rounded-lg flex items-center justify-center'>
                    <FiSearch />
                    <input type='text' placeholder='Search' className='pl-2 w-full font-thin bg-[#efefef] outline-none' />
                </div>
            </div>
            <div className='rightSide  w-1/3 md:w-auto flex ip:m-auto items-center justify-center  '>
                <AiFillHome className=' text-3xl mr-5 ml-5 ip:ml-0 cursor-pointer'/>
                {
                    isActive ? <RiMessengerFill className=' text-3xl mx-3 cursor-pointer ip:mx-5'/> : <RiMessengerLine className=' text-3xl mx-3 cursor-pointer ip:mx-5'/>
                }
                {
                    isActive ? <BsPlusSquareFill onClick={()=>createPost()} className=' text-2xl mx-3 cursor-pointer ip:mx-5'/> : (<BsPlusSquare onClick={()=>createPost()} className=' text-2xl mx-3 cursor-pointer ip:mx-5'/>)
                }
                {
                    isActive ? <MdExplore className=' text-3xl mx-3 cursor-pointer ip:mx-5'/> : <MdOutlineExplore className=' text-3xl mx-3 cursor-pointer ip:mx-5'/>
                }
                {
                    isActive ? <AiFillHeart className=' cursor-pointer text-3xl ml-5 mr-5 ip:mr-0'/> : <AiOutlineHeart className=' cursor-pointer text-3xl mx-3 ip:mx-5 '/>
                }
                <Image 
                onClick={handleMenu}
                alt='Profile Image'
                width={30}
                height={30}
                src={session.user.image}
                className=' rounded-full cursor-pointer object-cover object-right'
                />
                <ProfileOption
                isProfileMenu={isProfileMenu}
                />

            </div>
        </header>
        </div>
    )
}
