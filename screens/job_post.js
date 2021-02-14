import React, { Component } from 'react';
import { TouchableHighlight, Animated, Layouts, View, StyleSheet, ScrollView, Image, TextInput, Alert, Toast, ActivityIndicator } from 'react-native';
import {
    Container,
    Header,
    Content,
    Modal,
    Form,
    Item,
    Input,
    Label,
    Card,
    Right,
    auto,
    CardItem,
    CardBody,
    Thumbnail,
    Text,
    Icon,
    Picker,
    DatePicker,
    Footer,
    FooterTab,
    Button,
    Textarea
} from 'native-base';

/* import storage from 'firebase';
import firestore from 'firebase';
import auth from 'firebase'; */
import {db, auth, storage, firestore} from '../config/Firebase';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

const SIZE = 80;
//const storageRef = storage().ref('thumbnails_job').child(`${appendIDToImage}`);

// [anas]


export default class PostJob extends Component {
    constructor() {
        super();

        //const user = firebase.auth().currentUser;
        this.dbRef = firestore.collection('Job_list');
        this.state = {
            currentUser: null,
            userID: null,
            jobname: '',
            email:'',
            uniqueId: '',
            jobdesc: '',
            url: '',
            worktype: '',
            salary: '',
            peoplenum: '',    
            qualification:'',
            experience:'',
            isLoading: false,
            uploading: false,
            //modalVisible: false
        };

        //this.setDate = this.setDate.bind(this);
        this.selectWorkType = this.selectWorkType.bind(this);
        this.selectExperience = this.selectExperience.bind(this);
        this.pickImage = this.pickImage.bind(this);

        this.saveData = this.saveData.bind(this);
        // state = { ScaleAnimation: false };

        //this.state.date = this.state.chosenDate.toString().substr(4, 12);
        // this.setState({ userid: user })

    }
    componentDidMount() {
        //get data first
        var user = auth.currentUser;
        var name, uid;
        if (user != null) {
            name = user.displayName;
            uid = user.uid;
        }

        const { currentUser } = auth;
        this.setState({ currentUser });
        this.state.userID = currentUser.uid;
        this.setState({ jobCreaterName: currentUser.displayName })  
      }


    // componentWillMount() {
    //   Geolocation.setRNConfiguration(config);
    // }


    toggleView = () => {
        Animated.timing(this.mode, {
            toValue: this.mode._value === 0 ? 1 : 0,
            duration: 300
        }).start();
    };


    setUserID = (value) => {
        this.setState({ userID: value });

    }

    setEmail = (value) => {
        this.setState({ email: value });

    }


    selectWorkType = (value) => {
        this.setState({
            worktype: value
        })
    }

    setQualification = (value) => {
        this.setState({ qualification: value })
        //console.log('job desc:',value);
    }

    selectExperience = (value) => {
        this.setState({
            experience: value
        })
    }

    setJobName = (value) => {
        this.setState({ jobname: value })
    }

    setUniqueId = (value) => {
        this.setState({ uniqueId: value })
    }

    setJobDesc = (value) => {
        this.setState({ jobdesc: value })
        //console.log('job desc:',value);
    }


    setSalary = (value) => {
        this.setState({ salary: value })
    }

