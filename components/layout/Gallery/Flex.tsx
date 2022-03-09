import styles from "./flex.module.scss";

export interface FlexProps extends IntrinsicElementProps<"div"> {}

function Flex(props: FlexProps) {
  const { children } = props;

  console.log("styles:", styles);

  return <div className={styles["flex-box"]}>{children}</div>;
}

export default Flex;
