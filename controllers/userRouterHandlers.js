const tryCatchMiddleware = require("../middlewares/tryCatch.js");
const { coloredLog } = require("../utils/coloredLog.js");
const sha256 = require("sha256");
//! Prisma
const { PrismaClient } = require("@prisma/client");
const responseSend = require("../utils/responseSend.js");
const prisma = new PrismaClient();
// to throw error =>  return next(new ErrorHandler(message, statusCode));
// to throw error =>  return next(new ErrorHandler(message, statusCode));

const createUser = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);

  let user = await prisma.user.createMany({ data: req.body });

  responseSend(res, user);
});

const updateUser = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);
  const { name, id } = req.body;

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  responseSend(res, user);
});

const deleteUser = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);
  const { id } = req.body;

  let user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  responseSend(res, user);
});

const getAllUsers = tryCatchMiddleware(async (req, res, next) => {
  let users = await prisma.user.findMany();
  responseSend(res, users);
});

const createHouse = tryCatchMiddleware(async (req, res, next) => {
  coloredLog([JSON.stringify(req.body)], 5);

  let house = await prisma.house.createMany({ data: req.body });

  responseSend(res, house);
});

const getAllHouses = tryCatchMiddleware(async (req, res, next) => {
  let houses = await prisma.house.findMany({
    where: {
      wifiPassword: {
        not: "",
      },
    },
    include: {
      owner: true,
      buildBy: true,
    },
  });
  responseSend(res, houses);
});

const getAllUsersTest = tryCatchMiddleware(async (req, res, next) => {
  // console.log("Inside");
  let users = await prisma.mqtt_user.findMany();
  // let users = sha256("testing")

  responseSend(res, users);
});
const createUserTest = tryCatchMiddleware(async (req, res, next) => {
  // console.log("Inside");

  let datas = [
    {
    username:"user1",
    password:sha256("user1"),
    salt:sha256("salt1")
    },
    {
      username:"user2",
      password:sha256("user2"),
      salt:sha256("salt2")
      },
      {
        username:"user3",
        password:sha256("user3"),
        salt:sha256("salt3")
        },
        {
          username:"user4",
          password:sha256("user4"),
          salt:sha256("salt4")
          },
          {
            username:"user5",
            password:sha256("user5"),
            salt:sha256("salt5")
            },
            {
              username:"user6",
              password:sha256("user6"),
              salt:sha256("salt6")
              },
  ]

  let users = await prisma.mqtt_user.createMany({ data:datas});
  // let users = sha256("testing")

  responseSend(res, users);
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  createHouse,
  getAllHouses,
  getAllUsersTest,
  createUserTest
};
