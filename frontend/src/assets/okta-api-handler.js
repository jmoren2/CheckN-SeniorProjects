//** Eventually, these will go to config file so hide secret info **//
var baseUrl = 'https://pdx-capstone-a-team.okta.com/'
const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'SSWS 00DsDHHA_aVUA4QAV17KvALZlEHCQng_Fe6eufsZNZ',
    client_id: '0oa153tnmegP5431a2p7',
    client_secret: 'vPFNbQBPkzcrYzOeJ_JzOFzxtwK2teQwLIWr5mbX',
}
// ************************************************************* //


export function loginUser(email, password) {
    return fetch(baseUrl + 'api/v1/authn',{
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            username: email,
            password: password
        }),
    })
}


export function getUser(email){
    return fetch(baseUrl + 'api/v1/users/' + email, {
        method: 'GET',
        headers: headers
    })
}


// Parameter profileshould be JSON object
export function createUser(profile){
    return fetch(baseUrl + 'api/v1/users?activate=true',{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            profile: profile,
        }),
    })
}


/* FUNCTIONS are Having issue with CORS - NOT FUNCTIONAL YET */

// Parameter profile should be JSON object
export function deleteUser(email){
    return getUser(email)
    .then(response => {
        return response.json()
    })
    .then(data => {
        var id = data.id;
        console.log("here:" , data)

        return fetch(data._links.deactivate.href,{
            method: 'POST',
            headers: headers
         })
    })
}

// Parameter profile should be JSON object
export function updateUser(email, profile){
    return getUser(email)
    .then(response => {
        return response.json()
    })
    .then(data => {
        return fetch(data._links.deactivate.href,{
            method: 'POST',
            headers: headers,
            profile: profile
         })
    })
}
/* ******************************************************* */