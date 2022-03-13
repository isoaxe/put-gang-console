import React from "react";
import useSettings from "app/hooks/useSettings";
import SecondarySidebarToggle from "./SecondarySidebarToggle";
import MatxCustomizer from "../MatxCustomizer/MatxCustomizer";
import SecondarySidenavTheme from "../MatxTheme/SecondarySidenavTheme/SecondarySidenavTheme";

const SecondarySidebar = () => {
  const { settings } = useSettings();
  const secondarySidebarTheme =
    settings.themes[settings.secondarySidebar.theme];

  return (
    <SecondarySidenavTheme theme={secondarySidebarTheme}>
      {settings.secondarySidebar.open && <MatxCustomizer />}
      <SecondarySidebarToggle />
    </SecondarySidenavTheme>
  );
};

export default SecondarySidebar;
