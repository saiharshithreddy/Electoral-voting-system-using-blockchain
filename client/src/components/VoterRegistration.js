import React,{Component} from 'react';
import * as constants from '../constants/AppConstants';
import VoterRegistrationContract from '../contracts/VoterRegistration.json';
import Web3 from 'web3';

class VoterRegistration extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            web3: null, contract: null,
            account: null,
            first_name: '',
            last_name: '',
            username : '',
            password: '',
            ssn: '',
        }
        
        this.handleInputChage = this.handleInputChage.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = constants.WEB3;
            // Use web3 to get the user's accounts.
           const accounts = await web3.eth.getAccounts();

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = VoterRegistrationContract.networks[networkId];
          
          const electionInstance = new web3.eth.Contract(
              VoterRegistrationContract.abi,
              deployedNetwork && deployedNetwork.address,
          );
          
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3,
            accounts,
            contract: electionInstance,
            account: accounts[0]     });
          //this.loadContract();
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };

    handleInputChage(event){
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name] : val});
    }   

    showVoters = async () => {
        const {contract} = this.state;
        
        contract.methods.getVoterList().call().then((result,err) => {
            console.log("Loading Voters Info"); 
              console.log(result);
              console.log(err);
        }).catch(err => {
            console.log(err);
        });
    }

    register(){
        const {contract,account,first_name,last_name,ssn,username,password} = this.state;
        contract.methods.register(
            first_name,last_name,ssn,username,password
        ).send({
            from: account,
            gasPrice: Web3.utils.asciiToHex("0.001"),
            gas: 6721975,
         }).then((f) => {
            console.log(f);
            console.log("User Registered");
            //alert("User Registered")
        }).catch(e => {
            console.log(e);
            //alert("An Error Occured");
        });
    }
    
    render(){
        return (
            <div>
            <form>
            <h1>Hello {this.state.username}</h1>
            <p>Enter your First name:</p>
            <input
              type='text'
              name='first_name'
              value={this.state.first_name}
              onChange={this.handleInputChage}
            />
            <p>Enter Last Name:</p>
            <input
              type='text'
              name='last_name'
              value={this.state.last_name}
              onChange={this.handleInputChage}
            />
            <p>Enter username:</p>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleInputChage}
            />
            <p>Enter password:</p>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleInputChage}
            />
            
            <p>Enter Social Security Number</p>
            <input
              type='password'
              name='ssn'
              value={this.state.ssn}
              onChange={this.handleInputChage}
            />
            </form>
            <button type="submit" onClick={this.register}>Submit</button>
            </div>
        );
    }
}

export default VoterRegistration;