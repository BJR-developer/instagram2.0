import Head from 'next/head'
import React from 'react'
import { CreateNewPost } from './homebar/post/CreateNewPost'
import { Navbar } from './partials/Navbar'
import { useSelector , useDispatch } from 'react-redux'
export const Home = () => {
  const reduxData = useSelector(state=>state.dataStore)
  console.log(reduxData);
  return (
      <>
      <Head>
        <title>Instagram 2.0 - Next of BJR</title>
      </Head>
      {/* here start our apps  */}
      <Navbar/>
      {
        reduxData.isCreatePost ?
        <CreateNewPost/>
        :
        ""
      }
      </>
  )
}
export default Home