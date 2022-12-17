import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";
import useSound from "use-sound";
import { useExperiment } from "../../../store/participant";
import { Task, useTasks } from "../../../store/task";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
const fixedCenter =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

export default function PresentTask() {
    const router = useRouter();
    const index = Number(router.query.index);
    const tasks = useTasks((state) => state.tasks);
    const currentTask = tasks[index];
    const soundPath = currentTask?.soundPath;
    const participant = useExperiment((state) => state.participant);
    const [completed, setCompleted] = useState(false);
    const [play] = useSound("/" + soundPath, {
        onend: () => setCompleted(true),
    });
    useEffect(() => {
        setCompleted(false);
        play();
    }, [router.asPath]);
    const crossRotation = completed ? "rotate-0" : "rotate-45";
    const onComplete = (e: ButtonEvent) => {
        router.push(`/task/solve/${index}`);
    };
    const playSound = (e: any) => {
        console.log(`Initiating playback ${soundPath}`);
        play();
    };
    const screenHeight = participant?.screenHeight || 0;
    const containerStyle: CSSProperties = {
        width: screenHeight,
        height: screenHeight,
    };
    useEffect(() => {
        console.log(containerStyle);
    }, [containerStyle]);
    return (
        <div className="text-white fixed w-full h-full flex flex-row bg-slate-800 justify-between items-start">
            <div
                className={`${fixedCenter} text-white flex flex-row bg-black justify-between items-start`}
                style={containerStyle}
            >
                <button
                    className={`${fixedCenter} top-1/2 hover:border-solid p-5 border-2 border-white border-dashed `}
                    onClick={playSound}
                >
                    {participant?.nationality == "danish"
                        ? "Spil lyden"
                        : "Hang lejátszása"}
                </button>
                <button
                    className={`absolute left-1/2 -translate-y-1/2 bottom-[10px] text-4xl font-bold ${crossRotation} transition-all`}
                    onClick={completed ? onComplete : undefined}
                >
                    +
                </button>
                {completed ? (
                    <p className={`${fixedCenter} bottom-1/3 `}>
                        {participant?.nationality == "danish"
                            ? "Klik på krydset for at fortsætte"
                            : "Folytatáshoz tessék a keresztre kattintani"}
                    </p>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
