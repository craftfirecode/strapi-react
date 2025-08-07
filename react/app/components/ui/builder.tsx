import React from "react";
import {Image} from "~/components/ui/image";
import {Content} from "~/components/ui/content";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";
import {Space} from "~/components/ui/space";
import {PostList} from "~/components/ui/post-list";
import {ContentImage} from "~/components/ui/content-image";
import {Table} from "~/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion";

export const Builder = ({data}: any) => {
    if (!data || !Array.isArray(data.zone)) {
        return <div>404 – Seite nicht gefunden</div>;
    }

    const renderComponent = (component: any) => {
        switch (component.__component) {
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
                        <Accordion type="single" collapsible>
                            {component.accordion?.map((item: any) => (
                                <AccordionItem key={item.id} value={String(item.id)}>
                                    <AccordionTrigger>{item.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
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
