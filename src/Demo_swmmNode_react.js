// Demo_swmmNode_react.tsx
import "./index.css"
import { UIBackground } from './UIBackground'
import { SiteNavBar } from "./SiteNavBar"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import BaseInterface from './BaseInterface';
/* eslint import/no-webpack-loader-syntax: off */
const useDidMount = require('!!raw-loader!./DisplayOutAsText.js')

const Demo_swmmNode_react = () => {
  return(
<div >
<SiteNavBar />
  <div >
    <div style={UIBackground}><h1>Model Reporting: .OUT file text translation</h1>
      <p>This demo features swmmNode model translation capabilities. Click on the <strong>'Select .out file'</strong> button to pick a <strong>.out</strong> file to translate to text. Keep in mind that web browsers can only handle so much memory, so if your <strong>.out</strong> file is very large, you may want to use swmmNode via node.js, or perform a serverside translation.
      </p>
      <p>
        The results are written out as closely as possible to the traditional <strong>.out</strong> file contents. I have made a few changes to improve readability.  You can find swmmNode compatible JavaScript below the translation, and you can always check out a copy of swmmNode for your own uses at the GitHub repo:
        </p>
        <p><a href='https://github.com/swmm-js/swmmNode'>https://github.com/swmm-js/swmmNode</a>
        </p> 
        <p>or from npm: </p>
        <p><a href='https://www.npmjs.com/package/@swmm-js/swmm-node'>https://www.npmjs.com/package/@swmm-js/swmm-node</a></p>
        <p>or just download this web page and study it:</p> 
        <p><a href='https://github.com/swmm-js/swmmNode_website_stormfinder'>https://github.com/swmm-js/swmmNode_website_stormfinder</a></p>
        <p>
        You can also contact me at <strong>issac@swmmReact.org</strong>. Thanks so much for taking the time to stop by.
        </p>

      <h2>Demo Controls</h2>
      <BaseInterface />

      <h2>Example swmmNode code</h2>
      <p>The following code window displays an example way to use swmmNode to format and display .out file contents in text format.</p>
      <SyntaxHighlighter language='javascript' style={codeStyle} showLineNumbers={true}>
        {useDidMount.default.toString()}
      </SyntaxHighlighter>
    </div>
  </div>
</div>)
}

export default Demo_swmmNode_react;