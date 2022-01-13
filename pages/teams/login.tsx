import {FaGoogle} from "react-icons/fa";

export default function Login() {
  return (
    <div className="container mx-auto max-w-screen-sm bg-white bg-opacity-80 mt-20 p-10 rounded-lg shadow-lg flex flex-col items-start">

      <button className='mx-auto text-lg text-sky-500 py-2 px-5 bg-gray-200 rounded flex flex-row items-center space-x-2 shadow-lg'>
        <FaGoogle />
        <span>Continue with Google</span>
      </button>
    </div> 
  )
}