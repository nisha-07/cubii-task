export const CustomizedXAxis = ({ viewBox, range }) => {
    const { x, y } = viewBox;

    return (
        <text
            x={x + 300}
            y={y + 80}
            textAnchor="start">{range === "weekly" ? "Days" : "weeks"}</text>
    )
}

export const CustomizedYAxis = ({ viewBox }) => {
    const { y } = viewBox;

    return (
        <text
            x={-300}
            y={y + 20}
            transform="rotate(-90)"
            textAnchor="start">Strides</text>
    )
}

