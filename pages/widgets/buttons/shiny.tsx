import { ShinyButton } from "../../../components/core/Button";

function Shiny() {
  return (
    // maybe need a card component
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        borderRadius: "1em",
        padding: "40px 48px",
        width: "clamp(288px, 25%, 360px)",
        backgroundColor: "#f1f3f4",
      }}
    >
      <ShinyButton
        backgroundColor="#d1703c"
        textColor="#ffffff"
        children="SHINY EFFECT"
      />
    </div>
  );
}

export default Shiny;
