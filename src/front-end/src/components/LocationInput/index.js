import { Modal, NativeModules, SafeAreaView, StatusBar } from "react-native";

const { StatusBarManager } = NativeModules;

const LocationInput = ({ open, setOpen }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(!open);
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS == "android" ? StatusBarManager.HEIGHT : 0,
        }}
      >
        <StatusBar style="dark" animated backgroundColor={"#3b6fb3"} />
      </SafeAreaView>
    </Modal>
  );
};

export default LocationInput;
