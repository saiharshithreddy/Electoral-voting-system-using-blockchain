import Web3 from 'web3';

export const GANACHE_URL ="http://127.0.0.1:7545";
export const WEB3_PROVIDER = new Web3.providers.HttpProvider(GANACHE_URL);
export const WEB3 = new Web3(WEB3_PROVIDER);
export const COLUMNS = ["Id", "Candidate Name", "Votes Received"];

export const TABLE_HEADER_CELLS = [
 { id: 'name', numeric: false, disablePadding: true, label: 'Candidate Name' },
 { id: 'vote', numeric: true, disablePadding: false, label: 'Vote Count' }
];
