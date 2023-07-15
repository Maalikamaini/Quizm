
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example, using FontAwesome icons

import React from 'react';
const { height, width } = Dimensions.get('window');
const QuestionOption = ({ data, selectedOption }) => {
  return (
    <View style={{ width: width }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '500',
          color: 'white',
          marginLeft: 20,
          marginRight: 20,
        }}>
        {'Ques: ' + data.question}
      </Text>
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={data.Options}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 60,
                  elevation: 3,
                  marginTop: 10,
                  marginBottom: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingLeft: 15,
                  flexDirection: 'row',
                  borderRadius:10,
                  backgroundColor:
                    (data.marked === index + 1 && data.marked === data.correct) // Correct option selected or marked
                      ? 'green'
                      : (data.marked === index + 1 && data.marked !== data.correct) // Wrong option selected or marked
                        ? 'red'
                        : 'rgba(0, 128, 255, 0.5)',
                  // ...rest of the styles
                }}
                onPress={() => {
                  selectedOption(index + 1);
                }}
              >
                
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: data.marked === index + 1 ? '#fff' : 'cyan',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10, 
                }}
              >
                <Text style={{ fontWeight: '600', color: '#000' }}>
                  {index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                  fontWeight: '600',
                  color: data.marked === index + 1 ? '#fff' : '#000',
                }}
              >
                {item}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Tick icon for correct option */}
                {data.marked === index + 1 && data.marked === data.correct && (
                  <Icon name="check" size={20} color="white" style={{marginRight:10}} />
                )}
                {/* Cross icon for wrong option */}
                {data.marked === index + 1 && data.marked !== data.correct && (
                  <Icon name="times" size={20} color="white" style={{marginRight:10}} />
                )}
              </View>
            </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default QuestionOption;
