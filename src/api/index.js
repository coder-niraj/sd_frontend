
let baseUrl = "https://sd-backend-erqy.onrender.com"
let userAuth = "/user"
let LoginUrl = "/login"
let RegisterUrl = "/register"
let getAllUsers = "/get-message-users"
let userAlreadyExist = "/user-exist"
let getMessage = "/get-messages"
let getGroups = "/get-groups"
let createGroupApi = "/create-group"
let getGroupMessages = "/get-group-messages"
let kickUserFromGroup = "/kick-group-member"
let deleteTheGroup = "/delete-group"
let getOthers = "/get-other-users"
let AddUserToGroup = "/add-users-to-group"
let ExitTheGroup = "/exit-group"
let UpdateTheGroup = "/update-group"
let EditTheProfile = "/edit-profile"



const Login = async (body) => {
    let data = await fetch(baseUrl + userAuth + LoginUrl, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const Register = async (body) => {
    let data = await fetch(baseUrl + userAuth + RegisterUrl, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const getMessageUsers = async (body, authToken) => {
    let data = await fetch(baseUrl + getAllUsers, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const userExist = async (body) => {
    let data = await fetch(baseUrl + userAuth + userAlreadyExist, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const getMessages = async (body, authToken) => {
    let data = await fetch(baseUrl + getMessage, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const getAllGroups = async (authToken) => {
    let data = await fetch(baseUrl + getGroups, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const createGroup = async (body, authToken) => {
    let data = await fetch(baseUrl + createGroupApi, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const deleteGroup = async (body, authToken) => {
    let data = await fetch(baseUrl + deleteTheGroup, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const kickMember = async (body, authToken) => {
    let data = await fetch(baseUrl + kickUserFromGroup, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const getOtherUsers = async (body, authToken) => {
    let data = await fetch(baseUrl + getOthers, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const GroupMessages = async (body, authToken) => {
    let data = await fetch(baseUrl + getGroupMessages, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const AddUser = async (body, authToken) => {
    let data = await fetch(baseUrl + AddUserToGroup, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const ExitGroup = async (body, authToken) => {
    let data = await fetch(baseUrl + ExitTheGroup, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const UpdateGroup = async (body, authToken) => {
    let data = await fetch(baseUrl + UpdateTheGroup, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


const EditProfile = async (body, authToken) => {
    let data = await fetch(baseUrl + userAuth + EditTheProfile, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        method: "POST"
    })
    let response = await data.json()
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}


export default {
    Login,
    Register,
    userExist,
    getMessages,
    getMessageUsers,
    createGroup,
    getAllGroups,
    GroupMessages,
    kickMember,
    deleteGroup,
    getOtherUsers,
    AddUser,
    ExitGroup,
    UpdateGroup,
    EditProfile
}