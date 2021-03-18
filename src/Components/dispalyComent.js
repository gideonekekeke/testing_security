import React, { useState, useEffect } from "react";
import { app } from "../Base";
import moment from "moment";
const db = app.firestore().collection("securityUser");

function DispalyComent({ postedBy, com, dateTime, createdUser }) {
  const [getUserData, setGetUserData] = useState([]);

  const getData = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await db
        .doc(postedBy)
        .get()
        .then((doc) => {
          setGetUserData(doc.data());
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {/* <div className="noting"> */}
      <div className="main1">
        <div
          style={{
            height: "40px",
            width: "40px",
            background: "gray",
            borderRadius: "50px",
          }}
        >
          <img
            src={getUserData && getUserData.avatar}
            style={{ height: "100%", width: "100%", borderRadius: "50px" }}
          />
        </div>
        <div
          style={{
            fontSize: "10px",
            marginTop: "10px",
            marginLeft: "15px",
            display: "flex",
            width: "60%",
            // background: "black",
            flexDirection: "column",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {getUserData && getUserData.name}
          </div>
          <div
            style={{
              fontSize: "10px",

              // backgroundColor: "red",
              // width: "100%",
            }}
          >
            {com}
          </div>

          <div style={{ color: "green" }}>{moment(createdUser).fromNow()}</div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default DispalyComent;
