"use client"

import {getPostListData} from "~/api/strapi-api";
import {useEffect, useState} from "react";
import {Link} from "react-router";
import { ButtonBase } from "./button-base";
import styles from "./post-list.module.css";

export const PostList = ({data}: { data: any }) => {

    const [dataPosts, setDataPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getPostListData();
            setDataPosts(res);
        };

        fetchData();
    }, []);

    return (
        <>
            <h3 className={styles.Headline}>{data.headline}</h3>
            <div className={styles.Grid}>
                {dataPosts.map((item: any, index: string | number) => (
                    <div className={styles.Card} key={index}>
                        <div className={styles.CardInner}>
                            <Link to={"/portfolio/" + item.url}>
                                <img src={import.meta.env.VITE_PUBLIC_STRAPI_API_URL + item.thumbnail.url}
                                     className={styles.Image} alt=""/>
                            </Link>
                            <div className={styles.Content}>
                                <h3 className={styles.Title}>{item.title}</h3>
                                <div className={styles.Tag}>
                                   {item.tag.tag}
                                </div>
                                <div className={styles.Description}>
                                    {item.description}
                                </div>
                                <Link to={"/portfolio/" + item.url}>
                                    <ButtonBase>Jetzt Lesen</ButtonBase>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}