/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Button from './components/Button';
import stripe from 'tipsi-stripe';
import axios from 'axios'


PUBLISHABLE_KEY = ""
stripe.setOptions({
  publishableKey:PUBLISHABLE_KEY
}
)

//You need to set your own Firebase URL
FIREBASE_URL = ""
export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            email: '',
          },
        },
      })

      this.setState({ loading: false, token })
    } catch (error) {
      this.setState({ loading: false })
    }
  }
  makePayment = async() => {
    this.setState({loading:true})
    axios({
      method:'POST',
      url: FIREBASE_URL, 
      data: {
        amount:10,
        currency:'usd', 
        token:'this.state.token',
      } 
    }).then(response => {
      this.setState({loading:false});
    })
  }
  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter your card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        />
        <View
          style={styles.token}>
          {token && (
            <>
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
            <Button text="Make Payment" loading={loading} onPress={this.makePayment}></Button>
            </>
          )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})
