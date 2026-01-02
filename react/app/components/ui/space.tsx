import classNames from 'classnames';
import styles from "./space.module.css";

type MarginViewProps = {
    margin: string | undefined;
}

export const Space = ({data}: { data: MarginViewProps }) => {
    let marginClass = '';

    switch (data.margin) {
        case 'mt-5':
            marginClass = styles['mt-5'];
            break;
        case 'mt-10':
            marginClass = styles['mt-10'];
            break;
        case 'mt-15':
            marginClass = styles['mt-15'];
            break;
        case 'mt-20':
            marginClass = styles['mt-20'];
            break;
        case 'mt-30':
            marginClass = styles['mt-30'];
            break;
        default:
            marginClass = '';
    }

    const classes = classNames(marginClass);
    return (
        <div className={classes}></div>
    );
}