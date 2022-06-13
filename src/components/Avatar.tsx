import styles from './Avatar.module.css'

interface AvatarProps {
    hasborder?: boolean;
    src: string;
    alt?: string
}

export function Avatar(props: AvatarProps){
    return(
        <img className={props.hasborder ? styles.avatarWithBorder : styles.avatar} src={props.src} alt={props.alt} />
    )
}