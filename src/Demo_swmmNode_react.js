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
    <div style={UIBackground}><h1>Model Reporting: .DAT file storm identification</h1>
      <p>This demo features swmmNode stirn detectuib. Click on the <strong>'Select .dat file'</strong> button to pick a <strong>.dat</strong> file and select a raingage. You can modify the inter-event period and the minimum storm volume to fine-tune the storm detection algorithm. Although this is a webpage, you can also use swmmNode via node.js and keep all your work on your desktop.
      </p>
      <p>
        The format of a <strong>.dat</strong> file can be in different styles, but the format that works for this page is the raingage format. The timeseries format is best used with older versions of swmm-js, but swmmNode will soon be capable of TimeSeries storm detection.  You can find swmmNode compatible JavaScript below the translation, and you can always check out a copy of swmmNode for your own uses at the GitHub repo:
        </p>
        <p><a href='https://github.com/fileops/swmmNode'>https://github.com/fileops/swmmNode</a>
        </p> 
        <p>or from npm: </p>
        <p><a href='https://www.npmjs.com/package/@fileops/swmm-node'>https://www.npmjs.com/package/@fileops/swmm-node</a></p>
        <p>or just download this web page and study it:</p> 
        <p><a href='https://github.com/fileops/swmmNode_website_stormfinder'>https://github.com/fileops/swmmNode_website_stormfinder</a></p>
        <p>
        You can also contact me at <strong>issac@swmmReact.org</strong>. Thanks so much for taking the time to stop by.
        </p>

      <h2>Demo Controls</h2>
      <BaseInterface />

      <h2>Example swmmNode code</h2>
      <p>The following code window displays an example way to use swmmNode to detect storm extents in .dat files.</p>
      <SyntaxHighlighter language='javascript' style={codeStyle} showLineNumbers={true}>
        {useDidMount.default.toString()}
      </SyntaxHighlighter>
    </div>
  </div>
</div>)
}

export default Demo_swmmNode_react;