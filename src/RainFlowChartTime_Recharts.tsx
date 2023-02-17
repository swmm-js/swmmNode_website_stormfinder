// RainFlowChartTime_Recharts.tsx
import "./index.css"
import { ComposedChart, Bar, Line, XAxis, YAxis, 
  Legend, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { outputDataWords, outputDataUnitsWords } from "./swmm_core/wordsnKeys"
import { rechartsFormatXDateAxis } from './swmmreact'
import { colorSet01 } from "@fileops/swmm-node"

// This is the new problem. I need to read the dataType from the
// parent object, not write it to the parent object. This element
// is only for updating the series object.
const RainFlowChartTime_Recharts = 
  ({
    rainfall, // Array of rainfall data
    outdir,   // directory format of output file
    series,   // Array of target output data
    objectType,// Object type of output data ('LINK', 'NODE')
    dataType, // Data type of output data ( a selection from OUTDATATYPES.LINK, OUTDATATYPES.NODE, etc)
    objNames, // String names of target output objects.
    width='95%', 
    height=250
  }: any) => {
  let dataLoaded = false;
  let dataMessage = 'No Data Loaded'
  let stationName = ''

  if(rainfall && rainfall.length > 0){
    stationName = Object.keys(rainfall[0]).find((el:any) => el !== 'time') || ''
  }

  if(rainfall?.length === 0){
    dataMessage = "No Data for Selected Station"
    dataLoaded = false
  }
  else if(stationName === ''){
    dataMessage = "No Station Selected"
    dataLoaded = false
  }
  else dataLoaded = true

  let mergedData = []
  if(series?.length > 0 &&
    Object.keys(outdir).length > 0 &&
    rainfall?.length > 0){
    const map = new Map()
    series.forEach((item:any) => map.set(item.time, item))
    rainfall.forEach((item:any) => map.set(item.time, {...map.get(item.time), ...item}))
    mergedData = Array.from(map.values())
  } else if(rainfall?.length > 0){
    mergedData = rainfall
  } else if(series?.length > 0 && Object.keys(outdir).length > 0){
    mergedData = series
  }

  if(dataLoaded)
  return (
    <>
      {
        //series?.length > 0 &&
        //Object.keys(outdir).length > 0 &&
        mergedData.length > 0 &&
        <ResponsiveContainer width={width} height={height} >
          <ComposedChart data={mergedData}>
            <Tooltip 
              contentStyle={{padding: '5px', margin: '5px 5px 5px 20px'}}
              wrapperStyle={{ outline: 'none' }}
              labelStyle={{fontSize: '0.75em'}}
              itemStyle={{fontSize: '0.75em'}}
              labelFormatter={(d)=>{ return'Date: ' + rechartsFormatXDateAxis(d, 0)}} 
              formatter={(value, name, props)=>[Math.round((parseFloat(value.toString()) + Number.EPSILON)*1000)/1000, name]} />
            <XAxis 
              dataKey='time'
              scale='time'
              type='number'
              domain={ ['auto', 'auto'] }
              style={{ fontSize: '0.75rem' }}
              tickLine={true}
              tickFormatter={rechartsFormatXDateAxis}
              label={{ value: 'Date/Time', position: 'center', dy: 15, fontSize: '0.9rem'}}/>
            <YAxis 
              yAxisId={1}
              orientation='right'
              domain={ [0, (d:number)=>{ return Math.round((parseFloat((d*4).toString()) + Number.EPSILON)*1000)/1000 }] }
              style={{fontSize: "0.75rem"}}
              tickLine={true}
              label={{ value:"rainfall, inches", angle:-90, position:"center", dx:20, fontSize:"0.8rem" }} 
              reversed />
            <YAxis 
              yAxisId={2}
              domain={ ['auto',  (d:number)=>{ return Math.round((parseFloat((d*4/3).toString()) + Number.EPSILON)*1000)/1000 }] }
              style={{fontSize: "0.75rem"}}
              tickLine={true}
              label={{ value:outputDataWords[objectType][dataType] + ", " + outputDataUnitsWords[objectType][dataType][outdir?.OpeningRecords?.UnitsSystem](outdir?.OpeningRecords?.FlowUnitCode), angle:-90, position:"center", dx:-30, fontSize:"0.8rem" }} />
            <CartesianGrid stroke="#c6c6c6" />
            <Legend 
              iconType="plainline"
              align="right"
              layout="vertical" 
              verticalAlign="middle"
              wrapperStyle={{ border:"2px solid rgba(50, 50, 120, 0.5)", padding:"0 0.5rem", margin:"0 2rem", top:"10px", right:"-40px", height:"70%", overflow:"auto", fontSize:"0.8em" }} />
            <Bar
                yAxisId={1}
                name={stationName}
                type="monotone" 
                dataKey={stationName} 
                animationDuration={250}/>
            {
              objNames
                .map((el:any, i:number)=> 
                  <Line
                    yAxisId={2}
                    key={i} 
                    name={el}
                    dot={false}
                    type="monotone" 
                    dataKey={el} 
                    stroke={colorSet01(i)}
                    animationDuration={250}/>
                )
      }
          </ComposedChart>
        </ResponsiveContainer>
      }
    </>
  )
  else return (
    <>
      {<div style={{border: '3px solid black', borderRadius: '3px', position: 'relative', width:width, height:height}}>
        <ResponsiveContainer   >
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:width, height:height}}><strong>{dataMessage}</strong></div>
        </ResponsiveContainer>
  </div>}
    </>
  )
}
 
export {RainFlowChartTime_Recharts}