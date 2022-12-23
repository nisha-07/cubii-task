import { abbreviateNumber, convertIntoHours } from "../../utils/numberFormater";
import { useEffect, useState } from "react";

import Icon from "../IconImage/Icon";
import calorieIcon from "../../assets/calorie.jpg";
import classes from "./DetailedIcon.module.css";
import distanceIcon from "../../assets/distance.png";
import durationIcon from "../../assets/duration.png";
import strideIcon from "../../assets/stride.png";

const DetailedIcon = ({ data }) => {
    const [strides, setStrides] = useState(0);
    const [calories, setCalories] = useState(0);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        data?.map(
            (item) => (
                setStrides(strides + item?.rotations),
                setCalories(calories + item?.calories),
                setDistance(distance + item?.distance),
                setDuration(duration + item?.duration)
            )
        );
    }, [data]);
    return (
        <div className={classes.detailedIcon}>
            <Icon
                src={strideIcon}
                alt="strides"
                value={abbreviateNumber(strides)}
                label="Strides"
            />
            <Icon
                src={calorieIcon}
                alt="calorie"
                value={`${abbreviateNumber(calories)} k`}
                label="Calories"
            />
            <Icon
                src={distanceIcon}
                alt="distance"
                value={abbreviateNumber(distance)}
                label="Miles"
            />
            <Icon
                src={durationIcon}
                alt="duration"
                value={convertIntoHours(duration)}
                label="Time"
            />
        </div>
    );
};

export default DetailedIcon;
