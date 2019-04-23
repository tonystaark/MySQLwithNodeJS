**INSTRUCTIONS FOR TESTING**
1. `create DATABASE mock` at MYSQL server
2. Please run `npm test` for unit testing. 
3. You may change the `data` variable for testing purpose.

**INSTRUCTIONS FOR DEVELOPMENT**
1. `create DATABASE registration` at MYSQL server
2. Please run `npm start` for development.
3. For registering students to a specified teachers, please use `POST api/register`.
4. For retrieving a list of students common to a given list of teachers, please use 
   `GET /api/commonstudents/?{query}`. An example of query can be `teacher=teacherken%40example.com` or `teacher=teacherken%40example.com teacher=teacherjoe%40example.com`
5. For suspending a particular student, use `POST /api/suspend`
6. For retrieving a list of students who can receive a given notification, use `POST /api/retrievefornotifications`
