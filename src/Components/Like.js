import React, { useState } from "react";
import { app } from "../Base";
import ShowLike from "./ShowLike";

const db = app.firestore().collection("securityUser");
const post = app.firestore().collection("posts");

function Like({ id }) {
  const [like, setLike] = useState(null);
  const [likeToogle, setLikeToogle] = useState(true);

  const handleLike = () => {
    setLike(like + 1);
  };
  const handleLike1 = () => {
    setLike(like - 1);
  };

  const handleLikeing = async () => {
    const likeUser = await app.auth().currentUser;

    if (likeUser) {
      await post.doc(id).collection("Like").doc().set({
        like,
        newCreate: likeUser.uid,
      });
      setLike(handleLike);
      setLike(handleLike1);
    }
  };

  return (
    <div>
      {like ? (
        <button onClick={handleLikeing}>LIKEs</button>
      ) : (
        <button onClick={handleLikeing}>LIKE</button>
      )}
      <div>{like}</div>
      <br />
      <ShowLike />
    </div>
  );
}

export default Like;
