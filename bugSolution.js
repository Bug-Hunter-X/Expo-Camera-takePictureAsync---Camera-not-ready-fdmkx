import * as React from 'react';
import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (hasPermission) {
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri);
    }
  };

  const [cameraRef, setCameraRef] = useState(null);

  if (hasPermission === null) {
    return <View>Requesting permissions...</View>;
  }
  if (hasPermission === false) {
    return <View>No access to camera</View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={setCameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 30,
              left: 30,
              borderRadius: 10,
              backgroundColor: 'grey',
            }}
            onPress={takePicture}>
            <Text style={{ padding: 10 }}>Take picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};
export default App;