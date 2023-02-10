// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    accentContainerBgColor: string;
    accentContainerTextColor: string;
    containerBgColor: string;
    containerTextColor: string;
    accentOnColor: string;
    surfaceBgColor: string;
    surfaceTextColor: string;
    errorColor: string;
  }
}
