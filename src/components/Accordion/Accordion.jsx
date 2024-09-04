import React, { useState } from "react";
import data from "./data";
import "./Accordion.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropUp } from "react-icons/md";

const Accordion = () => {
  const [singleSelect, setSingleSelect] = useState(null);
  const [isMultiSelect,setisMultiSelect] = useState(false);
  const [multiSelect,setMultiSelect] = useState([]);
  const handleOnClick = (getCurrentId) => {
    setSingleSelect(singleSelect === getCurrentId ? null : getCurrentId);
  };
  const handleButtonClick = ()=>{
    setisMultiSelect(!isMultiSelect);
    setSingleSelect(null);
    setMultiSelect([])
  }

  const handleMultiSelect = (getCurrentId)=>{
    console.log("current id",getCurrentId)
    const copyMultiple = [...multiSelect];
    const getIndex = copyMultiple.indexOf(getCurrentId);
    console.log("Index of element clicked",getIndex);
    if(getIndex === -1){
        copyMultiple.push(getCurrentId)
    }else{
        copyMultiple.splice(getIndex,1)
    }
    setMultiSelect(copyMultiple)
  }
  console.log(multiSelect);
  return (
    <div className="acc-main">
      <button onClick={()=>handleButtonClick()} >{isMultiSelect? "Enable Single Selection":"Enable Multi Selection"}</button>
      {data && data.length
        ? data.map((item,index) => {
            return (
              <div
                onClick={isMultiSelect? ()=> handleMultiSelect(index) :() => handleOnClick(item.id)}
                className="acc-item"
                key={item.id}
              >
                <div className="acc-inner-item">
                  <h2>{item.question}</h2>
                  {isMultiSelect? 
                  multiSelect.indexOf(index) ? <IoMdArrowDropdown size={20} />: <MdArrowDropUp size={20} /> 
                  :singleSelect === item.id ? (
                    <MdArrowDropUp size={20} />
                  ) : (
                    <IoMdArrowDropdown size={20} />
                  )}
                </div>
                {isMultiSelect? 
                (
                   multiSelect.indexOf(index) !== -1 ? <p>{item.answer}</p>:null
                )
                : (singleSelect === item.id ? <p>{item.answer}</p> : null)}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Accordion;
