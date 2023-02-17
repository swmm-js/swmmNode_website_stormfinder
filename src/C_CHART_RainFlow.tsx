// C_CHART_RainFlow.tsx
/*import { useState, useEffect } from "react"
import { GetRainfall_func, GetStations_func, PointsToGeoJSON, SimplifyRainfall } from "./API_UKgovDataRaingages"
import "./index.css"
import { 
  // Data Type options
  OUTDATATYPES,
  // swmmReact data management
  OUTSeriesTransformer_func,
  OUTLinksMultiSelect,
  // Charting component
  RainFlowChartTime_Recharts,
  PointsMap,
  SetTimeSeries
  } from "./swmmreact"
  
import { parseInfo } from "./swmmjs_module"

// This is a contained form that allows a user to 
// select an object and display the related output
// using a Recharts structure.

const C_CHART_RainFlow = ({inpModel, setInpModel, out, rpt, setRpt}:any) => {
  // State for JSON of the .out file.
  const [outdir, setOutdir] = useState({})
  // List of raingages and locations.
  const [raingageList, setRaingageList] = useState([])
  // List of target links.
  const [targetObjects, setTargetObjects] = useState([])
  // Target rain sensor.
  const [targetRainSensor, setTargetRainSensor] = useState(undefined)
  // rainfall from the target rain sensor.
  const [rainfall, setRainfall] = useState(undefined)
  // Start Date of retrieved rainfall. 
  // For date iOS compatibility, use format new Date(2022, 11, 28, 0, 0, 0)
  const [startDate, setStartDate] = useState(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000))
  // End Date of retrieved rainfall
  const [endDate, setEndDate] = useState(new Date())
  // Data type of output display.
  const [dataType, setDataType] = useState(OUTDATATYPES.LINK.FLOWRATE)
  // Object type of output display.
  const [objectType, setObjectType] = useState('LINK')
  // Series of output data.
  const [series, setSeries] = useState([])

  useEffect(() => {
    GetStations_func ({
      parameter:'rainfall', 
      setStations:setRaingageList,
      period:0,
      unitName:'mm',
      limit:100,
      transformer:PointsToGeoJSON})
  }, [])

  useEffect(() => {
    GetRainfall_func({
    setRainfall:setRainfall, 
    stationID:targetRainSensor,
    startDate:startDate,
    endDate: undefined,
    parameter:'rainfall',
    unitName:'mm',
    transformer:SimplifyRainfall})
  }, [targetRainSensor, startDate, endDate])

  useEffect(() => { 
    if (startDate && endDate && inpModel?.OPTIONS){
      console.log(startDate)
      setInpModel({...inpModel, OPTIONS: { ...inpModel.OPTIONS, 
        START_DATE:        (startDate.getMonth() + 1).toString().padStart(2, "0") +'/'+startDate.getDate().toString().padStart(2, "0")+'/'+startDate.getFullYear(), 
        REPORT_START_DATE: (startDate.getMonth() + 1).toString().padStart(2, "0") +'/'+startDate.getDate().toString().padStart(2, "0")+'/'+startDate.getFullYear(), 
        END_DATE:          (  endDate.getMonth() + 1).toString().padStart(2, "0") +'/'+  endDate.getDate().toString().padStart(2, "0")+'/'+  endDate.getFullYear(),
        START_TIME:        (startDate.getHours()    ).toString().padStart(2, "0") +':'+startDate.getMinutes().toString().padStart(2, "0"), 
        REPORT_START_TIME: (startDate.getHours()    ).toString().padStart(2, "0") +':'+startDate.getMinutes().toString().padStart(2, "0"), 
        END_TIME:          (  endDate.getHours()    ).toString().padStart(2, "0") +':'+  endDate.getMinutes().toString().padStart(2, "0"), 
        REPORT_STEP: '00:15'
      }})

      SetTimeSeries({model: inpModel,
        setModel:setInpModel,
        newTimeSeries:rainfall})
    }
  }, [startDate, endDate, rainfall, targetRainSensor])

  useEffect(() => { 
    if (startDate && endDate && inpModel?.OPTIONS){
      OUTSeriesTransformer_func({objectType:objectType, dataType:dataType, objNames:targetObjects,
        setSeries:setSeries, outbin:out})
    }
  }, [objectType, dataType, targetObjects, out])

  useEffect(() => {
    setOutdir(parseInfo(out))
  }, [out])

  // Set the dimensions for the chart
  let height = 250
  let width = '95%'

  return (
    <>
      <RainFlowChartTime_Recharts
        rainfall={rainfall}
        outdir  ={outdir}
        series  ={series}
        objectType={objectType}
        dataType={dataType}
        objNames={targetObjects}
        width={width} height={height} />

      <label htmlFor='node'>Link</label>
      <OUTLinksMultiSelect outdir={outdir}
        objectType={objectType}
        setTargets={setTargetObjects}/>
    </>
  )
}

export { C_CHART_RainFlow }*/