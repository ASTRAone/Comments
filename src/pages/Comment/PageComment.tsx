import React, {useEffect, useState} from "react";
import {useStyles} from "src/hooks/useStyles";
import styles from "./styles.module.scss";
import {Header} from "src/components/Header";
import {ComponentsList} from "src/components/CommentsList";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {commentsPage1} from "src/data/comments";

type Author = {
    id: number;
    name: string;
    avatar: string;
};

type Comment = {
    id: number;
    created: string;
    text: string;
    author: number;
    parent?: any;
    likes: number;
};

type Data = {
    id: number;
    name: string;
    avatar: string;
    created: string;
    text: string;
    author: number;
    parent?: number;
    likes: number;
    children?: Data[];
};

export const PageComment: React.FC = () => {
    const cx = useStyles(styles);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    const [data, setData] = useState<Data[]>([]);
    const [page, setPage] = useState(1);

    const getAuthors = async () => {
        try {
            const data = await getAuthorsRequest();
            if (data) {
                setAuthors(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getComments = async (page: number) => {
        try {
            const {data} = await getCommentsRequest(page);
            if (data) {
                setComments(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAuthors();
    }, []);

    useEffect(() => {
        getComments(page);
    }, [page]);

    useEffect(() => {
        if (authors.length > 0 && comments.length > 0) {
            const newArr: Data[] = [];
            authors.forEach((author) => {
                const commentFind = comments.find(
                    (comment) => comment.author === author.id,
                );
                if (commentFind !== undefined) {
                    const payload = {
                        ...author,
                        ...commentFind,
                    };
                    newArr.push(payload);
                }
            });

            setData((prev) => [...prev, ...newArr]);
        }
    }, [authors, comments]);

    //TODO: Поправить
    const countLikes: number = data.reduce(
        (total, count) => total + count.likes,
        0,
    );
    const countComments: number = commentsPage1.data.reduce(
        (total, count) => total + Boolean(count.id),
        0,
    );

    return (
        <div className={cx("container")}>
            <Header countLikes={countLikes} countComments={countComments} />
            <div className={cx("content")}>
                <ComponentsList data={data} page={1} />
                {page < 3 && (
                    <button onClick={() => setPage((prev) => prev + 1)}>
                        Click me {page}
                    </button>
                )}
            </div>
        </div>
    );
};

export type {Data, Comment, Author};
