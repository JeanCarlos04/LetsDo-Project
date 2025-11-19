import {
  createContext,
  useEffect,
  type ReactNode,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { UserType } from "../types/UsersType";
import type { TasksType } from "../types/TasksType";
import type { ToastModal } from "../components/ToastModal";
import type { Sections } from "../components/SectionList";
import { useNavigate } from "react-router-dom";

type ContextProps = {
  children: ReactNode;
};

type UpdateTaskAtributtes = {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
};

type ModalState = {
  show: boolean;
  mode: "create" | "update" | null;
  taskId: string | null;
};

type ViewMode = "table" | "kanban";

type ContextTypes = {
  myProfile: UserType | undefined;
  showModal: ModalState;
  setShowModal: React.Dispatch<React.SetStateAction<ModalState>>;
  getTasks: TasksType[];
  addTask: (
    taskValues: UpdateTaskAtributtes,
    sectionId: Sections["_id"]
  ) => void;
  updateTask: (taskId: TasksType["_id"], updates: UpdateTaskAtributtes) => void;
  setShowTableModals: React.Dispatch<
    React.SetStateAction<{
      taskID: string;
      priorityModal: boolean;
      statusModal: boolean;
      moreActionsModal: boolean;
      headerActionsModal: boolean;
      headerFilterModal: boolean;
      notificationModal: boolean;
      asideLanguageModal: boolean;
      profileModal: boolean;
      updateProfileModal: boolean;
    }>
  >;
  showTableModals: {
    taskID: string;
    priorityModal: boolean;
    statusModal: boolean;
    moreActionsModal: boolean;
    headerActionsModal: boolean;
    headerFilterModal: boolean;
    notificationModal: boolean;
    asideLanguageModal: boolean;
    profileModal: boolean;
    updateProfileModal: boolean;
  };
  filteredTasks: TasksType[];
  handleFilterTasks: (queryValue: string) => void;
  deleteTasks: (taskId: TasksType["_id"]) => void;
  setGetTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  getTaskId: string | null;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  viewMode: ViewMode;
  setFilter: React.Dispatch<
    React.SetStateAction<{
      low: boolean;
      medium: boolean;
      high: boolean;
      open: boolean;
      InProgress: boolean;
      closed: boolean;
    }>
  >;
  filter: {
    low: boolean;
    medium: boolean;
    high: boolean;
    open: boolean;
    InProgress: boolean;
    closed: boolean;
  };
  setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
  showAside: boolean;
  setToastModal: React.Dispatch<React.SetStateAction<ToastModal | undefined>>;
  toastModal: ToastModal | undefined;
  refreshUI: () => void;
  setNavigateSection: Dispatch<SetStateAction<string | undefined>>;
  navigateSection: string | undefined;
  setCurrentSection: Dispatch<SetStateAction<string | undefined>>;
  currentSection: string | undefined;
  handleCreateSections: (title: string, description: string) => void;
  sendProfileImg: (file: File) => Promise<void>;
};

const defaultValues: ContextTypes = {
  myProfile: undefined,
  showModal: {
    show: false,
    mode: null,
    taskId: null,
  },
  setShowModal: () => {},
  getTasks: [],
  addTask: () => {},
  updateTask: () => {},
  setShowTableModals: () => {},
  showTableModals: {
    taskID: "",
    priorityModal: false,
    statusModal: false,
    moreActionsModal: false,
    headerActionsModal: false,
    headerFilterModal: false,
    notificationModal: false,
    asideLanguageModal: false,
    profileModal: false,
    updateProfileModal: false,
  },
  filteredTasks: [],
  handleFilterTasks: () => {},
  deleteTasks: () => {},
  setGetTaskId: () => {},
  getTaskId: null,
  setViewMode: () => {},
  viewMode: "table",
  setFilter: () => {},
  filter: {
    low: false,
    medium: false,
    high: false,
    open: false,
    InProgress: false,
    closed: false,
  },
  setShowAside: () => {},
  showAside: false,
  setToastModal: () => {},
  toastModal: undefined,
  refreshUI: () => {},
  setNavigateSection: () => {},
  navigateSection: undefined,
  setCurrentSection: () => {},
  currentSection: undefined,
  handleCreateSections: () => {},
  sendProfileImg: async () => {},
};

const MainContext = createContext(defaultValues);

const MainContextProvider = ({ children }: ContextProps) => {
  const [myProfile, setMyProfile] = useState<UserType>();
  const [showModal, setShowModal] = useState<ModalState>({
    show: false,
    mode: null,
    taskId: null,
  });
  const [getTasks, setGetTasks] = useState<TasksType[]>([]);
  const [showTableModals, setShowTableModals] = useState({
    taskID: "",
    priorityModal: false,
    statusModal: false,
    moreActionsModal: false,
    headerActionsModal: false,
    headerFilterModal: false,
    notificationModal: false,
    asideLanguageModal: false,
    profileModal: false,
    updateProfileModal: false,
  });
  const [navigateSection, setNavigateSection] = useState<Sections["_id"]>();
  const [filteredTasks, setFilteredTasks] = useState<TasksType[]>([]);
  const [getTaskId, setGetTaskId] = useState<TasksType["_id"] | null>(null);
  const [showAside, setShowAside] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [toastModal, setToastModal] = useState<ToastModal | undefined>();
  const [filter, setFilter] = useState({
    low: false,
    medium: false,
    high: false,
    open: false,
    InProgress: false,
    closed: false,
  });
  const [currentSection, setCurrentSection] = useState<Sections["_id"]>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/getProfile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        {
          if (!res.ok) {
            navigate("/login");
            throw new Error("Error desconocido");
          }
          return res.json();
        }
      })
      .then((data) => {
        setMyProfile(data);
        setGetTasks(data.tasks);
      });
  }, []);

  const refreshUI = () => {
    fetch("http://localhost:3000/getProfile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMyProfile(data);
        setGetTasks(data.tasks);
      });
  };

  const addTask = (
    taskValues: UpdateTaskAtributtes,
    sectionId: Sections["_id"]
  ) => {
    const { title, description, priority } = taskValues;

    fetch(`http://localhost:3000/createTask/${sectionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        priority: priority,
      }),
    })
      .then((res) => res.json())
      .then(() => refreshUI());

    setToastModal("Task created succesfully");
  };

  const updateTask = (
    taskId: TasksType["_id"],
    updates: UpdateTaskAtributtes
  ) => {
    if (
      (updates.title && updates.title.length < 3) ||
      (updates.description && updates.description.length < 3)
    ) {
      console.error("Title and description must have minimum 3 characters");
    } else {
      fetch(`http://localhost:3000/updateTasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      })
        .then((res) => res.json())
        .then(() => refreshUI());
      setToastModal("Updated task succesfully");

      fetch(`http://localhost:3000/createNotification/${myProfile?._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Task updated",
          description: `The task ${updates.title} has been updated`,
        }),
      })
        .then((res) => res.json())
        .then(() => refreshUI());
    }
  };

  const handleFilterTasks = (queryValue: string) => {
    fetch(`http://localhost:3000/filteredTasks/?query=${queryValue}`)
      .then((res) => res.json())
      .then((data) => setFilteredTasks(data));
  };

  const deleteTasks = (taskId: TasksType["_id"]) => {
    fetch(`http://localhost:3000/deteleTask/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => refreshUI());

    setToastModal("Deleted Task succesfully");
  };

  const handleCreateSections = (title: string, description: string) => {
    fetch(`http://localhost:3000/createSection/${myProfile?._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    })
      .then((res) => res.json())
      .then(() => refreshUI());

    setToastModal("Section created succesfully");
  };

  const sendProfileImg = async (file: File) => {
    const formData = new FormData();
    if (file) formData.append("avatar_url", file);

    fetch(`http://localhost:3000/uploadImg/${myProfile?._id}`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => refreshUI());
  };

  return (
    <MainContext.Provider
      value={{
        setGetTaskId,
        getTaskId,
        myProfile,
        showModal,
        setShowModal,
        getTasks,
        addTask,
        updateTask,
        setShowTableModals,
        showTableModals,
        filteredTasks,
        handleFilterTasks,
        deleteTasks,
        viewMode,
        setViewMode,
        filter,
        setFilter,
        showAside,
        setShowAside,
        toastModal,
        setToastModal,
        refreshUI,
        navigateSection,
        setNavigateSection,
        currentSection,
        setCurrentSection,
        handleCreateSections,
        sendProfileImg,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
