import Head from 'next/head'
import Image from 'next/image';
import React from 'react';
import { FaMicrophoneAlt, FaHeadphonesAlt, FaTh, FaAngleDown, FaPlusSquare, FaBroom, FaBell } from "react-icons/fa";
import { IoPulseOutline, IoRemoveOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

import { UserStatus, User } from '../../models/user'
import { KeyCode } from '../../globals/keycode'

let testFriends = [ 
    {
        name: "Liam",
        role: "engineer",
        systemAvatar: "01",
        status: UserStatus.online
    },
    {
        name: "Emily",
        role: "engineer",
        systemAvatar: "02",
        status: UserStatus.online
    },
    {
        name: "Paul",
        role: "architect",
        systemAvatar: "03",
        status: UserStatus.online
    },
    {
        name: "Mark",
        role: "engineer",
        systemAvatar: "04",
        status: UserStatus.busy
    },
    {
        name: "Adriana",
        role: "design",
        systemAvatar: "05",
        status: UserStatus.busy
    },
    {
        name: "Josh",
        role: "design",
        systemAvatar: "06",
        status: UserStatus.offline
    }
]

type MyProps = {  };
type MyState = {
    selectedChannel?: number
};


export default class Demo extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedChannel: null
        }

        this.handleKeyboardShortcut = this.handleKeyboardShortcut.bind(this);
    }

    componentDidMount(): void {
        document.addEventListener("keydown", this.handleKeyboardShortcut)
    }

    componentWillUnmount(): void {
        document.removeEventListener("keydown", this.handleKeyboardShortcut);
    }

    statusBubble(status: UserStatus) {
        console.log(status)

        switch(status) {
            case UserStatus.online:
                return <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
            case UserStatus.busy:
                return <span className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full"></span>
            case UserStatus.offline:
                return <span className="absolute top-0 right-0 w-3 h-3 bg-gray-400 rounded-full"></span>
            default:
                return <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
        }
    }

    renderPulse(status: UserStatus) {
        switch(status) {
            case UserStatus.online:
                return <IoPulseOutline className="text-green-500 text-2xl animate-pulse mx-2 ml-auto" />
            case UserStatus.busy:
                return <IoPulseOutline className="text-orange-400 text-2xl animate-pulse mx-2 ml-auto" />
            case UserStatus.offline:
                return <IoRemoveOutline className="text-gray-400 text-2xl mx-2 ml-auto" />
            default:
                return <IoPulseOutline className="text-green-400 text-2xl animate-pulse mx-2 ml-auto" />
        }
    }

    handleKeyboardShortcut(event) {    
        console.log(event.keyCode)

        switch(event.keyCode) {
            case KeyCode.Zero:
                this.setState({
                    selectedChannel: 0
                });
                break 
            case KeyCode.One:
                this.setState({
                    selectedChannel: 1
                });
                break 
            case KeyCode.Two:
                this.setState({
                    selectedChannel: 2
                });
                break 
            case KeyCode.Three:
                this.setState({
                    selectedChannel: 3
                });
                break 
            case KeyCode.Four:
                this.setState({
                    selectedChannel: 4
                });
                break
            case KeyCode.Five:
                this.setState({
                    selectedChannel: 5
                });
                break
            default:
                return
        }
    }

    render() {
        return (
            <>
                <div className="container mx-auto max-w-screen-xl pt-10 flex flex-col space-y-5">
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
                            <span className="font-sans font-bold text-xl text-white">👋Hey Arjun, Good Afternoon!</span>
                            <span className="font-sans text-md text-gray-300">you collabed <span className="text-green-500">1.5 hours</span> and worked <span className="text-orange-500">2 hours</span> yesterday</span>
                        </span>
                        
                        {/* avatar */}
                        <span className="flex flex-row items-center space-x-5">
                            <FaBell className='text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer' />
                            <FaHeadphonesAlt className='text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer' />
                            <FaMicrophoneAlt className='text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer' />
                            <FaTh className='text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer' />
                            <span className='relative flex'>
                                <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
                                <Image src="/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-05.svg" alt="profile" width={50} height={50} />
                            </span>
                        </span>
                    </section>
                    
                    <div className='flex flex-row items-baseline space-x-5'>
                        {/* personal line */}
                        <section className='p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md'> 
                            <span className='pb-1 flex flex-col'>
                                <span className="text-white">TEAM</span>
                            </span>
                            
                            {/* list of team members */}
                            {
                                testFriends.map((friend, i) => {
                                    return (
                                        <span key={i} className={"flex flex-row items-center py-2 px-2 justify-items-start ease-in-out duration-300 " + (this.state.selectedChannel == i ? "bg-gray-300 scale-105 shadow-2xl" : " ")}>
                                            <span className='relative flex mr-2'>
                                                <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>
                                                
                                                {this.statusBubble(friend.status)}

                                                <Image src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" + (friend.systemAvatar) + ".svg"} alt="profile" width={50} height={50} />
                                            </span>
                        
                                            <span className='flex flex-col mr-10'>
                                                <span className='flex flex-row items-center space-x-2'>
                                                    <span className="text-sm text-white font-bold">{friend.name} </span>
                                                    {
                                                        this.state.selectedChannel == i ? 
                                                        <>
                                                            <button className="rounded-lg bg-gray-400 shadow-lg text-center text-white text-sm py-1 px-2 ">
                                                                {i}
                                                            </button>
                                                        </>
                                                        
                                                        :
                                                        <button className="rounded-lg border py-1 px-2 border-gray-100 shadow-md text-center text-gray-200 text-sm">
                                                            {i}
                                                        </button>
                                                    }
                                                </span>


                                                <span className={"text-xs span-sans text-gray-300" + (this.state.selectedChannel == i ? "text-black" : " ")}>{friend.role}</span>
                                            </span>
                                            
                                            

                                            {this.renderPulse(friend.status)}
                                        </span>
                                    )
                                })
                            }
                        </section>
            
                        <div className='flex flex-1 flex-col space-y-5 items-baseline'>
                            {/* announcements */}
                            <section className='p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md'> 
                                <span className='flex flex-row justify-end space-x-2 pb-5'>
                                    <span className="text-white mr-auto">ANNOUNCEMENTS</span>

                                    

                                    <span className='text-sm text-gray-300 flex flex-row items-center'>
                                        TODAY <FaAngleDown />
                                    </span>
                                </span>
                
                                <div className="flex flex-row overflow-auto whitespace-nowrap space-x-5">
                                            <span className='relative mr-2 grid items-center justify-items-center p-4'>
                                                <span className="bg-white bg-opacity-50 rounded-full shadow-md absolute w-full h-full"></span>
                                                <FaMicrophoneAlt className='text-xl text-white' />
                                            </span>
                                    {
                                         testFriends.map((friend, i) => {
                                            return (
                                            <span key={i} className='relative mr-2 grid items-center justify-items-center'>
                                                <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>
                                                
                                                {this.statusBubble(friend.status)}

                                                <Image src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" + (friend.systemAvatar) + ".svg"} alt="profile" width={50} height={50} />
                                            </span>
                                            )
                                         })
                                    }
                                </div>
                            </section>

                            {/* rooms */}
                            <section className='p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md'> 
                                <span className='flex flex-row justify-end space-x-2 pb-5 items-center'>
                                    <span className="text-white mr-auto">ROOMS</span>

                                    <FaBroom className='text-xl text-white' />

                                    <button className='bg-transparent hover:bg-white text-white font-semibold hover:text-black py-1 px-4 border border-white-500 hover:border-transparent rounded'>
                                            Create
                                        </button>

                                    <BsThreeDots className='text-xl text-white' />
                                </span>
                
                                {/* all rooms */}
                                <span className='flex flex-row space-x-2'>

                                    {/* bugs room */}
                                    <span className='flex flex-col bg-white bg-opacity-60 p-5 rounded-lg'>
                                        <span className='flex flex-row justify-between items-center space-x-1'>
 
                                            <span className='flex flex-row pr-10'>
                                                <span className="inline-flex flex-row-reverse items-center">
                                                    <span className=''>
                                                        <Image className="" src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-20.svg"} alt="profile" width={30} height={30} />
                                                    </span>
                                                    <span className='-mr-4'>
                                                        <Image className="" src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"} alt="profile" width={30} height={30} />
                                                    </span>
                                                </span>
                                                

                                                <span className='flex flex-col items-baseline'>
                                                    <span className='font-bold text-black mr-auto'>Bugs</span>
                                                    <span className='text-xs text-gray-400'>started 5 minutes ago</span>
                                                </span>
                                                
                                            </span>
                                            

                                            <button className='ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded'>
                                                Join
                                            </button>
                                        </span>
                                        
                                    </span>
                                </span>
                            </section>
                        </div>
                        
                    </div>
                    
                </div>
                
                <div className='fixed bottom-10 w-full'>
                    {/* logo */}
                    <div className='left-0 -bottom-5 absolute pl-5'>
                        <p id="main-title">nirvana</p>
                    </div>
                            
                    {/* dynamic footer based on selection */}
                    <section className={"flex flex-row bg-gray-300 max-w-screen-md mx-auto p-5 shadow-xl rounded-xl justify-between ease-in-out duration-300 scale-0" + (this.state.selectedChannel != null ? "scale-100" : " ")}>
                        <span className='flex flex-row'>
                            <span className='relative flex mr-2'>
                                <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                
                                {this.statusBubble(UserStatus.online)}

                                <Image src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" + (this.state.selectedChannel == null ? "" : testFriends[this.state.selectedChannel].systemAvatar) + ".svg"} alt="profile" width={50} height={50} />
                            </span>
        
                            <span className='flex flex-col'>
                                <span className="text-sm text-black font-bold">{this.state.selectedChannel == null ? "" : testFriends[this.state.selectedChannel].name} </span>
        
                                <span className={"text-xs font-sans text-gray-300 text-black"}>{this.state.selectedChannel == null ? "" : testFriends[this.state.selectedChannel].role}</span>
                            </span> 
                        </span>

                        {/* shortcuts */}
                        <span className='flex flex-row space-x-3'>
                            <span className="rounded-lg p-2 ml-auto bg-gray-400 shadow-lg w-10 h-10 text-center animate-pulse">
                                <span className="text-white text-sm font-bold">R</span>
                            </span>
                            <span className="rounded-lg p-2 ml-auto bg-gray-400 shadow-lg w-20 h-10 text-center animate-pulse">
                                <span className="text-white text-sm font-bold">SPACE</span>
                            </span>
                        </span>
                    </section>
                </div>
                
            </>
            )
    }
    
}