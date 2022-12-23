export const dateFormater = (value) => {
    const dateObj = new Date(value);
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${year}-${month}-${date}`;
};
