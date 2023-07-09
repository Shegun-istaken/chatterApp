function Test ({name="John", age}: {name?: string, age: number}){

    return(
        <div>
            <p>{name}</p>
            <p>{age}</p>
        </div>
    )
}

export default Test