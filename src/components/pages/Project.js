import {parse, v4 as uuidv4} from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

export default function Project(){
    const {id} = useParams() //recebe um objeto com os parametros da URL pertencente a este componente
    console.log(id)

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method:'GET',
            headers:{'Content-Type':'application/json'}
        })
        .then(resp => resp.json())
        .then(json => {
            setProject(json)
            setServices(json.services)
        })
        .catch(err => console.log(err))
    }, [id])

     function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
     }
     function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
     }
     
     function createService(project) {
         setMessage('')
        //last service
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.valorProjeto)) {
            //mensagem
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }
        //add service cost to project total cost
        project.cost = newCost

        //update project

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
     }

     function edit(project){
        setMessage('')
        //valor do projeto validation
        if(project.valorProjeto < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(json => {
            setProject(json)
            setShowProjectForm(false)
            setMessage('Projeto atualizado com sucesso')
            setType('success')
        })
        .catch(err => console.log(err))
     }
     
     function removeService(id, cost) {
        setMessage('')
        const servicesUpdated = project.services.filter(service => service.id !== id)
        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(projectUpdated)
        })
        .then(resp => resp.json())
        .then(json => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço excluido com sucesso')
            setType('success')
        })
        .catch(err => console.log(err))
     }
     
    return(
        <>
            {project.nomeProjeto ? ( 
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message msg={message} type={type}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.nomeProjeto}</h1>
                            <button className={styles.btn}  onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar' }
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Valor do Projeto: </span> R${project.valorProjeto}
                                    </p>
                                    <p>
                                        <span>Total utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={edit}
                                        btnLabel='Concluir Edição'
                                        projectData={project}
                                    />
                                </div>)}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn}  onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar' }
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnLabel='Adicionar Serviço'
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 ? services.map(service => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            )): (<p>Não há serviços cadastrados</p>)}
                        </Container>
                    </Container>
                </div>) : <Loading/>
            }
        </>
    )
}