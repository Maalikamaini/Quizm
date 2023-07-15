import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
  StyleSheet
} from 'react-native';
import React, { useRef, useState } from 'react';
import { questionset } from './Questions';
import Title from './Title';
import QuestionOption from './QuestionOption';

const { width } = Dimensions.get('window');
const Quiz = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(questionset);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [restart, setRestart] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [showModal, setShowModal] = useState(false);
const [modalOption, setModalOption] = useState(null);

const handleCancelQuiz = () => {
  setModalOption('regenerate');
  setShowModal(true);
};

const handleExitQuiz = () => {
  // Perform any exit actions here
  setShowModal(false);
  setModalVisible(false);
};

const handleContinueQuiz = () => {
  setShowModal(false);
};

const handleRegenerateQuiz = () => {
  // Perform any actions to regenerate the quiz here
  navigation.navigate('Home');
};


  const OnSelectOption = (index, x) => {
    const tempData = questions.map((item, ind) => {
      if (index === ind) {
        if (item.marked === -1) {
          return { ...item, marked: x };
        }
      }
      return item;
    });
    setQuestions(tempData);
  };

  const getTextScore = () => {
      let marks = 0;
      questions.map(item => {
        if (item.marked !== -1) {
          if (item.marked === item.correct) {
            marks += 5;
          } else {
            marks -= 1;
          }
        }
      });
      return marks;
    };
    
  const reset = () => {
    const tempData = questions.map(item => ({ ...item, marked: -1 }));
    setQuestions(tempData);
    setRestart(false);
    setCurrentIndex(1);
  };
  if (restart) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            height: 50,
            width: 200,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => reset()}
        >
          <Text style={{ color: '#fff' }}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (currentIndex > questionset.length && !restart) {
    setRestart(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar/>
      <View style={styles.titleContainer}>
        <Title />
      </View>
      <View style={styles.questionCountContainer}>
        <Text style={styles.questionCountText}>
          Question No. :{' ' + currentIndex + '/' + questionset.length}
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          data={questions}
          renderItem={({ item, index }) => {
            return (
              <QuestionOption
                data={item}
                selectedOption={x => {
                  OnSelectOption(index, x);
                }}
              />
            );
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.previousButton,
            { backgroundColor: currentIndex > 1 ? 'rgba(0, 128, 255, 0.5)' : 'rgba(10, 110, 130, 0.5)' },
          ]}
          onPress={() => {
            console.log(parseInt(currentIndex) - 1);
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 2,
              });
            }
          }}>
          <Text style={{ color: '#fff' }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
      style={styles.cancelButton}
      onPress={handleCancelQuiz}
    >
      <Text style={{ color: '#fff' }}>Cancel the Quiz</Text>
    </TouchableOpacity>
        {currentIndex == 8 ? (
          <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            setBlurBackground(true);
            setModalVisible(true);
          }}
        >
          <Text style={{ color: '#fff' }}>Submit</Text>
        </TouchableOpacity>
        
        ) : (
          <TouchableOpacity
          style={styles.nextButton}
            onPress={() => {
              console.log(currentIndex);
              if (questions[currentIndex - 1].marked !== -1) {
                if (currentIndex < questions.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                  });
                }
              }
            }}>
            <Text style={{ color: '#fff' }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
      {blurBackground && (
      <View style={styles.blurContainer} />
    )}
    <View style={styles.modalContainer}>
      {/* ...existing code... */}
      <View style={styles.modalContainer}>
<Text style={{ fontSize: 30, fontWeight: '800', alignSelf: 'center', marginTop: 20 }}>
  Quiz Score
</Text>
<Text style={{ fontSize: 40, fontWeight: '800', alignSelf: 'center', marginTop: 20, color: 'green' }}>
  {getTextScore()}/40
</Text>
{/* Place any additional content related to the scorecard here */}
<TouchableOpacity
style={{
  backgroundColor: 'rgba(10, 110, 130, 0.5)',
  height: 50,
  width: 200,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:'center'
}}
onPress={() => {
  reset();
  setModalVisible(!modalVisible);
  listRef.current.scrollToOffset({ offset: 0, animated: false });
}}
>
<Text style={{ color: '#fff' }}>Restart Quiz</Text>
</TouchableOpacity>

<TouchableOpacity
  style={{
    alignSelf: 'center',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  }}
  onPress={() => {
    navigation.navigate('Home');
  }}
>
  <Text>Close</Text>
</TouchableOpacity>
{currentIndex > questionset.length && !restart && (
  <TouchableOpacity
    style={{
      backgroundColor: 'rgba(10, 110, 130, 0.5)',
      height: 50,
      width: 200,
      borderRadius: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    }}
    onPress={() => reset()}
  >
    <Text style={{ color: '#fff' }}>Restart Quiz</Text>
  </TouchableOpacity>
)}
</View>
  </View>
      </Modal>

      <Modal
  animationType="slide"
  transparent={true}
  visible={showModal}
  onRequestClose={() => {
    setShowModal(false);
  }}
>
  <View style={styles.modalCancelContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Confirmation</Text>
      <Text style={styles.modalText}>Are you sure you want to Exit the quiz?</Text>
      <View style={styles.modalButtonsContainer}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={handleRegenerateQuiz}
        >
          <Text style={styles.modalButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={handleContinueQuiz}
        >
          <Text style={styles.modalButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default Quiz;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 139, 1)',
  },
  titleContainer: {
    marginLeft:10,
    alignItems: 'center',
  },
  questionCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  questionCountText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    color: '#000',
    color:'rgba(120, 110, 120, 1)'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  previousButton: {
    backgroundColor: 'rgba(10, 110, 130, 0.5)',
    height: 50,
    width: 100,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 128, 255, 0.5)',
    height: 50,
    width: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'green',
    height: 50,
    width: 100,
    borderRadius: 10,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: 'rgba(0, 128, 255, 0.5)',
    height: 50,
    width: 100,
    borderRadius: 10,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
  },
  modalCancelContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: 20,
  },
  modalButtonsContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  modalText: {
    fontSize: 20,
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: 20,
    color: 'blue',
  },
  modalButton: {
    backgroundColor: 'rgba(10, 110, 130, 0.5)',
    height: 50,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
  },

});
