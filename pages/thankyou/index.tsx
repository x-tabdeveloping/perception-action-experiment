import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useExperiment } from "../../store/participant";

export default function ThankYou() {
    const router = useRouter();
    const experiment = useExperiment();
    // const participant = useExperiment((state) => state.participant);
    // const results = useExperiment((state) => state.results);
    // const experimentData = { participant: participant, results: results };
    useEffect(() => {
        if (experiment) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(experiment),
            };
            fetch("api/entry/", requestOptions);
        }
    }, [experiment, router.asPath]);
    return (
        <div className="bg-black w-full h-full fixed text-white text-3xl justify-center content-center items-center flex flex-col">
            <p>Thank you for completing the experiment!</p>
        </div>
    );
}
