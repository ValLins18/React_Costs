import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import {useNavigate} from 'react-router-dom'

export default function NewProject() {
    const history = useNavigate()

    function add(project) {
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            //redirect
            history('/projects',{state: 'Projeto criado com sucesso!'})
        })
        .catch(err => console.log(err))
    }
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={add} btnLabel='Criar Projeto'/>
        </div>
    )
}