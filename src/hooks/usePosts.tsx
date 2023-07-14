import {useState} from "react";

function usePosts (){
const [posts, setPosts] = useState([])


    
return{posts, setPosts}    
}

export default usePosts