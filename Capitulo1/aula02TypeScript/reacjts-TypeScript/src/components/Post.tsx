import { Avatar } from './Avatar';
import { Commment } from './Comment';
import styles from './Post.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FormEvent,ChangeEvent ,useState, InvalidEvent } from 'react';

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface PostProps{
  post :PostType;
}
interface Content{
  type: 'paragraph' | 'link';
  content: string;
}
export interface PostType{
  id:number;
  author:Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ post }: PostProps) {

  // console.log(content)

  const [comments, setComments] = useState(['Post muito bacana, hein?!']);
  const [newComment, setNewComment] = useState('');
  const isNewCommentEmpty = newComment.length === 0;
  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewComment(event.target.value)
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newComment]);
    setNewComment('');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithOutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithOutDeletedOne);
  }

  function handleNewCommentInvalid(event : InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');

  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>

        {
          post.content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === 'link') {
              return <p key={line.content}><a href="">{line.content}</a></p>;
            }
          })
        }
      </div>

      <form
        onSubmit={handleCreateNewComment}
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentário...'
          name="comment"
          onChange={handleNewCommentChange}
          required
          onInvalid={handleNewCommentInvalid}
          value={newComment}
        />

        <footer>
          <button disabled={isNewCommentEmpty} type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => <Commment
          key={comment}
          content={comment}
          onDeleteComment={deleteComment}
        />)}
      </div>

    </article>
  )
}