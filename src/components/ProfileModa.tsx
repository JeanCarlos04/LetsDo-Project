import { FaArrowRightToBracket, FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useContextHook from "../hooks/useContextHook";

function ProfileModal() {
  const navigate = useNavigate();
  const { showTableModals, setShowTableModals } = useContextHook();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      await res.json();
      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {showTableModals.profileModal && (
        <section
          onClick={(e) => e.stopPropagation()}
          className={`${
            showTableModals.profileModal ? "showAsideModal" : "hideAsideModal"
          } flex flex-col bg-[#f2f2f2] m-2 rounded-md`}
        >
          <button
            type="button"
            onClick={(e) => {
              setShowTableModals({
                ...showTableModals,
                updateProfileModal: !showTableModals.updateProfileModal,
              });
              e.preventDefault();
            }}
            className="group hover:bg-gray-200 duration-200 rounded-md px-6 py-2 pt-3 cursor-pointer text-[18px] flex items-center gap-2 font-medium"
          >
            Edit profile{" "}
            <FaPenToSquare className="group-hover:translate-x-2 duration-200" />
          </button>
          <button
            type="button"
            onClick={() => handleLogout()}
            className="group hover:bg-gray-200 duration-200 rounded-md px-6 py-2 pb-3 cursor-pointer flex text-[18px] items-center gap-2 font-medium"
          >
            Logout{" "}
            <FaArrowRightToBracket className="group-hover:translate-x-2 duration-200" />
          </button>
        </section>
      )}
    </>
  );
}

export default ProfileModal;
