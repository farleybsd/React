import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../context/CyclesContext";

export function NewCycleForm(){

    const {activeCycle} = useContext(CyclesContext);
    const {register} = useFormContext();
    
   
    return(
        <div>
             <FormContainer>
                    <label htmlFor="task">Vou Trabalhar em</label>

                    <TaskInput
                        id="task"
                        //name="task"
                        placeholder="De um Nome para seu Projeto"
                        list="task-suggestion"
                        disabled={!!activeCycle}
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
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minuitos.</span>
                </FormContainer>
        </div>
    )
}