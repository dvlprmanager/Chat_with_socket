import { RouteBase } from './BaseUrl'

const userAuth =  (localStorage.getItem('authUser')) ? (JSON.parse(localStorage.getItem('authUser')).token) ? JSON.parse(localStorage.getItem('authUser')).token : null : null
// const userAuth = null
export async function GetRoute(url) {

    const response = await fetch(`${url}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userAuth}`
            }
        }
    )
    .then(function(data) {
        return  data.json()
    }).catch(function() {
        return []
    })
    return await response
}

// **************************************************************************
// Funcion guardar registros json
// **************************************************************************
export async function PostRoute(url, form) {
    
    const data = JSON.stringify({ usuario : JSON.parse(localStorage.getItem('authUser')).id, ...form })
    // elviamos el formulario con fetch por el metodo post
    const response = await fetch(`${RouteBase}/${url}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userAuth}`
            },
            body: data
        }
    )
    .then(function(data) {
            return  data.json()
        }).catch(function() {
            return []
        })

        return await response
    }

// **************************
// Funcion guardar registros con documentos
// **************************
export async function PostRouteFD(url, form) {
        
    form.append('usuario', JSON.parse(localStorage.getItem('authUser')).id)
    // elviamos el formulario con fetch por el metodo post
   const response = await fetch(`${RouteBase}/${url}`,
       {
           method: 'POST',
           mode: 'cors',
           headers: {
               'Access-Control-Allow-Origin' : '*',
               Authorization: `Bearer ${userAuth}`
           },
           body: form
       }
   ).then(function(data) {
        return  data.json()
    }).catch(function() {
        return []
    })

    return await response
}

export default {
    GetRoute,
    PostRoute,
    PostRouteFD
}