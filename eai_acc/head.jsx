import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"


let App
const StateContext = createContext()

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1;

  const [UserId, setUserId] = props.useContext.User.Id;
  const [UserName, setUserName] = props.useContext.User.Name;

// ------------

// useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (
      <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>

        <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
          <Flex sx={{ height: "34px", width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.t1} >Sushi Factory app</Text>
            </Box>
          </Flex>
        </Flex>

        <Flex sx={{ height: "34px", width: "100%" }}>
          {Loading ? <Spinner size={17} ml={3} /> : 
              <Flex sx={{ height: "34px", width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                 {UserId} - {UserName}
                </Box>
              </Flex>
          }
        </Flex>
      </Grid>
    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div>
      <ContextProvider>
        <Flex>
          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------