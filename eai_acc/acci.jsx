import React, { useState, useEffect, useContext, createContext, Suspense } from "react"
import axios from "axios"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"

  import { Router, Link } from "@reach/router";


// ------------------

import Head from "./head"


  import Login from "./login"
  import Signup from "./signup"
  import usedata from "./usedata"



  let App;
  const StateContext = createContext();

// -----------------------------------------------------------------------------

let server = "https://sushifactory.app"

const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Empresa: useState(useContext(createContext(1))),

    User: {
      Id: useState(useContext(createContext(0))),
      Name: useState(useContext(createContext(0))),
      LoginName: useState(useContext(createContext(""))),
      LoginPass: useState(useContext(createContext(""))),
    },

  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------

let useAcciones = function(StateContext) {

  const [Empresa, setEmpresa] = useContext(StateContext).Empresa;


  const [LoginName, setLoginName] = useContext(StateContext).User.LoginName;
  const [LoginPass, setLoginPass] = useContext(StateContext).User.LoginPass;
  const [UserId, setUserId] = useContext(StateContext).User.Id;
  const [UserName, setUserName] = useContext(StateContext).User.Name;

  const useData = new usedata()



  // ---------------------
  
  return {
    Loader : async function (props) {
      const res = await axios.get(server + '/logindata')
      setUserId(res.data.miid)
      setUserName(res.data.miuser)
    },
    
    Logger : async function (props) {
      let axapi = await axios({
        method: "get",
        headers: { 'Access-Control-Allow-Origin': '*'},
        url: "/loginp",
        baseURL: server,
        params: {
          username: LoginName,
          password: LoginPass,
        }
      })
  
       await setUserId(axapi.data._id)
       await setUserName(axapi.data.username)
    },

     Logout : async function (props) {
      let axapi = await axios({
        method: "get",
        headers: { 'Access-Control-Allow-Origin': '*'},
        url: "/logout",
        baseURL: server,
      });
  
      await setUserId(0)
      await setUserName("")
    },

     useChange : (Field, setField) => {
      return {
        name: Field,
        value: Field,
        fontSize: 1,
        color: "#595959",
        bg: "#DCDCDC",
        onChange: e => {
          setField(e.target.value);
        }
      }
    },

    SignUp : async function (props) {

      let Cliente = await useData.Clientes().get({Telefono: LoginName, Empresa: Empresa})
  
      if (Cliente.length===0){
        let InsertCliente = await useData.Clientes().insert({
          Empresa: Empresa,
          Origen: "Registro",
          Telefono: LoginName,
          Pass: LoginPass,
        })
  
        console.log({InsertCliente})
        if (InsertCliente>0) {return 1}
  
      } else {
         console.log({Cliente})
        return 0
      }
    
       // await setUserId(InsertCliente
      //  await setUserName(LoginName)
      },


  }
}

// -----------------------------------------------------------------------------

const MenuHeader = props => {
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1;

  const [UserId, setUserId] = useContext(StateContext).User.Id;
  const [UserName, setUserName] = useContext(StateContext).User.Name;
// -------------

  let Loader = async function (props) {
    const res = await axios.get(server + '/logindata');
    setUserId(res.data.miid)
    setUserName(res.data.miuser)
  }

// ------------

// useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (

      <Flex bg="" sx={{ height: "34px", width: "100%" }}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <header
            sx={{
              display: 'grid',
              gridGap: 3,
              maxWidth: 768,
              mx: 'auto',
              px: 3,
              py: 3,
              gridAutoFlow: 'row',
              gridTemplateColumns: [
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
              ],
              variant: 'styles.header',
            }}>



            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Link to='/login'
                sx={{
                  //variant: 'styles.navlink',
                  p: 2,
                }}>
                Login
              </Link>
              <Link to='/signup'
                sx={{
                  // variant: 'styles.navlink',
                  p: 2,
                }}>
                Signup
              </Link>
            </div>
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                order: 2
              }}>
              <Link to='/about'
                sx={{
                  variant: 'styles.navlink',
                  p: 2,
                }}>
                About
              </Link>
              <Link to='/contact'
                sx={{
                  variant: 'styles.navlink',
                  p: 2,
                }}>
                Contact
              </Link>
            </div>
          </header>
        }
      </Flex>

    )
    
  } catch (e) {
    console.error(e);
  }
}


// -----------------------------------------------------------------------------

const Headi = props => {
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1

 // const useData = new usedata()
  const useacciones = new useAcciones(StateContext)

// ------------

  useEffect(() => {useacciones.Loader(props) }, [])

// ------------
  try {
    return (
      <Flex sx={{width: "100%" }}>

        <Head default
          useContext={useContext(StateContext)}
          // useData = {useData}
          useAcciones = {useacciones}
        />

      </Flex>
    )
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------

const Body = props => {
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1

  const useData = new usedata()
  const useacciones = new useAcciones(StateContext)

// ------------

// useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (

      <Flex bg="#000000" sx={{width: "100%" }}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <Flex sx={{width: "100%" }}>

            <Box sx={{ width: "100%" }}>

              <main>
                <Router>
                  <Login default
                    path="/login"  
                    useData = {useData}
                    useContext={useContext(StateContext)}
                    useAcciones = {useacciones}
                  />
                  <Signup path="/signup"
                    useData = {useData}
                    useContext={useContext(StateContext)}
                    useAcciones = {useacciones}
                  />

                </Router>
              </main>

            </Box>

          </Flex>
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
    <div style={{display: 'flex', justifyContent: 'center'}}>

      <ContextProvider>
        <Flex bg="DimGrey"
          sx={{
            display: "flex",
            flexDirection: "column",
            // set this to `minHeight: '100vh'` for full viewport height
            minHeight: '100vh',
            justifyContent: 'center'
          }}
          css={{ maxWidth: "610px", minWidth: "410px" }}
        >
          <header sx={{width: "100%"}}>
            <Headi {...props} />
            {/* <Encabezado {...props} /> */}
            <MenuHeader {...props} />
          </header>


          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>

        </Flex>
      </ContextProvider>

    </div>
  );
});

// -------------------------------------------------------------------------------