import React, { useState } from "react";
import Router from "./Router";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";
import { darkTheme, lightTheme } from "./theme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
const GlobalStyle = createGlobalStyle`
  
  /* http://meyerweb.com/eric/tools/css/reset/
     v5.0.1 | 20191019
     License: none (public domain)
  */
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');
  
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body{
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    line-height: 1.2;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;
const ThemeChangeButton = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.containerBgColor};
  padding: 7px;
  border-radius: 10px;
  color: ${(props) => props.theme.containerTextColor};
  &:hover {
    color: ${(props) => props.theme.accentContainerBgColor};
    background-color: ${(props) => props.theme.accentContainerTextColor};
  }
  &:active {
    color: ${(props) => props.theme.accentOnColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const themeClickHandler = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ThemeChangeButton onClick={themeClickHandler}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </ThemeChangeButton>
      <GlobalStyle />
      <HelmetProvider>
        <Router />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;
