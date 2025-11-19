import { useEffect, useState } from "react";
import useContextHook from "../hooks/useContextHook";
import type { TasksType } from "../types/TasksType";
import { Link } from "react-router-dom";

export type Sections = {
  _id: string;
  title: string;
  description: string;
  user: string;
  tasks: TasksType[];
  completed: boolean;
};

function SectionList() {
  const { myProfile, setNavigateSection } = useContextHook();
  const [sections, setSections] = useState<Sections[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/getSections/${myProfile?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
      });
  }, [myProfile]);

  return (
    <>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 xl:gap-x-12 md:gap-x-8 md:gap-y-12 gap-y-6">
        {sections.map((sec) => {
          const completedTasks = sec.tasks.filter(
            (task) => task.status === "closed"
          );
          return (
            <Link key={sec._id} to={`/section/${sec._id}`}>
              <section
                onClick={() => setNavigateSection(sec._id)}
                className="hover:bg-gray-50 duration-150 w-full bg-white rounded-lg p-4 flex flex-col gap-4 border border-gray-200 shadow"
              >
                <h2 className="font-bold w-full text-lg">{sec.title}</h2>
                <p className="font-medium ">{sec.description}</p>
                <div className="flex gap-3 items-center">
                  <h3 className="font-medium ">Progress</h3>

                  <div className="w-full h-2.5 border border-gray-400 rounded-md">
                    <div
                      style={{
                        width: `${
                          sec.tasks.length > 0
                            ? (completedTasks.length / sec.tasks.length) * 100
                            : 0
                        }%`,
                      }}
                      className="h-2 bg-green-400 rounded-md"
                    />
                  </div>
                  <p className="font-medium text-lg">
                    {sec.tasks.length > 0
                      ? Math.floor(
                          (completedTasks.length / sec.tasks.length) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-500">
                    Total task: {sec.tasks.length}
                  </p>{" "}
                  <p className="font-medium text-gray-500">
                    {sec.completed ? "Completed" : "Incomplete"}
                  </p>
                </div>
              </section>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default SectionList;
