import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react' // monitorar variaveis  quando tiver alteracao uma funcao seja acionado

function App() {

  const [list, setList] = useState<string[]>([])
  const [filter, setFilter] = useState('');
//  const [filteredList, setfilteredList] = useState<string[]>([])
  useEffect(() => {
    console.log(list) // comtem o valor atual da variavel
    if (list.length != 0) {
      avisarApi()
    }
  }, [list]) // monitorar  a variavel Tipos Observer do Angula

  useEffect(() => {

    console.log('Ng oN Init')

    fetch('https://api.github.com/users/farleybsd/repos')
      .then(response => response.json())
      .then(data => {
        setList(data.map((item: any) => item.full_name))
      })
  }, []) // monitorar quando  for vazio

  // useEffect(() => {
  //   setfilteredList(list.filter(item => item.includes(filter)))
  // }, [filter])

  const filteredList = list.filter(item => item.includes(filter));

  function avisarApi() {
    console.log('Lista Salva!')
  }

  function AddToList() {
    setList(state => [...state, 'Novo Item'])
    avisarApi();
  }

  return (
    <div>
      <input
        onChange={e => setFilter(e.target.value)}
        value={filter}>
      </input>
      <ul>
        {list.map(x => <li>{x}</li>)}
      </ul>
      <ul>
        {filteredList.map(x => <li>{x}</li>)}
      </ul>

      <button onClick={AddToList}>Add To List</button>
    </div>
  )
}

export default App
