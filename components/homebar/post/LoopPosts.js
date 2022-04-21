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

export const LoopPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postLimit , setLimit ] = useState(2);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(postLimit)),
      (snapShot) => {
        setPosts(snapShot.docs);
      }
    );
  }, [db,postLimit]);

  function increaseNumber(num) {
    setLimit(num + 1)
  }
  window.onscroll = function () {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      increaseNumber(postLimit)
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
          />
        );
      })}
    </>
  );
};
