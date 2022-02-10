import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import ShinyButton from "../../components/styled/ShinyButton";

function Universe() {
  const router = useRouter();

  return (
    <Layout backgroundColor="#010113">
      <ShinyButton
        backgroundColor="#d1703c"
        textColor="#ffffff"
        children="Redirect Test"
        style={{ zIndex: 10, marginTop: "16px", marginLeft: "24px" }}
        onClick={() => router.push("/canvas")}
      />
    </Layout>
  );
}

export default Universe;
