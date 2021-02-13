import React, { Component } from 'react';
//import { removeStudent } from '../services/DataService';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, auto, Content, Footer, FooterTab, Body, Button, Icon, Text, List, Header, Card, CardItem } from 'native-base';
import {auth, firestore, storage} from '../config/Firebase';
const { width, height } = Dimensions.get('window')


export default class JobCreatorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            uniqueId: null,
            jobname: null,
            jobdesc: null,
            salary: null,
            peoplenum: null,
            chosenDate: null,
            lat: 0,
            lng: 0,
            worktype: null,
            url: null,
            item: {},
            items: [],
        
        }

    }

    componentDidMount() {
        const detailRef = firestore.collection('Job_list').doc(this.props.navigation.state.params.userkey);
        detailRef.get().then((res) => {
            if (res.exists) {
                const job = res.data();
                this.setState({
                    key: res.id,
                    jobname: job.jobname,
                    jobdesc: job.jobdesc,
                    salary: job.salary,
                    peoplenum: job.peoplenum,
                    chosenDate: job.chosenDate,
                    worktype: job.worktype,
                    url: job.url
                });
                console.log("state", this.state)
            } else {
                console.log("Whoops! Document does not exists");
            }
        })



    }


    setUniqueId = (value) => {
        this.setState({ uniqueId: value });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </Header>

                <Content padder>
                    <Card style={{ height: 300 }}>
                        <Image source={{ uri: this.state.url }} style={{ height: 300 }} />
                    </Card>

                    <Card>
                        <CardItem bordered header>
                            <Text style={{ textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20 }} >{this.state.jobname}</Text>

                        </CardItem>
                        <CardItem bordered>

                            <Text style={{ height: 30, fontWeight: "bold", marginTop: 20, marginBottom: 20 }}>{this.state.uniqueId}</Text>

                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem bordered header>

                            <Text style={{ justifyContent: "center", fontWeight: "bold" }}>Job Description</Text>

                        </CardItem>
                        <CardItem bordered cardBody>
                            <Body style={{ flex: 1, justifyContent: 'center', height: 250, marginLeft: 20 }}>
                                <Text>{this.state.jobdesc}</Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Requirement</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text style={{ marginLeft: 30, marginTop: 25 }}>{this.state.worktype}</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody style={{ marginTop: 20 }}>
                            <Body>
                                <Text>Number of People Required: {this.state.peoplenum}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: auto }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Salary</Text>
                        </CardItem>
                        <CardItem cardBody style={{ height: 40, marginTop: 10, marginLeft: 20 }}>
                            <Body><Text>RM {this.state.salary}</Text></Body>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 200 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: "bold" }}>Date</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text>{this.state.chosenDate}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>




            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        height: 300,
        // disabledwidth: 100,
        width: 370,
        //...StyleSheet.absoluteFillObject
    },
});

