import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
export const SidebarLeftData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/login",
    icon: <FaIcons.FaSignInAlt />,
    cName: "nav-text",
  },
  {
    title: "Registrati",
    path: "/signup",
    icon: <FaIcons.FaUserPlus />,
    cName: "nav-text",
  },
  {
    title: "Chi Siamo",
    path: "/chisiamo",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Faq",
    path: "/faq",
    icon: <FaIcons.FaQuestionCircle />,
    cName: "nav-text",
  },
];
