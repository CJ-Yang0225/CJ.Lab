import Card from "../../../components/common/Card";
import Flex from "../../../components/layout/Gallery/Flex";

function CardGallery() {
  return (
    <Flex>
      {new Array(8).fill(0).map((_, index) => (
        <Card key={index}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum qui
          labore odio voluptate neque sit repellendus non distinctio iusto quia
          magnam consectetur quisquam, fugiat, cumque veritatis optio officia
          odit natus.
        </Card>
      ))}
    </Flex>
  );
}

export default CardGallery;
