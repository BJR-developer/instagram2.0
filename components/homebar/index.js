import React from "react";
import { LoopPosts } from "./post/LoopPosts";
import { SwitchProfile } from "./profile/SwitchProfile";
import { DailyStory } from "./story/DailyStory";

export const HomeBarAlign = () => {
  return (
    <>
      <div className="homebar flex w-[935px] md:w-auto m-auto justify-between my-5">
        <div className="leftSide">
          <DailyStory />
          <LoopPosts />


        </div>
        <div className="rightSide">
          <SwitchProfile />
        </div>
      </div>


    </>
  );
};
