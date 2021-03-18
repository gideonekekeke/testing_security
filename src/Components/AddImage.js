import React, { useContext, useState, useEffect } from "react";
import { app } from "../Base";
import { GlobalContext } from "../AuthState/GlobalContext";
import moment from "moment";

const db = app.firestore().collection("securityUser");
function AddImage({ createdBy, createdAt }) {
  const { current, currentData } = useContext(GlobalContext);
  const [name, setName] = useState("");

  const getName = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      db.doc(createdBy)
        .get()
        .then((doc) => {
          setName(doc.data());
        });
    }
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <div className="main">
        <div
          style={{
            height: "50px",
            width: "50px",
            background: "white",
            borderRadius: "50px",
          }}
        >
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              borderRadius: "50px",
            }}
            src={name && name.avatar}
          />
        </div>
        <div
          style={{
            fontSize: "10px",
            marginTop: "10px",
            marginLeft: "15px",
            fontWeight: "bold",
          }}
        >
          {name && name.name}
          <div>{moment(createdAt).fromNow()}</div>
        </div>
      </div>
    </>
  );
}

export default AddImage;
