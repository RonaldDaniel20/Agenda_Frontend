const PersonForm = ({addPerson, handleInput, state}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <div>
                    name: <input 
                        type='text'
                        name='name'
                        placeholder='Ingrese un nombre'
                        value={state.name}
                        onChange={handleInput}
                    />
                </div>
                <br/>
                <div>
                    number: <input 
                        type='text'
                        name='number'
                        placeholder='Ingresa un numero'
                        value={state.number}
                        onChange={handleInput}
                    />
                </div>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm