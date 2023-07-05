import { useState } from 'react';
import { Header } from './components/Header';
import { Post,PostType } from './components/Post';
import styles from './App.module.css';
import { SideBar } from './components/SideBar';


// author: { avatar_url: "", name: "", role: "" }
// publishedAt: Date
// content: String,

const posts : PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/farleybsd.png',
      name: "Pedro Miguel",
      role: "Desenvolvedor Frontend"
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-06-13 20:42:00'),
  },

  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: "Maik Brito",
      role: "Instrutor na Rocketseat"
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-06-13 20:44:00'),
  },
]

// iteração

function App() {

  return (
    <>
      <Header></Header>
      <div className={styles.wrapper}>
        <SideBar />
        <main>
          {posts.map(post => <Post
            key={post.id}
            post={post}
          />)}
        </main>
      </div>
    </>
  )
}

export default App
