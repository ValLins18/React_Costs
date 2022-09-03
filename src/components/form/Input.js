import styles from './Input.module.css'

export default function Input({type, label, name, placeholder, handleOnChange, value}) {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}