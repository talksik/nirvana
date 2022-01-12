import Head from 'next/head'
import Image from 'next/image';
import React from 'react';
import { FaMicrophoneAlt, 
    FaHeadphonesAlt, 
    FaTh, 
    FaAngleDown, 
    FaPlusSquare, 
    FaBroom, 
    FaBell, 
    FaFilePdf,
    FaCopy, FaClock } from "react-icons/fa";
import { IoPulseOutline, IoRemoveOutline, IoTimer } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

import { UserStatus, User } from '../../models/user'
import { KeyCode } from '../../globals/keycode'

import { Tabs } from 'antd';
const { TabPane } = Tabs;

let testFriends = [ 
    {
        name: "Liam",
        role: "engineer",
        systemAvatar: "29",
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
        systemAvatar: "43",
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
        systemAvatar: "06",
        status: UserStatus.busy
    },
    {
        name: "Josh",
        role: "design",
        systemAvatar: "05",
        status: UserStatus.offline
    }
]

function getUser(name: string) : User {
    return new User()
}

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
                    {/* header content */}
                    <section className="flex-1 flex flex-row items-center justify-between py-5">
                        {/* welcome message */}
                        <span className='flex flex-col'>
                            <span className="font-bold text-xl text-white">👋Hey Arjun, Good Afternoon!</span>
                            <span className="text-md text-gray-300">you collabed <span className="text-green-500">1.5 hours</span> and worked <span className="text-orange-500">2 hours</span> yesterday</span>
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
                                <Image src="/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg" alt="profile" width={50} height={50} />
                            </span>
                        </span>
                    </section>
                    
                    <div className='flex flex-row items-baseline space-x-5 space-y-5 flex-wrap'>
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
												
                        <div className='flex-1 flex flex-col space-y-5 items-baseline'>
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
                                <span className='flex flex-row justify-end space-x-3 pb-5 items-center'>
                                    <span className="text-white mr-auto">ROOMS</span>

                                    <Tabs defaultActiveKey="1" className='text-white'>
                                        <TabPane
                                            tab={
                                                <span>
                                                All
                                                </span>
                                            }
                                            key="1"
                                            >
                                        </TabPane>
                                        <TabPane
                                            tab={
                                                <span>
                                                Live
                                                </span>
                                            }
                                            className='text-white'
                                            key="2"
                                            >
                                        </TabPane>
                                        <TabPane
                                            tab={
                                                <span>
                                                Scheduled
                                                </span>
                                            }
                                            className='text-white'
                                            key="3"
                                            >
                                        </TabPane>
                                        <TabPane
                                            tab={
                                                <span>
                                                Recurring
                                                </span>
                                            }
                                            className='text-white'
                                            key="4"
                                            >

                                                tetasedtg
                                        </TabPane>

                                        <TabPane
                                            tab={
                                                <span>
                                                Archive
                                                </span>
                                            }
                                            className='text-white'
                                            key="5"
                                            >
                                        </TabPane>
                                    </Tabs>

                                    <span className='text-sm text-gray-300 flex flex-row items-center'>
                                        TODAY <FaAngleDown />
                                    </span>

                                    <button className='bg-transparent hover:bg-white text-white font-semibold hover:text-black py-1 px-4 border border-white-500 hover:border-transparent rounded'>
                                        Create
                                    </button>

                                    <BsThreeDots className='text-xl text-white' />
                                </span>
                
                                {/* all rooms */}
                                <span className='flex flex-row flex-wrap'>
                                    {/* spontaneous room */}
                                    <span className='flex flex-col bg-white bg-opacity-80 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip'>
                                        {/* header */}
                                        <span className='flex flex-row justify-between items-baseline space-x-1 p-5'>
                                            {/* meeting details */}
                                            <span className='flex flex-col items-baseline max-w-xs pr-10'>
                                                <span className='text-gray-500 mr-auto'>bug fixing</span>
                                                <span className='text-xs text-gray-400 overflow-wrap'>were just fixing that jsx bug that's a paiiinnnn</span>                                                    
                                                
                                                {/* badges and tags */}
                                                <span className='flex flex-row flex-wrap space-x-2'>
                                                    <span className='text-xs my-3 bg-gray-400 
                                                    text-white p-1 rounded-md flex flex-row space-x-2 items-center'>
                                                        <FaClock /> 
                                                        <span>00:35</span>
                                                    </span>

                                                    <span className='text-xs my-3 text-white bg-red-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center'>                                                       
                                                        <span>blockers</span>
                                                    </span>
                                                </span>
                                            </span>

                                            {/* room status */}
                                            <span className='text-red-700 bg-red-200 p-1 rounded-md text-xs font-bold'>spontaneous</span>
                                        </span>

                                        {/* footer */}
                                        <span className='flex flex-row items-center bg-gray-400 bg-opacity-30 p-3'>
                                            <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
                                                <span className='relative flex'>
                                                    <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                                    <Image className="" src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-20.svg"} alt="profile" width={30} height={30} />
                                                </span>
                                                <span className='-mr-4 relative flex'>
                                                <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                                    <Image className="" src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"} alt="profile" width={30} height={30} />
                                                </span>
                                            </span>

                                            <span className='text-xs text-gray-400'>Arjun and Liam</span>

                                            <button className='ml-auto text-sm text-orange-500 font-semibold py-1 px-4 bg-gray-200 rounded'>👋 Leave</button>

                                            <BsThreeDots className='text-gray-400 ml-2 hover:cursor-pointer' />                                        </span>
                                        </span>

                                    {/* scheduled room */}
                                    <span className='flex flex-col bg-white bg-opacity-80 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip'>
                                        {/* header */}
                                        <span className='flex flex-row justify-between items-baseline space-x-1 p-5'>
                                            {/* meeting details */}
                                            <span className='flex flex-col items-baseline max-w-xs pr-20'>
                                                <span className='text-gray-500 mr-auto'>Design - Shopping Cart Experience</span>
                                                <span className='text-xs text-gray-400 overflow-wrap'>lets finish the mockups @josh, @mark, and @arjun please step in for feedback</span>                                                    
                                                
                                                {/* badges and tags */}
                                                <span className='flex flex-row flex-wrap space-x-2'>
                                                    <span className='text-xs my-3 bg-gray-400 
                                                    text-white p-1 rounded-md flex flex-row space-x-2 items-center'>
                                                        <FaClock /> 
                                                        <span>00:01</span>
                                                    </span>

                                                    <span className='text-xs my-3 text-white bg-purple-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center'>                                                       
                                                        <span>design</span>
                                                    </span>
                                                </span>
                                            </span>

                                            {/* room status */}
                                            <span className='flex flex-col items-center justify-start'>
                                                <span className='text-blue-700 bg-blue-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1'>
                                                    <FaClock />
                                                    <span>scheduled</span>
                                                </span>

                                                <span className='text-gray-400 text-xs'>sometime this afternoon?</span>
                                            </span>
                                        </span>

                                        {/* footer */}
                                        <span className='flex flex-row items-center bg-gray-400 bg-opacity-30 p-3'>
                                            <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
                                                <span className='relative flex'>
                                                    <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                                    <Image className="" src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-06.svg"} alt="profile" width={30} height={30} />
                                                </span>
                                            </span>

                                            <span className='text-xs text-gray-400'>Adriana</span>

                                            <button className='ml-auto text-sm bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded'>
                                                Join
                                            </button>

                                            <BsThreeDots className='text-gray-400 ml-2 hover:cursor-pointer' />                                        </span>
                                        </span>

                                    {/* recurring room */}
                                    <span className='flex flex-col bg-white bg-opacity-80 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip'>
                                        {/* header */}
                                        <span className='flex flex-row justify-between items-baseline space-x-1 p-5'>
                                            {/* meeting details */}
                                            <span className='flex flex-col items-baseline max-w-xs pr-20'>
                                                <span className='text-gray-500 mr-auto'>
                                                    Daily Standup
                                                </span>
                                                <span className='text-xs text-gray-400 overflow-wrap'></span>                                                    
                                                
                                                {/* badges and tags */}
                                                <span className='flex flex-row flex-wrap space-x-2'>
                                                    <span className='text-xs my-3 text-white bg-cyan-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center'>                                                       
                                                        <span>scrum</span>
                                                    </span>

                                                    <span className='text-xs my-3 text-white bg-teal-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center'>                                                       
                                                        <span>engineering</span>
                                                    </span>
                                                </span>
                                            </span>

                                            {/* room status */}
                                            <span className='flex flex-col items-center justify-start'>
                                                <span className='text-yellow-700 bg-yellow-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1'>
                                                    <IoTimer />
                                                    <span>recurring</span>
                                                </span>

                                                <span className='text-gray-400 text-xs'>10am daily</span>
                                            </span>
                                        </span>

                                        {/* footer */}
                                        <span className='flex flex-row items-center bg-gray-400 bg-opacity-30 p-3'>

                                            <button className='ml-auto text-sm bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded'>
                                                Join
                                            </button>

                                            <FaBell className='ml-2 text-orange-500'/>

                                            <BsThreeDots className='text-gray-400 ml-2 hover:cursor-pointer' />                                        </span>
                                        </span>
                                </span>
                            </section>
                        </div>
                    </div>

                    {/* files */}
                    <section className='p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md'> 
                        <span className='flex flex-row justify-end space-x-2 pb-5 items-center'>
                            <span className="text-white mr-auto">FILES</span>
                        </span>
                        

                        <div className='flex flex-row'>
                            <div className='flex flex-row bg-gray-300 bg-opacity-25 py-5 px-3 rounded-lg items-center justify-start'>
                                <FaFilePdf className='text-4xl text-orange-300' />

                                <span className="text-gray-200 text-sm mr-10">report.pdf</span>

                                <button className='ml-auto p-2 text-sm'>
                                    <FaCopy className='text-gray-200'/>
                                </button>
                            </div>                            
                        </div>
                    </section>
                    
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
        
                                <span className={"text-xs text-gray-300 text-black"}>{this.state.selectedChannel == null ? "" : testFriends[this.state.selectedChannel].role}</span>
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