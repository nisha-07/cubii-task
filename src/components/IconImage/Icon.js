import classes from "./Icon.module.css";

const Icon = ({ src, alt, value, label }) => {
    return (
        <div>
            <img src={src} alt={alt} className={classes.icon} />
            <h5>{value}</h5>
            <p>{label}</p>
        </div>
    );
};

export default Icon;
