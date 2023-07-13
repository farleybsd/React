import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import {formatDistanceToNow} from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR';

export function History() {
    const { cycles } = useContext(CyclesContext);
    return (
        <HistoryContainer>

            <h1>Meu Historico</h1>
            {/* <pre>
                    {JSON.stringify(cycles,null,2)}
                </pre> */}
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duracao</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cycles.map(cycle => {
                                return (
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(cycle.start,{
                                            addSuffix:true,
                                            locale: ptBr,
                                        })}</td>
                                        <td>
                                            {cycle.finishedDate && <Status statusColor="green">Concluido</Status> }
                                            {cycle.interruptedDate && <Status statusColor="red">Interrompido</Status> }
                                            {(!cycle.interruptedDate && !cycle.interruptedDate) && <Status statusColor="yellow">Em Andamento</Status> }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </HistoryList>

        </HistoryContainer>
    );
}