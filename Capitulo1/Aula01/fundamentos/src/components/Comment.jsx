import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'
import { ThumbsUp, Trash } from 'phosphor-react'


export function Comment(props) {

const [Like,setLikeComment] = useState(0);

function handleDeleteCommnet() {
    deleteComment(props.deleteComment)
}

function handleLikeComment(){
    setLikeComment(Like + 1)
}

    return (
        <div className={styles.Comment}>
            <Avatar hasBorder={false} src="https://github.com/farleybsd" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>FARLEY</strong>
                            <time title="11 de maio as 08:13" dateTime="2022-05-11 08:13:30">Cerca de uma hora atras</time>
                        </div>
                        <button onClick={handleDeleteCommnet} title="Deletar Comentario">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{props.content}</p>
                </div>
            </div>
            <footer>
                <button onClick={handleLikeComment}>
                    <ThumbsUp />
                    Aplaudir <span>{Like}</span>
                </button>
            </footer>
        </div>
    )
}