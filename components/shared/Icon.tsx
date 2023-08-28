import React, { useState, useEffect } from "react";

interface IconProps {
  name: string;
  stroke?: string;
  isActive: boolean;
  strokeLinejoin?: string;
}

export default function Icon(props: IconProps) {
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(
    null
  );

  useEffect(() => {
    import("@tabler/icons-react")
      .then((module) => {
        const iconComponent = module[props.name];
        if (iconComponent) {
          setIconComponent(iconComponent);
        }
      })
      .catch((error) => {
        console.error("Error loading icon:", error);
      });
  }, [props.name]);

  if (!IconComponent) {
    return (
      <>
        <div className="animated">
          <div className="avatar">
            <div className="avatar-image"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <IconComponent
      className={`text-dark-2 dark:text-light-1 ${
        props.isActive && "bg-primary-500 text-light-1"
      }`}
      {...(props.stroke && { stroke: props.stroke })}
      {...(props.strokeLinejoin && { strokeLinejoin: props.strokeLinejoin })}
    />
  );
}
