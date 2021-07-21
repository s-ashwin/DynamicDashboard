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

export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const signup = async(user) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/signup`,{
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const signin = async(user) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/signin`,{
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const signout = async(next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next()

        return await fetch(`${process.env.REACT_APP_API}/signout`, {
            method: "GET"
        })
        .then(()=>(console.log("Signed Out")))
        .catch((err)=>(console.log(err)))
    }
}

export const getMyCharts = async(userId, token) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/chart/mycharts/${userId}`,{
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}