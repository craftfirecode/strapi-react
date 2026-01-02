import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export const Content = ({data}: { data: any }) => {
    if (!data?.wysiwyg) return null;
    return (
        <div>
            <BlocksRenderer content={data.wysiwyg} />
        </div>
    )
}