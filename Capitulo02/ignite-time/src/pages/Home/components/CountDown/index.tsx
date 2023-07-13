import { useContext, useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../context/CyclesContext";



export function CountDown(){

 const {activeCycle,activeCycledId,marckCurrenteCycleAsFinished,amountSecondsPassed,setSecondsPassed} = useContext(CyclesContext)
 

    
    
    const totalSeconds = activeCycledId ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {

                const secondsdifference = differenceInSeconds(new Date(), activeCycle.start);

                if (secondsdifference >= totalSeconds) {
                    marckCurrenteCycleAsFinished();
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval);
                } 
                else {
                    setSecondsPassed(secondsdifference)
                }

            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycledId,marckCurrenteCycleAsFinished,setSecondsPassed])

    const currentSecons = activeCycle ? totalSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSecons / 60);
    const secondsAmount = minutesAmount % 60;
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');
   

    useEffect(() => {
        if (activeCycle)
            document.title = `${minutes}:${seconds}`
    }, [minutes, seconds, activeCycle])

    return(
        <div>
          <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>  
        </div>
    )
}