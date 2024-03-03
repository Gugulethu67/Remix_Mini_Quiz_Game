Hi,

# In the quiz application these are some of the best practices that were implemented.

## Validation:
Input validation: I ensured that the user inputs (e.g., selected avatars, quiz answers) are properly validated.For example you cannot proceed to the next question if none of the multiple choice answers is not selected.

## Tests:
I did some testing (e.g., checking correct quiz answers) to ensure correctness of the application

# Some of the best practices that were not implemented, I did not know how to implement them  and there was not enough time to figure it out.

## Security:
Authentication and Authorization: I did not implement secure authentication and authorization mechanisms
I did not implement HTTPS to ensure secure communication between the client and the server

## Responsive Design:
There was not enough time to test the application layout on different screen sizes.

## Caching:
Caching mechanisms were not explicitly implemented in the provided code.

# To addressing these requirements, I might do the following:

Security: I will implement HTTPS to ensure secure communication between the client and the server. And I will implement secure authentication and authorization mechanisms.
Caching: Implement caching strategies to enhance performance.
Responsive Design: Test the application on various devices and optimise the layout accordingly.
Progressive Enhancement: I will optimise the application user experience under different conditions.



# To run the application follow the steps:

## navigate to the project directory and install packages
```sh
npm install
```
## initialise edgedb instance
```sh
edgedb project init
```
## then connect to db
```sh
edgedb
```
## insert data to db
```sh
insert Question {
  correct_answer:= "Paris",
  options:= ['Paris', 'London', 'Berlin', 'Madrid'],
  text:= "What is the capital of France?"
};insert Question {
  correct_answer:= "2",
  options:= ['0', '1', '2', '3'],
  text:= "What is the smallest prime number?"
};insert Question {
  correct_answer:= "Kruger National Park",
  options:= ['Addo Elephant National Park', 'Hluhluwe-iMfolozi Park', 'Table Mountain National Park', 'Kruger National Park'],
  text:= "Name one of the famous national parks in South Africa."
};insert Question {
  correct_answer:= "Potassium",
  options:= ['Krypton', 'Kryptonite', 'Potassium', 'Keratin'],
  text:= "Which element has the chemical symbol 'K'?"
};insert Question {
  correct_answer:= "Springboks",
  options:= ['Proteas', 'Springboks', 'Bafana Bafana', 'The Blitzboks'],
  text:= "What is the nickname of the South African national rugby team?"
};insert Question {
  correct_answer:= "Antarctica",
  options:= ['Sahara Desert', 'Arabian Desert','Gobi Desert' ,'Antarctica'],
  text:= "What is the largest desert in the world?"
};insert Question {
  correct_answer:= "Lion",
  options:= ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
  text:= "Which animal is known as the King of the Jungle?"
};insert Question {
  correct_answer:= "France",
  options:= ['Brazil', 'Germany', 'France', 'Argentina'],
  text:= "Which country won the FIFA World Cup in 2018?"
};insert Question {
  correct_answer:= "Mount Everest",
  options:= ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
  text:= "What is the tallest mountain in the world?"
};
```
## lastly run the app
```sh
npm run dev
```
