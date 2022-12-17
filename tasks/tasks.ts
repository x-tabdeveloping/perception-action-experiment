import { Condition } from "../store/participant";
import { Task } from "../store/task";

const letters = "abcdefghijklmnopqrstuvwxyz";
function randomLetter(): string {
    const letterIndex = Math.random() * letters.length;
    return letters.charAt(letterIndex);
}

function replaceAt(str: string, index: number, replacement: string): string {
    return (
        str.substring(0, index) +
        replacement +
        str.substring(index + replacement.length)
    );
}

export function randomizeTask(
    correctWord: string,
    condition: Condition
): string {
    const wordLen = correctWord.length;
    const letterToSwitchOut =
        condition == "control"
            ? Math.floor(Math.random() * wordLen - 2) + 2
            : 0;
    const originalLetter = correctWord.charAt(letterToSwitchOut);
    let newLetter = randomLetter();
    while (newLetter === originalLetter) {
        newLetter = randomLetter();
    }
    return replaceAt(correctWord, letterToSwitchOut, newLetter);
}

export const hungarianTasks: Task[] = [
    {
        correct: "bögre",
        incorrect: "bögöly",
        condition: "experimental",
        soundPath: "hungarianbogre.mp3",
    },
    {
        correct: "tábla",
        incorrect: "tárkony",
        condition: "control",
        soundPath: "hungariantabla.mp3",
    },
    {
        correct: "könyv",
        incorrect: "körte",
        condition: "experimental",
        soundPath: "hungariankonyv.mp3",
    },
    {
        correct: "jegyzet",
        incorrect: "jelmez",
        condition: "control",
        soundPath: "hungarianjegyzet.mp3",
    },
    {
        correct: "hallgatás",
        incorrect: "halovány",
        condition: "experimental",
        soundPath: "hungarianhallgatas.mp3",
    },
    {
        correct: "termosz",
        incorrect: "terem",
        condition: "control",
        soundPath: "hungariantermosz.mp3",
    },
    {
        correct: "kabát",
        incorrect: "kalap",
        condition: "experimental",
        soundPath: "hungariankabat.mp3",
    },
    {
        correct: "virág",
        incorrect: "viskó",
        condition: "control",
        soundPath: "hungarianvirag.mp3",
    },
    {
        correct: "asztal",
        incorrect: "asszony",
        condition: "experimental",
        soundPath: "hungarianasztal.mp3",
    },
    {
        correct: "állat",
        incorrect: "állvány",
        condition: "control",
        soundPath: "hungarianallat.mp3",
    },
    {
        correct: "telefon",
        incorrect: "tenger",
        condition: "experimental",
        soundPath: "hungariantelefon.mp3",
    },
    {
        correct: "galuska",
        incorrect: "galamb",
        condition: "control",
        soundPath: "hungariangaluska.mp3",
    },
    {
        correct: "barack",
        incorrect: "bárány",
        condition: "experimental",
        soundPath: "hungarianbarack.mp3",
    },
    {
        correct: "korong",
        incorrect: "kórház",
        condition: "control",
        soundPath: "hungariankorong.mp3",
    },
    {
        correct: "dekoráció",
        incorrect: "delírium",
        condition: "experimental",
        soundPath: "hungariandekoracio.mp3",
    },
    {
        correct: "büntetés",
        incorrect: "bűvölet",
        condition: "control",
        soundPath: "hungarianbuntetes.mp3",
    },
    {
        correct: "macska",
        incorrect: "matrica",
        condition: "experimental",
        soundPath: "hungarianmacska.mp3",
    },
    {
        correct: "türelem",
        incorrect: "tündér",
        condition: "control",
        soundPath: "hungarianturelem.mp3",
    },
    {
        correct: "kocsma",
        incorrect: "kocsonya",
        condition: "experimental",
        soundPath: "hungariankocsma.mp3",
    },
    {
        correct: "eredet",
        incorrect: "eretnek",
        condition: "control",
        soundPath: "hungarianeredet.mp3",
    },
    {
        correct: "gomba",
        incorrect: "gólya",
        condition: "experimental",
        soundPath: "hungariangomba.mp3",
    },
    {
        correct: "karom",
        incorrect: "karát",
        condition: "control",
        soundPath: "hungariankarom.mp3",
    },
    {
        correct: "arany",
        incorrect: "aroma",
        condition: "experimental",
        soundPath: "hungarianarany.mp3",
    },
    {
        correct: "szótár",
        incorrect: "szórás",
        condition: "control",
        soundPath: "hungarianszotar.mp3",
    },
    {
        correct: "torony",
        incorrect: "torma",
        condition: "experimental",
        soundPath: "hungariantorony.mp3",
    },
];

