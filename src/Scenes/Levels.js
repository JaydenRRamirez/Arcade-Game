const Levels = {
    1: {
      waves: [
        [ { track: 1, type: "enemy" } ],
        [ { track: 0, type: "enemy" }, { track: 2, type: "enemy" } ],
        [ { track: 1, type: "enemy" } ],
        [ { track: 0, type: "enemy" } ],
        [ { track: 2, type: "enemy" }, { track: 1, type: "enemy" } ]
      ]
    },
    2: {
      waves: [
        [ { track: 1, type: "enemy" }, { track: 2, type: "enemy" } ],
        [ { track: 0, type: "tank" } ],
        [ { track: 1, type: "speedy" }, { track: 2, type: "enemy" } ],
        [ { track: 0, type: "enemy" }, { track: 2, type: "speedy" } ],
        [ { track: 1, type: "tank" }, { track: 0, type: "enemy" } ]
      ]
    },
    3: {
      waves: [
        [ { track: 0, type: "speedy" }, { track: 2, type: "speedy" } ],
        [ { track: 1, type: "tank" }, { track: 2, type: "tank" } ],
        [ { track: 0, type: "enemy" }, { track: 1, type: "enemy" }, { track: 2, type: "enemy" } ],
        [ { track: 1, type: "speedy" }, { track: 0, type: "tank" } ],
        [ { track: 0, type: "speedy" }, { track: 1, type: "speedy" }, { track: 2, type: "speedy" } ]
      ]
    }
  };