import Styles from './footer.module.css'
import manaraLogo from '../../../assets/img/logos/manara-logo.png'
export default function Footer() {
    return (
        <footer>
            <div className={Styles.footerContainer}>
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
        </footer>
    )
}