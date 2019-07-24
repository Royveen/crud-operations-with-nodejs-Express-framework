# crud-operations-with-nodejs-Express-framework

You can use Heroku Link (https://enigmatic-fortress-95165.herokuapp.com/work_orders) to start with application.

Also attached Postman collection file , where all the requests are set up to test. Feel free to import it.

It is simple Back end application with examples of CRUD(create , read, update and delete) operations API. It is simple and efficient to be 
integrated and used as reference in any project.

Note: 

Following should be installed :

1. NodeJS latest Version
2. MongoDB latest version.

Install MongoDB and run the command on any folder where you want to keep database `mongod --dbpath {folder path}`

Follow the instructions to run the app :

1. Extract the compressed folder
2. run `npm install` to install all dependencies.
3. run `npm start` to run the application in browser.
4. the browser URL will be `http://localhost:3000/work_orders`
5. All APIs are written in `routes/index.js` and `app.js` folder.

Following are the APIs designed in this app:

1. GET "/work_orders" : Use the URL to fetch all the work orders

2. POST "/work_order":  Use URL with a request body
                                                      {
                                                        title: String
                                                        description: String
                                                        deadline: String
                                                        workers: Array
                                                      }
                                                      
3. GET "/workers": Use the URL to fetch all workers in database.

4. POST "/worker": Use URL with a request body
                                                      {
                                                        name: String
                                                        companyName: String
                                                        email: String
                                                      }
                                                      to create a worker.
                                                      
5. DELETE "/worker/:id" : Use this URL to delete any worker. Just add Worker ID in place of ':id'

6. PATCH "/work_order/:orderId/worker/:workerId" : Use this URL to assign any worker to any specific workorder.

7. GET "work_order/worker/:workerId" : Use this URL to get all work orders assigned to Worker. By Default in Descending order.

