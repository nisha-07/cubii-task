import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
    baseURL: "http://devapi.mycubii.com/api/v5/",
    paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
    },
});

export const getDetailpage = (userId, startDate, endDate, range) => {
    return axiosInstance.get(`/users/${userId}/progress/activity_log/`, {
        params: {
            user_id: userId,
            start_date: startDate,
            end_date: endDate,
            response_range: range,
        },
        headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
    });
};
