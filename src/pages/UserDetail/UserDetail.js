import {
    convertTimeStampToHumanReadableDate,
    convertTimeStampToHumanReadableTime,
} from "../../utils/dateAndTimeUtil";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Audio } from "react-loader-spinner";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DetailedChart from "../../components/DetailedChart/DetailedChart";
import DetailedIcon from "../../components/DetailedIcons/DetailedIcon";
import Dropdown from "react-dropdown";
import classes from "./UserDetail.module.css";
import { getDetailpage } from "../../API/dataApi";

const UserDetail = () => {
    const [value, onChange] = useState([new Date(), new Date()]);
    const options = ["daily", "weekly", "monthly", "yearly"];
    const [range, setRange] = useState("");
    const [data, setData] = useState({});
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const startDate = convertTimeStampToHumanReadableDate(value[0]);
    const endDate = convertTimeStampToHumanReadableDate(value[1]);

    // update the format of date coming from the response to have on the x-axis
    useEffect(() => {
        hasData &&
            Object.entries(data).forEach(([key]) => {
                data[key].date = convertTimeStampToHumanReadableDate(data[key].date);
                data[key].start_date = convertTimeStampToHumanReadableDate(
                    data[key].start_date
                );
                data[key].start_time = convertTimeStampToHumanReadableTime(
                    data[key].start_time
                );
            });
    }, [hasData, data]);

    // get details of the user by calling API onclick button
    const handleData = async () => {
        setIsLoading(true);

        try {
            setError(null);
            const response = await getDetailpage(userId, startDate, endDate, range);
            navigate(
                `${location.pathname}?start_date=${startDate}&end_date=${endDate}&response_range=${range}`
            );
            setData(response?.data?.data);
            setHasData(response?.data?.success);
            response?.data?.error_code && setError(response?.data?.message);
            isLoading && setIsLoading(false);
        } catch (error) {
            setError(error?.response?.data?.message);
            setIsLoading(false);
            console.log(error?.response?.data?.detail);
            error?.response?.data?.detail && navigate("/");
        }

        setIsLoading(false);
    };

    return (
        <>
            <div className={classes.container}>
                <em>Select a date range to get data</em>
                <Dropdown
                    className={classes.dropDown}
                    options={options}
                    onChange={(e) => setRange(e.value)}
                    value={range}
                    placeholder="Select a range"
                ></Dropdown>
                <DateRangePicker
                    onChange={onChange}
                    value={value}
                    className={classes.dateRangePicker}
                />

                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <Audio height="18px" width="18px" color="#33ebeb" />
                    </div>
                ) : (
                    <button className={classes.btn} onClick={handleData}>
                        Show data
                    </button>
                )}
            </div>
            {hasData && data && !error && (
                <div>
                    <p className={classes.headingOfDetail}>Your progress</p>
                    <div className={classes.detailedContainer}>
                        <em>
                            {startDate} : {endDate}
                        </em>
                        <DetailedIcon data={data} />
                        <div className={classes.chart}>
                            <DetailedChart data={data} range={range} />
                        </div>
                    </div>
                </div>
            )}
            {error && <em className={classes.error}>{error}</em>}
        </>
    );
};

export default UserDetail;
