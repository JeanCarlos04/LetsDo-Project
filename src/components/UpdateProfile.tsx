import useContextHook from "../hooks/useContextHook";
import { FaImage } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { useForm } from "react-hook-form";

type UpdateProfileForm = {
  user_alias: string;
};

function UpdateProfile() {
  const {
    myProfile,
    sendProfileImg,
    showTableModals,
    setShowTableModals,
    refreshUI,
  } = useContextHook();
  const { register, handleSubmit } = useForm<UpdateProfileForm>();

  const handleOnSubmit = async (data: UpdateProfileForm) => {
    const { user_alias } = data;

    if (!user_alias) {
      return null;
    }

    const res = await fetch(
      `http://localhost:3000/updateProfile/${myProfile?._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          updates: { user_alias: user_alias },
        }),
      }
    );
    if (res.ok) {
      refreshUI();
      res.json();
    }
  };

  return (
    <>
      {showTableModals.updateProfileModal && (
        <div
          onClick={() =>
            setShowTableModals({
              ...showTableModals,
              updateProfileModal: false,
            })
          }
          className="w-screen z-1000 h-screen fixed backdrop-brightness-75 top-0 flex justify-center items-center"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-5 p-6 bg-white border border-gray-200 rounded-2xl"
          >
            <header>
              <h2 className="text-center font-bold text-xl flex gap-2 items-center text-gray-700">
                Update your profile <FaPenToSquare />
              </h2>
            </header>
          <div className="flex justify-center">
              <input
                onChange={(e) => {
                  const file = e.target.files![0];
                  if (file) sendProfileImg(file);
                }}
                id="inputImg"
                type="file"
                className="hidden"
              />
              <label htmlFor="inputImg" className="group relative">
                <img
                  className="size-[70px] rounded-full group-hover:brightness-75 duration-200 cursor-pointer"
                  src={myProfile!.avatar_url}
                />
                <FaImage className="cursor-pointer size-5 text-white absolute hidden duration-200 group-hover:block top-7 left-[25px]" />
              </label>
            </div>
            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className="flex flex-col gap-4"
            >
              <h3 className="font-medium text-[16px] text-gray-700">
                Username
              </h3>
              <input
                {...register("user_alias")}
                placeholder="Update your username"
                className="border border-gray-300 shadow rounded-md p-1 pl-2 text-[16px]"
                type="text"
              />
              <button className="bg-[#2764ba] rounded py-1 font-medium text-white">
                Create
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
