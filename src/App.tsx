import React from "react";
import {PageComment} from "./pages";
import {useStyles} from "./hooks/useStyles";
import styles from "./app.module.scss";

const App: React.FC = () => {
    const cx = useStyles(styles);
    return (
        <div className={cx('app')}>
            <PageComment />
        </div>
    );
};

export default App;
