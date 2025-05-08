const { users } = require("./data");
const request = require("supertest");
const app = require("../app");
// selected users
const userOne = users[0];
const userTwo = users[1];
const userThree = users[2];
const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messagesModel");
const helper = require("../services/helper");
const { foundUsers } = require("./utils");

describe("testing utils", () => {
  it("should test for list of users in database", async () => {
    const [foundUserone, foundUserTwo, foundUserThree] = await foundUsers([
      userOne,
      userTwo,
      userThree,
    ]);
  });

  it("should get list of messages", async () => {
    const [foundUserOne, foundUserTwo] = await foundUsers([userOne, userTwo]);

    //  create conversation and get conversation id
    const conversation = await Conversation.create({
      participants: [foundUserOne._id, foundUserTwo._id],
    });

    const { _id: conversationId } = conversation;
    const m1 = {
      conversationId,
      senderId: foundUserOne._id,
      message: "some message from user one",
    };
    const m2 = {
      conversationId,
      senderId: foundUserTwo._id,
      message: "some message from user two",
    };

    // create message
    const messageOne = await Message.create(m1);
    const messageTwo = await Message.create(m2);

    // get messages
    const { body, statusCode } = await request(app).get(
      `/api/messages/${conversationId}`
    );

    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          conversationId: expect.any(String),
          message: expect.any(String),
          senderId: expect.any(Object),
        }),
      ])
    );
  });

  it("should get list user conversations", async () => {
    const [foundUserOne, foundUserTwo] = await foundUsers([userOne, userTwo]);

    //  create conversation and get conversation id
    const conversation = await Conversation.create({
      participants: [foundUserOne._id, foundUserTwo._id],
    });

    const { _id: conversationId } = conversation;
    const m1 = {
      conversationId,
      senderId: foundUserOne._id,
      message: "some message from user one",
    };

    const m2 = {
      conversationId,
      senderId: foundUserTwo._id,
      message: "some message from user two",
    };

    // create message
    const messageOne = await helper.createMessage(m1);
    const messageTwo = await helper.createMessage(m2);

    // fetch user conversations
    const { body, statusCode } = await request(app).get(
      `/api/conversations/${foundUserOne._id}`
    );
    console.log(body);
  });
});
