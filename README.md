# node-miniBID
Este es un mini proyecto de subasta realizado en **Node JS**, incluye autenticacion con **JWT** y conexión con **mongoDB Cloud**

Dentro de la carpeta raiz se envuentra el archivo **".env"** en el cual haremos la configuracion y la asignacion de las variables conforme lo necesitemos. 
Debemos de especificar la ruta de nuestra coleccion en MongoDB Cloud, asi como el "secret" con el cual firmaremos nuestro token. 

Tambien podremos encontrar el archivo **"MiniBid System.postman_collection"** que incluye la coleccion en Postman para el testeo de los endpoints definidos en los archivos Routes del proyecto. 


Dentro del archivo **"commands.md"** encontraremos los comandos de ejecucion para la instalacion de las librerias que utilizamos en el proyecto. 

##Necesary library to implement the server 
npm install express nodemon mongoose dotenv body-parser

##Install for validations 
npm install joi

##Install for encrypt/decrypt password 
npm install bcryptjs

##Install for generate JWT 
npm install jsonwebtoken
