import { useState } from "react"
import uploadFile from "../utils/mediaUpload"


export default function Test(){
     
   
    const [ file , setFile ] = useState(null)
    
    async function upload(){
        try{

            const url = await uploadFile(file)
            console.log(url)

        }catch{
            console.log("Upload failed")
        }
    }


    return(

        <div className="w-full h-full bg-amber-100 flex justify-center items-center">

                <input type="file" onChange={
                    (e)=>{
                        setFile(e.target.files[0])
                    }
                }/>

            <button onClick={upload} className="w-[100px] h-[40px] bg-blue-800 text-white rounded-lg">
                Upload
            </button>

        </div>

    )
}