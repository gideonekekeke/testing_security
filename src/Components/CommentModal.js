import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "antd";
import pic1 from "../Components/img/mes1.png";
import { app } from "../Base";
import "./cas.css";
import { motion } from "framer-motion";
import DispalyComent from "./dispalyComent";
import ChatIcon from "@material-ui/icons/Chat";
import SendIcon from "@material-ui/icons/Send";

const post = app.firestore().collection("posts");
function CommentModal({ id }) {
  const [com, setCom] = useState("");
  const [needData, setNeedData] = useState([]);

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,

      // border: "2px solid #000",
      // backgroundImage: "linear-gradient(#4c87df, #1854b1, #2233ac)",
      backgroundColor: "white",
      // color: "white",

      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "60%",

      display: "flex",
      // alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const commenting = async () => {
    const commentingUser = await app.auth().currentUser;

    if (commentingUser) {
      await post.doc(id).collection("comment").doc().set({
        postedBy: commentingUser.uid,
        createdUser: new Date().toLocaleString(),
        dateTime: Date.now().toString(),
        com,
      });
      setCom("");
    }
  };

  const getComment = async () => {
    const gotCom = await app.auth().currentUser;

    if (gotCom) {
      await post
        .doc(id)
        .collection("comment")
        .orderBy("dateTime", "asc")
        .onSnapshot((snap) => {
          const i = [];
          snap.forEach((doc) => {
            i.push({ ...doc.data(), id: doc.id });
          });
          setNeedData(i);
        });
    }
  };

  useEffect(() => {
    getComment();
  }, []);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <ChatIcon onClick={handleOpen} />

        <div style={{ fontSize: "12px", marginTop: "10px", marginLeft: "5px" }}>
          {needData.length}
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <motion.div
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            className="thin"
          >
            <div className="modal_body">
              {needData.map(({ id, dateTime, com, postedBy, createdUser }) => (
                <div>
                  <DispalyComent
                    dateTime={dateTime}
                    com={com}
                    postedBy={postedBy}
                    createdUser={createdUser}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
                margin: "20px",
              }}
            >
              <input
                value={com}
                onChange={(e) => {
                  setCom(e.target.value);
                }}
                placeholder="type..."
                style={{ height: "20px", marginTop: "px", width: "60%" }}
              />

              {/* <button
                onClick={commenting}
                style={{ height: "20px", margin: "10px" }}
              >
                Comment
              </button> */}
              <SendIcon
                onClick={commenting}
                style={{
                  marginLeft: "-20px",
                  height: "15px",
                }}
              />
            </div>
          </motion.div>
        </Fade>
      </Modal>
    </div>
  );
}

export default CommentModal;
