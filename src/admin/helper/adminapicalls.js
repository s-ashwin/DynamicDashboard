export const createRole = async(userId, token, role) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/role/create/${userId}`,{
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(role)
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const getRoles = async(userId, token) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/role/getall/${userId}`,{
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

export const getRole = async(userId, token, roleId) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/role/get/${userId}/${roleId}`,{
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const updateRole = async(userId, token, roleId, role) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/role/update/${userId}/${roleId}`,{
                        method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(role)
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const deleteRole = async(userId, token, roleId) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/role/delete/${userId}/${roleId}`,{
                        method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const getUsers = async(userId, token) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/user/getall/${userId}`,{
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

export const getUser = async(userId, token, id) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/user/get/${userId}/${id}`,{
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const updateUser = async(userId, token, id, role) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/user/update/${userId}/${id}`,{
                        method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({role})
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const createChart = async(userId, token, chart) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/chart/create/${userId}`,{
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(chart)
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const getData = async(url) => {
    try{
        const res = await fetch(`${url}`,{
                        method: "GET"
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}

export const getCharts = async(userId, token) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/chart/getall/${userId}`,{
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

export const getAChart = async(userId, token, chartId) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/chart/get/${userId}/${chartId}`,{
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

export const updateChart = async(userId, token, id, chart) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API}/chart/update/${userId}/${id}`,{
                        method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(chart)
        })
        return res.json();
    }
    catch(err){
        console.log(err);
        return {error:err}
    }
}
