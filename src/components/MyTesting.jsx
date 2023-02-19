import { useSelector } from "react-redux";

const { useState, useEffect } = require("react");

export default function MyTesting(props) {
  let [mangDT, setMangDT] = useState([
    {
      maSP: "1",
      tenSP: "VinSmart Live",
      giaBan: 5700000,
      hinhAnh:
        "https://cdn.tgdd.vn/Products/Images/42/208847/vsmart-live-blue-600x600.jpg",
    },
    {
      maSP: "2",
      tenSP: "Meizu 16Xs",
      giaBan: 7600000,
      hinhAnh:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2019/05/Meizu-16XS-Coral-Orange.jpg",
    },
    {
      maSP: "3",
      tenSP: "Iphone XS Max",
      giaBan: 27000000,
      hinhAnh:
        "https://cdn.tgdd.vn/Products/Images/42/190321/iphone-xs-max-gold-600x600.jpg",
    },
  ]);

  const renderDT = () => {
    return mangDT.map((dt, index) => {
      return (
        <div className="card col-3 m-2 p-3" key={index}>
          <img className="card-img-top" src={dt.hinhAnh} alt={dt.tenSP} />
          <div className="card-body">
            <h4 className="card-title">{dt.tenSP}</h4>
            <p className="card-text">{dt.giaBan}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">{renderDT()}</div>
    </div>
  );
}
