import {
  collection,
  doc,
  endAt,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../../../firebase";
import React, { useEffect, useState } from "react";
import { SinglePosts } from "./SinglePosts";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

export const LoopPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postLimit, setLimit] = useState(4);
  const [s, t] = useState(4);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(postLimit)),
      (snapShot) => {
        setPosts(snapShot.docs);
      }
    );
  }, [db, postLimit]);

  window.onscroll = function () {
    // const detect = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1
    // if (detect) {
    //   t(s + 0.4)
    // }
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if ((scrollTop + clientHeight) >= scrollHeight) {
      setLimit(postLimit + 2)
    }
  };

  return (
    <>
      {posts.map((post, ind) => {
        return (
          <SinglePosts
            key={ind}
            PostImage={post.data().Postimage}
            username={post.data().username}
            profileImg={post.data().profileImg}
            caption={post.data().caption}
            timestamp={post.data().timestamp}
            id={post.id}
            postUserId={post.data().userId}
          />
        );
      })}
      <Loader />
    </>
  );
};
