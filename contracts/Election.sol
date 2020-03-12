pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        uint id;
        string name;
        bool voted;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("Hillary Clinton");
        addCandidate("Tulsi Gabbard");
        addCandidate("Donald Trump");

    }

    function addCandidate (string  memory _name) private {
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesCount++;
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        //require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        //voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount++;

        // trigger voted event
        //emit votedEvent(_candidateId);
    }
    
    function getCandidates() public view returns (Candidate[] memory){
      Candidate[] memory lBids = new Candidate[](candidatesCount);
      for (uint i = 0; i < candidatesCount; i++) {
          Candidate memory candidate = candidates[i];
          lBids[i] = candidate;
      }
      return lBids;
    }
}
