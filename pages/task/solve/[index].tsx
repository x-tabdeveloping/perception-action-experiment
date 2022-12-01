import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MousePosition, useExperiment } from "../../../store/participant";
import { useTasks } from "../../../store/task";

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
    const tasks = useTasks((state) => state.tasks);
    const addResult = useExperiment((state) => state.addResult);
    const currentTask = tasks[index];
    const [completed, setCompleted] = useState(false);
    const [order, setOrder] = useState<Order>(["incorrect", "correct"]);
    const [startTime, setStartTime] = useState<number>(0);
    const [mouseTrackingData, setMouseTrackingData] = useState<MousePosition[]>(
        []
    );
    const crossRotation = completed ? "rotate-0" : "rotate-45";
    const [first, second] = order;
    useEffect(() => {
        const handleMouseMove = (event: any) => {
            const mousePos = {
                x: event.clientX,
                y: event.clientY,
                timestamp: Date.now() - startTime,
            };
            if (!completed) {
                setMouseTrackingData([...mouseTrackingData, mousePos]);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [route, mouseTrackingData, startTime]);
    useEffect(() => {
        // This resets state on each route change
        setCompleted(false);
        setOrder(randomOrder());
        setStartTime(Date.now());
        setMouseTrackingData([]);
    }, [route]);
    const onAnswer = (chosen: "correct" | "incorrect") => (e: ButtonEvent) => {
        setCompleted(true);
        const { correct, incorrect } = currentTask;
        const result = {
            correct: correct,
            incorrect: incorrect,
            chosen: chosen,
            elapsedTime: Date.now() - startTime,
            mouseTrackingData: mouseTrackingData,
        };
        addResult(result);
    };
    const onComplete = (e: ButtonEvent) => {
        const nextIndex = index + 1;
        if (nextIndex >= tasks.length) {
            router.push("/thankyou");
        } else {
            router.push(`/task/present/${nextIndex}`);
        }
    };
    return (
        <div className="text-white fixed w-full h-full flex flex-row bg-black justify-between items-start">
            <button
                className={`${fixedCenter} text-4xl font-bold ${crossRotation} transition-all`}
                onClick={completed ? onComplete : undefined}
            >
                +
            </button>
            <button className={buttonStyle} onClick={onAnswer(first)}>
                {currentTask[first]}
            </button>
            <button className={buttonStyle} onClick={onAnswer(second)}>
                {currentTask[second]}
            </button>
            {completed ? (
                <p className={`${fixedCenter} top-1/3 `}>
                    Click cross before continuing...
                </p>
            ) : (
                ""
            )}
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