export const danishTasks: Task[] = [
    {
        correct: "fjernsyn",
        incorrect: "fjeldmark",
        condition: "experimental",
        soundPath: "danishfjernsyn.mp3",
    },
    {
        correct: "røremaskine",
        incorrect: "røntgenblik",
        condition: "control",
        soundPath: "danishroeremaskine.mp3",
    },
    {
        correct: "eksamenstid",
        incorrect: "eksemplar",
        condition: "experimental",
        soundPath: "danisheksamenstid.mp3",
    },
    {
        correct: "loppemarked",
        incorrect: "lortevejr",
        condition: "control",
        soundPath: "danishloppemarked.mp3",
    },
    {
        correct: "væggetøj",
        incorrect: "vægtlyftning",
        condition: "experimental",
        soundPath: "danishvaeggetoej.mp3",
    },
    {
        correct: "kalender",
        incorrect: "kalorie",
        condition: "control",
        soundPath: "danishkalender.mp3",
    },
    {
        correct: "oprindelse",
        incorrect: "oprettelse",
        condition: "experimental",
        soundPath: "danishoprindelse.mp3",
    },
    {
        correct: "vandtårn",
        incorrect: "vandmelon",
        condition: "control",
        soundPath: "danishvandtaarn.mp3",
    },
    {
        correct: "svampe",
        incorrect: "svagelig",
        condition: "experimental",
        soundPath: "danishsvampe.mp3",
    },
    {
        correct: "tålmodighed",
        incorrect: "tålsomhed",
        condition: "control",
        soundPath: "danishtaalmolighed.mp3",
    },
    {
        correct: "strafbar",
        incorrect: "strabadser",
        condition: "experimental",
        soundPath: "danishstrafbar.mp3",
    },
    {
        correct: "blomster",
        incorrect: "blodbank",
        condition: "control",
        soundPath: "danishblomster.mp3",
    },
    {
        correct: "fersken",
        incorrect: "fjernsyn",
        condition: "experimental",
        soundPath: "danishfersken.mp3",
    },
    {
        correct: "telefon",
        incorrect: "tektonik",
        condition: "control",
        soundPath: "danishtelefon.mp3",
    },
    {
        correct: "kanelsnegl",
        incorrect: "kaninavler",
        condition: "experimental",
        soundPath: "danishkanelsnegl.mp3",
    },
    {
        correct: "hustype",
        incorrect: "hustru",
        condition: "control",
        soundPath: "danishhustype.mp3",
    },
    {
        correct: "klistermærke",
        incorrect: "klosterkirke",
        condition: "experimental",
        soundPath: "danishklistermaerke.mp3",
    },
    {
        correct: "ledning",
        incorrect: "ledbrusk",
        condition: "control",
        soundPath: "danishledning.mp3",
    },
    {
        correct: "sygehuset",
        incorrect: "syvtiden",
        condition: "experimental",
        soundPath: "danishsygehuset.mp3",
    },
    {
        correct: "stativ",
        incorrect: "statistik",
        condition: "control",
        soundPath: "danishstativ.mp3",
    },
    {
        correct: "betydningsfuld",
        incorrect: "betegnelse",
        condition: "experimental",
        soundPath: "danishbetydningsfuld.mp3",
    },
    {
        correct: "tyveri",
        incorrect: "tivoli",
        condition: "control",
        soundPath: "danishtyveri.mp3",
    },
    {
        correct: "tjekkisk",
        incorrect: "tjeneste",
        condition: "experimental",
        soundPath: "danishtjekkisk.mp3",
    },
    {
        correct: "kommunisme",
        incorrect: "kommandere",
        condition: "control",
        soundPath: "danishkommunisme.mp3",
    },
    {
        correct: "programmatisk",
        incorrect: "progression",
        condition: "experimental",
        soundPath: "danishprogrammatisk.mp3",
    },
];
