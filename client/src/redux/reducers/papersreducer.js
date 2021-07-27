import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toGatewayURL } from "nft.storage";

import {
  apiEndpoint,
  getAllPapersQuery,
  getFundingQuery,
  GETMYPAPES,
} from "../../graphQueries";

let initialState = {
  wallet: {
    connected: false,
    address: "",
    network: "",
    correctNetwork: false,
    balance: "",
  },
  papers: {
    data: [],
  },
  funders: {
    data: [],
  },
  myPapers: {
    data: [],
  },
  myActivities: {
    data: [],
  },
  contract: {},
  web3: {},
};

const paperSlice = createSlice({
  name: "paper",
  initialState,
  reducers: {
    setWallet: (state, { payload }) => {
      state.wallet.connected = payload.connected;
      state.wallet.address = payload.address;
      state.wallet.network = payload.network;
      state.wallet.correctNetwork = payload.correctNetwork;
      state.wallet.balance = payload.balance;
    },
    setContract: (state, { payload }) => {
      state.contract = payload;
    },
    setWeb3: (state, { payload }) => {
      state.web3 = payload;
    },
    setCorrectNetwork: (state, { payload }) => {
      state.wallet.correctNetwork = payload;
    },
    setMyPapers: (state, { payload }) => {
      console.log(payload);
      state.myPapers.data = payload;
    },
    setMyActivities: (state, { payload }) => {
      state.myActivities.data = payload;
    },
  },
  extraReducers: {
    // [getMyPapers.pending]: (state) => {
    //   console.log("pending");
    // },
    // [getAllPapers.pending]: (state) => {},
    // [getAllPapers.fulfilled]: (state, { payload }) => {
    //   state.papers.data = payload;
    // },
    // [getfunders.pending]: (state) => {},
    // [getfunders.fulfilled]: (state, { payload }) => {
    //   state.funders.data = payload;
    // },
    setPapers: (state, { payload }) => {
      state.papers.data.push( payload);
    },
  },
});

export const {
  setWallet,
  setWeb3,
  setContract,
  setCorrectNetwork,
  setPapers,
  setMyPapers,
  setMyActivities,
} = paperSlice.actions;
export default paperSlice.reducer;
