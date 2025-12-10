import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
export default function TopNavbar({ userName = "Ehab" }) {
  const [y, setY] = useState(window.scrollY);
  const navigate = useNavigate();
  const [sidebarOpen, toggleSidebar] = useState(false);
  // const [isSignIn, setSignIn] = useState(isSignedUser);

  const storedName = localStorage.getItem("username") || userName;

  const [isSignedIn] = useState(() => {
    return localStorage.getItem("isSignedIn") === "true";
  });

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    toggleSidebar((prev) => !prev);
  }, []);

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isSignedIn={isSignedIn}
        userName={storedName}
      />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}

      <Wrapper
        className="flexCenter animate whiteBg"
        style={{ height: y > 100 ? "60px" : "80px" }}
      >
        <NavInner className="container flexSpaceCenter">
          {/* Logo */}
          <Link
            className="pointer flexNullCenter"
            to="home"
            smooth={true}
            aria-label="الرئيسية"
          >
            <LogoIcon />
            <h1 className="font20 extraBold mr-4">راحتي</h1>
          </Link>

          {/* Mobile Menu Button */}
          <BurgerWrapper
            className="pointer"
            onClick={handleSidebarToggle}
            aria-label="فتح القائمة"
            type="button"
          >
            <BurgerIcon />
          </BurgerWrapper>

          {/* Main Menu */}
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => {
                  navigate("/", { replace: true });
                }}
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="home"
                spy={true}
                smooth={true}
                offset={-80}
              >
                الرئيسية
              </Link>
            </li>

            <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="services"
                spy={true}
                smooth={true}
                offset={-80}
              >
                الخدمات
              </Link>
            </li>

            <li className="semiBold font15 pointer">
              <Link
                activeClass="active"
                style={{ padding: "10px 15px" }}
                to="offering"
                spy={true}
                smooth={true}
                offset={-80}
              >
                من نحن
              </Link>
            </li>
          </UlWrapper>

          {/* Login Button */}
          <UlWrapperRight className="flexNullCenter">
            <li className="list-none">
              {!isSignedIn ? (
                <button
                  onClick={() => navigate("/login")}
                  className="h-10 w-50 group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  aria-label="تسجيل الدخول"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    تسجيل الدخول
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/profile")}
                  className="h-10 px-8 py-3 group relative inline-flex items-center justify-center font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  aria-label="الملف الشخصي"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {storedName}
                    <User size={18} />
                  </span>
                </button>
              )}
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

// Styled Components (fixed typo in BurgerWrapper)
const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  direction: rtl;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const BurgerWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;

  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;

  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
