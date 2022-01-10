import Head from 'next/head'
import Image from 'next/image';
import React from 'react';
import { FaMicrophoneAlt, FaHeadphonesAlt, FaTh } from "react-icons/fa";
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

export default class Demo extends React.Component {
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
        // this.removeEventListener("keydown", this.handleKeyboardShortcut);
    }

    statusBubble(status: UserStatus): React.Component {
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
                                    return (
                                        <span key={i} className={"flex flex-row items-center border-t-2 py-2 px-2 justify-items-start w-60 ease-in-out duration-300 " + (this.state.selectedChannel == i ? "bg-gray-300 scale-105 shadow-2xl" : " ")}>
                                            <span className='relative flex mr-2'>
                                                <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                                
                                                {this.statusBubble(friend.status)}

                                                <Image src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" + (friend.systemAvatar) + ".svg"} alt="profile" width={50} height={50} />
                                            </span>
                        
                                            <span className='flex flex-col'>
                                                <font className="text-sm text-black font-bold">{friend.name} </font>
                        
                                                <font className={"text-xs font-sans text-gray-300" + (this.state.selectedChannel == i ? "text-black" : " ")}>{friend.role}</font>
                                            </span>                                        
                                            
                                            {
                                                this.state.selectedChannel == i ? 
                                                <>
                                                    <span className="rounded-lg p-2 ml-auto bg-gray-400 shadow-lg w-10 h-10 text-center">
                                                        <font className="text-white text-sm">{i}</font>
                                                    </span>
                                                </>
                                                
                                                :
                                                <span className="rounded-lg p-2 ml-auto border border-gray-100 shadow-md w-10 h-10 text-center">
                                                    <font className="text-gray-200 text-sm">{i}</font>
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
                
                <div className='fixed bottom-10 w-full'>
                    {/* dynamic footer based on selection */}
                    <section className={"flex flex-row bg-gray-300 max-w-screen-md mx-auto p-5 shadow-xl rounded-xl justify-between ease-in-out duration-300 scale-0" + (this.state.selectedChannel != null ? "scale-100" : " ")}>
                        <span className='flex flex-row'>
                            <span className='relative flex mr-2'>
                                <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                                
                                {this.statusBubble(UserStatus.online)}

                                <Image src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" + (this.state.selectedChannel == null ? "" : testFriends[this.state.selectedChannel].systemAvatar) + ".svg"} alt="profile" width={50} height={50} />
                            </span>
        
                            <span className='flex flex-col'>
                                <font className="text-sm text-black font-bold">{this.state.selectedChannel == null ? "" : testFriends[this.state.selectedChannel].name} </font>
        
                                <font className={"text-xs font-sans text-gray-300 text-black"}>{this.state.selectedChannel == null ? "" : testFriends[this.state.selectedChannel].role}</font>
                            </span> 
                        </span>

                        {/* shortcuts */}
                        <span className='flex flex-row space-x-3'>
                            <span className="rounded-lg p-2 ml-auto bg-gray-400 shadow-lg w-10 h-10 text-center">
                                <font className="text-white text-sm font-bold">R</font>
                            </span>
                            <span className="rounded-lg p-2 ml-auto bg-gray-400 shadow-lg w-20 h-10 text-center">
                                <font className="text-white text-sm font-bold">SPACE</font>
                            </span>
                        </span>
                    </section>
                </div>
                
            </>
            )
    }
    
}