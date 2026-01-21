import SolidButton from "../components/Button/SolidButton";
import OutlinedButton from "../components/Button/OutlinedButton";
import checkIcon from "../assets/emoji/check.svg";

export default function ButtonTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">UI Components: Buttons</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* === SECTION 1: SOLID BUTTONS == */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Solid Button</h2>

          {/* 1. Sizes */}
          <div className="space-y-2">
            <h3 className="text-sm text-gray-500">Sizes (Primary)</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <SolidButton label="Small" size="small" />
              <SolidButton label="Medium" size="medium" />
              <SolidButton label="Large" size="large" />
            </div>
          </div>

          {/* 2. Variants */}
          <div className="space-y-2">
            <h3 className="text-sm text-gray-500">Variants</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <SolidButton label="Primary" variant="primary" />
              <SolidButton label="Secondary" variant="secondary" />
              <SolidButton label="Assistive" variant="assistive" />
            </div>
          </div>

          {/* 3. States */}
          <div className="space-y-2">
            <h3 className="text-sm text-gray-500">States (Disabled / Error / Icon)</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <SolidButton label="Disabled" disabled />
              <SolidButton label="Error State" error />
              <SolidButton label="With Icon" iconSrc={checkIcon} variant="secondary" />
            </div>
          </div>
        </section>

        {/* === SECTION 2: OUTLINED BUTTONS === */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Outlined Button</h2>

          {/* 1. Sizes */}
          <div className="space-y-2">
            <h3 className="text-sm text-gray-500">Sizes (Primary)</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <OutlinedButton label="Small" size="small" />
              <OutlinedButton label="Medium" size="medium" />
              <OutlinedButton label="Large" size="large" />
            </div>
          </div>

          {/* 2. Variants */}
          <div className="space-y-2">
            <h3 className="text-sm text-gray-500">Variants</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <OutlinedButton label="Primary" variant="primary" />
              <OutlinedButton label="Secondary" variant="secondary" />
              <OutlinedButton label="Assistive" variant="assistive" />
            </div>
          </div>

          {/* 3. States */}
          <div className="space-y-2">
            <h3 className="text-sm text-gray-500">States (Disabled / Error / Icon)</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <OutlinedButton label="Disabled" disabled />
              <OutlinedButton label="Error State" error />
              <OutlinedButton label="With Icon" iconSrc={checkIcon} variant="secondary" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
