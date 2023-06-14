import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/defaultTheme"

import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./styles/global"
import { router } from "./Router";

export function App() {
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router}/>
      <GlobalStyle/>
    </ThemeProvider>
  )
}
