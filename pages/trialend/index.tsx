import { useRouter } from "next/router";
import { useExperiment } from "../../store/participant";

const content = {
    danish: "Dette er slutningen af demo-sektionen, fra nu af skal du give din bedste ydeevnde :)",
    hungarian:
        "Itt a vége a bevezető résznek, innentől nem babra megy a játék :)",
};

export default function TrialEnd() {
    const router = useRouter();
    const onConsent = (e: any) => {
        router.push("/task/present/5");
    };
    const nationality = useExperiment(
        (state) => state.participant?.nationality
    );
    return (
        <div className="bg-black text-white w-full h-full fixed text-white text-xl justify-center content-center items-center flex">
            <div className="w-1/2 flex flex-col justify-between items-stretch">
                <div className="flex mb-6">
                    {nationality ? content[nationality] : ""}
                </div>
                <button
                    className={`self-end m-2 p-8 text-xl font-bold
                        border-dashed hover:border-solid border-white border-2
                    `}
                    onClick={onConsent}
                >
                    {nationality == "danish" ? "Fortsæt" : "Folytatás"}
                </button>
            </div>
        </div>
    );
}
