export const schemas = {
  // ========================
  // 🔐 AUTH
  // ========================

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", example: "user@example.com" },
      password: { type: "string", example: "mypassword123" },
    },
  },

  LoginResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Login successful" },
      token: { type: "string" },
      user: {
        $ref: "#/components/schemas/UserPublic",
      },
    },
  },

  OtpRequest: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", example: "user@example.com" },
    },
  },

  VerifyOtpRequest: {
    type: "object",
    required: ["email", "otp_code"],
    properties: {
      email: { type: "string", example: "user@example.com" },
      otp_code: { type: "string", example: "123456" },
    },
  },

  MessageResponse: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },

  // ========================
  // 👤 USER
  // ========================

  UserPublic: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string" },
    },
  },

  UserFull: {
    type: "object",
    properties: {
      _id: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      aboutMe: { type: "string" },
      profileImg: { type: "string" },

      contact: {
        type: "object",
        properties: {
          phoneNumber: { type: "string" },
          address: { type: "string" },
        },
      },

      education: {
        type: "array",
        items: {
          type: "object",
          properties: {
            level: { type: "string" },
            major: { type: "string" },
            university: { type: "string" },
          },
        },
      },

      experience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            startDate: { type: "string", format: "date-time" },
            endDate: { type: "string", format: "date-time" },
            description: { type: "string" },
          },
        },
      },

      badges: {
        type: "array",
        items: {
          type: "object",
          properties: {
            badgeId: { type: "string" },
            badgeName: { type: "string" },
            imgUrl: { type: "string" },
            earnedAt: { type: "string", format: "date-time" },
          },
        },
      },

      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },

  // ========================
  // 🏅 BADGE
  // ========================

  Badge: {
    type: "object",
    properties: {
      _id: { type: "string" },
      badgeName: { type: "string" },
      imgUrl: { type: "string" },
      description: { type: "string" },

      category: {
        type: "object",
        properties: {
          categoryId: { type: "string" },
          name: { type: "string" },
        },
      },

      criteria: {
        type: "object",
        properties: {
          questionNum: { type: "number" },
          timeLimit: { type: "string" },
          passingScore: { type: "number" },
        },
      },

      test: {
        type: "object",
        properties: {
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                answers: {
                  type: "array",
                  items: { type: "string" },
                },
                correctAnswer: { type: "string" },
              },
            },
          },
        },
      },
    },
  },

  BadgeCategory: {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
    },
  },
};