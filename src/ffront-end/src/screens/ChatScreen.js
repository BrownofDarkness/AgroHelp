
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainHeader from '../components/shared/MainHeader';

const ChatScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <MainHeader title="Forum" /> 

      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Ask a question..." />
        <TouchableOpacity style={styles.askButton}>
          <Text style={styles.askButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>Sample Question 1</Text>
        <TouchableOpacity style={styles.replyButton}>
            
          <Text style={styles.replyButtonText}>Reply this Question</Text>
        </TouchableOpacity>
        <View style={styles.replyBox}>
        <Text style={styles.replyName}>From: John Doe</Text>
          <Text>Sample Reply</Text>
          <TextInput style={styles.replyInput} placeholder="Your Reply..." />
        </View>
      </View>

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>Sample Question 2</Text>
        <TouchableOpacity style={styles.replyButton}>
         
          <Text style={styles.replyButtonText}>Reply this Question</Text>
        </TouchableOpacity>
        <View style={styles.replyBox}>
        <Text style={styles.replyName}>From: John Doe</Text>
          <Text>Sample Reply</Text>
          <TextInput style={styles.replyInput} placeholder="Your Reply..." />
        </View>
      </View>

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>Sample Question 3</Text>
        {/* <TouchableOpacity style={styles.replyButton}>
         
          <Text style={styles.replyButtonText}>Reply this Question</Text>
        </TouchableOpacity> */}
        <View style={styles.replyBox}>
        <Text style={styles.replyName}>From: John Doe</Text>
          <Text>Sample Reply</Text>
          <Text style={styles.replyName}>From: You</Text>
          <Text>Sample Reply</Text>
          {/* <TextInput style={styles.replyInput} placeholder="Your Reply..." /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 25,
  },
  searchInput: {
    flex: 1,
    maxWidth: 400,
    height: 40,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  askButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#028A0F',
    marginLeft: 10,
  },
  askButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  questionBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  replyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    borderRadius: 4,
    backgroundColor: '#42a5f5',
    alignSelf: 'flex-end',
  },
  replyButtonText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  replyBox: {
    backgroundColor: '#fafafa',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  replyInput: {
    maxWidth: 400,
    height: 40,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  replyName: {
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 10,
      },
});

export default ChatScreen;

// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import MainHeader from '../components/shared/MainHeader';

// const ChatScreen = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <MainHeader title="Forum" />
//       {/* <Text style={styles.heading}>Welcome to My Beautiful Page</Text> */}

//       <View style={styles.searchBar}>
//         <TextInput style={styles.searchInput} placeholder="Ask a question..." />
//         <TouchableOpacity style={styles.askButton}>
//           <Text style={styles.askButtonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.questionBox}>
//         <Text style={styles.questionText}>Sample Question 1</Text>
//         <TouchableOpacity style={styles.replyButton}>
//           <Text style={styles.replyButtonText}>Reply this Question</Text>
//         </TouchableOpacity>
//         <View style={styles.replyBox}>
//           <Text>Sample Reply</Text>
//           <TextInput style={styles.replyInput} placeholder="Your Reply..." />
//         </View>
//       </View>

//       <View style={styles.questionBox}>
//         <Text style={styles.questionText}>Sample Question 2</Text>
//         <TouchableOpacity style={styles.replyButton}>
//           <Text style={styles.replyButtonText}>Reply this Question</Text>
//         </TouchableOpacity>
//         <View style={styles.replyBox}>
//           <Text>Sample Reply</Text>
//           <TextInput style={styles.replyInput} placeholder="Your Reply..." />
//         </View>
//       </View>

//       <View style={styles.questionBox}>
//         <Text style={styles.questionText}>Sample Question 3</Text>
//         <TouchableOpacity style={styles.replyButton}>
//           <Text style={styles.replyButtonText}>Reply this Question</Text>
//         </TouchableOpacity>
//         <View style={styles.replyBox}>
//           <Text>Sample Reply</Text>
//           <TextInput style={styles.replyInput} placeholder="Your Reply..." />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 25,
//     // backgroundColor: 'white',
//   },
//   searchInput: {
//     flex: 1,
//     maxWidth: 400,
//     height: 40,
//     padding: 8,
//     fontSize: 16,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   askButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 4,
//     backgroundColor: '#028A0F',
//     marginLeft: 10,
//   },
//   askButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   questionBox: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     borderWidth: .8,
//     borderColor: '#666',
//     padding: 20,
//     marginBottom: 20,
//   },
//   questionText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   replyButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     fontSize: 14,
//     borderRadius: 4,
//     backgroundColor: '#007bff',
//     alignSelf: 'flex-end',
//   },
//   replyButtonText: {
//     fontSize: 14,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   replyBox: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 15,
//     padding: 20,
//     marginTop: 10,
//   },
//   replyInput: {
//     maxWidth: 400,
//     height: 40,
//     padding: 8,
//     fontSize: 16,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginTop: 10,
//   },
// });

// export default ChatScreen;


