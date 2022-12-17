import { useRouter } from "next/router";
import { useExperiment } from "../../store/participant";

const content = {
    danish: `I dette eksperiment skal du løse nogle virkelige simple opgaver.
    Du kommer til at høre nogle ord, og derefter skal du klikke på ordet, du hørte ud af to optioner så hurtigt som muligt.
    Vær opmærksom på at nogle ord er stavet forkert på skærmen.
    VIGTIGT: Kør venligst eksperimentet på en PC, ikke mobiltelefon eller tablet. Vi samler data om musbevægelse.
    Hvis du sidder med en telefon i hånden nu, fortsæt venligst på din computer :)
    I begyndelsen skal du have 5 demo-forsøg bare for at du bliver vandt til eksperimentet.
    Tryk på 'forstæt' når du er klar.
    `,
    hungarian: `Ebben a kísérletben egy-két kifejezetten egyszerű feladatot kell majd megoldanod.
    Pár szót fogsz hallani, majd ezután rá kell kattints a hallott szóra, amilyen gyorsan csak lehet.
    Észre fogod venni, hogy néhány szó szándékosan el van írva.
    FONTOS: A kísérlet számítógépre van tervezve, a kurzorod mozgásáról gyűjtünk adatot.
    Amennyiben telefonon nyitottad meg a linket, légyszi folytasd a számítógépeden/laptopodon.
    Mielőtt belevágunk kapsz öt bevezető próbálkozást, hogy belerázódj.
    Ha készen állsz kattints a 'folytatás' gombra.
    `,
};

export default function ExplainTask() {
    const router = useRouter();
    const onConsent = (e: any) => {
        router.push("/task/present/0");
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
