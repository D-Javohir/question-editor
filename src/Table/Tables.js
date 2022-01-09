import Table_list from "./Table_list";
import { useMemo, useState } from "react";
import MySort from "./MySort";
// import SLider from "./DDD";
import DDD from "./DDD";

const Tables = () => {

    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript", stack: 'Mern-stack' },
        { id: 2, title: "Python", stack: 'full-stak' },
        { id: 3, title: "Php", stack: 'Backend' },
        { id: 4, title: "Kotlin", stack: 'Android' },
    ])
    const [post, setPost] = useState([
        { id: 1, title: "Html", stack: 'Mern-stack' },
        { id: 2, title: "css", stack: 'full-stak' },
        { id: 3, title: "botstrap", stack: 'Backend' },
        { id: 4, title: "Kotlin", stack: 'Android' },
    ])
    const [title, setTitle] = useState();
    const [stack, setStack] = useState();


    const AddPost = (e) => {
        e.preventDefault()

        const newPost = {
            id: Date.now(),
            title,
            stack
        }
        setPosts([...posts, newPost])
      
        setTitle("")
        setStack("")
    }

    const removePost = (post) => {
        setPosts(posts.filter(s => s.id !== post.id))
    }

    const [select, setSelect] = useState('');
    const [search, setSearch]=useState('');

    /// function search sort 
    const searchPost= useMemo(()=>{
        console.log('render');
        if(select){
            return    [...posts].sort((a, b) => a[select].localeCompare(b[select]))
        }
        return posts 
    }, [select, posts])
       
    const searchAndsort= useMemo(()=>{
        return searchPost.filter(post=> post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        
    }, [search, searchPost])

    const SetSortsearch= searchPost

    const SortPost = (sort) => {
        setSelect(sort)
       setPosts(SetSortsearch)
     
    }

    return (
        <>
            <div style={{
                width: "40%", margin: 'auto', border: "1px solid black", textAlign: "center", marginBottom: "20px",
                padding: "10px"
            }}>

                <h4> Create Your First post</h4>

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Progrramming language"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter your Favorite Stack"
                    value={stack}
                    onChange={(e) => setStack(e.target.value)}
                ></input>
                <button className="btn btn-primary form-control mb-3"
                    onClick={AddPost}
                >Add post</button>
                <div className="d-flex ">

                    <input 
                    type="search" value={search} 
                    className="form-control" 
                    onChange={(e)=>setSearch(e.target.value) }
                    placeholder="search..."
                    />
                    <MySort
                        defaultValue="sorted by"
                        value={select}
                        onChange={SortPost}
                        options={
                            [
                                { value: "title", name: "Programming" },
                                { value: "stack", name: "Jobs" },

                            ]
                        }
                    />
                </div>

                {posts.length ? <Table_list posts={searchAndsort}
                    title={"Programming Language"}
                    remove={removePost} />
                    : <h4>Add Post Do you</h4>
                }

            </div>


            <DDD/>
            {/* <Table_list posts={post}
                title={"Social Language"} /> */}
            {/* 
                <div>

                    <SLider/>
                </div> */}
        </>
    );
}
export default Tables;