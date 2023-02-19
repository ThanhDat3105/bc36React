import React from "react";
import Detail from "./components/detail/Detail";
import Showtimes from "./components/showtimes/Showtimes";

export default function MovieDetail() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <Detail />
          <Showtimes />
        </div>
      </div>
    </div>
  );
}
