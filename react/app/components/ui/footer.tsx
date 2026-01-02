import { NavLink } from "react-router";
import { cn } from "~/lib/utils";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Links}>
        <NavLink
          to="/datenschutz"
          className={({ isActive }) =>
            cn(styles.Link, {
              [styles.LinkActive]: isActive,
            })
          }
        >
          Datenschutz
        </NavLink>
        <div className={styles.Separator}>&</div>
        <NavLink
          to="/impressum"
          className={({ isActive }) =>
            cn(styles.Link, {
              [styles.LinkActive]: isActive,
            })
          }
        >
          Impressum
        </NavLink>
      </div>
    </div>
  );
};
