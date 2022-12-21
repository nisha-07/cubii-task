import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
    baseURL: "http://devapi.mycubii.com/api/v5/",
    paramsSerializer: { serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }) },
});

export const getDetailpage = (userId, token, startDate, endDate) => {
    return axiosInstance.get(`/users/${userId}/progress/activity_log/`, {
        params: {
            user_id: userId,
            start_date: startDate,
            end_date: endDate,
            response_range: "monthly",
        },
        headers: {
            Authorization: `Token ${token}`,
        }
    })
}