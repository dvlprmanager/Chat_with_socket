import { RouteBase }  from './BaseUrl'



export async function PostRoute(url, form) {
    
    const data = JSON.stringify({...form })
    // elviamos el formulario con fetch por el metodo post
    const response = await fetch(`${url}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }
    )
    .then(function(data) {
        // StatusCode(data)
        return  data.json()
        }).catch(function(data) {
        // StatusCode(data)
            return []
        })

        return await response
}


export default {
    PostRoute
}