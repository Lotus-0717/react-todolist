import { useEffect, useState, useRef } from "react";
import { API_GET_DATA } from "../../global/const";
import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";

async function fetchData(setData) {
  const res = await fetch(API_GET_DATA);
  const { data } = await res.json();
  setData(data);
}

async function fetchSetData(data) {
    await fetch(API_GET_DATA, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
}

const Home = () => {
  const [data, setData] = useState([]);
  const submittingStatus = useRef(false);

  useEffect(() => {
    if (!submittingStatus.current) {
      return;
    }
    fetchSetData(data).then((data) => (submittingStatus.current = false));
  }, [data]);

  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <div className="app">
      <h1 className="title">Todo list</h1>
      <Edit add={setData} submittingStatus={submittingStatus}/>
      <List listData={data} edit={setData} submittingStatus={submittingStatus}/>
    </div>
  );
};

export default Home;
