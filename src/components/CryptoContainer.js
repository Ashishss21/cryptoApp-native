import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

// import FetchCoinData from "./../actions/FetchCoinData";
import FetchCoinData from '../Actions/FetchCoinData';
import CoinCard from "./CoinCard";

class CryptoContainer extends Component {
  componentWillMount() {
    this.props.FetchCoinData();
  }

  renderCoinCards() {
    const { crypto } = this.props;
    return crypto.data.map((coin) => (
      <CoinCard
        key={coin.name}
        coin_name={coin.name}
        symbol={coin.symbol}
        price_usd={coin.price_usd}
        percentage_change_24hr={coin.percentage_change_24hr}
        percentage_change_7d={coin.percentage_change_7d}
      />
    ));
  }

  render() {
    const { crypto } = this.props;
    const contentContainer = styles;

    if (crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={crypto.isFetching}
            textContent="Loading..."
            textStyles={{ color: "#253145" }}
            animation="fade"
          />
        </View>
      );
    }

    return(
        <ScrollView contentContainerStyle={styles.contentContainer}>
            {this.renderCoinCards()}
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    contentContainer :{
        paddingBottom:100,
        paddingTop:55,
    }
})

function mapStateToProp(state){
    return{
        crypto: state.crypto
    }
}

export default connect(mapStateToProp,{FetchCoinData})(CryptoContainer);