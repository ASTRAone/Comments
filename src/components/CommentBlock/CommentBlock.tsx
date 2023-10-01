import React from "react";
import styles from "./styles.module.scss";
import {useStyles} from "src/hooks/useStyles";
import {LikeIcon} from "src/assets/icons";
import {Data} from "src/pages/Comment";

type Props = {
    data: Data[];
};

export const CommentBlock: React.FC<Props> = ({data}) => {
    const cx = useStyles(styles);

    return (
        <React.Fragment>
            {data.map((item) => (
                <>
                    <div className={cx("comment-block")}>
                        <img
                            className={cx("img")}
                            src={item.avatar}
                            alt="avatar"
                        />
                        <div className={cx("content")}>
                            <div className={cx("content-header")}>
                                <div className={cx("header-text")}>
                                    <p className={cx("text")}>{item.name}</p>
                                    <p className={cx("text-light")}>
                                        {item.created}
                                    </p>
                                </div>
                                <div className={cx("like-block")}>
                                    <div className={cx("icon")}>
                                        <LikeIcon />
                                    </div>
                                    <p className={cx("text")}>{item.likes}</p>
                                </div>
                            </div>
                            <div className={cx("content-body")}>
                                <p className={cx("text")}>{item.text}</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx("children")}>
                        {Array.isArray(item.children) &&
                        item.children.length > 0 ? (
                            <CommentBlock data={item.children as any} />
                        ) : null}
                    </div>
                </>
            ))}
        </React.Fragment>
    );
};
