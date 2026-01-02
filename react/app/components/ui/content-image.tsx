import { Content } from "~/components/ui/content";
import { Image } from "~/components/ui/image";
import { Link } from "react-router";
import { ButtonBase } from "./button-base";

export const ContentImage = ({ data }: { data: any }) => {
  const imageData = { ...data, image: data.contentImage };
  return (
    <div className={"grid gap-3 md:grid-cols-1 lg:grid-cols-2 items-center"}>
      <div>
        <Image data={imageData} />
      </div>
      <div
        className={data.revert ? "order-last" : "md:order-last lg:order-first"}
      >
        <Content data={data} />
        {data.button && (
          <div className="mt-5">
            <Link
              target={data.button.blank ? "_blank" : undefined}
              to={data.button.to}
            >
              <ButtonBase>{data.button.value}</ButtonBase>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
