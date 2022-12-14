import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { useTasks } from "../../../store/task";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
const fixedCenter =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

export default function PresentTask() {
    const router = useRouter();
    const index = Number(router.query.index);
    const tasks = useTasks((state) => state.tasks);
    const { soundPath } = tasks[index];
    const [completed, setCompleted] = useState(false);
    const [play, exposedSoundData] = useSound(soundPath, {
        onend: () => {
            setCompleted(true);
        },
    });
    useEffect(() => {
        setCompleted(false);
        play();
    }, [router.asPath, exposedSoundData.duration]);
    const crossRotation = completed ? "rotate-0" : "rotate-45";
    const onComplete = (e: ButtonEvent) => {
        router.push(`/task/solve/${index}`);
    };
    return (
        <div className="text-white fixed w-full h-full flex flex-row bg-slate-800 justify-between items-start">
            <div
                className={`${fixedCenter} text-white w-[1000px] h-[800px] flex flex-row bg-black justify-between items-start`}
            >
                <button
                    className={`${fixedCenter} text-4xl font-bold ${crossRotation} transition-all`}
                    onClick={completed ? onComplete : undefined}
                >
                    +
                </button>
                {completed ? (
                    <p className={`${fixedCenter} top-1/3 `}>
                        Click cross before continuing...
                    </p>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
