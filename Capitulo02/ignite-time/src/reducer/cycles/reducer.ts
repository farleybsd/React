import { ActionTypes } from "./actions";

export interface Cycle {

    id: string;
    task: string;
    minutesAmount: number;
    start: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CycleState {
    cycles: Cycle[]
    activeCycledId: string | null
}


export function cyclesReducer(state: CycleState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycledId: action.payload.newCycle.id
            }
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            return {
                ...state,
                cycles: state.cycles.map(cycle => {

                    if (cycle.id == state.activeCycledId) {
                        return { ...cycle, interruptedDate: new Date() }
                    } else {
                        return cycle
                    }
                }),
                activeCycledId: null
            }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            return {
                ...state,
                cycles: state.cycles.map(cycle => {

                    if (cycle.id == state.activeCycledId) {
                        return { ...cycle, finishedDate: new Date() }
                    } else {
                        return cycle
                    }
                }),
                activeCycledId: null
            }
        default: return state
    }

}
