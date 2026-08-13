import Styles from './footer.module.css'
import manaraLogo from '../../../assets/img/logos/manara-logo.png'

export default function Footer() {
    return (
        <footer className={Styles.footerWrapper}>
            <div className={Styles.footerContainer}>
                <div className={Styles.copyrightSection}>
                    <p>© 2026 All Rights Reserved</p>
                </div>
                <div className={Styles.logoSection}>
                    <a 
                        href="https://www.manaralab.tech/#/"
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