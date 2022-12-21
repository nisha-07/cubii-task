import axios from "axios";

export const login = (data) => {
    return axios
        .create({
            baseURL: "http://devapi.mycubii.com/api/v5/"
        })
        .post("/login/", data)
}