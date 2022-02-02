import { User, UserStatus } from "@nirvana/common/models/user";
import { Divider, Select, Tag } from "antd";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { FaPlus, FaRegTimesCircle, FaSearch } from "react-icons/fa";
import searchClient, { usersIndex } from "../../services/algoliaSearchService";
import SimpleLoadingDot from "../Loading/SimpleLoadingDot";
import SimpleUserDetailsRow from "../UserDetails/SimpleUserDetailsRow";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { SearchResponse } from "@algolia/client-search";

const searchDebounceMsTime = 3000;

export default function CreateConversation() {
  const input = useRef<HTMLInputElement>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([] as User[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSearchInput, setUserSearchInput] = useState<string>("");

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

  // as people are selected, add a list of users
  // if it's an email of a non-nirvana user, then hit invite button to email them with a voice clip along with it
  // if it's an existing user, then show a nice chip of that user's profile picture and their name

  const handleChangeUserSearchInput = async (event) => {
    const newInput = event?.target?.value;
    console.log("searching for : " + newInput);
    setUserSearchInput(newInput);

    // no search if empty input
    if (!newInput) {
      setIsLoading(false);
      console.warn("no valid input to search...no point searching");
      return false;
    }

    try {
      // do the search on the search value
      const searchedUsers: SearchResponse = await usersIndex.search(newInput);
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

  const debounceHandler = useMemo(
    () => debounce(handleChangeUserSearchInput, searchDebounceMsTime),
    []
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debounceHandler.cancel();
    };
  }, []);

  const selectUser = (user) => {
    setSelectedUsers((prevUsers) => [user, ...prevUsers]);
  };

  return (
    <div className="mx-auto my-auto w-96 flex flex-col">
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

      <span className="flex flex-row items-center space-x-2 mb-5">
        <FaSearch className="text-slate-300 text-lg" />

        <input
          className="p-2 flex-1 rounded bg-slate-50 border placeholder-slate-300"
          placeholder="look up an email address or name"
          ref={input}
          onChange={(e) => {
            setIsLoading(true);
            debounceHandler(e);
          }}
        />

        {isLoading && <SimpleLoadingDot />}
      </span>

      {/* show search results nicely like tailwind website */}

      {recommendedUsers && recommendedUsers.length > 0 ? (
        <>
          <span className="text-slate-400 text-xs">
            showing {recommendedUsers.length} results
          </span>
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
        </>
      ) : (
        <></>
      )}

      {selectedUsers?.length ? (
        <>
          <Divider />

          <span className="flex flex-row items-center mb-2">
            <span className="uppercase tracking-widest text-slate-400 font-semibold">
              Selected
            </span>

            <button className="ml-auto text-slate-300 text-xs">clear</button>
          </span>

          {/* list of selected people who are nirvana users */}
          <span className="flex flex-col">
            {selectedUsers.map((selectUser) => (
              <SimpleUserDetailsRow
                key={selectUser.id}
                user={selectUser}
                actionButton={
                  <button className="p-2 rounded-full hover:cursor-pointer text-orange-500 ml-auto">
                    <FaRegTimesCircle className="ml-auto text-lg" />
                  </button>
                }
              />
            ))}
          </span>

          <span className="flex flex-col mt-10">
            <span className="uppercase tracking-widest text-slate-400 font-semibold">
              Name
            </span>
            <span className="text-slate-300 text-xs">
              Name this conversation: engineering, hangout, lunch time, or leave
              it as is.
            </span>

            <input
              className="p-3 rounded mt-2 bg-slate-50 border placeholder-slate-300"
              placeholder="coding and chilling room, birthdays, sprint 7"
            />
          </span>

          <button
            className="rounded p-2 border flex flex-row items-center space-x-2
            text-white font-semibold text-xs ml-auto mt-5 bg-teal-600 hover:scale-110 transition-all"
          >
            <span>Create</span>
          </button>
        </>
      ) : (
        <></>
      )}

      {/* show conversations already with these people */}
    </div>
  );
}
