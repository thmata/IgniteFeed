import styles from './Comment.module.css';
import { ThumbsUp } from 'phosphor-react'
import { Avatar } from './Avatar';
import { Trash } from 'phosphor-react'
import { useState } from 'react';

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;

}

export function Comment({content, onDeleteComment}: CommentProps){
    const [likeCount, setLikeCount] = useState(0)

    function handleIncreseLikes(){
        setLikeCount(likeCount + 1)
    }

    function handleDeleteComment(){
        onDeleteComment(content)
    }


    return(
            <div className={styles.container}>
                <Avatar hasborder={false} src={'https://avatars.githubusercontent.com/u/85140172?v=4'} alt=''/>
                
                <div className={styles.maincomment}>
                    <div className={styles.comment}>
                        <div className={styles.commentheader}>
                            <div className={styles.headerleft}>
                                <strong>Thiago Mata<span> (você)</span></strong>
                                <p className={styles.time}>Cerca de 2h</p>
                            </div>
                            <div className={styles.headerright}>
                                <button onClick={handleDeleteComment} title='Deletar Comentário'><Trash size={24} /></button>
                            </div>

                        </div>
                        <p className={styles.thecomment}>{content}</p>
                        
                    </div>
                    <footer>
                        <button onClick={handleIncreseLikes}> <ThumbsUp size={20}/> Aplaudir • {likeCount}</button>
                    </footer>
                </div>
            </div>
            
    );
}