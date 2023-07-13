import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../context/CyclesContext";

/**
 * 
 * Funcao register do useForm  doreact-hook-form
 * Essa funcao Retorna os controlo do Html COMO ONCHANGE,ONBLUR,oNFOCUS
 * function reister(name:string ){
 *  return{
 *  onchange: () => void,
 *  onBlur:   () => void,
 *  onFocus:  () => void
 * }
 * }
 */



interface newCycleFormData {
    task: string;
    minutesAmount: number;
}

interface Cycle {

    id: string;
    task: string;
    minutesAmount: number;
    start: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycledId: string | null;
    marckCurrenteCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;

}

//export const CyclesContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(1, 'O intervalo Precisa ser no minimo de 5 minutos')
        .max(60, 'O intervalo Precisa ser no maxino de 60 minutos')

});

export function Home() {

    const {activeCycle,createNewCicle,interruptCurrentCycle} = useContext(CyclesContext)
   
    const newCycleForm = useForm<newCycleFormData>({

        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    });

    const { handleSubmit, watch, reset } = newCycleForm;


    // Formulario Controlled / Uncontrolled
    //const [task, settask] = useState('');

    // function handleSubmit(event){
    //     event.target.task.value
    // }
    // Monitorando Valor Inoput em real time
    // console.log(formState.errors);

   function handlerCreateNewCycle( data: newCycleFormData){
    createNewCicle(data);
    reset();
   }

    const task = watch('task');
    const isSubmitDisabled = !task;
    /*
    * Prop Drilling -> Quando a gente tem Muitas Propiedades Apenas para Comunicacao entre Components
    * Context Api -> Permite Compartilharmos  informacoes entre VARIOS componentes ao mesmo tempo
    */

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handlerCreateNewCycle)}>
                
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <CountDown />
                {/* </CyclesContext.Provider> */}
                {
                    activeCycle ? (
                        <StopCountDownButton onClick={interruptCurrentCycle} type="button">
                            <HandPalm size={24} />
                            Interromper
                        </StopCountDownButton>
                    ) : (<StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Comecar
                    </StartCountDownButton>)
                }


            </form>
        </HomeContainer>
    )
}