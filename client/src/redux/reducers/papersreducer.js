import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  wallet: {
    connected: false,
    address: "",
    network: "",
    correctNetwork: false,
  },
  papers: {
    data: [],
  },
  funders: {
    data: [],
  },
  contract: {},
  web3: {},
};
export const getpaper = createAsyncThunk("paper/getpaper", async (props) => {
  // axios call to get all papers
  return;
});
export const getfunders = createAsyncThunk(
  "paper/getfunders",
  async (props) => {
    // axios call to get all funders
    return;
  }
);

const paperSlice = createSlice({
  name: "paper",
  initialState,
  reducers: {
    setWallet: (state, { payload }) => {
      state.wallet.connected = payload.connected;
      state.wallet.address = payload.address;
      state.wallet.network = payload.network;
      state.wallet.correctNetwork = payload.correctNetwork;
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
  },
  extraReducers: {
    [getpaper.pending]: (state) => {},
    [getpaper.fulfilled]: (state, { payload }) => {
      state.papers.data = payload;
    },
    [getfunders.pending]: (state) => {},
    [getfunders.fulfilled]: (state, { payload }) => {
      state.funders.data = payload;
    },
  },
});

export const { setWallet, setWeb3, setContract, setCorrectNetwork } =
  paperSlice.actions;
export default paperSlice.reducer;
