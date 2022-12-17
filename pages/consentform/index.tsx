import { useRouter } from "next/router";

const buttonStyle =
    "m-2 p-8 text-xl font-bold border-dashed border-white border-2";

export default function ConsentForm() {
    const router = useRouter();
    const onConsent = (e: any) => {
        router.push("/register");
    };
    return (
        <div className="bg-black text-white w-full h-full fixed text-white text-xl justify-center content-center items-center flex">
            <div className="w-1/2 flex flex-col justify-between items-stretch">
                <div className="flex text-2xl font-bold mb-6">
                    Declaration of consent
                </div>
                <div className="flex mb-6">
                    The purpose of this experiment is to learn more about
                    perception. Participation is completely voluntary and you
                    are free to withdraw your consent at any given time during
                    the experiment. After the experiment, your data will be
                    anonymised, therefore we will not be able to delete it. If
                    you agree to the terms above, click the button below.
                </div>
                <button
                    className={`self-end m-2 p-8 text-xl font-bold
                        border-dashed hover:border-solid border-white border-2
                    `}
                    onClick={onConsent}
                >
                    I give my consent
                </button>
            </div>
        </div>
    );
}
