// DemoCode.js
import { useState, useEffect } from "react"
import { UniversalDropDown } from "./UniversalDropDown"
import { RainChartTime_Chartjs } from './RainChartTime_Chartjs'
import { SwmmDat } from "@fileops/swmm-node"
import moment from 'moment'
import './DemoCode.css'

export default function DemoCode({swmmData}) {
const [targetRG, setTargetRG] = useState()
const [IEP, setIEP] = useState(24)
const [MSV, setMSV] = useState(1)
const [startDate, setStartDate] = useState(new Date())
const [endDate, setEndDate] = useState(new Date())
const [outJSON, setOutJSON] = useState([])
const [targetPeriod, setTargetPeriod] = useState(undefined)

// If the user chooses a new time period, adjust the date for iPhone formats.
useEffect(()=>{
  if(targetPeriod){
    let v = targetPeriod.split(' ')
    let ds = v[0].split('-')
    let ts = v[1].split(':')
    let de = v[3].split('-')
    let te = v[4].split(':')
    setStartDate(moment(Date.UTC(ds[0], ds[1]-1, ds[2], ts[0], ts[1], 0)))
    setEndDate(moment(Date.UTC(de[0], de[1]-1, de[2], te[0], te[1], 0)))
  }
}, [targetPeriod])

// Process any changes to the storm parameters.
useEffect(()=>{
  processOut(swmmData)
}, [swmmData, targetRG, IEP, MSV])

useEffect(()=>{
  if(swmmData !== undefined && targetRG !== undefined){
    // Automatically detect the date extents of the file.
    let keys = Array.from(swmmData.contents.get(targetRG).keys())
    let length = keys.length
    if(length && length > 0){
      let ds = new Date(keys[0])
      let de = new Date(keys[length-1])
      // Set time to 0 because nobody wants time from anywhere but 0.
      ds.setUTCHours(0);ds.setUTCMinutes(0);ds.setUTCSeconds(0)
      de.setUTCHours(0);de.setUTCMinutes(0);de.setUTCSeconds(0)
      setStartDate(ds)
      setEndDate(de)
    }
  }
}, [swmmData, targetRG])

/**
 * Process the contents of a raingage .dat file
 * and detect storm patterns.
 * 
 * @param {swmmData} string text contents of a .dat file.
 * @returns {string} a formatted string that represents the storm events.
 */
function processOut(swmmData) {
  if(targetRG !== undefined && swmmData.contents.get(targetRG) !== undefined){
    // Detect storm patterns using swmmNode
    setOutJSON(SwmmDat.findStorms(swmmData.contents.get(targetRG), 1000*60*60*IEP, MSV))
  }
  else return ''
}

if(swmmData !== null)
  return (
    <>
    <div style={{height: "300px"}}>
      {<RainChartTime_Chartjs rg_data={swmmData.contents.get(targetRG)} startDate={startDate} endDate={endDate} />}
    </div>
 
    {<UniversalDropDown selectText={"Select a Raingage"} IDs={ Array.from(swmmData.contents.keys()) } onChange={setTargetRG} /> }

    <label>Inter-Event Period (hours): {IEP}
    <input  type = "range"
            min = "0"
            max = {72}
            step = {1}
            onChange={e=>setIEP(e.target.value)}
            value={IEP}
            style={{width: "100%"}}
    />
    </label>
    <label>Minimum Storm Volume: {MSV}
      <input  type = "range"
              min = "0"
              max = {2}
              step = {0.01}
              onChange={e=>setMSV(e.target.value)}
              value={MSV}
              style={{width: "100%"}}
      />
    </label>

    <div style={{marginTop: "15px"}}>
      <UniversalDropDown 
        selectText={"Select a Period"}
        IDs={outJSON.map((v, i)=>{
          let outString = 
            moment(v.begin).utc().format('YYYY-MM-DD HH:mm') + " to " +
            moment(v.end  ).utc().format('YYYY-MM-DD HH:mm') + "\n"
          return(outString)
        })}
        onChange={setTargetPeriod}
      />
    </div>
    </>
  )
else return (
  <>
  { swmmData &&
    <UniversalDropDown selectText={"Select a Raingage"} IDs={ Array.from(swmmData.contents.keys()) } onChange={setTargetRG} />
  }
  </>
)
}

