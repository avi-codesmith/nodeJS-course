// import fs from 'fs';

// const app = express();

// let users = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: "This root ain't yet specified",
  });
};

const getUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: "This root ain't yet specified",
  });
};

const addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: "This root ain't yet specified",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: "This root ain't yet specified",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    requestedAt: req.requestTime,
    message: "This root ain't yet specified",
  });
};

export { getAllUsers, getUserByID, addUser, updateUser, deleteUser };
