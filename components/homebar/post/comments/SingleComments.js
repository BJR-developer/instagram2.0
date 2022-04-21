import React, { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export const SingleComments = ({ profileImg, username, comments, id }) => {
  const [isCommentLove, setLove] = useState(false);
  const commentLove = () => {
    if (isCommentLove) {
      setLove(false);
    } else {
      setLove(true);
    }
  };

  return (
    <div className="comments ml-5 flex items-center justify-between">
      <div className="left flex items-center">
        <img
          src={profileImg}
          alt={username}
          className=" rounded-full object-cover mr-2 object-center h-[20px] w-[20px] border border-gray-400"
        />
        <h5 className="text-sm font-semibold my-2">
          {username}{" "}
          <span className=" font-normal text-gray-700">{comments}</span>{" "}
        </h5>
      </div>
      {!isCommentLove ? (
        <BsHeart onClick={commentLove} />
      ) : (
        <BsHeartFill className=" text-rose-600" onClick={commentLove} />
      )}
    </div>
  );
};
