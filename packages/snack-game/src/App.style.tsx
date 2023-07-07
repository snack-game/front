import { css } from '@emotion/react';

import Font from '@assets/fonts/Dovemayo_gothic.woff2';

export const globalStyles = css`
  @font-face {
    font-family: 'Dovemayo_gothic';
    src: url(${Font}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  input,
  textarea,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: Dovemayo_gothic, sans-serif;
  }

  a {
    background-color: transparent;
    text-decoration: none;
    outline: none;
    color: inherit;
    &:active,
    &:hover {
      text-decoration: none;
      color: inherit;
      outline: 0;
    }
  }

  button {
    cursor: pointer;
  }

  box-sizing: border-box;
`;
