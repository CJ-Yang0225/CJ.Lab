import styles from "./card.module.scss";

function Card(props: IntrinsicElementProps<"div">) {
  return <div className={styles["card-paper"]}>{props.children}</div>;
}

export default Card;
