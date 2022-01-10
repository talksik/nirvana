import Head from 'next/head'
import Image from 'next/image';
import React from 'react';
import { FaMicrophoneAlt, FaHeadphonesAlt, FaTh } from "react-icons/fa";

let testFriends = [
    {
        name: "Liam",
        role: "engineer",
        systemAvatar: "1",
        status: "online"
    },
    {
        name: "Emily",
        role: "engineer",
        systemAvatar: "2",
        status: "online"
    },
    {
        name: "Paul",
        role: "architect",
        systemAvatar: "3",
        status: "online"
    },
    {
        name: "Mark",
        role: "engineer",
        systemAvatar: "4",
        status: "busy"
    },
    {
        name: "Adriana",
        role: "design",
        systemAvatar: "5",
        status: "busy"
    },
    {
        name: "Josh",
        role: "design",
        systemAvatar: "6",
        status: "offline"
    }
]

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChannel: 1
        }
    }

    statusBubble(status) {

    }

    render() {
        return (
            <div className="container mx-auto max-w-screen-xl pt-10 flex flex-col">
                <Head>
                    <link
                    href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2&display=swap"
                    rel="stylesheet"
                    />
        
                    <link
                    href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
                    rel="stylesheet"
                    />
                </Head>
                
                {/* header content */}
                <section className="flex-1 flex flex-row items-center justify-between py-5">
                    {/* welcome message */}
                    <span className='flex flex-col'>
                        <font className="font-sans font-bold text-xl">👋Hey Arjun, Good Afternoon!</font>
                        
                    </span>
                    
                    {/* avatar */}
                    <span className="flex flex-row items-center space-x-5">
                        <FaHeadphonesAlt className='text-lg text-gray-400 hover:text-teal-900 ease-in-out duration-300 hover:scale-110 hover:cursor-pointer' />
                        <FaMicrophoneAlt className='text-lg text-gray-400 hover:text-teal-900 ease-in-out duration-300 hover:scale-110 hover:cursor-pointer' />
                        <FaTh className='text-lg text-gray-400 hover:text-teal-900 ease-in-out duration-300 hover:scale-110 hover:cursor-pointer' />
                        <span className='relative flex'>
                            <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                            <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
                            <Image src="/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-05.svg" alt="profile" width={50} height={50} />
                        </span>
                    </span>
                </section>
                
                <div className='flex flex-row items-baseline space-x-5'>
                    {/* personal line */}
                    <section className='flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md'> 
                        <span className='p-5 flex flex-col'>
                            <span className="text-gray-300">PERSONAL LINE</span>
                            <font className="font-sans text-sm text-gray-400 pt-2">
                                <font className="rounded-full p-1 bg-opacity-30 bg-teal-700 text-teal-700 font-bold">3</font> teammates open for collab</font>
                        </span>
                        
                        {/* list of team members */}
                        {
                            testFriends.map((friend, i) => {
                                console.log(friend)
                                return (
                                    <span key={i} className={`flex flex-row items-center border-t-2 py-2 px-2 justify-items-start w-60${this.state.selectedNumber == i ? "bg-gray-300" : " "}`}>
                                        <span className='relative flex mr-2'>
                                            <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                            <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
                                            <Image src="/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-05.svg" alt="profile" width={50} height={50} />
                                        </span>
                    
                                        <span className='flex flex-col'>
                                            <font className="text-sm text-black font-bold">{friend.name} {friend.status}</font>
                    
                                            <font className="text-gray-300 text-xs font-sans">{friend.role}</font>
                                        </span>
                                        
                                        
                                        {
                                            this.state.selectedNumber == i ? 
                                            <span className="rounded-lg p-2 ml-auto border border-gray-300 shadow-lg">
                                                <font className="text-gray-200">{i}</font>
                                            </span>
                                            
                                            :

                                            <span className="rounded-lg p-2 ml-auto border border-gray-100 shadow-md">
                                                <font className="text-gray-200">{i}</font>
                                            </span>
                                        }
                                    </span>
                                )
                            })
                        }
                    </section>
        
                    {/* live conversations */}
                    <section className='p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md'> 
                        <span className="text-gray-300">LIVE CONVERSATIONS</span>
        
                        <span>
        
                        </span>
                    </section>
                </div>
                
                
                {/*  */}
                <section className=''>
        
                </section>
            </div>
            )
    }
    
}