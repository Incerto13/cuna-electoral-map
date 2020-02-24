const cunaCandidates = {
  AL: [
    {
      name: "TEST 1 TEST 1 (R)",
      chamber: "house",
      district: 2,
      winner: false,
      openSeat: true,
      runOff: true
    },
    {
      name: "TEST 3 TEST 3 (R)",
      chamber: "house",
      district: 2,
      winner: false
    },
    {
      name: "TEST 2 TEST 2 (D)",
      chamber: "house",
      district: 2,
      winner: true,
      openSeat: false,
      runOff: false
    },
    {
      name: "TEST 1 TEST 1 (R)",
      chamber: "house",
      district: 2,
      winner: false,
      runOff: true
    },
  ],
  NC: [
    {
      name: "TEST 2 TEST 2 (D)",
      chamber: "house",
      district: 2,
      winner: true,
      openSeat: false,
      runOff: false
    }
  ],
  TX: [
    {
      name: "TEST 3 TEST 3 (R)",
      chamber: "house",
      district: 2,
      winner: false
    }
  ]
}

export default cunaCandidates;

// EXAMPLES
/*
 AL: [
    {
      name: "Doug Jones (D)",
      chamber: "senate",
      district: 0,
      winner: false,
      openSeat: false,
      runOff: false
    },
    {
      name: "Jeff Sessions (R)",
      chamber: "senate",
      district: 0,
      winner: false,
      openSeat: false,
      runOff: false
    },
    {
      name: "Kiani Gardner (D)",
      chamber: "house",
      district: 1,
      winner: true,
      openSeat: false,
      runOff: false
    },
    {
      name: "Wes Lambert (R)",
      chamber: "house",
      district: 1,
      winner: true,
      openSeat: false,
      runOff: false
    },
    {
      name: "Phyllis Harvey-Hall (D)",
      chamber: "house",
      district: 2,
      winner: true,
      openSeat: false,
      runOff: false
    },
    {
      name: "Jessica Taylor (R)",
      chamber: "house",
      district: 2,
      winner: true,
      openSeat: false,
      runOff: false
    },
    {
      name: "Adia Winfrey (D)",
      chamber: "house",
      district: 3,
      winner: true,
      openSeat: false,
      runOff: false
    },
    {
      name: "Mike Rogers (R)",
      chamber: "house",
      district: 3,
      winner: true,
      openSeat: false,
      runOff: false
    },
    {
      name: "Mo Brooks (R)",
      chamber: "house",
      district: 5,
      winner: true,
      openSeat: false,
      runOff: false
    }
  ]
  */
