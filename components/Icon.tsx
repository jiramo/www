"use client";

import { useEffect, useState, ComponentType } from "react";
import { IconProps } from "../types/icon";

const iconCache: Record<string, ComponentType<IconProps>> = {};

interface Props extends IconProps {
  name: string;
}

export function Icon({ name, size = 24, ...props }: Props) {
  const [IconComponent, setIconComponent] = useState<ComponentType<IconProps> | null>(
    iconCache[name] || null
  );

  useEffect(() => {
    if (iconCache[name]) {
      setIconComponent(() => iconCache[name]);
      return;
    }

    let isMounted = true;
    
    import(`./icons/${name}`)
      .then((mod) => {
        const ExportedIcon = Object.values(mod).find(
          (val) => typeof val === "function" || typeof val === "object"
        ) as ComponentType<IconProps>;

        if (ExportedIcon) {
          iconCache[name] = ExportedIcon;
          if (isMounted) setIconComponent(() => ExportedIcon);
        }
      })
      .catch((err) => {
        console.error(`Errore caricamento icona: ${name}`, err);
      });

    return () => { isMounted = false; };
  }, [name]);

  if (!IconComponent) {
    return <div style={{ width: size, height: size }} className="icon-placeholder" />;
  }

  return <IconComponent size={size} {...props} />;
}