import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'


const getAll = async() => {
    const request = await axios.get(API_URL + '/contacts')
    return request.data
}

const addPerson = async(newPerson) => {
    const request = await axios.post(API_URL + '/contact',newPerson)
    return request.data
}

const deletePerson = async(id) => {
    const request = await axios.delete(API_URL + `/contact/${id}`)
    return request
}

const updatePerson = async (id, newPerson) => {
    const request = await axios.put(API_URL + `/contact/${id}`, newPerson)
    return request.data
}

export default { getAll, addPerson, deletePerson, updatePerson }