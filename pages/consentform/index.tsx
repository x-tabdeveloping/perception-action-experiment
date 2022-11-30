import { useRouter } from "next/router";

const buttonStyle =
    "m-2 p-8 text-xl font-bold border-dashed border-white border-2";

export default function ConsentForm() {
    const router = useRouter();
    return (
        <div className="bg-black text-white w-full h-full fixed text-white text-xl justify-center content-center items-center flex">
            <div className="w-1/2 flex flex-col justify-between items-stretch">
                <div className="flex text-2xl font-bold mb-6">
                    Declaration of consent
                </div>
                <div className="flex mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </div>
                <button
                    className={`self-end m-2 p-8 text-xl font-bold
                        border-dashed hover:border-solid border-white border-2
                    `}
                    onClick={(e) => router.push("/register")}
                >
                    I give my consent
                </button>
            </div>
        </div>
    );
}
