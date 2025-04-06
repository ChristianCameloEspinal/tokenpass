import React from "react";

export const combineComponents = (...components: any[]) => {
  return ({ children }: { children: React.ReactNode }) => {
      if (!children) {
          throw new Error("Children must be provided to combineComponents.");
      }
      return components.reduce(
          (AccumulatedComponents, CurrentComponent) => {
              return (
                  <CurrentComponent>
                      {AccumulatedComponents}
                  </CurrentComponent>
              );
          },
          children
      );
  };
};