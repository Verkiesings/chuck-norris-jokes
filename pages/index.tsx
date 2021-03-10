import React from 'react';
import Head from 'next/head';
import { withApollo } from '../apollo/client';
import Joke from '../components/Joke';

const Index = () => (
  <div>
    <Head>
      <title>Chuck-Norris</title>
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#2a2a2a" />
      <link rel="stylesheet" href="https://use.typekit.net/lqv1kpu.css" />
    </Head>
    <div className="wrapper">
      <Joke />
    </div>
    <style jsx global>
      {`
      :root {
        --fg: #a9a9a9;
        --bg: #2a2a2a;
        --accent: #202020;
        --primary: #f15a24;
        --font: canada-type-gibson, sans-serif;
      }
      body {
        background-color: var(--bg);
        color: var(--fg);
        font-family: canada-type-gibson;
        transition: 300ms ease-in-out;
        margin: 0;
      }
      a {
        color: var(--primary);
        text-decoration: none;
      }
      a:hover {
        cursor: pointer;
      }
      select {
        text-align: center !important;
      }
      .wrapper {
        margin: 0 auto;
        width: 100%;
        max-width: 578px;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
    `}
    </style>
  </div>
);

export default withApollo(Index);
