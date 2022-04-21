import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSession } from 'next-auth/react'
import { db as database } from "../../../firebase";
import {
  BsThreeDots,
  BsBookmarkDash,
  BsHeart,
  BsHeartFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { SingleComments } from "./comments/SingleComments";
import { MdSend } from "react-icons/md";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import jsCookie from "js-cookie";

export const SinglePosts = ({
  profileImg,
  username,
  PostImage,
  caption,
  timestamp,
  id,
}) => {
  const { data:session } = useSession();
  const [isLike, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [totalReacts , setTotalReacts] = useState([]);
  const [hasLike , setHasLike] = useState();
  const [allLove , setTotalLove] = useState(null);
    const userId = jsCookie.get("userid");

  useEffect(() => {
    onSnapshot(
      query(collection(database, "posts", `${id}`, "comments")),
      (snapShot) => {
        setPostComments(snapShot.docs);
      }
    );
  }, [database]);

  useEffect(()=>{
    onSnapshot(
      query(collection(database , "posts" ,id , "reacts" )),
      (onSnapshot)=>{
        setTotalReacts(onSnapshot.docs)
      }
    )
  },[database])
  
  useEffect(()=>{
    setHasLike(
      totalReacts.findIndex(react=>(react.id === userId) !== -1)
    )
  },[totalReacts])

  useEffect(()=>{
    const data = totalReacts.map((val,ind)=>console.log());
    setTotalLove(data?.length)
  },[totalReacts , database])
  useEffect(()=>{
    if(hasLike===0){
      setLike(true)
    }else{
      setLike(false)
    }
  },[hasLike])

  const giveLike = async() => {
    try {
      setLike(true)
      const addLike = await setDoc(
        doc(database , "posts" , id , "reacts" , userId ),
        {
          userId,
        }
        )
      } catch (error) {
        console.log(error);
        setLike(false)
      }
  };
  
  const removeLike = async() =>{
    try {
      setLike(false);
      const deleteA = await deleteDoc(doc(database , "posts" , id , "reacts" , userId ));
      console.log(deleteA);
    } catch (error) {
      console.log(error);
      setLike(true)
    }
  }
  const handleLike = async() =>{
    if(isLike){
      removeLike()
    }
    else{
      giveLike()
    }
  }


  const addComment = async (e) => {
    const {name,email,image} = session.user;
    e.preventDefault();
    try {
      if (comment !== "") {
        const insertComment = await addDoc(
          collection(database, "posts", id, "comments"),
          {
            comment,
            profileImg:image,
            username:name,
            PostImage,
            id,
          }
        );
        setComment("");
      } else {
        alert("Please write something... :( ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="singlepost mb-5 commonBox w-[614px] md:w-auto bg-white m-auto pt-5 pb-3 px-3">
        <div className="topbar flex justify-between items-center">
          <div className="left flex items-center">
            <div className="image pr-3">
              <div className="imgField m-auto rounded-full p-[2px] w-[40px] h-[40px] bg-gradient-to-b from-[#db3e8a] to-[#f8873b] ">
                <img
                  src={profileImg}
                  alt="elon musk"
                  className="w-[36px] h-[36px] object-cover object-center rounded-full bg-white p-[2px]"
                />
              </div>
            </div>
            <div className="textDoc">
              <h4 className=" font-medium text-sm">{username}</h4>
              <h4 className=" uppercase text-gray-600 text-xs">Explore</h4>
            </div>
          </div>
          <div className="right">
            <BsThreeDots className=" cursor-pointer" />
          </div>
        </div>
        {/* here is image  */}
        <img
          onDoubleClick={() => handleLike()}
          src={PostImage}
          alt={username}
          className=" w-full py-5"
        />
        {/* here is reactionbar  */}
        <div className="reaction flex justify-between items-center">
          <div className="left flex items-center justify-center">
            {isLike ? (
              <BsHeartFill
                onClick={() => handleLike()}
                className=" mr-2 cursor-pointer text-2xl font-semibold text-rose-600"
              />
            ) : (
              <BsHeart
                onClick={() => handleLike()}
                className=" mr-2 cursor-pointer text-2xl font-semibold"
              />
            )}
            <FaRegComment className=" mx-2 cursor-pointer text-2xl" />
            <FiSend className=" mx-2 cursor-pointer text-2xl" />
          </div>
          <div className="right flex items-center justify-center">
            <BsBookmarkDash className=" cursor-pointer text-2xl" />
          </div>
        </div>
        {/* like count  */}
        <h5 className="text-xs font-semibold my-3">{allLove} Likes </h5>
        <h5 className="text-sm font-semibold my-3">
          {username}{" "}
          <span className=" font-normal text-gray-700">{caption}</span>{" "}
        </h5>
        {/* here is comments  */}
        {postComments.map((val, ind) => {
          return (
            <SingleComments
              key={ind}
              profileImg={val.data().profileImg}
              comments={val.data().comment}
              username={val.data().username}
              id={val.data().id}
            />
          );
        })}
        {/* post timestamp  */}
        <h6 className=" text-xs text-gray-500 my-2">
          <Moment fromNow className="uppercase">
            {timestamp?.toDate()}
          </Moment>
        </h6>
        {/* submit comments  */}
        <form
          onSubmit={addComment}
          className="submitComments border-t-2 border-t-gray-100 pt-3 flex items-center justify-between"
        >
          <BsEmojiSmile className=" text-2xl font-bold" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="px-2 outline-none placeholder:text-sm text-sm w-full"
          />
          <div className="send flex items-center text-base text-[#0095f6] font-medium ">
            <MdSend onClick={addComment} />
          </div>
        </form>
      </div>
    </>
  );
};
