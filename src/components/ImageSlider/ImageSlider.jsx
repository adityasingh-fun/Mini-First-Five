import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill,BsArrowRightCircleFill } from "react-icons/bs";
import './ImageSlider.css'

const ImageSlider = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleRightClick = (getIndex)=>{
    console.log(getIndex)
    setCurrentImage(getIndex === data.length -1 ? 0 : currentImage +1)
  }

  const handleLeftClick = (getIndex)=>{
    console.log(getIndex)
    setCurrentImage(getIndex === 0 ?  data.length -1: currentImage -1)
  }

  const fetchImages = async (getUrl) => {
    setLoading(true);
    try {
      const response = await fetch(getUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch data. Please try again");
      }
      const getData = await response.json();
      console.log(getData);
      setData(getData);
      setLoading(false);
    } catch (error) {
      seterrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(url);
  }, []);

  console.log("Cuurent Image",currentImage)
  if (loading) return <div>Loading data! Please wait.</div>;
  if (errorMessage) return <div> {errorMessage} </div>;
  return (
    <div className="slider-main">
      <h1>Image Slider</h1>
      <div className="slider-wrapper">
        <BsArrowLeftCircleFill onClick={()=>handleLeftClick(currentImage)} className="arrow arrow-left"/>
        {data && data.length
          ? data.map((item, index) => {
              return (
                <div className="slider-div" key={index}>
                  {currentImage === index ? <img src={item.download_url} alt="" />:null}
                </div>
              );
            })
          : null}
          <BsArrowRightCircleFill onClick={()=>handleRightClick(currentImage)} className="arrow arrow-right" />
            <div className="indicators">
                {
                    data && data.length ?
                    data.map((item,index)=>{
                        return <button className={index === currentImage? "active-indicator":"inactive-indicator"} onClick={()=>setCurrentImage(index)}></button>
                    })
                    : null
                }
            </div>
      </div>
    </div>
  );
};

export default ImageSlider;
