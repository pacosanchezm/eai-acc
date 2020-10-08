import React, { useState, useEffect, useContext, createContext } from "react";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"


let App;
const StateContext = createContext();

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

const Info = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1;

  const [LoginName, setLoginName] = props.useContext.User.LoginName;
  const [LoginPass, setLoginPass] = props.useContext.User.LoginPass;
  const [UserId, setUserId] = props.useContext.User.Id;
  const [UserName, setUserName] = props.useContext.User.Name;

// ---------------



// ------------

//useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (

      <Flex  sx={{width: "100%" }}>

        <Grid bg="WhiteSmoke" >
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
                <Box sx={{ width: "20%"}}>
                  <Text sx={Estilo.h2b} >Tel</Text>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <Input {...props.useAcciones.useChange(LoginName, setLoginName)}/>
                </Box>
              </Flex>

              <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
                <Box sx={{ width: "20%"}}>
                  <Text sx={Estilo.h2b} >Pass</Text>
                </Box>
                <Box sx={{ width: "70%" }}>
                  <Input {...props.useAcciones.useChange(LoginPass, setLoginPass)}/>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>

            <Box sx={{ width: "70%" }}>
              <Button sx={{ width: "100%", height: "34px" }}
                width={1}
                bg={"gray"}
                //disabled={EnableBoton()}
                onClick={async () => {
                  setLoading(true)
                    await props.useAcciones.Logger()
                  setLoading(false)
                }}
              >
                <Text sx={Estilo.mbtn1}>
                  Entrar
                </Text>
              </Button>
            </Box>
              {Loading ? <Spinner size={30} ml={3} /> : <div/>}
          </Flex>

        </Grid>
        
      </Flex>
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
            <Info {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------