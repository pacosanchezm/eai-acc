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
      Id: useState(useContext(createContext(""))),
      Name: useState(useContext(createContext(""))),
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


        if (InsertCliente>0) {
          await setUserId(InsertCliente)
          await setUserName(LoginName)
          
          return 1
        
        }
  



      } else {
         console.log({Cliente})
        return 0
      }
    

    },


  }
}

// -----------------------------------------------------------------------------

const MenuHeader2 = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1;

  const [UserId, setUserId] = useContext(StateContext).User.Id;
  const [UserName, setUserName] = useContext(StateContext).User.Name;
// -------------

// ------------

// useEffect(() => {Loader(props) }, [])

// ------------
  try {

    return (

      <div
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(64px, 1fr))`,
        }}>

        <Link sx={Estilo.menu1}
          to='/acc/login' 
        >
          Iniciar Sesión
        </Link>

        <Link sx={Estilo.menu1}
          to='/acc/signup'
        >
          Registrarse
        </Link>
      
        <Link sx={Estilo.menu1}
          to='/info'
        >
          Mis Datos
        </Link>
      
        <Link sx={Estilo.menu1}
          to='/orders'
        >
          Mis Pedidos
        </Link>
      
      </div>
    )

  } catch (e) {
    console.error(e);
  }
}




// -----------------------------------------------------------------------------


const Headi = props => {
  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1
  const useacciones = new useAcciones(StateContext)

// ------------

// ------------
  try {
    return (
      <Flex sx={{width: "100%" }}>
        <Head default
          useContext={useContext(StateContext)}
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

// ------------
  try {

    return (

      <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <Flex sx={{width: "100%" }}>
            <Box sx={{ width: "100%" }}>

              <main>
                <Router>
                  <Login default
                    path="/acc/login"  
                    useData = {useData}
                    useContext={useContext(StateContext)}
                    useAcciones = {useacciones}
                  />
                  <Signup 
                    path="/acc/signup"
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
        <Flex bg="WhiteSmoke"
          sx={{
            display: "flex",
            flexDirection: "column",
            // set this to `minHeight: '100vh'` for full viewport height
            //minHeight: '100vh',
            justifyContent: 'center'
          }}
          css={{ maxWidth: "768px", minWidth: "410px" }}
        >
          <header sx={{width: "100%"}}>
            <Headi {...props} />
            <MenuHeader2 {...props} />
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