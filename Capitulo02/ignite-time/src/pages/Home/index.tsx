import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form>

                <FormContainer>
                    <label htmlFor="task">Vou Trabalhar em</label>
                    <TaskInput 
                    id="task" 
                    placeholder="De um Nome para seu Projeto" 
                    list="task-suggestion"
                    />
                    <datalist id="task-suggestion">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                        <option value="Banana"/>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                    type="number"
                    id="minutesAmount" 
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
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

                <StartCountDownButton type="submit">
                    <Play size={24}/>
                    Comecar
                </StartCountDownButton>

            </form>
        </HomeContainer>
    )
}