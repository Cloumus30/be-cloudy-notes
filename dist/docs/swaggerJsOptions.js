"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cloudy Notes Api Documentation',
            version: '1.0.0',
            contact: {
                email: 'danapradana30@gmail.com'
            }
        },
        servers: [
            {
                url: "http://api.cloumus30.online",
                description: "Prodcution Server"
            },
            {
                url: `http://localhost:${process.env.APP_PORT}`,
                description: "Local Server"
            }
        ],
        explorer: true,
    },
    apis: ['./controller/*.ts', './controller/*.js'], // files containing annotations as above
};
