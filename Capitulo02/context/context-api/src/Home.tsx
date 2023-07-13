import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any);

function CountDown() {
    const { activeCycle } = useContext(CyclesContext);
    return <h1>CountDown: {activeCycle}</h1>
}

function NewCycleForm() {
    let { activeCycle, setactiveCycle } = useContext(CyclesContext);
    return (
        <div>
            <h1>
                NewCycleForm: {activeCycle}
            </h1>
            <button onClick={() => {
                setactiveCycle(2)
            }}>Alterar Ciclo Ativo</button>
        </div>
    )
}

export function Home() {
    const [activeCycle, setactiveCycle] = useState(0); // Componenet Pai que gerencia o estado para mudar valor

    return (
        <CyclesContext.Provider value={{ activeCycle, setactiveCycle }}>
            <div>
                <h1>Home</h1>
                <NewCycleForm />
                <CountDown />
            </div>
        </CyclesContext.Provider>


    )
}