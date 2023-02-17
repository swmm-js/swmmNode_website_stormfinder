// BaseInterface.js

import './App.css'
import {useRef, useState} from 'react'
import FindStorms from './FindStorms'
import { SwmmDat } from "@fileops/swmm-node"

function BaseInterface() {
  const inputRef = useRef(null)
  // Change the following line to the name of your .out
  // file and place your .out file in the src directory.
  // For a more complex file structure, you should make an 
  // input folder and place your .out files there.
  const [swmmDat, setSwmmDat] = useState(null)

  const handleClick = () => {
    // open file input box on click.
    inputRef.current.click()
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0]

    if (!fileObj) return;

    event.target.value = null
  
    const reader = new FileReader()
    reader.onload = (e) => {
      const res = e.target.result
      setSwmmDat(new SwmmDat(res))
    }
    reader.readAsText(fileObj)
  }

  const handleDemoClick = event => {
    async function showFile () {
      // Read the output file
      const response = await fetch('./rg_data02.dat')
      await response.text()
        .then((res)=>{
          setSwmmDat(new SwmmDat(res))
      })
    }
    showFile()
  }

  return (
    <div className="App">
      <header className="App-header">
        <input 
          style={{display: 'none'}}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        <div className='demoTab'>
          <button className='demoTabLink'style={{width: '50%', border: '3px solid gray'}} onClick={handleClick}>Select .dat file</button>
          <button className='demoTabLink'style={{width: '50%', border: '3px solid gray'}} onClick={handleDemoClick}>Use demo rg_data02.dat</button>
        </div>
        <FindStorms swmmData={swmmDat} />
      </header>
    </div>
  );
}

export default BaseInterface;
