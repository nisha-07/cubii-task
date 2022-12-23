export const convertTimeStampToHumanReadableDate = (value) => {
    if (!value)
        return ""

    const dateObj = new Date(value);
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${year}-${month}-${date}`;
};

export const convertTimeStampToHumanReadableTime = (value) => {
    if (!value)
        return ""

    const date = new Date(value);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const strTime = hours + ":" + minutes + " " + ampm;

    return strTime;
}