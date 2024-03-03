import { useLoaderData } from '@remix-run/react';
import { createClient } from 'edgedb';
import { useState } from 'react';

type Question = {
  text: string;
  options: string[];
  correct_answer: string;
};

type LoaderData = {
  data?: {
    questions?: Question[];
  };
  error?: string;
};

type WrongAnswerType = {
  question: string;
  selectedAnswer: string | null;
  correctAnswer: string;
};


export function loader() {
  const fetchData = async () => {
    const client = createClient();

    try {
      const questions = await client.query(`SELECT Question {
        text,
        options,
        correct_answer
      };`);

      return { data: { questions } };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { error: 'Internal Server Error' };
    } finally {
      await client.close();
    }
  };

  return fetchData();
}


const avatarOptions = [
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100191.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/premium-photo/cartoon-man-wearing-orange-hoodie-with-orange-eyes_662214-99697.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833546.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-photo/cartoon-character-with-yellow-jacket-sunglasses_71767-101.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100225.jpg?size=626&ext=jpg&ga=GA1.2.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/premium-photo/landscape-architect-digital-avatar-generative-ai_934475-9208.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?size=626&ext=jpg&ga=GA1.2.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg&ga=GA1.2.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556787.jpg?size=626&ext=jpg&ga=GA1.1.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?size=626&ext=jpg&ga=GA1.2.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/premium-photo/cartoon-character-with-blue-shirt-glasses_561641-2088.jpg?size=626&ext=jpg&ga=GA1.2.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100279.jpg?size=626&ext=jpg&ga=GA1.2.2031292154.1706356291&semt=sph',
  'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611759.jpg?size=626&ext=jpg&ga=GA1.2.2031292154.1706356291&semt=sph'
];


export default function postHome() {
  const loaderData = useLoaderData() as LoaderData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [userScore, setUserScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<Array<WrongAnswerType>>([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  

  const handleNextQuestion = () => {
    const currentQuestion = loaderData.data?.questions?.[currentQuestionIndex];
  
    if (!currentQuestion) {
      console.error('Error: currentQuestion is undefined');
      return;
    }
  
    if (!selectedAnswers[currentQuestionIndex]) {
      // If no option is selected, show a validation message
      setIsOptionSelected(true);
      return;
    }
  
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.correct_answer) {
      const timeElapsed = Date.now() - questionStartTime;
      const timeBonus = Math.max(10 - Math.floor(timeElapsed / 1000), 0);
      setUserScore((prevScore) => prevScore + 1 + timeBonus);
    } else {
      setWrongAnswers((prevWrongAnswers) => [
        ...prevWrongAnswers,
        {
          question: currentQuestion.text,
          selectedAnswer,
          correctAnswer: currentQuestion.correct_answer,
        },
      ]);
    }
  
    if (currentQuestionIndex < loaderData.data?.questions?.length! - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionStartTime(Date.now()); 
    } else {
      setQuizCompleted(true);
    }
  };
  
  

  
  const handleRetry = () => {
    setQuizCompleted(false);
    setShowCorrections(false);
    setCurrentQuestionIndex(0);
    setUserScore(0);
    setSelectedAnswers([]);
    setSelectedAvatar(null);
    setWrongAnswers([]);
  };

  const handleShowCorrections = () => {
    setShowCorrections(true);
  };

  const handleAnswerSelection = (selectedOption: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(updatedAnswers);

    setIsOptionSelected(false);
  };
  
  const handleAvatarSelection = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
  };

  
  const renderAvatarSelection = () => {
    return (
      <div className="flex">
        <div className="w-1/4 pr-4">
          {selectedAvatar && (
            <img
              src={selectedAvatar}
              alt="Selected Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>
        <div className="w-3/4">
          <h3 className="text-xl font-bold mb-4">Select Your Avatar</h3>
          <div className="flex flex-wrap">
            {avatarOptions.map((avatar, index) => (
              <div key={index} className="w-1/6 p-0.5">
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-16 h-16 m-0.1 cursor-pointer rounded-full object-cover"
                  onClick={() => handleAvatarSelection(avatar)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  
  

  const renderQuizContent = () => {
    const currentQuestion = loaderData.data?.questions?.[currentQuestionIndex];
  
    if (isOptionSelected) {
      return (
        <div key={currentQuestionIndex} className="mt-8">
          <h3 className="text-2xl font-bold mb-4">{currentQuestion?.text}</h3>
          <ul className="list-none">
            {currentQuestion?.options.map((option) => (
              <li key={option} className="mb-2">
                <label>
                  <input
                    type="radio"
                    name="options"
                    value={option}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerSelection(option)}
                    className="mr-2"
                  />
                  <span className={selectedAnswers[currentQuestionIndex] === option ? 'text-yellow-500' : 'text-white'}>
                    {option}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="text-red-500">Please select an option before proceeding to the next question.</p>
          <button onClick={handleNextQuestion} className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded">
            Next Question
          </button>
        </div>
      );
    }
  
    return (
      <div key={currentQuestionIndex} className="mt-8">
        <h3 className="text-2xl font-bold mb-4">{currentQuestion?.text}</h3>
        <ul className="list-none">
          {currentQuestion?.options.map((option) => (
            <li key={option} className="mb-2">
              <label>
                <input
                  type="radio"
                  name="options"
                  value={option}
                  checked={selectedAnswers[currentQuestionIndex] === option}
                  onChange={() => handleAnswerSelection(option)}
                  className="mr-2"
                />
                <span className={selectedAnswers[currentQuestionIndex] === option ? 'text-yellow-500' : 'text-white'}>
                  {option}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleNextQuestion} className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded">
          Next Question
        </button>
      </div>
    );
  };
  
  

  const renderQuizCompleted = () => {
    return (
      <div className="mt-8">
        <p className="text-xl font-semibold mb-4">Quiz Completed! Your Final Score: {userScore}</p>
        <button onClick={handleShowCorrections} className="bg-yellow-500 text- px-4 py-2 rounded mr-2">Show Corrections</button>
        <button onClick={handleRetry} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Retry Quiz</button>
      </div>
    );
  };

  const renderCorrections = () => {
    return (
      <div className="mt-8">
        {wrongAnswers.length > 0 ? (
          <>
            <p className="text-xl font-semibold mb-4">Corrections:</p>
            {wrongAnswers.map((wrongAnswer, index) => (
              <div key={index} className="mb-4">
                <p>
                  Question: {wrongAnswer.question}<br />
                  Your Answer: {wrongAnswer.selectedAnswer || 'N/A'}<br />
                  Correct Answer: {wrongAnswer.correctAnswer}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-xl font-semibold mb-4">All answers are correct!</p>
        )}
        <button onClick={handleRetry} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mt-4">Retry Quiz</button>
      </div>
    );
  };
  
  
  
  

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      {loaderData.error && <div className="text-red-600">Error fetching data: {loaderData.error}</div>}
      {selectedAvatar ? (
        <div className="flex">
          <div className="w-1/4 pr-4">
            {selectedAvatar && (
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
          </div>
          <div className="w-3/4">
            {quizCompleted ? (
              showCorrections ? renderCorrections() : renderQuizCompleted()
            ) : (
              renderQuizContent()
            )}
          </div>
        </div>
      ) : (
        renderAvatarSelection()
      )}
    </div>
  );

  
}
