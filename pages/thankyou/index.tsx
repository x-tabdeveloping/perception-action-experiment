import { useExperiment } from "../../store/participant";

export default function ThankYou() {
    const experiment = useExperiment();
    return (
        <div className="bg-black w-full h-full fixed text-white text-3xl justify-center content-center items-center flex flex-col">
            <p>Thank you for completing the experiment!</p>
            <div className="text-sm">{JSON.stringify(experiment)}</div>
        </div>
    );
}
