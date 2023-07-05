import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import { Avatar } from './Avatar';
import styles from './Post.module.css'
import { useState } from 'react';
import { Cpu } from 'phosphor-react';



// Estado = variaveis que eu quero que o component monitore

export function Post(props) {
    // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR',{
    //     day: '2-digit',
    //     month: 'long',
    //     hour: '2-digit',
    //     minute: '2-digit'
    // }).format(publishedAt);

    // Criando Um Estado 
    const [comments, setComments] = useState(['Post Muito bacana,Hein'])
    const [neWCommentText, setneWCommentText] = useState(''); //TextArea inicializar com o mesmo formato da informacao que queremos guardar

    const publishedDateFormatted = format(props.publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment() {
        event.preventDefault()
        // Colocando Valor no Estado
        setComments(...comments, neWCommentText)
        setneWCommentText('')
    }

    function handlerNewCommentChange() {
        event.target.setCustomValidity('')
        setneWCommentText(event.target.comment)
    }

    function deleteComment(commentDeleted) {
        console.log(`Deletar Comentario ${comment}`)
        const commentWithoutDeletedOne = comments.filter(x => {
            return x.comment != commentDeleted
        })
        setComments(commentWithoutDeletedOne)
    }

    function handleNewCommetInvalid(){
        event.target.setCustomValidity('Esse Campo e Obrigatorio')
    }
    const isNewCommentEmpty = neWCommentText.length == 0 ;

    return (
        <article className={styles.Post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={props.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{props.author.name}</strong>
                        <span>{props.author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={props.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                {
                    props.content.map(line => {
                        if (line.type == 'paragraph') {
                            return <p key={line.content}>{line.content}</p>
                        } else if (line.type == 'link') {
                            return <p key={line.content}><a href='#'>{line.content}</a></p>
                        }
                    })
                }
            </div>
            <form onSubmit={handleCreateNewComment()} className={styles.commentForm}>
                <strong>Deixe seu FeedBack</strong>
                <textarea
                    name='comment'
                    placeholder='Deixa seu comentario'
                    onChange={handlerNewCommentChange}
                    value={neWCommentText}
                    required
                    onInvalid={handleNewCommetInvalid}
                />
                <footer>
                    <button disabled={isNewCommentEmpty} type='submit'>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {
                    comments.map(comment => {
                        return <Comment key={comment} content={comment} deleteComment={deleteComment} />
                    })
                }

            </div>
        </article>
    );
}