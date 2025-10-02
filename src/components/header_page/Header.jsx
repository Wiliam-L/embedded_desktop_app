import styles from "./Header.module.css"
const Header = ({title, children}) => {
    return(
        <div className={styles.header}>
            <h2 className={styles.title}>
                {title}
            </h2>
            {children}
        </div>
    )
}


export default Header;