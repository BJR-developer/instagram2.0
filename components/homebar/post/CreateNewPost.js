import Head from 'next/head'
import React from 'react'
import { MdOutlinePermMedia } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector , useDispatch } from 'react-redux'
import { isCreatePost } from '../../../redux/actions'
export const CreateNewPost = () => {
    const reduxData = useSelector(state=>state.dataStore) 
    const dispatch = useDispatch()
    const closePostbar = () =>{
        dispatch(isCreatePost(false))
    }
    return (
        <>
            <Head><title>Create New Post ▪ instagram 2.0</title></Head>
            <div className='create flex items-center justify-center h-[100vh] w-[100vw] absolute top-0 left-0 bg-[#000000c9]'>
                <div className='createnewpost  text-black bg-white md:w-[100vw] md:h-[100vh] w-[50vw] h-[80vh] md:rounded-none rounded-2xl'>
                    <div className='above'>
                        <h1 className=' text-center py-3 font-medium border-b-2 border-b-gray-200'>Create New Post</h1>
                        <AiOutlineClose onClick={closePostbar} className=' absolute top-5 right-5 text-3xl text-white cursor-pointer' />
                    </div>
                    <div className='below flex flex-col h-[80%] items-center justify-center'>
                        <MdOutlinePermMedia className=' text-[60px] font-thin' />
                        <h3 className=' font-light text-2xl text-center my-5'>Select photos and Video here</h3>
                        <div className='fileSelect relative'>
                            <input type='file' placeholder='Select file from computer' className='text-center opacity-0' />
                            <h4 className=' absolute mx-auto top-0 right-0 w-44 text-center left-0 bg-[#0095f6] hover:bg-[#006db3] text-white font-medium pointer-events-none py-1 rounded-md px-5'>Select from Device</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
