import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants";
import { axiosRequest } from "../configs/axios.config";

export const fetchMovieShowtimesApi = (id) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
  });
};
