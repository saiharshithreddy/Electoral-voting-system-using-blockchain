import React, { Component } from "react";
import Web3 from 'web3';
import * as constants from '../constants/AppConstants';
import ElectionContract from '../contracts/Election.json';
import Content from './Content';


//const selectedCandiateRef = React.createRef();
class Voting extends Component{
  constructor(props) {
    super(props);
    this.state = {
        web3: null,
        accounts: null,
        contract: null,
        account: null,
        candidates: [],
        candidateName: null,
        loading: true,
        voting: false,
    }
    this.handleCandidateChange = this.handleCandidateChange.bind(this);
    this.castVote = this.castVote.bind(this);
    this.loadContract = this.loadContract.bind(this);
}

componentDidMount = async () => {
    try {
        // Get network provider and web3 instance.
        const web3 = constants.WEB3;

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ElectionContract.networks[networkId];

        const electionInstance = new web3.eth.Contract(
            ElectionContract.abi,
            deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({
            web3,
            accounts,
            contract: electionInstance,
            account: accounts[0]
        });
        this.loadContract();
    } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
    }
};

loadContract = () => {
    const {
        contract
    } = this.state;
    console.log("Loading Election Contract");
    //this.watchEvents();
    contract.methods.getCandidates().call().then((result, err) => {
        console.log("Loading Candidates Info");
        if (typeof(err) === undefined) {
            alert("No candidates found");
        }
        if (result) {
            let candidates = []
            for (let candidate of result) {
                let keys = Object.keys(candidate).filter(key => key === "id" || key === "name" || key === "voteCount");
                candidates.push({
                    id: candidate[keys[0]],
                    name: candidate[keys[1]],
                    voteCount: candidate[keys[2]]
                });
            }
            this.setState({
                candidates: candidates
            })
            console.log("Candidates Info Loaded");
            this.setState({
                loading: false
            });
            contract.methods.voters(this.state.account).send({from :this.state.account},
            (err,result) => {
                if (err) 
                    throw err;
            })
        }
    }).catch(err => {
        console.log(err);
    });

}


watchEvents = async () => {
    const {
        contract
    } = this.state;


    contract.votedEvent.call({}, {
        fromBlock: 0,
        toBlock: 'latest'
    }).watch((error, event) => {
       console.log(event);
       console.log(error);
    })
}

handleCandidateChange = (event) => {
    event.preventDefault();
    this.setState({
        candidateName: event.target.value
    });
}


castVote(event) {
    event.preventDefault();

    const {
        candidates,
        contract
    } = this.state;


    if (this.state.candidateName) {
       let candidateId = candidates.filter(candidate => candidate.name === this.state.candidateName)[0].id;
        contract.methods.vote(
            parseInt(candidateId)
        ).send({
            from: this.state.account,
            gasPrice: Web3.utils.asciiToHex("0.001"),
            gas: 6721975,
         }).then((f) => {
            console.log(f);
            console.log("Votes casted");
            alert("Vote casted")
        }).catch(e => {
            console.log(e);
            alert("An Error Occured");
        });
    } else {
        alert("Kindly Select Candidates");
    }
}
      render(){
          return (
            <div className='row'>
            <div className='col-lg-12 text-center' >
              <h1>Election Voting</h1>
              <br/>
              { this.state.loading || this.state.voting
                ? <p className='text-center'>Loading...</p>
                : <Content
                    account={this.state.account}
                    candidates={this.state.candidates}
                    candidateChange={this.handleCandidateChange}
                    castVote={this.castVote} />
              }
            </div>
          </div>
          )
      }

} 

export default Voting;