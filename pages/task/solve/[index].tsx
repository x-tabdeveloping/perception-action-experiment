import { useRouter } from "next/router";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { MousePosition, useExperiment } from "../../../store/participant";
import { useTasks } from "../../../store/task";
import { randomizeTask } from "../../../tasks/tasks";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
const fixedCenter =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
const buttonStyle =
    "m-2 p-8 text-xl font-bold border-dashed border-white border-2";

type Correctness = "correct" | "incorrect";
type Order = [Correctness, Correctness];
function randomOrder(): Order {
    const coinFlip = Math.random() < 0.5;
    const first = coinFlip ? "correct" : "incorrect";
    const second = coinFlip ? "incorrect" : "correct";
    return [first, second];
}

export default function Task() {
    const router = useRouter();
    const route = router.asPath;
    const index = Number(router.query.index);
    // The first 5 tasks are designated as trial this may have to be redefined later.
    const isDemo = index < 5;
    const tasks = useTasks((state) => state.tasks);
    const addResult = useExperiment((state) => state.addResult);
    const nationality = useExperiment(
        (state) => state.participant?.nationality
    );
    const currentTask = tasks[index];
    const randomizedTask = useMemo(
        () => ({
            correct: randomizeTask(currentTask.correct, currentTask.condition),
            incorrect: currentTask.incorrect,
        }),
        [currentTask]
    );
    const [order, setOrder] = useState<Order>(["incorrect", "correct"]);
    const [startTime, setStartTime] = useState<number>(0);
    const [mouseTrackingData, setMouseTrackingData] = useState<MousePosition[]>(
        []
    );
    const [first, second] = order;
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            const mousePos = {
                x: event.clientX,
                y: event.clientY,
                timestamp: Date.now() - startTime,
            };
            setMouseTrackingData([...mouseTrackingData, mousePos]);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [route, mouseTrackingData, startTime]);
    useEffect(() => {
        // This resets state on each route change
        setOrder(randomOrder());
        setStartTime(Date.now());
        setMouseTrackingData([]);
    }, [route]);
    const onAnswer = (chosen: "correct" | "incorrect") => (e: ButtonEvent) => {
        const { correct, incorrect, condition } = currentTask;
        const result = {
            correct: correct,
            incorrect: incorrect,
            chosen: chosen,
            elapsedTime: Date.now() - startTime,
            mouseTrackingData: mouseTrackingData,
            condition: condition,
        };
        // Only add data to participant if the run isn't demo
        if (!isDemo) {
            addResult(result);
        }
        const nextIndex = index + 1;
        if (nextIndex >= tasks.length) {
            router.push("/thankyou");
        } else if (nextIndex == 5) {
            router.push("/trialend");
        } else {
            router.push(`/task/present/${nextIndex}`);
        }
    };
    const onComplete = (e: ButtonEvent) => {};
    const participant = useExperiment((state) => state.participant);
    const screenHeight = participant?.screenHeight || 0;
    const containerStyle: CSSProperties = {
        width: screenHeight,
        height: screenHeight,
    };
    return (
        <div className="text-white fixed w-full h-full flex flex-row bg-slate-800 justify-between items-start">
            <div
                className={`${fixedCenter} text-white flex flex-row bg-black justify-between items-start`}
                style={containerStyle}
            >
                <button className={buttonStyle} onClick={onAnswer(first)}>
                    {randomizedTask[first]}
                </button>
                <button className={buttonStyle} onClick={onAnswer(second)}>
                    {randomizedTask[second]}
                </button>
                <p className={`${fixedCenter} top-1/3 italic `}>
                    {nationality == "danish"
                        ? "Hvilket ord hørte du?"
                        : "Melyik szót hallottad?"}
                </p>
            </div>
        </div>
    );
}

// Add this if you want live mousetracking feedback on screen
//{mouseTrackingData.map(({ x, y, timestamp }) => (
//<div
//className="fixed bg-red-500 rounded-xl w-2 h-2"
//style={{ top: y, left: x }}
//></div>
//))}
