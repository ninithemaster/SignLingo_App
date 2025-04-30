import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useState } from 'react';
import { ProgressBar } from 'react-native-paper';

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the sign for the letter 'A' in ASL?",
    options: ["Palm open, fingers together", "Fist with thumb on side", "Thumb and index making circle", "Hand flat, palm down"],
    answer: "Fist with thumb on side"
  },
  {
    id: 2,
    question: "Which of these signs represents 'Hello' in ASL?",
    options: ["Wave near forehead", "Two fingers tapping chin", "Thumb up", "Palm touching chest"],
    answer: "Wave near forehead"
  },
  {
    id: 3,
    question: "Which sign means 'Thank You' in ASL?",
    options: ["Flat palm from chin outward", "Hand wave", "Thumb and index forming a circle", "Hands apart from each other"],
    answer: "Flat palm from chin outward"
  }
];

export default function QuizScreen() {
  const { theme } = useAppTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getOptionBackgroundColor = (option: string) => {
    if (!selectedAnswer) return theme.primary;
    if (option === currentQuestion.answer) return '#4CAF50';
    if (option === selectedAnswer) return '#F44336';
    return theme.primary;
  };

  if (showResult) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.resultCard, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.title, { color: theme.text }]}>Quiz Complete!</Text>
          <Text style={[styles.score, { color: theme.text }]}>
            Your Score: {score}/{quizQuestions.length}
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={resetQuiz}
            accessibilityLabel="Try again button"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const progress = (currentQuestionIndex + 1) / quizQuestions.length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.questionCard, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.progress, { color: theme.text }]}>
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </Text>
        <ProgressBar progress={progress} color={theme.primary} style={styles.progressBar} />

        <Text style={[styles.question, { color: theme.text }]}>
          {currentQuestion.question}
        </Text>

        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              { backgroundColor: getOptionBackgroundColor(option) }
            ]}
            onPress={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            accessibilityLabel={`Option ${index + 1}`}
            accessibilityRole="button"
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {selectedAnswer && selectedAnswer !== currentQuestion.answer && (
          <Text style={[styles.correctAnswer, { color: theme.text }]}>
            Correct Answer: {currentQuestion.answer}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progress: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  progressBar: {
    height: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  correctAnswer: {
    marginTop: 16,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  resultCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    minWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
