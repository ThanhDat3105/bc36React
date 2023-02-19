import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookTicketApi, fetchTicketDetailApi } from "../../services/ticket";
import Seat from "./components/Seat";
import * as _ from "lodash";

export default function Booking() {
  const [ticketDetail, setTicketDetail] = useState({});
  const [selectedSeatList, setSelectedSeatList] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTicketDetail();
  }, []);

  const getTicketDetail = async () => {
    const result = await fetchTicketDetailApi(params.id);

    console.log(result);

    setTicketDetail(result.data.content);
  };

  const renderSeats = () => {
    return ticketDetail?.danhSachGhe?.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maGhe}>
          <Seat ele={ele} handleSelect={handleSelect} />
          {(idx + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  const handleSelect = (seat) => {
    const data = [...selectedSeatList];
    const idx = data.findIndex((ele) => ele.maGhe === seat.maGhe);

    if (idx !== -1) {
      data.splice(idx, 1);
    } else {
      data.push(seat);
    }

    setSelectedSeatList(data);
    // console.log(selectedSeatList);
  };

  useEffect(() => {
    console.log(selectedSeatList);
  }, [selectedSeatList]);

  const bookTicket = async () => {
    const data = {
      maLichChieu: params.id,
      danhSachVe: selectedSeatList.map((ele) => {
        return {
          maGhe: ele.maGhe,
          giaVe: ele.giaVe,
        };
      }),
    };

    await bookTicketApi(data);
    alert("Đặt vé thành công");
    navigate("/");
  };

  return (
    <div className="py-5">
      <div className="row">
        <div className="col-8 mb-4">
          <div style={{ width: "95%" }} className="mx-auto">
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-secondary">
              Seats are booked
            </div>
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-dark">
              Seats not booked
            </div>
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-primary">
              Seats are being booked
            </div>
            <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-warning">
              VIP seats
            </div>
          </div>
        </div>
        <div className="col-8">
          <div style={{ width: "95%" }} className="mx-auto">
            {renderSeats()}
          </div>
        </div>
        <div className="col-4">
          <img
            style={{ width: 300, height: 400, objectFit: "cover" }}
            src={ticketDetail?.thongTinPhim?.hinhAnh}
            alt="#"
          />
          <h4 className="mb-0">{ticketDetail?.thongTinPhim?.tenPhim}</h4>
          <h5 className="mb-0">
            Number of seats:
            <div className="d-flex">
              {selectedSeatList.map((ele) => {
                return (
                  <p key={ele.maGhe} className="badge badge-success mr-2 mb-0">
                    {ele.tenGhe}
                  </p>
                );
              })}
            </div>
          </h5>
          <h5>Total: {_.sumBy(selectedSeatList, "giaVe").toLocaleString()}</h5>
          <button onClick={bookTicket} className="btn btn-warning">
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
}
