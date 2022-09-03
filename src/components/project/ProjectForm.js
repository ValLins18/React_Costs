import { useEffect, useState  } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import styles from './ProjectForm.module.css'

export default function ProjectForm({btnLabel, handleSubmit, projectData}) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categories')
        .then(data => data.json())
        .then(json => {
            setCategories(json)
        })
        .catch(err => console.error(err))
    },[])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
        console.log(project)
    }
    function handleCategory(e) {
        setProject({...project, 
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }})
        console.log(project)
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                name='nomeProjeto'
                type='text'
                label='Nome do Projeto' 
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.nomeProjeto ? project.nomeProjeto : '' }
            />
            <Input
             
                name='valorProjeto'
                type='number'
                label='Valor do Projeto' 
                placeholder='Insira o orçamento do projeto'
                handleOnChange={handleChange}
                value={project.valorProjeto ? project.valorProjeto : ''}
            />
 
            <Select 
                name='category_id' 
                label='Selecione a categoria'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <Submit label={btnLabel}/>
        </form>
    )
}