import Styles from './header.module.css'
import manaraLogo from '../../../assets/img/logos/manara-logo.png'
export default function Header() {
    return (
        <div className={Styles.headerContainer}>
            <div className={Styles.logo}>
                <a href="https://www.manaralab.tech/#/"
                 className={Styles.logoLink}
                 target="_blank"
                 rel="noopener noreferrer"
                 >
                    <img
                        src={manaraLogo}
                        alt="Manara Logo"
                        className={Styles.logoImage}
                    />

                    <span className={Styles.tooltip}>
                        Visit ManaraLab website
                    </span>
                </a>
            </div>
        </div>
    )
}