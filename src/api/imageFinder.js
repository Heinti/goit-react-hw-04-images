import axios from "axios"
// import { useCallback } from "react"

const KEY = '31530819-6c3d51b10eadf060d5b479d1e'
axios.defaults.baseURL = `https://pixabay.com/api`



export const getImges = async (value, page) =>{
    const response = await axios.get(`/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    return response.data
}



// export const getImges = (value, page) => {

//      const thumbFunc = useCallback(async () => {
//             let response = await axios.get(`/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
//             response = await response.json()
//            return response.data
//       },
//       thumbFunc()
//       [thumbFunc],
//     )
    
// }



// export const getImges = useCallback(async (value, page) =>{ 
//     const response = await axios.get(`/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//     return response.data
//  , [] })
