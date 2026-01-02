import styles from "./image.module.css";

export const Image = ({ data }: { data: any }) => {
  return (
    <img
      src={import.meta.env.VITE_PUBLIC_STRAPI_API_URL + data.image.url}
      alt={data.image.alternativeText ? data.image.alternativeText : "alt"}
      className={styles.Image}
    />
  );
};