    setPeopleNum = (value) => {
        this.setState({ peoplenum: value })
    }


    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
      };

    _maybeRenderImage = () => {
        let { url } = this.state;
        if (!url) {
          return;
        }
    
        return (
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: 350,
              height: 250,
              borderRadius: 3,
              elevation: 2,
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: '#8d8f92',
                borderColor: '#8d8f92',
                elevation: 4,
                borderWidth:5,
                shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                shadowRadius: 5,
                overflow: 'hidden',
              }}>
              <Image source={{ uri: url }} style={{ width: null, height: 250 }} />
            </View>
          </View>
        );
    };

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };

    _handleImagePicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            const uploadUrl = await uploadImageAsync(pickerResult.uri);
            this.setState({ url: uploadUrl });
          }
        } catch (e) {
          console.log(e);
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };

    //Pick Image from camera or library
    pickImage = async() => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        this._handleImagePicked(pickerResult);
    
    }

    saveData = async() => {
        console.log("state", this.state)
        if (this.state.userID && this.state.worktype && this.state.qualification && this.state.experience && this.state.email&& this.state.jobname && this.state.uniqueId && this.state.jobdesc && this.state.salary && this.state.peoplenum  && this.state.url) {
            if (isNaN(this.state.salary && this.state.peoplenum)) {
                Alert.alert('Status', 'Invalid Figure!');
            }
            else {
                //await auth.currentUser.uid.then(doc =>{
                    
                    this.dbRef.add({
                        uid: auth.currentUser.uid,
                        jobCreatorname: this.state.email,
                        jobname: this.state.jobname,
                        uniqueId: this.state.uniqueId,
                        jobdesc: this.state.jobdesc,
                        salary: this.state.salary,
                        url: this.state.url,
                        worktype: this.state.worktype,
                        experience: this.state.experience,
                        qualification: this.state.qualification,
                        peoplenum: this.state.peoplenum,
                        
                    }).then((res) => {
                        console.log("[saveData] Done add to firebase", res);

                        this.setState({
                            jobname: '',
                            uniqueId: '',
                            jobdesc: '',
                            salary: '',
                            url: '',
                            peoplenum: '',
                            time: 0,
                        
                        })
                    });
                    Alert.alert('Your Job Has Been Posted', 'Please Choose',
                        [
                            {
                                text: "Return To Main Screen",
                                onPress: () => this.props.navigation.navigate('Feed')
                            },
                            {
                                text: "View Current Job Posted",
                                onPress: () => this.props.navigation.navigate('MyJob')
                            }
                        ], { cancelable: false }
                    );
           // })
        }
        } else {
            Alert.alert('Status', 'Empty Field(s)!');
        }
    }

    render() {
        //const { modalVisible } = this.state;
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <Container>
                <Content padder>
                    <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }}>Details</Text>
                    <Form>
                    <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Email</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setEmail} />
                        </Item>

                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Job Name</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setJobName} />
                        </Item>
                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Unique Id</Label>
                            <Input style={styles.startRouteBtn} onChangeText={this.setUniqueId} />
                        </Item>


                        <View style={styles.inputGroup} fixedLabel last>
                            <Label>Job Description</Label>
                        </View>
                        <Item>
                            <Textarea rowSpan={5} colSpan={5} onChangeText={this.setJobDesc} bordered style={styles.startTextBtn} placeholder="Tell something about the job Here" />
                        </Item>
                        

                        <Item>
                             <Label>Work Type</Label>
                        </Item>
                        <Item fixedLabel picker last>        
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: 250 }}
                                placeholder="Select Type of Job"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.worktype}
                                onValueChange={this.selectWorkType.bind(this)}
                                Title="Work Type"
                            >
                                <Picker.Item label="Select Work Type" value={null} />
                                <Picker.Item label="Accounting" value="Accounting" />
                                <Picker.Item label="Office Assistant" value="Office Assistant" />
                                <Picker.Item label="Software Engineer" value="Software Engineer" />
                                <Picker.Item label="Finance" value="Finance" />
                                <Picker.Item label="Sales" value="Sales" />
                                <Picker.Item label="Data Analytics" value="Data Analytics" />
                                <Picker.Item label="Database" value="Database" />
                                <Picker.Item label="Designer" value="Designer" />

                            </Picker>
                        </Item>                        
                   
                        <View style={styles.inputGroup} fixedLabel last>
                            <Label>Qualifcation</Label>
                        </View>
                        <Item>
                            <Textarea rowSpan={5} colSpan={5} onChangeText={this.setQualification} bordered style={styles.startTextBtn} placeholder="Tell something about the job Here" />
                        </Item>
                        
                        <Item>
                             <Label>Experience</Label>
                        </Item>
                        <Item fixedLabel picker last>        
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: 250 }}
                                placeholder="Select Type of Job"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.experience}
                                onValueChange={this.selectExperience.bind(this)}
                                Title="Experience"
                            >
                                <Picker.Item label="Select Experience" value={null} />
                                <Picker.Item label="Senior" value="Senior" />
                                <Picker.Item label="Junior" value="Junior" />
                                <Picker.Item label="Intermediate" value="Intermediate" />

                            </Picker>
                        </Item>

                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center' }}>
                                <Button iconLef style={{ backgroundColor: '#1B6951', padding: 2, margin: 3, width: 150}} onPress={this.pickImage}>
                                    <Icon name="md-image" />
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Library</Text>
                                </Button>
                                
                                <Button iconLef style={{ backgroundColor: '#2869F4', padding: 2, margin: 3 }}
                                                    onPress={this._takePhoto}>
                                    <Icon name="md-camera" />
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Take Photo</Text>
                                </Button>
                            </View>


                            {this._maybeRenderImage()}
                            {this._maybeRenderUploadingOverlay()}


                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Salary</Label>
                            <Input  keyboardType="numeric" style={styles.startRouteBtn} onChangeText={this.setSalary} />
                        </Item>

                        <Item style={styles.inputGroup} fixedLabel last>
                            <Label>Number of People</Label>
                            <Input keyboardType="numeric" style={styles.startRouteBtn} onChangeText={this.setPeopleNum} />
                        </Item>


                    </Form>

                    <Button block success last style={{ marginTop: 50 }} onPress={this.saveData.bind(this)}>
                        <Text style={{ fontWeight: "bold" }}>Hire Now</Text>
                    </Button>
                </Content>

            </Container>


        );
    }
}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = storage
     .ref("job_post")
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }

const styles = StyleSheet.create({
    closeText: {
        fontSize: 25,
        color: '#00479e',
        textAlign: 'center',
        marginTop: 10
    },
    startRouteBtn: {
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    description: {
        backgroundColor: 'white',
        width: 400,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    startTextBtn: {
        backgroundColor: 'white',
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
