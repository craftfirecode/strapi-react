import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import styles from "./content.module.css";

export const Content = ({data}: { data: any }) => {
    if (!data?.wysiwyg) return null;
    return (
        <div className={styles.Content}>
            <BlocksRenderer content={data.wysiwyg} />
        </div>
    )
}