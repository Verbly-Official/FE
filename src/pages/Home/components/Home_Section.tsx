import Home_Card from "../../../components/Home/Home_Card";
import Tabs from "../../../components/Tab/Tabs";

interface sectionProps {
  variant: "kr" | "en";
}

export default function Home_Section({ variant = "kr" }: sectionProps) {
  return (
    <div className="bg-white flex-1 p-[24px] w-full min-h-screen my-[32px] rounded-[12px] mx-[38px]">
      {/* Tab */}
      <div className="flex mb-[28px] justify-start gap-0 border-b-[1px] border-line2">
        {variant === "kr" ? (
          <Tabs tabs={["For You", "Hot Posts"]} />
        ) : (
          <Tabs tabs={["For You", "Hot Posts", "Need Correction"]} />
        )}
      </div>
      {/* HomeCards */}
      <div className="flex flex-col gap-[20px]">
        <Home_Card varient="default" isCorrected={false} />
        <Home_Card varient="default" isCorrected={true} />
      </div>
    </div>
  );
}
