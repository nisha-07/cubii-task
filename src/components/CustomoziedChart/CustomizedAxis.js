export const CustomizedXAxis = ({ viewBox, range }) => {
    const { x, y } = viewBox;
    console.log("Ranee", range);
    return (
        <text x={x + 300} y={y + 50} textAnchor="start">
            {range === "daily"
                ? "Hours"
                : range === "weekly"
                    ? "Days"
                    : range === "monthly"
                        ? "Weeks"
                        : "Months"}
        </text>
    );
};

export const CustomizedYLeftAxis = ({ viewBox }) => {
    const { y } = viewBox;

    return (
        <text x={-300} y={y - 20} transform="rotate(-90)" textAnchor="start">
            Strides
        </text>
    );
};

export const CustomizedYRightAxis = ({ viewBox }) => {
    const { y } = viewBox;

    return (
        <text x={-300} y={y + 770} transform="rotate(-90)" textAnchor="start">
            Goal
        </text>
    );
};
