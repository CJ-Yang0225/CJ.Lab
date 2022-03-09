import styles from "./Card.module.scss";

function Card(props: IntrinsicElementProps<"div">) {
  return <div className={styles["card-paper"]}>{props.children}</div>;
}

export default Card;
