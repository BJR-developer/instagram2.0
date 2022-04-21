import Head from "next/head";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { isCreatePost } from "../../../redux/actions";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Cookies from "js-cookie";

export const CreateNewPost = () => {

  const [selectImage, setSelectImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const imageInput = useRef();
  const caption = useRef();
  const dispatch = useDispatch();

  const closePostbar = () => {
    dispatch(isCreatePost(false));
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectImage(readerEvent.target.result);
    };
  };
  const sendData = async () => {
    try {
      setLoading(true);
      const { name, email, image } = session.user;
      const docRef = await addDoc(collection(db, "posts"), {
        userId:Cookies.get("userid"),
        caption: caption.current.value,
        username: name,
        profileImg: image,
        timestamp: serverTimestamp(),
      });
      console.log("new doc added the id is : ", docRef.id);
      const imageRef = ref(storage, `posts/${docRef.id}`);

      await uploadString(imageRef, selectImage, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            Postimage: downloadUrl,
          });
        }
      );
      dispatch(isCreatePost(false));
      setLoading(false);
      dispatch(isCreatePost(false));
      setSelectImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPost = async () => {
    try {
      setLoading(true);
      const { name, email, image } = session.user;
      const sendDoc = await addDoc(collection, (db, "posts"), {
        caption: caption.current.value,
        username: name,
        email: email,
        profileImg: image,
        timestamp: serverTimestamp(),
      });
      console.log("new doc added the id is : ", sendDoc.id);

      const imageRef = ref(storage, `posts/${sendDoc.id}`);
      console.log("this is imageRef ", imageRef);
      await uploadString(imageRef, selectImage, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);
        }
      );
      setLoading(false);
      dispatch(isCreatePost(false));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Create New Post ▪ instagram 2.0</title>
      </Head>
      <div className="create flex items-center justify-center h-[100vh] w-[100vw] fixed z-20 top-0 left-0 bg-[#000000c9]">
        <div className="createnewpost  text-black bg-white md:w-[100vw] md:h-[100vh] w-[50vw] h-[80vh] md:rounded-none rounded-2xl">
          <div className="above">
            <h1 className=" text-center py-3 font-medium border-b-2 border-b-gray-200">
              Create New Post
            </h1>
            <AiOutlineClose
              onClick={closePostbar}
              className=" absolute top-5 right-5 md:top-2 md:right-2 text-3xl text-white md:text-black cursor-pointer"
            />
          </div>
          <div className="below flex flex-col h-[80%] items-center justify-center">
            <MdOutlinePermMedia className=" text-[60px] font-thin" />
            <h3 className=" font-light text-2xl text-center my-5">
              Select photos and Video here
            </h3>
            <div className="fileSelect relative">
              {selectImage ? (
                <div className="relative">
                  <img className=" h-40" src={selectImage} alt="" />
                  <AiOutlineClose
                    onClick={() => setSelectImage(null)}
                    className=" text-black absolute right-0 top-0 -mr-5 cursor-pointer"
                  />
                  <input
                    type="text"
                    ref={caption}
                    placeholder="enter caption"
                    className="mx-auto flex justify-center items-center mt-2 outline-none bg-transparent focus:bg-transparent"
                  />
                  {loading ? (
                    <h4 className="mt-2  mx-auto top-0 right-0 w-44 text-center left-0 bg-rose-600 hover:bg-rose-700 text-white font-medium py-1 rounded-md px-5 cursor-not-allowed animate-pulse">
                      Uploading
                    </h4>
                  ) : (
                    <h4
                      onClick={sendData}
                      className="mt-2  mx-auto top-0 right-0 w-44 text-center left-0 bg-rose-600 hover:bg-rose-700 text-white font-medium py-1 rounded-md px-5 cursor-pointer"
                    >
                      Upload
                    </h4>
                  )}
                </div>
              ) : (
                <>
                  <input
                    ref={imageInput}
                    onChange={addImageToPost}
                    type="file"
                    hidden
                    placeholder="Select file from computer"
                    className="cursor-pointer text-center opacity-0"
                  />
                  <h4
                    onClick={() => imageInput.current.click()}
                    className="  mx-auto top-0 right-0 w-44 text-center left-0 bg-[#0095f6] hover:bg-[#006db3] text-white font-medium py-1 rounded-md px-5 cursor-pointer"
                  >
                    Select from Device
                  </h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
