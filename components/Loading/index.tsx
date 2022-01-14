import { Divider } from "antd";

export default function Loading() {
  return (
    <div 
      className="container mx-auto flex flex-col max-w-md m-10 bg-white p-10 rounded-lg shadow-md space-y-5 items-center animate-pulse"
    >
      {/* header */}
      <div className="flex flex-row space-x-2">

        <div className="animate-pulse w-8 h-8 border-4 rounded-full border-teal-300" role="status">
        </div>
        
        <div className="text-lg text-center">Loading</div>

        
      </div>
      
    </div>
  )
}