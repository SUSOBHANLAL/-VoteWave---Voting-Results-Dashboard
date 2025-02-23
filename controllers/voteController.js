const Vote = require("../models/Vote");

// Add a vote
exports.addVote = async (req, res) => {
  const { voterId, party } = req.body;

  try {
    // Check if the voter has already voted
    const existingVote = await Vote.findOne({ voterId });
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    // Create a new vote
    const newVote = new Vote({ voterId, party });
    await newVote.save();

    res.status(201).json({ message: "Vote added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get total votes and winner
exports.getResults = async (req, res) => {
  try {
    // Total number of voters
    const totalVoters = 200000;

    // Count votes for each party
    const bjpVotes = await Vote.countDocuments({ party: "BJP" });
    const tmcVotes = await Vote.countDocuments({ party: "TMC" });
    const congressVotes = await Vote.countDocuments({ party: "CONGRESS" });
    const othersVotes = await Vote.countDocuments({ party: "Others" });

    // Total votes cast
    const totalVotesCast = bjpVotes + tmcVotes + congressVotes + othersVotes;

    // Determine the winner
    const results = [
      { party: "BJP", votes: bjpVotes },
      { party: "TMC", votes: tmcVotes },
      { party: "CONGRESS", votes: congressVotes },
      { party: "Others", votes: othersVotes },
    ];

    const winner = results.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );

    res.status(200).json({
      totalVoters,
      totalVotesCast,
      results,
      winner: winner.party,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
