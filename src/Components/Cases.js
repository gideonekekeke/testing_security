import React, { useEffect, useState } from "react";
import "./cas.css";
import pic from "../Components/img/lo.png";
import pic1 from "../Components/img/mes1.png";
import CommentModal from "./CommentModal";
import { app } from "../Base";
import AddImage from "./AddImage";
import DispalyComent from "./dispalyComent";
import ShareIcon from "@material-ui/icons/Share";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ChatIcon from "@material-ui/icons/Chat";
import Comment from "./Comment";
const post = app.firestore().collection("posts");

const db = app.firestore().collection("securityUser");
function Cases({ id }) {
  const [getCase, setGetCase] = useState([]);
  const [newGet, setNewGet] = useState([]);

  const gettingCase = async () => {
    const userCase = await app.auth().currentUser;

    if (userCase) {
      await post.orderBy("createdAt", "desc").onSnapshot((snap) => {
        const item = [];
        snap.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setGetCase(item);
      });
    }
  };

  const getComment1 = async () => {
    const gotCom1 = await app.auth().currentUser;

    if (gotCom1) {
      await post
        .doc(id)
        .collection("comment")
        .limit(2)
        // .orderBy("dateTime", "asc")
        .onSnapshot((snap) => {
          const i = [];
          snap.forEach((doc) => {
            i.push({ ...doc.data(), id: doc.id });
          });
          setNewGet(i);
        });
    }
  };

  useEffect(() => {
    gettingCase();
    getComment1();
  }, []);
  return (
    <>
      <div className="main_body">
        {getCase.map(
          ({ id, createdAt, createdBy, fileUrl, crime, location }) => (
            <div className="main_bodyCard">
              <div className="main_container">
                <AddImage createdAt={createdAt} createdBy={createdBy} />
                <div style={{ marginTop: "10px" }}>{crime}</div>
                {fileUrl ? (
                  <div
                    style={{
                      height: "150px",
                      backgroundColor: "gray",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={fileUrl}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      height: "150px",
                      backgroundColor: "silver",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={fileUrl}
                    />
                  </div>
                )}
                <div
                  style={{
                    height: "30px",
                    // backgroundColor: "red",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  <div
                    style={{
                      // height: "30px",
                      // width: "30px",
                      display: "flex",
                      // flexDirection: "column",
                      // backgroundColor: "white",
                    }}
                  >
                    <LocationOnIcon />
                    <div style={{ fontSize: "10px", marginTop: "10px" }}>
                      {location}
                    </div>
                  </div>
                  <ShareIcon />

                  <CommentModal id={id} />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Cases;
