import { useLocation, useNavigate, useParams } from "react-router-dom";

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import classes from "./UserDetail.module.css"
import { dateFormater } from "../../utils/dateFormater";
import { getDetailpage } from "../../API/dataApi"
import { useState } from "react"

const UserDetail = () => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const { state } = useLocation()
    const { userId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const startDate = dateFormater(value[0])
    const endDate = dateFormater(value[1])


    const handleData = async () => {
        const response = await getDetailpage(userId, state?.token, startDate, endDate)
        navigate(`${location.pathname}/?start_date=${startDate}&end_date=${endDate}&response_range=monthly`)
        console.log(response)

    }

    return (
        <div className={classes.container}>
            <em>Select a date range to get data</em>
            <DateRangePicker onChange={onChange} value={value} className={classes.dateRangePicker} />
            <button onClick={handleData}>Show data</button>
        </div>
    )
}

export default UserDetail
