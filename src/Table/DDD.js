import { useState } from "react";

const DDD = () => {
  const [post, setPost] = useState('');

  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('post')))

  const saveAndSet = (newitems) => {
    setPosts(newitems)
    localStorage.setItem('post', JSON.stringify(newitems))
  }

  const addpost = () => {
    // console.log('salom');
    const id= posts.length + 1
    const newPost = {id:id, title: post }
    const Listitem = [...posts, newPost]
    saveAndSet(Listitem)


  }


  // deel;e

  const handdelete=(e)=>{
    const Listitem= posts.filter((item)=> item.id!== e)
    setPosts(Listitem)
    localStorage.setItem('post', JSON.stringify(Listitem))
  }
  
  // localStorage.setItem('post', JSON.stringify(posts))

  // const local = localStorage.getItem('post')


  return (<>
    <div className="w-50 mx-auto">
      <input type="text" value={post} onChange={(e) => setPost(e.target.value)}></input>
      <button onClick={() => addpost()}>add</button>

      {posts.map((item, index) => (
        <div key={index} className="d-flex justify-content-around">
          <h3>{item.title}</h3>
          <b onClick={()=> handdelete(item.id)}>delete</b>

        </div>

      ))}
    </div>
  </>);
}
export default DDD;