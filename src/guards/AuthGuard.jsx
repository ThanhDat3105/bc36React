import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthGuard() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.userInfo) {
      alert("Đăng nhập để tiếp tục vào trang.");
      navigate("/login");
    }
  }, []);

  return <Outlet />;
}
