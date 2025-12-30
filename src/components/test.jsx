export default function Test(){
    return(
        <div className="w-[600px] h-[600px] border-4 relative">
        <div className="w-[500px] h-[500px] bg-amber-300 flex flex-col justify-center items-center">
          <div className="w-[75px] h-[75px] bg-blue-600">
          </div>
          <div className="w-[75px] h-[75px] bg-red-600">
          </div>
          <div className="w-[75px] h-[75px] bg-green-700 absolute top-[10px] right-[10px]">
          </div>
          <div className="w-[75px] h-[75px] bg-purple-600 fixed top-[10px] right-[150px]">
          </div>
          <div className="w-[75px] h-[75px] bg-neutral-950">
          </div>
          <div className="w-[75px] h-[75px] bg-cyan-400">
          </div>
        </div>
    </div>
    )
}