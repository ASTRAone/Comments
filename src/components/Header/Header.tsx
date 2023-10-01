import React from "react";
import styles from "./styles.module.scss";
import {useStyles} from "src/hooks/useStyles";
import {LikeIcon} from "src/assets/icons";

type Props = {
  countLikes: number;
  countComments: number
}

export const Header: React.FC<Props> = ({countLikes, countComments}) => {
    const cx = useStyles(styles);
    return (
        <div className={cx("header")}>
            <p className={cx("text")}>{countComments} комментариев</p>
            <div className={cx("like-info")}>
                <div className={cx('icon')}><LikeIcon /></div>
                <p className={cx("text")}>{countLikes}</p>
            </div>
        </div>
    );
};
