//#region
import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  Button,
  Layout,
  Watermark,
  Menu,
  theme,
  ConfigProvider,
  FloatButton,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import "./App.css";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import Vietnamese locale

dayjs.locale("vi");
import viVN from "antd/locale/vi_VN";
// import NetworkStatus from "./components/NetworkStatus";
//#endregion

//#region
import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import CustomFooter from "./components/Footer";
import { Footer } from "antd/es/layout/layout";
//#endregion

import StartPage from "./components/Pages/Auth/StartPage";
import SigninPage from "./components/Pages/Auth/Signin";
import SignupPage from "./components/Pages/Auth/Signup";
import DashboardPage from "./components/Pages/Dashboard/Dashboard";
import ProtectedRoute from "./protectedRoute";

import BookPage from "./components/Pages/Book/Book";

const { Sider, Header, Content } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  zIndex: 1,
};

const SIDEBAR_WIDTH = 250;
const COLLAPSED_WIDTH = 80;

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const siderRef = useRef(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (siderRef.current && !siderRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#00b96b",
          }, // Enables the dark theme
        }}
        locale={viVN}
      >
        <div>
          <Layout>
            {isLoggedIn ? (
              <Sider
                ref={siderRef}
                style={siderStyle}
                collapsedWidth={isMobile ? 0 : 80}
                theme="dark"
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={250}
                className="sider"
              >
                <Sidebar />

                {/* Collapsed Button */}
                <Button
                  color="default"
                  shape="round"
                  variant="solid"
                  onClick={() => setCollapsed((prev) => !prev)}
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  className="triger-btn"
                  aria-label="toggle sidebar"
                />
              </Sider>
            ) : (
              <></>
            )}
            {/* sider navigation */}
            <Layout
              style={{
                marginLeft: isLoggedIn
                  ? !isMobile
                    ? collapsed
                      ? COLLAPSED_WIDTH
                      : SIDEBAR_WIDTH
                    : 0
                  : 0,
                transition: !isMobile ? "margin-left 0.3s ease" : undefined,
              }}
            >
              {isLoggedIn ? (
                <Header className="header">
                  <CustomHeader />
                </Header>
              ) : (
                <></>
              )}
              <Content className="content">
                <ScrollToTop />
                {/* <NetworkStatus /> */}
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    timeout={300}
                    classNames="fade"
                  >
                    <Routes location={location}>
                      <Route path="/" index element={<StartPage />} />
                      <Route path="/login" element={<SigninPage />} />
                      <Route path="/register" element={<SignupPage />} />
                      <Route
                        path="/system/dashboard"
                        element={
                          <ProtectedRoute>
                            <DashboardPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/system/books"
                        element={
                          <ProtectedRoute>
                            <BookPage />
                          </ProtectedRoute>
                        }
                      />
                      {/* <Route path="*" element={<Error404 />} />
                  <Route path="/403" element={<Error403 />} />
                  <Route path="/500" element={<Error500 />} />  */}
                    </Routes>
                  </CSSTransition>
                </TransitionGroup>
                {/* <FloatButton.BackTop /> */}
              </Content>
              <Footer className="footer">
                <CustomFooter />
              </Footer>
            </Layout>
            {/* main body */}
          </Layout>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
