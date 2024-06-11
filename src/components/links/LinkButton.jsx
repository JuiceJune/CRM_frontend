import {Link} from "react-router-dom";

const LinkButton = (props) => {
    // eslint-disable-next-line react/prop-types
    const {path, icon, fontSize} = props;
    return (
        <Link to={path}
              className={`${icon} p-3`}
              style={{ fontSize: fontSize, textDecoration: "none", color: "black" }}>
        </Link>
    );
};

export default LinkButton;