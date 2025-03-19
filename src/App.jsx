import { useState, useEffect, useCallback } from 'react'
import phonesServices from './services/phones'
import Notification from '../Components/Notification'

//Componentes

import PersonForm from '../Components/PersonForm'
import Persons from '../Components/Persons'
import Filter from '../Components/Filter'

//Estilos 

import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationType, setNotificationType] = useState('')
  const [notification, setNotification] = useState('')
  const [state, setState] = useState({
    name: '',
    number:'',
  })
  const [filter, setFilter] = useState('')

  const getContacts = useCallback(async() => {
    
    const contacts = await phonesServices.getAll()
    console.log(contacts.usuarios)
    setPersons(contacts.usuarios)
  }, [])


  useEffect(() => {
    getContacts()
  },[getContacts])

  const handleInput = (event) => {
    setState({
        ...state,
        [event.target.name]: event.target.value 
    })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const validatePerson = (name, number) => {

    if(name === '' || number === ''){
        alert('Please fill all the fields')
        setState({
            name: '',
            number: ''
        })
        return false
    }
    
    return true
  }



  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  
  const addPerson = async (event) => {
    event.preventDefault()

    if(!validatePerson(state.name, state.number)) return

    const person = persons.find(person => person.name === state.name)
    if(person){

        const updateConfirm = window.confirm(`${person.name} ya existe en la libreria quieres actualizar el número de telefono`)
        if(!updateConfirm) return

        const changePerson = {...person, number: state.number}

        updatePerson(person.id, changePerson)
        setState({
            name: '',
            number: ''
        })
        return
    }

    const newPerson = {
        name: state.name,
        number: state.number
    }
    
    await phonesServices.addPerson(newPerson)

    setNotification(`${newPerson.name} se ha añadido exitosamente`)
    setNotificationType('success')
    rest()
    setState({
        name: '',
        number: ''
    })
    getContacts()
  }

  const deletePersons =  async (id) => {

    const person = persons.find(person => person.id === id)


    const confirmDelete = window.confirm(`Do you really want to delete ${person.name}?`)

    if(!confirmDelete) return 

    try{
        await phonesServices.deletePerson(id)

        setNotification(`${person.name} se ha eliminado correctamente`)
        setNotificationType('success')
        rest()

    }catch(error){
        console.log(error.message)
        setNotification(`${person.name} no está registrado en el sistema`)
        setNotificationType('error')
        rest()

    }
  }

  const rest = () => {
    setTimeout(() => {
        setNotification('')
        setNotificationType('')
    }, 4000)
  }

  const updatePerson = async (id, newPerson) => {

    try{
        const request = await phonesServices.updatePerson(id, newPerson)

        setNotification(`${newPerson.name} se ha actualizado correctamente`)
        setNotificationType('success')
        rest()
        return true

    }catch(error){
        console.log(error.message)
        setNotification(`${newPerson.name} no está registrado en el sistema`)
        setNotificationType('error')
        rest()
        return false
    }
  }

  return (
    <div>
        <h2>Phonebook</h2>
        {notification !== '' && <Notification message={notification} type={notificationType}/>}
        <Filter handleFilter={handleFilter} filter={filter} />
        <h3>add a New</h3>
        <PersonForm addPerson={addPerson} handleInput={handleInput} state={state} />
        <h3>Numbers</h3>
        {filteredPersons.map((person) => <Persons key={person.id} name={person.name} number={person.number} deletePerson={() => deletePersons(person.id)} />)}
    </div>
  )
}

export default App