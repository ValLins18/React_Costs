import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from './Projects.module.css'
import Message from "../layout/Message";
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import Loading from "../layout/Loading";



export default function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoader, setRemoveLoader] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''

    if(location.state) {
        message = location.state
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects/')
        .then(resp => resp.json())
        .then(json => {
            setProjects(json)
            setRemoveLoader(true)
        } )
        .catch(err => console.log(err))
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers:{'Content-Type':'application/json'}
        })
        .then(resp => resp.json())
        .then(json =>{
            console.log(json)
            setProjects(projects.filter((project) => project.id !== id))
            //retorna um novo array com todos os projetos do qual o id é diferente do id da requisição
            //seta o novo array no useState do projects
            setProjectMessage('Projeto Removido com sucesso!')
        })
        .catch(err => console.log(err))
    }
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
            {message && <Message msg={message} type='success'/>}
            {projectMessage && <Message msg={projectMessage} type='success'/>}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map(project => (
                        <ProjectCard 
                            id={project.id}
                            name={project.nomeProjeto}
                            valorProjeto={project.valorProjeto}
                            category={project.category.name}
                            handleRemove = {removeProject}
                        />
                    ))}
                    {!removeLoader && <Loading/>}
                    {removeLoader && projects.length === 0 && (
                        <h3>Não há Projetos</h3>
                    )}
            </Container>
        </div>
    )
}