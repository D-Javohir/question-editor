const MySort = (props) => {
    return (

        <>
            <select onChange={e=> props.onChange(e.target.value)} value={props.value}>

                <option disabled value="">{props.defaultValue}</option>
                {props.options.map((item, index) => (
                    <option value={item.value} >{item.name}</option>
                ))}


            </select>
        </>
    );
}
export default MySort;