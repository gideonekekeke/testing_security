import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { app } from "../Base";
import AddImage from "./AddImage";
import Comment from "./Comment";
import Like from "./Like";
const post = app.firestore().collection("posts");
function Reports() {
  const hist = useHistory();
  const [crime, setCrime] = useState("");
  const [location, setLocation] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [getPost, setGetPost] = useState([]);

  const uploadFiles = async (e) => {
    const File = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(File.name);

    await fileRef.put(File);

    setFileUrl(await fileRef.getDownloadURL());
  };

  //to make a post now or to make a report

  const reportCase = async () => {
    const newReport = await app.auth().currentUser;

    if (newReport) {
      await post.doc().set({
        location,
        crime,
        createdBy: newReport.uid,
        fileUrl,
        createdAt: new Date().toLocaleString(),
        dateTime: Date.now().toString(),
      });
      hist.push("/case");
    }
    setCrime("");
    setLocation("");
    setFileUrl("");
  };

  const getReports = async () => {
    const reporting = await app.auth().currentUser;

    if (reporting) {
      await post.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        const i = [];
        snapshot.forEach((doc) => {
          i.push({ ...doc.data(), id: doc.id });
        });
        setGetPost(i);
      });
    }
  };

  useEffect(() => {
    getReports();
  }, []);
  return (
    <>
      <div>
        <center>
          <br />
          <br />

          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <input type="file" onChange={uploadFiles} />
            <input
              type={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              style={{ height: "30px", margin: "10px" }}
              type="text"
              placeholder="describe the location"
            />
            <input
              type={crime}
              onChange={(e) => {
                setCrime(e.target.value);
              }}
              style={{ height: "100px", margin: "10px" }}
              type="text"
              placeholder="describe your case..."
            />
            <button
              onClick={() => {
                reportCase();
              }}
              style={{ height: "40px", width: "50%" }}
            >
              Report Now
            </button>
          </div>
        </center>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default Reports;
