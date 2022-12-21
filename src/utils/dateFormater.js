export const dateFormater = (value) => {
    const event = new Date(value);
    let date = JSON.stringify(event);
    date = date.slice(1, 11);

    return date;
};
