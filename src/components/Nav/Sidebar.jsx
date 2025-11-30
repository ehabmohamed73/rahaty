import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoIcon from "../../assets/svg/Logo";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
export default function Sidebar({ sidebarOpen, toggleSidebar, userName }) {
  const navigate = useNavigate();

  const storedName = localStorage.getItem("username") || userName;
  const [isSignedIn] = useState(() => {
    return localStorage.getItem("isSignedIn") === "true";
  });
  return (
    <Wrapper className="animate darkBg" $sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <LogoIcon />
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            الشعار
          </h1>
        </div>
        <CloseBtn
          onClick={() => toggleSidebar(!sidebarOpen)}
          className="animate pointer"
        >
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      {/* روابط */}
      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-60}
          >
            الرئيسية
          </Link>
        </li>

        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="services"
            spy={true}
            smooth={true}
            offset={-60}
          >
            الخدمات
          </Link>
        </li>

        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="offering"
            spy={true}
            smooth={true}
            offset={-60}
          >
            من نحن
          </Link>
        </li>
      </UlStyle>

      {/* تسجيل الدخول / الملف الشخصي */}
      <UlStyle className="w-full">
        <li className="w-max">
          {!isSignedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="h-10 w-50 group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              تسجيل الدخول
            </button>
          ) : (
            <button
              onClick={() => navigate("/profile")}
              className="h-10 w-full px-8 py-3 group relative inline-flex items-center justify-center font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              {storedName}
            </button>
          )}
        </li>
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.$sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
