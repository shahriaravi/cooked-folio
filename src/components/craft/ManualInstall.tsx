import { getComponentSource } from "./registry/sources";
import { PackageManagerTabs } from "./PackageManagerTabs";
import { CodeBlock } from "@/components/common/CodeBlock";

interface ManualInstallProps {
  componentName: string;
  dependencies: string[];
}

export async function ManualInstall({
  componentName,
  dependencies,
}: ManualInstallProps) {
  const componentSlug = componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  const componentSource = getComponentSource(componentName);

  const cnSource = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  let stepNum = 0;
  const steps: React.ReactNode[] = [];

  if (dependencies.length > 0) {
    stepNum++;
    steps.push(
      <Step
        key="deps"
        number={stepNum}
        title="Install the following dependencies"
      >
        <PackageManagerTabs
          type="install"
          packages={dependencies.join(" ")}
        />
      </Step>
    );
  }

  stepNum++;
  steps.push(
    <Step key="cn" number={stepNum} title="Add a cn helper">
      <CodeBlock
        code={cnSource}
        language="ts"
        filename="lib/utils.ts"
      />
    </Step>
  );

  stepNum++;
  steps.push(
    <Step
      key="component"
      number={stepNum}
      title="Copy the component into your project"
    >
      <CodeBlock
        code={componentSource}
        language="tsx"
        filename={`components/${componentSlug}.tsx`}
      />
    </Step>
  );

  return <div className="flex flex-col gap-8">{steps}</div>;
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 gap-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card">
        <span
          className="font-mono font-semibold text-muted-foreground"
          style={{ fontSize: "12px", lineHeight: "1" }}
        >
          {number}
        </span>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3
          className="mb-3 font-semibold text-foreground"
          style={{
            fontSize: "15px",
            lineHeight: "22px",
            letterSpacing: "0.1px",
          }}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}