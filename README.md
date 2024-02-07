# Full stack Application - Api-testing
This is a full-stack web application that allows users to test their api on web. This app inclued interactive and user-friendly UI to test APIs. It is similar to Postman

**The mock data for api testing can be found in server/data/data.json.**

**Demo APIS:**
   -**GET: https://apis-testing-ashy.vercel.app/v1/question/questions + optionally you can add query params as well**
      ```bash
         page = 1
         limit = 10
      ```
   -**GET: https://apis-testing-ashy.vercel.app/v1/question/questions/65c11cf55f3d7e4503ed5a4d**
   -**POST: https://apis-testing-ashy.vercel.app/v1/question/questions + Put below json in body**
      ```bash
      {
         "language": "Hindi",
         "question": "What is the Hindi word for \"hello\"?",
         "options": [
         "पूजा",
         "स्नान",
         "धन्यवाद (Dhanyavad)",
         "नमस्ते (Namaste)"
         ],
         "answer": "नमस्ते (Namaste)",
         "difficulty": "Easy",
         "difficultyLevel": 1,
         "point": 1,
         "excerciseNumber": 1,
      }
      ```
   -**PUT: https://apis-testing-ashy.vercel.app/v1/question/65c11cf55f3d7e4503ed5a4d + put some data in body to update**
      ```bash
      {
         "language": "English",
      }
      ```
   -**DELETE: https://apis-testing-ashy.vercel.app/v1/question/questions/65c11cf55f3d7e4503ed5a4d**
   



## The application has the following functionalities:
- **Put your Api url**
- **GET API with query params**
- **GET API with particular id with query params**
- **POST API WITH BODY text**
- **PUT API WITH BODY text**
- **DELETE API**


## Installation
1. Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/absiemon/apis-testing
   ```
2. Naviagte to the client and server one by one and download the required node packages using the npm install command:

```bash
$ npm install
```

3. Setup mongo db database in MongoDB Atlas

4. Create a .env file in the server directory of the application and add the following variables:
```bash
MONGO_URL= your mongoDB url
```
5. Start the backend by executing this command:
```bash
$ npm run dev
```
6. Start the frontend by executing this command:
```bash
$ npm start
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)


