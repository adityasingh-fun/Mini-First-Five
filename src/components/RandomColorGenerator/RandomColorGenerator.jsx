import React, { useEffect, useState } from 'react'

const RandomColorGenerator = () => {
    const [color,setColor] = useState("");
    const [typeOfColor,setTypeOfColor] = useState("hex");

    const createIndex = (length)=>{
        return Math.floor(Math.random()*length)
    }

    const generateHexColor = ()=>{
        console.log("This is hex")
        let hexColor = "#";
        const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
        for(let i=0;i<6;i++){
            hexColor += hex[createIndex(hex.length-1)]
        }
        console.log(hexColor);
        setColor(hexColor)
    }

    const generateRgbColor = ()=>{
        console.log("This is rgb")
        const r = createIndex(256);
        const g = createIndex(256);
        const b = createIndex(256);

        setColor(`rgb(${r},${g},${b})`)
    }

    useEffect(()=>{
        if(typeOfColor === "hex"){
            generateHexColor()
        }
        else{
            generateRgbColor()
        }
    },[typeOfColor])



  return (
    <div>
      <h1>Random Color Generator</h1>
      <button onClick={()=>setTypeOfColor("hex")}>Generate Hex Color</button>
      <button onClick={()=>setTypeOfColor("rgb")}>Generate RGB Color</button>
      <button onClick={typeOfColor === "hex"? ()=>generateHexColor(): ()=> generateRgbColor()}>Generate Random Color</button>
      <div className="color-pallete" style={{
        marginTop:"40px",
        backgroundColor:color,
        width:"100%",
        height:"90vh"
      }}>
        <h1>Type Of Color: {typeOfColor === "hex" ? "HEX" : "RGB"} </h1>
        <h2>Color: {color} </h2>
      </div>
    </div>
  )
}

export default RandomColorGenerator
