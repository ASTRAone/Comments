import React from "react";
import {CommentBlock} from "../CommentBlock";
import {Data} from "src/pages/Comment";
import styles from "./styles.module.scss";
import {useStyles} from "src/hooks/useStyles";
import {commentsPage1, commentsPage2, commentsPage3} from "src/data/comments";
import authors from "src/data/authors";

type Props = {
    data: Data[];
    page: number;
};

const caseChildrenData = (parent?: number, page?: number) => {
    switch (page) {
        case 1:
            return commentsPage1.data.filter(
                (fieldCommentsFirstPage) =>
                    fieldCommentsFirstPage.parent === parent,
            );

        case 2:
            return commentsPage2.data.filter(
                (fieldCommentsFirstPage) =>
                    fieldCommentsFirstPage.parent === parent,
            );

        case 3:
            return commentsPage3.data.filter(
                (fieldCommentsFirstPage) =>
                    fieldCommentsFirstPage.parent === parent,
            );

        default:
            return [];
    }
};

const findInfoParent = (itemParent: any) => {
    return authors.find((author) => author.id === itemParent.author);
};

export const ComponentsList: React.FC<Props> = ({data, page}) => {
    const cx = useStyles(styles);

    const mainComments = data.filter((data) => data.parent === null);

    const recursiveData = (item: any): any => {
        const formedData = commentsPage1.data
            .filter((i) => i.parent === item.id)
            .map((param) => ({
                ...item,
                children: recursiveData(param),
                avatar: findInfoParent(item)?.avatar || "-",
                name: findInfoParent(item)?.name || "-",
            }));

        const payload = {
            ...item,
            avatar: findInfoParent(item)?.avatar || "-",
            name: findInfoParent(item)?.name || "-",
        };

        return formedData.length > 0 ? formedData : [payload];
    };

    return (
        <div className={cx("container")}>
            <>
                {mainComments.map((comment) => {
                    return <CommentBlock data={recursiveData(comment)} />;
                })}
            </>
        </div>
    );
};
