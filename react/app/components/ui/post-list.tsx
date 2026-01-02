"use client"

import {getPostListData} from "~/api/strapi-api";
import {useEffect, useState} from "react";
import {Link} from "react-router";
import { ButtonBase } from "./button-base";

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
            <h3 className="mb-5">{data.headline}</h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {dataPosts.map((item: any, index: string | number) => (
                    <div className="border-fx">
                        <div className="bg-[#030712]">
                            <Link to={"/portfolio/" + item.url}>
                                <img src={import.meta.env.VITE_PUBLIC_STRAPI_API_URL + item.thumbnail.url}
                                     className="w-full" alt=""/>
                            </Link>
                            <div className="bg-black p-3">
                                <h3 className="font-bold">{item.title}</h3>
                                <div className="mb-3">
                                   {item.tag.tag}
                                </div>
                                <div className="mb-8">
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