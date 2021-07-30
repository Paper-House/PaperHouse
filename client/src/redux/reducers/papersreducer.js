import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  wallet: {
    connected: false,
    address: "",
    network: "",
    correctNetwork: true,
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
    loading: false,
  },
  myActivities: {
    data: [],
    loading: false,
  },
  profilePaper : {
    data: [],
    loading: false,
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
      state.myPapers.data.push(payload);
    },
    setMyPapersLoading: (state, { payload }) => {
      state.myPapers.loading = payload;
    },
    setMyActivities: (state, { payload }) => {
      state.myActivities.data.push(payload);
    },
    setMyActivitiesLoading: (state, { payload }) => {
      state.myActivities.loading = payload;
    },
    setPapers: (state, { payload }) => {
      state.papers.data.push(payload);
    },
    setProfilePaper: (state, {payload}) => {
      state.profilePaper.data.push(payload);
    },
    setProfilePaperLoading: (state, {payload}) => {
      state.profilePaper.loading = payload;
    }
  },
  extraReducers: {},
});

export const {
  setWallet,
  setWeb3,
  setContract,
  setCorrectNetwork,
  setPapers,
  setMyPapers,
  setMyPapersLoading,
  setMyActivities,
  setMyActivitiesLoading,
  setProfilePaper,
  setProfilePaperLoading
} = paperSlice.actions;
export default paperSlice.reducer;
