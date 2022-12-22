import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Audio } from "react-loader-spinner";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DetailedChart from "../../components/DetailedChart/DetailedChart";
import Dropdown from "react-dropdown";
import classes from "./UserDetail.module.css"
import { dateFormater } from "../../utils/dateFormater";
import { getDetailpage } from "../../API/dataApi"
import { useState } from "react"

const UserDetail = () => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const options = ["daily", "weekly", "monthly", "yearly"]
    const [range, setRange] = useState("")
    const [data, setData] = useState({})
    const [hasData, setHasData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { state } = useLocation()
    const { userId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const startDate = dateFormater(value[0])
    const endDate = dateFormater(value[1])


    const handleData = async () => {
        setIsLoading(true);

        try {
            setError(null)
            const response = await getDetailpage(userId, state?.token, startDate, endDate, range)
            navigate(`${location.pathname}/?start_date=${startDate}&end_date=${endDate}&response_range=${range}`)
            setData(response?.data?.data);
            setHasData(response?.data?.success)
            response?.data?.error_code && setError(response?.data?.message)
            setIsLoading(false)

            console.log(response?.data?.success, error, "RESPONSE")

        }
        catch (error) {
            // toastify
            // handle errors -> invalid token
            setError(error?.response?.data?.message)
            setIsLoading(false)
            console.log(error.message)
        }

        setIsLoading(false)

    }
    console.log(range)
    return (<>
        <div className={classes.container}>
            <em>Select a date range to get data</em>
            <Dropdown className={classes.dropDown} options={options} onChange={(e) => setRange(e.value)} value={range} placeholder="Select a range"></Dropdown>
            <DateRangePicker onChange={onChange} value={value} className={classes.dateRangePicker} />

            {isLoading ?
                <div className="d-flex justify-content-center">
                    <Audio height="18px" width="18px" color="#33ebeb" /></div>
                : <button className={classes.btn} onClick={handleData}>Show data</button>
            }
        </div>
        {hasData && <div className={classes.chart}>
            <DetailedChart data={data} />
        </div>}
        {error && <em className={classes.error}>{error}</em>}
    </>
    )
}

export default UserDetail
