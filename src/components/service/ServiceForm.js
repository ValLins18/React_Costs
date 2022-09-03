import { useState } from 'react'
import Input from '../form/Input'
import Submit from '../form/Submit'
import styles from '../project/ProjectForm.module.css'

export default function ServiceForm({handleSubmit, btnLabel, projectData}) {

    const [service, setService] = useState()

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
        console.log(projectData)
    }

    function handleChange(e) {
        setService({...service, [e.target.name]:[e.target.value]})
    }
    return(
       <form onSubmit={submit} className={styles.form}>
           <Input
                type='text'
                label='Nome do Serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
           />
           <Input
                type='number'
                label='Custo do Serviço'
                name='cost'
                placeholder='Insira o custo do serviço'
                handleOnChange={handleChange}
           />
           <Input
                type='text'
                label='Descrição do Serviço'
                name='description'
                placeholder='Insira a descrição do serviço'
                handleOnChange={handleChange}
           />
           <Submit label={btnLabel}/>
       </form> 
    )
}