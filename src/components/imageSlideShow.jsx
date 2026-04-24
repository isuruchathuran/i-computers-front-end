import { useState } from "react";

export default function ImageSlideShow(props){
    const images = props.images;
    const [activeImage,setActiveImage] = useState(0);

    function getClasses(index){
        if (index == activeImage){
        return "w-[100px] h-[100px] object-contain rounded-[20px] border-4 border-secondary cursor-pointer";
    } else {
        return "w-[100px] h-[100px] object-contain rounded-[20px] border-4 border-accent cursor-pointer";
    }
}

    return(
        <div className="w-[500px] h-[600px] flex flex-col">
            <img src={images[activeImage]} className="h-[500px] w-full object-cover"/>
            <div className="w-full h-[100px] flex flex-row px-4 gap-4 justify-center items-center">
                {
                    images.map(
                        (img , index)=>{
                            return<img
                            onClick={
                                ()=>{
                                    setActiveImage(index)
                                }}
                            key={index}
                            src={img} 
                            className={getClasses(index)}/>
                        }
                    )
                }

            </div>
        </div>
    )
}