import { useEffect, useState } from "react";
import useContextHook from "../hooks/useContextHook";

type Sections = {
  _id: string;
  title: string;
  user: string;
  tasks: string;
  completed: boolean;
};

function SectionList() {
  const { myProfile } = useContextHook();
  const [sections, setSections] = useState<Sections[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/getSections/${myProfile?._id}`)
      .then((res) => res.json())
      .then((data) => setSections(data));
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-x-12">
        {sections.map((sec) => {
          return (
            <section key={sec._id} className="w-full bg-white rounded-lg p-4">
              <h2 className="font-medium size-18 w-full">{sec.title}</h2>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default SectionList;
