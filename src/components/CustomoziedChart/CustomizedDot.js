export const CustomDot = ({ cx, cy }) => {
    return (
        <svg x={cx - 5} y={cy - 5} width={10} height={10}>
            <circle
                cx="5"
                cy="5"
                r="3"
                fill="#001F38"
                stroke="#F06595"
                strokeWidth="2"
            />
        </svg>
    );
};
