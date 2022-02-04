import { Divider } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import UserService from "../../services/userService";
import { useAuth } from "../../contexts/authContext";

export default function Profile() {
  const { currUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const userService: UserService = new UserService();

  useEffect(() => {
    (async function () {
      try {
        // if not authenticated, take user to the login
        if (!currUser) {
          console.log(
            "not authenticated...routing from dashboard to teams home"
          );
          // router.push('/teams/login')
        }

        // get user
        const returnedUser: User | null = await userService.getUser(
          currUser.uid
        );

        // if the user is null, then go ahead and create the user even though it's not there yet
        if (!returnedUser) {
          userService.createUser(
            currUser.uid,
            currUser.email,
            currUser.photoURL
          );
        }

        console.log("got user from the backend");

        setUser(returnedUser);
        setNickname(returnedUser.nickName ?? "");
        setFirstName(
          returnedUser.firstName ?? currUser.displayName.split(" ")[0]
        );
        setLastName(returnedUser.lastName ?? "");
        setTeamRole(returnedUser.teamRole ?? "");
      } catch (error) {
        console.log(error);
        router.push("/teams/login");
      }
    })();
  }, []);

  async function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();

    if (!firstName) {
      setError("Must input first name");
      return;
    } else if (!lastName) {
      setError("Must input last name");
      return;
    } else if (!nickname) {
      setError("Must input nickname");
      return;
    } else if (nickname.length > 22) {
      setError("nickname must be less than 22 characters");
      return;
    } else if (!teamRole) {
      setError("Must input team role!");
      return;
    }

    // create the user in the backend or just merge results
    let newUser = new User();
    newUser.id = currUser.uid;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.nickName = nickname;
    newUser.avatarUrl = currUser.photoURL;
    newUser.teamRole = teamRole;

    try {
      await userService.updateUser(newUser);
      router.push("/teams");
    } catch (error) {
      setError(
        "Something went wrong in saving your information. Please try again."
      );
    }

    setLoading(false);
  }

  const [firstName, setFirstName] = useState<string>(
    currUser.displayName.split(" ")[0]
  );
  const [lastName, setLastName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [teamRole, setTeamRole] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <form
      className="container mx-auto max-w-screen-sm flex flex-col m-10 bg-white p-10 rounded-lg shadow-md space-y-5"
      onSubmit={handleSubmit}
    >
      {/* header */}
      <div className="text-lg">Profile</div>

      {error && <span className="text-red-300 text-md">{error}</span>}

      <Divider />

      <span className="flex flex-col items-start">
        <span className="text-md">Avatar*</span>
        <span className="text-gray-300 text-xs">
          Please change your google image to change this.
        </span>
        <img
          src={user ? user.avatarUrl : currUser.photoURL}
          alt="asdf"
          className="rounded-lg mt-2"
        />
      </span>

      <span className="flex flex-col items-start">
        <span className="text-md">Email*</span>
        <span className="text-gray-300 text-xs mb-2">
          This is set from your Google account and cannot be changed.
        </span>
        <input
          disabled
          className="w-full rounded-lg bg-gray-100 p-3"
          value={user ? user.emailAddress : currUser.email}
          readOnly
        />
      </span>

      <div className="flex flex-row justify-between space-x-3">
        <span className="flex flex-col items-start flex-1">
          <span className="text-md">First Name*</span>
          <span className="text-gray-300 text-xs mb-2"></span>
          <input
            placeholder="ex. John"
            className="w-full rounded-lg bg-gray-50 p-3"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </span>

        <span className="flex flex-col items-start flex-1">
          <span className="text-md">Last Name*</span>
          <span className="text-gray-300 text-xs mb-2"></span>
          <input
            placeholder="ex. Brown"
            className="w-full rounded-lg bg-gray-50 p-3"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </span>
      </div>

      <Divider />

      <span className="flex flex-col items-start">
        <span className="text-md">Nickname*</span>
        <span className="text-gray-300 text-xs mb-2">
          What does your team call you? This is what is displayed.
        </span>
        <input
          placeholder="ex. nicky"
          className="w-full rounded-lg bg-gray-50 p-3"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </span>

      <span className="flex flex-col items-start">
        <span className="text-md">Role*</span>
        <span className="text-gray-300 text-xs mb-2">
          Are you a developer? designer? manager?
        </span>
        <input
          placeholder="ex. designer"
          className="w-full rounded-lg bg-gray-50 p-3"
          value={teamRole}
          onChange={(e) => setTeamRole(e.target.value)}
        />
      </span>

      <Divider />

      <span className="flex flex-row justify-end space-x-2">
        {/* if they already had a nickname, they are probably revisiting this page */}
        {/* can't cancel if they are a new user */}
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-3 border rounded-full"
            viewBox="0 0 24 24"
          ></svg>
        ) : (
          <>
            {user && user.nickName ? (
              <>
                <button
                  onClick={() => router.push("/teams")}
                  className="bg-gray-100 py-2 px-5 rounded text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm text-white font-semibold py-2 px-5 bg-teal-500 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {/* if they already had a nickname, they are probably revisiting this page */}
                <button
                  type="submit"
                  className="text-sm text-white font-semibold py-2 px-5 bg-teal-500 rounded"
                >
                  {"Continue ->"}
                </button>
              </>
            )}
          </>
        )}
      </span>
    </form>
  );
}
