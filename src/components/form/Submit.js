import styles from './Submit.module.css'

export default function Submit({label}) {
    return(
        <div className={styles.form_control}>
            <button className={styles.btn} type='submit'>{label}</button>
        </div>
    )
}