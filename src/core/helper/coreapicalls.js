export const isAuthenticated = ()=> {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}

export const signout = async(next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next()

        return await fetch(`http://localhost:4000/api/signout`, {
            method: "GET"
        })
        .then(()=>(console.log("Signed Out")))
        .catch((err)=>(console.log(err)))
    }
}
