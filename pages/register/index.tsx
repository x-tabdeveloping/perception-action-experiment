import { useRouter } from "next/router";
import { useState } from "react";
import useWindowDimensions from "../hooks";
import { useExperiment } from "../../store/participant";
import { Task, useTasks } from "../../store/task";

function fetchTasks(nationality: "danish" | "hungarian"): Task[] {
    if (nationality == "danish") {
        return [
            { correct: "aros", incorrect: "aalborg", soundPath: "/dog.mp3" },
            {
                correct: "sigoejnerbarn",
                incorrect: "jyde",
                soundPath: "/dog.mp3",
            },
            {
                correct: "hooooejh",
                incorrect: "naaaaaa",
                soundPath: "/dog.mp3",
            },
        ];
    } else {
        return [
            {
                correct: "kezicsokolom",
                incorrect: "jonapot",
                soundPath: "/dog.mp3",
            },
            {
                correct: "ciganysag",
                incorrect: "magyarsag",
                soundPath: "/dog.mp3",
            },
            {
                correct: "hasizomfalszentistvan",
                incorrect: "budapest",
                soundPath: "/dog.mp3",
            },
        ];
    }
}

const choiceButtonStyle =
    "p-3 flex-1 border-2 border-dotted hover:border-solid rounded-2xl";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export default function Registration() {
    const [uniqueId, setUniqueId] = useState("");
    const [nationality, setNationality] = useState<"danish" | "hungarian">(
        "danish"
    );
    const [sex, setSex] = useState<"male" | "female" | "other">("other");
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
                    <button
                        className={`${choiceButtonStyle} ${
                            nationality == "danish"
                                ? "border-blue-500"
                                : "border-white"
                        }
                        `}
                        onClick={(e) => setNationality("danish")}
                    >
                        Danish
                    </button>
                    <button
                        className={`${choiceButtonStyle} ${
                            nationality == "hungarian"
                                ? "border-blue-500"
                                : "border-white"
                        }
                        `}
                        onClick={(e) => setNationality("hungarian")}
                    >
                        Hungarian
                    </button>
                </div>
                <div className="flex flex-col space-y-3 items-stretch">
                    <div className="flex items-center">Sex: </div>
                    <button
                        className={`${choiceButtonStyle}
                            ${
                                sex == "other"
                                    ? "border-blue-500"
                                    : "border-white"
                            }
                        `}
                        onClick={(e) => setSex("other")}
                    >
                        Other
                    </button>
                    <button
                        className={`${choiceButtonStyle}
                            ${
                                sex == "male"
                                    ? "border-blue-500"
                                    : "border-white"
                            }
                        `}
                        onClick={(e) => setSex("male")}
                    >
                        Male
                    </button>
                    <button
                        className={`${choiceButtonStyle}
                            ${
                                sex == "female"
                                    ? "border-blue-500"
                                    : "border-white"
                            }
                        `}
                        onClick={(e) => setSex("female")}
                    >
                        Female
                    </button>
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
