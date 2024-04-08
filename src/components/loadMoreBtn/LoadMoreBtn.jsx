import React from "react";

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div>
      <button onClick={onLoadMore}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;
