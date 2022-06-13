import styles from './Sidebar.module.css'
import banner from '../assets/banner.svg'
import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar'

export function Sidebar(){
    return(
        <aside className={styles.sidebar}>
            <img src={banner} alt="" />
            <div className={styles.profile}>
                <Avatar hasborder={true} src="https://avatars.githubusercontent.com/u/85140172?v=4"/>
                <strong>Thiago Mata</strong>
                <span>Desenvolvedor Front-End</span>
            </div>
            <footer>
                <a href="#"><PencilLine size={19}/> Editar seu perfil</a>
            </footer>

         </aside>
    )

}