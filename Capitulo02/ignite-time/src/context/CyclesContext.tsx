import { ReactNode, createContext, useState, useReducer } from "react";
import {  Cycle, cyclesReducer } from '../reducer/cycles/reducer'
import { ActionTypes, InterruptCurrentCycleAction, addNewCycleAction, markCurrentCycleAsFinisgedAction } from "../reducer/cycles/actions";



interface CreatenewCycleData {
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

interface CyclesContextProviderProps {
    children: ReactNode
}



export function CyclesContextProvider({ children }) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycledId: null
    })

    const { cycles, activeCycledId } = cyclesState;

    // const [activeCycledId, setactiveCycledId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find((cycle) => cycle.id == activeCycledId);

    function marckCurrenteCycleAsFinished() {

        dispatch(markCurrentCycleAsFinisgedAction())
        // setCycles(state => state.map(cycle => {

        //     if (cycle.id == activeCycledId) {
        //         return { ...cycle, finishedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // },)
        // )
    }

    function createNewCicle(data: CreatenewCycleData) {

        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            start: new Date()
        }
        dispatch(addNewCycleAction(newCycle))
        //setCycles((state) => [...state, newCycle]); //state ta com o valor atual para coloc no array 
        //setactiveCycledId(id)
        setAmountSecondsPassed(0);
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function interruptCurrentCycle() {
        dispatch(InterruptCurrentCycleAction())
        // setCycles(state => state.map(cycle => {

        //     if (cycle.id == activeCycledId) {
        //         return { ...cycle, interruptedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }),)

        //setactiveCycledId(null)
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