const { users } = require("./data");
const request = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messagesModel");
const helper = require("../services/helper");
const { foundUsers } = require("./utils");

// selected users
const userOne = users[0];
const userTwo = users[1];
const userThree = users[2];

describe("testing utils", () => {
  // Clean up database after each test
  afterEach(async () => {
    await Message.deleteMany({});
    await Conversation.deleteMany({});
  });

  it("should test for list of users in database", async () => {
    const [foundUserOne, foundUserTwo, foundUserThree] = await foundUsers([
      userOne,
      userTwo,
      userThree,
    ]);

    expect(foundUserOne).toBeDefined();
    expect(foundUserTwo).toBeDefined();
    expect(foundUserThree).toBeDefined();
    expect(foundUserOne.email).toBe(userOne.email);
    expect(foundUserTwo.email).toBe(userTwo.email);
    expect(foundUserThree.email).toBe(userThree.email);
  });

  it("should get list of messages", async () => {
    const [foundUserOne, foundUserTwo] = await foundUsers([userOne, userTwo]);

    // Create conversation
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

    // Create messages
    const messageOne = await Message.create(m1);
    const messageTwo = await Message.create(m2);

    // Get messages
    const { body, statusCode } = await request(app).get(
      `/api/messages/${conversationId}`
    );

    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          conversationId: expect.any(String),
          message: expect.any(String),
          senderId: expect.any(Object),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );

    // Verify specific message content
    const messages = body.map(msg => msg.message);
    expect(messages).toContain(m1.message);
    expect(messages).toContain(m2.message);
  });

  it("should get list of user conversations", async () => {
    const [foundUserOne, foundUserTwo] = await foundUsers([userOne, userTwo]);

    // Create conversation
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

    // Create messages
    const messageOne = await helper.createMessage(m1);
    const messageTwo = await helper.createMessage(m2);

    // Fetch user conversations
    const { body, statusCode } = await request(app).get(
      `/api/conversations/${foundUserOne._id}`
    );

    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(1);
    expect(body[0]).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        participants: expect.arrayContaining([
          expect.any(String),
          expect.any(String),
        ]),
        lastMessage: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });
});
