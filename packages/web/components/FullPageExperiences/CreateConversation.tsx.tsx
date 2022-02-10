import User from "@nirvana/common/models/user";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowRight,
  FaPlus,
  FaRegTimesCircle,
  FaSearch,
} from "react-icons/fa";
import { usersIndex } from "../../services/algoliaSearchService";
import SimpleLoadingDot from "../Loading/SimpleLoadingDot";
import SimpleUserDetailsRow from "../UserDetails/SimpleUserDetailsRow";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { SearchResponse } from "@algolia/client-search";
import Conversation, {
  ConversationMember,
  ConversationMemberRole,
  ConversationMemberState,
} from "@nirvana/common/models/conversation";
import { conversationService } from "@nirvana/common/services";
import { QueryRoutes, Routes } from "@nirvana/common/helpers/routes";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useAuth } from "../../contexts/authContext";
import { HotKeys, KeyMap } from "react-hotkeys";

const searchDebounceMsTime = 3000;

export default function CreateConversation() {
  const { currUser } = useAuth();
  const router = useRouter();

  const input = useRef<HTMLInputElement>(null);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([] as User[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSearchInput, setUserSearchInput] = useState<string>("");
  const [conversationName, setConversationName] = useState<string>("");
  const [tldr, setTldr] = useState<string>("");

  // recommendations list: algolio results + cached "relevant users" from all cached conversations currently
  // options for the select
  // have a list of 10 max?
  const [recommendedUsers, setRecommendedUsers] = useState<User[]>(
    [] as User[]
  );

  // on loading this page always focus the select field
  useEffect(() => {
    input.current?.focus();
  }, []);

  const handleUserSearch = async (event) => {
    // no search if empty input
    if (!userSearchInput) {
      setIsLoading(false);
      console.warn("no valid input to search...no point searching");
      return false;
    }

    console.log("searching for : " + userSearchInput);

    try {
      // do the search on the search value
      const searchedUsers: SearchResponse = await usersIndex.search(
        userSearchInput
      );
      console.log(searchedUsers.hits);

      if (searchedUsers.hits) {
        const userHits = searchedUsers.hits.map((returnedUser) => {
          const recUser = returnedUser as unknown as User;
          recUser.id = returnedUser.objectID;
          return recUser;
        });

        setRecommendedUsers(userHits);
      }
    } catch (error) {
      console.log(error);
      toast.error("Problem in searching");
    }

    // stop showing loading to say that we got results
    setIsLoading(false);
  };

  const selectUser = (addUser: User) => {
    if (addUser.id == currUser!.uid) {
      toast.error("You cannot add yourself, silly!");
      return;
    }
    if (selectedUsers.some((currUser) => currUser.id == addUser.id)) {
      toast("Already added member!");
      return;
    }

    // also remove from the search set
    // for now unless they re-search, they will see it again but for now not an issue
    setRecommendedUsers((prevRecUsers) =>
      prevRecUsers.filter((pU) => pU.id != addUser.id)
    );
    setSelectedUsers((prevUsers) => [addUser, ...prevUsers]);
  };

  const removeUser = (removeUser: User) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((pUser) => pUser.id != removeUser.id)
    );
  };

  const clearSelected = () => {
    setSelectedUsers([] as User[]);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createConversation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!conversationName) {
      toast.error("Please put in a conversation name");
      setIsSubmitting(false);
      return;
    }

    if (!selectedUsers?.length) {
      toast.error("You must select members!");
      setIsSubmitting(false);
      return;
    }

    try {
      const arrActiveMembers: string[] = [] as string[];

      // create each conversation member based on the selected people
      const members = selectedUsers.map((selUser) => {
        arrActiveMembers.push(selUser.id);

        return new ConversationMember(
          selUser.id,
          ConversationMemberState.default,
          ConversationMemberRole.member
        );
      });

      // add myself to this collection of members
      arrActiveMembers.push(currUser!.uid);
      members.push(
        new ConversationMember(
          currUser!.uid,
          ConversationMemberState.default,
          ConversationMemberRole.admin
        )
      );

      const newConversation = new Conversation(
        currUser!.uid,
        conversationName,
        arrActiveMembers,
        tldr
      );

      console.log(members);
      console.log(newConversation);

      // create main conversation object and all of the members associated
      await conversationService.createConversation(newConversation, members);

      toast.success("Created Conversation");

      router.push({
        pathname: Routes.home,
        query: { page: QueryRoutes.convos },
      });
    } catch (error) {
      toast.error("Problem in creating conversation");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto my-auto max-w-screen-sm w-full flex flex-col">
      {/* <Select
        placeholder={"Look up emails, names, etc."}
        tagRender={tagRender}
        style={{ width: "100%" }}
        options={options}
        size="large"
        mode="multiple"
        allowClear
        // defaultValue={['a10', 'c12']}
        ref={input}
      /> */}

      {/* search bar that debounces and has a loading button while debouncing */}

      <span className="relative bg-slate-50 p-2 rounded-lg flex flex-row items-center space-x-2 mb-5">
        <FaSearch className="text-slate-300 text-lg" />

        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleUserSearch(e);
            }
          }}
          className="p-2 flex-1 rounded bg-slate-50 placeholder-slate-300 focus:outline-none"
          placeholder="look up an email address or name"
          ref={input}
          onChange={(e) => {
            setIsLoading(true);
            setUserSearchInput(e.target.value);
          }}
        />

        {userSearchInput && (
          <span className="text-slate-300 flex flex-row items-center space-x-2">
            <FaArrowRight />
            <span>enter to search</span>
          </span>
        )}
      </span>

      {/* show search results nicely like tailwind website */}
      <span className="text-slate-400 text-xs text-center">
        showing {recommendedUsers.length} results
      </span>
      <span className="text-slate-400 text-xs text-center">
        Click{" "}
        <a href="mailto:?subject=Join my conversation on Nirvana!">here</a> to
        invite a user to Nirvana.
      </span>

      {recommendedUsers?.length > 0 ? (
        <div className="flex flex-col items-stretch">
          {recommendedUsers.map((recUser) => {
            return (
              <SimpleUserDetailsRow
                key={recUser.id}
                user={recUser}
                actionButton={
                  <span
                    onClick={() => selectUser(recUser)}
                    className="p-2 rounded-full hover:cursor-pointer 
                  text-teal-500 hover:bg-slate-200 ml-auto"
                  >
                    <FaPlus className="text-lg" />
                  </span>
                }
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {selectedUsers?.length ? (
        <>
          <span className="flex flex-row items-center mb-2">
            <span className="uppercase tracking-widest text-slate-400 font-semibold">
              Selected
            </span>

            <button
              onClick={clearSelected}
              className="ml-auto text-slate-300 text-xs"
            >
              clear
            </button>
          </span>

          {/* list of selected people who are nirvana users */}
          <span className="flex flex-col">
            {selectedUsers.map((selectUser) => (
              <SimpleUserDetailsRow
                key={selectUser.id}
                user={selectUser}
                actionButton={
                  <button
                    onClick={() => removeUser(selectUser)}
                    className="p-2 rounded-full hover:cursor-pointer text-orange-500 ml-auto"
                  >
                    <FaRegTimesCircle className="ml-auto text-lg" />
                  </button>
                }
              />
            ))}
          </span>

          <span className="flex flex-col mt-10">
            <span className="uppercase tracking-widest text-slate-400 font-semibold">
              Name<span className="text-orange-500">*</span>
            </span>
            <span className="text-slate-300 text-xs">
              Think of a group or conversation name.
            </span>

            <input
              className="p-3 rounded mt-2 bg-slate-50 border placeholder-slate-300"
              placeholder="ex: code 'n chill, sales, birthdays, sprint 7..."
              value={conversationName}
              onChange={(e) => setConversationName(e.target.value)}
            />
          </span>

          <span className="flex flex-col mt-10">
            <span className="uppercase tracking-widest text-slate-400 font-semibold">
              tldr<span className="text-orange-500"></span>
            </span>
            <span className="text-slate-300 text-xs">
              It can be casual or like an email subject line. Do this later if
              you want.
            </span>

            <input
              className="p-3 rounded mt-2 bg-slate-50 border placeholder-slate-300"
              placeholder="ex: presentation review process..."
              value={tldr}
              onChange={(e) => setTldr(e.target.value)}
            />
          </span>

          {!isSubmitting && (
            <button
              onClick={createConversation}
              className="rounded p-2 border flex flex-row items-center space-x-2
            text-white font-semibold text-xs ml-auto mt-5 bg-teal-600 hover:scale-110 transition-all"
              disabled={isSubmitting}
            >
              <span>Create</span>
            </button>
          )}
        </>
      ) : (
        <></>
      )}

      {/* show conversations already with these people */}
    </div>
  );
}
