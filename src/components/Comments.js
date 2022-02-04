import { useState, useEffect } from "react";
import axios from "axios";
import { getData } from "../API/HNApi";
export default function Comments({ kid }) {
  const [getkid, setGetKid] = useState([]);
  const [kidcomment, setKidcomment] = useState({});

  useEffect(() => {
    getData(kid).then((data) => data && setGetKid(data));
  }, [kid]);
  console.log(getkid);

  return <div>코멘트</div>;
}
