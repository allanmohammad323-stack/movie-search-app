import styles from './background.module.css'
import secondStyles from './secondBg.module.css'
import { useTheme } from '../../context/themecontext/themecontext.jsx'

export default function Background(){
    const { isDark } = useTheme()
    const bgClass = isDark ? styles : secondStyles;
    
    return(
        <div className={bgClass.movieBg}>
            <div className={bgClass.blob}></div>
            <div className={bgClass.blob}></div>
            <div className={bgClass.lightRays}></div>
            <div className={bgClass.particle}></div>
            <div className={bgClass.particle}></div>
            <div className={bgClass.particle}></div>
            <div className={bgClass.particle}></div>
            <div className={bgClass.particle}></div>
            <div className={bgClass.particle}></div>
            <div className={bgClass.filmStrip}></div>
            <div className={bgClass.filmStripBottom}></div>
            <div className={bgClass.spotlight}></div>
            <div className={bgClass.colorSweep}></div>
        </div>
    )
}