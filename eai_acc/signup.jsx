import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"




let App;
const StateContext = createContext();

// ------------------------------------------------------------------

let server = "https://sushifactory.app"


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

const Body = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1;

  const [LoginName, setLoginName] = props.useContext.User.LoginName;
  const [LoginPass, setLoginPass] = props.useContext.User.LoginPass;
  const [UserId, setUserId] = props.useContext.User.Id;
  const [UserName, setUserName] = props.useContext.User.Name;


  // let Logger = async function (props) {

  //   let axapi = await axios({
  //     method: "get",
  //     headers: { 
  //       'Access-Control-Allow-Origin': '*'
  //      },
  //     url: "/loginp",
  //     baseURL: server,
  //     params: {
  //       username: LoginName,
  //       password: LoginPass,
  //     }
  //   });

  //   console.log({axapi})

  //   console.log({data: axapi.data})

  //    await setUserId(axapi.data._id)
  //    await setUserName(axapi.data.username)

  //   //console.log({UserId, UserName})
  // }


  // let Logout = async function (props) {

  //   let axapi = await axios({
  //     method: "get",
  //     headers: { 
  //       'Access-Control-Allow-Origin': '*'
  //      },
  //     url: "/logout",
  //     baseURL: server,
  //   });

  //   await setUserId(0)
  //   await setUserName("")

  // }


  // const useChange = (Field, setField) => {
  //   return {
  //     name: Field,
  //     value: Field,
  //     fontSize: 1,
  //     color: "#595959",
  //     bg: "#DCDCDC",
  //     onChange: e => {
  //       setField(e.target.value);
  //     }
  //   };
  // };


// ------------

//useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (


      <Flex  sx={{width: "100%" }}>

        {Loading ? <Spinner size={17} ml={3} /> : 

          <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>

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

            <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>

              <Box sx={{ width: "70%" }}>

                  <Button sx={{ width: "100%", height: "34px" }}
                    width={1}
                    bg={"gray"}
                    disabled={Loading ? true : false}
                    onClick={async () => {
                      setLoading(true)
                      let MiSignUp = await props.useAcciones.SignUp()
                      setLoading(false)
                    }}
                  >
                     <Text sx={Estilo.mbtn1}>
                       Registrar 
                      </Text>

                  </Button>
              </Box>

              <Box sx={{ width: "30%" }}>
                {Loading ? <Spinner size={30} ml={3} /> : <div/>}
              </Box>


            </Flex>



          </Grid>
        }
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
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------