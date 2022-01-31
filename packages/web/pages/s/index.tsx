import { Avatar, Badge } from "antd";
import {
  FaAngleRight,
  FaAtlassian,
  FaCheck,
  FaCheckDouble,
  FaCircle,
  FaGithub,
  FaRegClock,
  FaRocket,
  FaUser,
} from "react-icons/fa";
import React from "react";
import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";

function Me() {
  return <Convos />;
}

Me.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};

export default Me;

function Convos() {
  return (
    <>
      {/* Today */}
      <span className="flex flex-row items-center mb-5 px-5 w-full">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          Today
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="flex flex-col w-full items-stretch">
        {/* engineering */}
        <span
          className="py-2 px-4 border-t border-t-slate-200 flex flex-row hover:bg-slate-50 transition-all
         items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={1}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<FaUser />}
              />
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<FaUser />}
              />
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<FaUser />}
              />
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<FaUser />}
              />
            </Avatar.Group>

            <span className="text-slate-500 ml-2">Engineering</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`Josh: "let's just figure out how to finish the rest of the "`}
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            9:00am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>

        {/* general */}
        <span
          className="group relative border-t border-t-slate-200 hover:bg-slate-50 
        transition-all py-2 px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-slate-100 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={1}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Avatar shape="circle" src="https://picsum.photos/200/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
            </Avatar.Group>

            <span className="text-slate-600 ml-2">General</span>
          </span>

          <span className="text-slate-300 w-[10rem] truncate text-sm">
            You spoke 2 hours ago
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            7:22am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>

        {/* one on one chat with sydney */}
        <span
          className="group py-2 border-t border-t-slate-200 last:border-b hover:bg-slate-50 transition-all
         relative px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={2}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Badge dot color={"green"}>
                <Avatar shape="circle" src="https://picsum.photos/200/100" />
              </Badge>
            </Avatar.Group>

            <span className="text-slate-600 ml-2">Sydney</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`"Did you ever figure out that problem with the "`}
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            6:50am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>
      </span>

      <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          Last 7 Days
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="flex flex-col w-full items-stretch">
        <span
          className="group py-2 border-t border-t-slate-200 last:border-b hover:bg-slate-50 transition-all
         relative px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={2}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Badge dot color={"green"}>
                <Avatar shape="circle" src="https://picsum.photos/240/100" />
              </Badge>
            </Avatar.Group>

            <span className="text-slate-600 ml-2">Justin</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`"Here's a quick github link for that library you were looking for"`}
          </span>

          <span className="flex flex-row items-center space-x-2 mx-auto">
            <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
              <FaGithub className="text-slate-400 text-xl shrink-0" />
            </span>

            <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
              <FaAtlassian className="text-sky-400 text-xl shrink-0" />
            </span>
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            6:50am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>

        <span
          className="group py-2 border-t border-t-slate-200 last:border-b hover:bg-slate-50 transition-all
         relative px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={2}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Avatar shape="circle" src="https://picsum.photos/190/100" />
              <Avatar shape="circle" src="https://picsum.photos/192/100" />
            </Avatar.Group>

            <span className="text-slate-600 ml-2">Steph and Lee</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`"Let's hop into a room to discuss this sometime this afternoon..."`}
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            6:50am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>
      </span>

      <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          Earlier This Month
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          November 2021
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="mx-auto text-slate-300">{"That's all"}</span>
    </>
  );
}