import axios from "axios"
//import moment from "moment"

// -----------------------------------------------------------------------------

let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
// let graphqlserver = "https://smxai.net/graphqleai2"

let usedata = function(StateContextM) {

  return {
    Clientes: function() {
      return {
        get: async function(e) {
         
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query getClientes($Query: ClienteInput) {
                  Clientes {
                    Consultas {
                      Query(Query: $Query) {
                        Id
                        Empresa
                        Telefono
                        Nombre
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Telefono: e.Telefono,
                  Empresa: e.Empresa
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Clientes.Consultas.Query;

          if (axdataRes) {return axdataRes} else {return 0}
        },

      }
    }
  }

}

export default usedata