const Filter = ({handleFilter, filter}) => {
    return (
        <div>
            filter shown with <input 
                type='text'
                name='filter'
                value={filter}
                placeholder='Search'
                onChange={handleFilter}
            />
        </div>
    )
}

export default Filter