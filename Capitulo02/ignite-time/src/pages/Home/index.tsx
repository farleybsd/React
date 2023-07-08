import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod";


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

const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O intervalo Precisa ser no minimo de 5 minutos')
        .max(60, 'O intervalo Precisa ser no maxino de 60 minutos')

});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// interface newCycleFormData{
//     task: string;
//     minutesAmount: number;
// }

export function Home() {
    // Formulario Controlled / Uncontrolled
    //const [task, settask] = useState('');

    // function handleSubmit(event){
    //     event.target.task.value
    // }



    // Monitorando Valor Inoput em real time

    const { register, handleSubmit, watch, formState, reset } = useForm<newCycleFormData>({

        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    });
    console.log(formState.errors);
    const task = watch('task');
    const isSubmitDisabled = !task;

    function handlerCreateNewCicle(data: newCycleFormData) {
        console.log(data);
        reset();
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handlerCreateNewCicle)}>

                <FormContainer>
                    <label htmlFor="task">Vou Trabalhar em</label>

                    <TaskInput
                        id="task"
                        //name="task"
                        placeholder="De um Nome para seu Projeto"
                        list="task-suggestion"
                        {...register('task')}
                    // onChange={(e) => settask(e.target.value)}
                    // value={task}
                    />

                    <datalist id="task-suggestion">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Banana" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>

                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        //min={5}
                        //max={60}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minuitos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Comecar
                </StartCountDownButton>

            </form>
        </HomeContainer>
    )
}