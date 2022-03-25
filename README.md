# node-miniBID

This is a mini auction project made in **Node JS**, includes **JWT** authentication and connection to **mongoDB Cloud**

Inside the root folder is the **".env"** file in which we will configure and assign the variables as needed. We must specify the path of our collection in MongoDB Cloud, as well as the "secret" with which we will sign our token.

We can also find the **"MiniBid System.postman_collection"** file that includes the Postman collection for testing the endpoints defined in the project's Routes files.

Inside the file **"commands.md"** we will find the execution commands for the installation of the libraries that we use in the project.

##Library needed to implement server 
npm install express nodemon mongoose dotenv body-parser

##Install for validations 
npm install joi

##Install to encrypt/decrypt password 
npm install bcryptjs

##Install to generate JWT 
npm install jsonwebtoken
