import { ReactNode, createContext, useState } from "react";


interface Cycle {

    id: string;
    task: string;
    minutesAmount: number;
    start: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CreatenewCycleData{
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined;
    activeCycledId: string | null;
    marckCurrenteCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCicle: (data: CreatenewCycleData) => void;
    interruptCurrentCycle: () => void;

}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps{
    children: ReactNode
}

export function CyclesContextProvider({children}) {

    const [cycles, setCycles] = useState<Cycle[]>([]); // Sempre Inicar o estado nem que seja com Vazio
    const [activeCycledId, setactiveCycledId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find((cycle) => cycle.id == activeCycledId);

    function marckCurrenteCycleAsFinished() {
        setCycles(state => state.map(cycle => {

            if (cycle.id == activeCycledId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        },)
        )
    }

    function createNewCicle(data: CreatenewCycleData) {

        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            start: new Date()
        }
        setCycles((state) => [...state, newCycle]); //state ta com o valor atual para coloc no array 
        setactiveCycledId(id)
        setAmountSecondsPassed(0);
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function interruptCurrentCycle() {

        setCycles(state => state.map(cycle => {

            if (cycle.id == activeCycledId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }),)

        setactiveCycledId(null)
    }
    return (

        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycledId,
                marckCurrenteCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCicle,
                interruptCurrentCycle
            }}
        >
        {children}
        </CyclesContext.Provider>
    )
}