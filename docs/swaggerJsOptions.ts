import { Options } from "swagger-jsdoc";

export const options:Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Cloudy Notes Api Documentation',
        version: '1.0.0',
        contact: {
            email: 'danapradana30@gmail.com'
        }
      },
      servers:[
        {
            url: "http://api.cloumus30.online",
            description: "Prodcution Server"
        },
        {
            url: `http://localhost:${process.env.APP_PORT}`,
            description: "Local Server"
        }
      ],
      explorer:true,
    },
    
    apis: ['./controller/*.ts', './controller/*.js'], // files containing annotations as above
  };