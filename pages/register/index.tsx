import { useRouter } from "next/router";
import { useState } from "react";
import useWindowDimensions from "../../utils/hooks";
import { Nationality, Sex, useExperiment } from "../../store/participant";
import { Task, useTasks } from "../../store/task";
import { danishTasks, hungarianTasks } from "../../tasks/tasks";

function fetchTasks(nationality: "danish" | "hungarian"): Task[] {
    if (nationality == "danish") {
        return danishTasks;
    } else {
        return hungarianTasks;
    }
}

const nationalities: Nationality[] = ["hungarian", "danish"];
const sexes: Sex[] = ["other", "male", "female"];

const choiceButtonStyle =
    "p-3 flex-1 border-2 border-dotted hover:border-solid rounded-2xl";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export default function Registration() {
    const [uniqueId, setUniqueId] = useState("");
    const [nationality, setNationality] = useState<Nationality>("danish");
    const [sex, setSex] = useState<Sex>("other");
    const router = useRouter();
    const setParticipant = useExperiment((state) => state.setParticipant);
    const setTasks = useTasks((state) => state.setTasks);
    const dimensions = useWindowDimensions();
    const onSubmit = (e: ButtonEvent) => {
        setParticipant({
            id: uniqueId,
            sex: sex,
            nationality: nationality,
            screenHeight: dimensions.height,
            screenWidth: dimensions.width,
        });
        const tasks = fetchTasks(nationality);
        setTasks(tasks);
        router.push("/task/present/0");
    };
    return (
        <div className="bg-black text-white w-full h-full fixed text-white text-xl justify-center content-center items-center flex">
            <div className="space-y-3 w-1/3 flex flex-col justify-between items-stretch">
                <div className="flex text-2xl font-bold mb-8 ">
                    Participant information
                </div>
                <div className="flex flex-col space-y-3 items-stretch">
                    <div className="flex items-center">Unique ID: </div>
                    <input
                        type="text"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                        className="rounded-2xl flex-1 p-3 bg-black outline-0 border-2 border-dotted focus:border-solid border-white"
                    />
                </div>
                <div className="flex flex-col space-y-3 items-stretch">
                    <div className="flex items-center">Nationality: </div>
                    {nationalities.map((buttonNationality) => (
                        <button
                            className={`${choiceButtonStyle} ${
                                nationality == buttonNationality
                                    ? "border-blue-500"
                                    : "border-white"
                            }
                            `}
                            onClick={(e) => setNationality(buttonNationality)}
                        >
                            {buttonNationality}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col space-y-3 items-stretch">
                    <div className="flex items-center">Sex: </div>
                    {sexes.map((buttonSex) => (
                        <button
                            className={`${choiceButtonStyle}
                                ${
                                    sex == buttonSex
                                        ? "border-blue-500"
                                        : "border-white"
                                }
                            `}
                            onClick={(e) => setSex(buttonSex)}
                        >
                            {buttonSex}
                        </button>
                    ))}
                </div>
                <div className="h-8" />
                <button
                    className={`self-end p-4 text-xl border-2 border-dashed
                    hover:border-solid mt-8
                    `}
                    onClick={onSubmit}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
