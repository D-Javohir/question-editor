const Tbody=(props)=>{
    return(
  
         <tr>
             <td>{props.number}</td>
             <td>{props.post.title}</td>
             <td>{props.post.stack}</td>
             <td><button className="btn btn-outline-success"
             onClick={()=> props.remove(props.post)}
             >delete</button></td>
         </tr>
     
    );
}
export default Tbody;