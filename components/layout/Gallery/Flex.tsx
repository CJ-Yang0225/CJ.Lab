import styles from "./Flex.module.scss";

export interface FlexProps extends IntrinsicElementProps<"div"> {}

function Flex(props: FlexProps) {
  const { children } = props;

  return <div className={styles["flex-box"]}>{children}</div>;
}

export default Flex;
