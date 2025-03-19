import Button from "./Button"

const Persons = ({name, number, deletePerson}) => {
    return (
        <p>{name} {number} <Button onClick={deletePerson} text={'delete'} /></p>
    )
}

export default Persons