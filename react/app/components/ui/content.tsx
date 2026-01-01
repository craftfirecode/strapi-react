import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export const Content = ({data}: { data: any }) => {
    if (!data?.wysiwyg) return null;
    return (
        <div className="prose max-w-none">
            <BlocksRenderer content={data.wysiwyg} />
        </div>
    )
}