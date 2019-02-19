import React from "react";
import HomeImageCard from "../HomeImageCard";
import "./index.css";

const HomeImageList = props => {
  console.log(props);
  var Images = props.items.map(item => {
    return <HomeImageCard item={item} searchQuery={props.searchQuery} />;
  });

  return <div className="card-columns">{Images}</div>;
};

export default HomeImageList;
