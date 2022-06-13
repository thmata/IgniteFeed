import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { Comment } from './Comment';
import styles from './Post.module.css'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];

}

export function Post(props:PostProps){
    const [comments, setComments] = useState(['Post muito bacana, hein?!'])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(props.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR},)

    const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {locale: ptBR, addSuffix: true})

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();
        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete: string){
        const commentsWhioutDeletedOne = comments.filter(comments => {
            return comments !== commentToDelete;
        })
        setComments(commentsWhioutDeletedOne);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <div className={styles.container}>
            <header>
                <div className={styles.profile}>
                    <Avatar hasborder={true} src={props.author.avatarUrl} />
                    <div className={styles.desc}>
                        <strong className={styles.name}>{props.author.name}</strong>
                        <span className={styles.cargo}>{props.author.role}</span>
                        
                    </div>
                </div>
                <time className={styles.lastime} title={publishedDateFormatted} dateTime={props.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <main className={styles.content}>
                {props.content.map(content => {
                    if(content.type === 'paragraph'){
                        return <p key={content.content}>{content.content}</p>
                    } else if (content.type === 'link') {
                        return <p key={content.content}><a href='#'>{content.content}</a></p>
                    }
                })}

            </main>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name='commentario' 
                    placeholder='Deixe seu comentário' 
                    onChange={handleNewCommentChange} 
                    value={newCommentText}
                    onInvalid={handleNewCommentInvalid}
                    required                
                    />
                <button disabled={isNewCommentEmpty} type='submit'>Comentar</button>
            </form>
            {comments.map(comment => {
                return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
            })}
        </div>
    );
}