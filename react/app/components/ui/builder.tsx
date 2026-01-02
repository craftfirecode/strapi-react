import React from "react";
import {Image} from "~/components/ui/image";
import {Content} from "~/components/ui/content";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";
import {Space} from "~/components/ui/space";
import {PostList} from "~/components/ui/post-list";
import {ContentImage} from "~/components/ui/content-image";
import {Table} from "~/components/ui/table";
import { AccordionBase, AccordionBaseContent, AccordionBaseItem, AccordionBaseTrigger } from "./accordion-base";

export const Builder = ({data}: any) => {
    if (!data || !Array.isArray(data.zone)) {
        return <div>404 – Seite nicht gefunden</div>;
    }

    const getComponentType = (component: any) => {
        if (component.__component) return component.__component;
        if (component.__typename) {
            switch (component.__typename) {
                case "ComponentCmsImage": return "cms.image";
                case "ComponentCmsContent": return "cms.content";
                case "ComponentCmsButton": return "cms.button";
                case "ComponentCmsSpace": return "cms.space";
                case "ComponentCmsPostList": return "cms.post-list";
                case "ComponentCmsContentImage": return "cms.content-image";
                case "ComponentCmsAccordion": return "cms.accordion";
                case "ComponentCmsTable": return "cms.table";
                case "ComponentCmsYouTube": return "cms.you-tube";
                default: return component.__typename;
            }
        }
        return null;
    };

    const renderComponent = (component: any) => {
        const type = getComponentType(component);
        switch (type) {
            case "cms.image":
                return (
                    <section className="">
                        <Image data={component}/>
                    </section>
                );
            case "cms.content":
                return (
                    <section className="">
                        <Content data={component}/>
                    </section>
                );
            case "cms.button":
                return (
                    <section className="">
                        <Link target={component.blank ? "_blank" : undefined} to={component.to}>
                            <Button>{component.value}</Button>
                        </Link>
                    </section>
                );
            case "cms.space":
                return (
                    <section className="">
                        <Space data={component}/>
                    </section>
                );
            case "cms.post-list":
                return (
                    <section className="">
                        <PostList data={component}/>
                    </section>
                );
            case "cms.content-image":
                return (
                    <section className="">
                        <ContentImage data={component}/>
                    </section>
                );
            case "cms.table":
                return (
                    <section className="">
                        <Table data={component}/>
                    </section>
                );
            case "cms.accordion":
                return (
                    <section className="">
                        <AccordionBase multiple={false}>
                            {component.accordion?.map((item: any, index: number) => (
                                <AccordionBaseItem key={index} value={`item-${index}`}>
                                    <AccordionBaseTrigger>{item.title}</AccordionBaseTrigger>
                                    <AccordionBaseContent>
                                        <Content data={{wysiwyg: item.description}}/>
                                    </AccordionBaseContent>
                                </AccordionBaseItem>
                            ))}
                        </AccordionBase>
                    </section>
                );
            case "cms.you-tube":
                return (
                    <section className="">
                        <iframe
                            width="100%"
                            height="500"
                            src={`https://www.youtube.com/embed/${component.videoID}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {data.zone.map((component: any, index: any) => (
                <React.Fragment key={index}>
                    {renderComponent(component)}
                </React.Fragment>
            ))}
        </>
    );
};
