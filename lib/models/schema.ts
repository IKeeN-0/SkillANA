import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// --- 1. Interfaces ---

interface IContact {
  phoneNumber?: string;
  address?: string;
}

interface IEducation {
  level: string;
  major: string;
  university: string;
}

interface IExperience {
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

interface IUserBadge {
  badgeId: Types.ObjectId;
  badgeName: string;
  imgUrl: string;
  earnedAt: Date;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  aboutMe?: string;
  contact: IContact;
  education: IEducation[];
  experience: IExperience[];
  badges: IUserBadge[];
  createdAt: Date;
  updatedAt: Date;
  profileImg?: string;
}

export interface IPendingUser extends Document{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IBadgeCategory extends Document {
  name: string;
}

interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export interface IBadge extends Document {
  badgeName: string;
  category: {
    categoryId: Types.ObjectId;
    name: string;
  };
  imgUrl: string;
  description?: string;
  criteria: {
    questionNum: number;
    timeLimit: string;
    passingScore: number;
  };
  test: {
    questions: IQuestion[];
  };
}

export interface IOtp extends Document {
  email: string;
  otp_code: string;
  createdAt: Date;
  isUsed: boolean;
}

// --- 2. Schemas ---

const BadgeCategorySchema = new Schema<IBadgeCategory>({
  name: { type: String, required: true }
});

const BadgeSchema = new Schema<IBadge>({
  badgeName: { type: String, required: true },
  category: {
    categoryId: { type: Schema.Types.ObjectId, ref: 'BadgeCategory', required: true },
    name: { type: String, required: true }
  },
  imgUrl: { type: String, required: true },
  description: String,
  criteria: {
    questionNum: { type: Number, required: true },
    timeLimit: { type: String, required: true },
    passingScore: { type: Number, required: true }
  },
  test: {
    questions: [
      {
        question: { type: String, required: true },
        answers: [String],
        correctAnswer: { type: String, required: true }
      }
    ]
  }
});

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutMe: String,
    contact: {
      phoneNumber: { type: String, default: "" }, // หรือใส่แค่ default: ""
      address: { type: String, default: "" }
    },
    education: {
    level: { type: String, default: "" },
    major: { type: String, default: "" },
    university: { type: String, default: "" }
  },
  profileImg : {
      type : String,
      default : "",
  }
    ,
    experience: [
      {
        title: String,
        startDate: Date,
        endDate: Date,
        description: String
      }
    ],
    badges: [
      {
        badgeId: { type: Schema.Types.ObjectId, ref: 'Badge' },
        badgeName: String,
        imgUrl: String,
        earnedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true } // สร้าง createdAt และ updatedAt ให้อัตโนมัติ
  
);

const OtpSchema: Schema = new Schema({
  email: { type: String, required: true },
  otp_code: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  // กำหนดให้ข้อมูลลบตัวเองทิ้งหลังจากสร้างมาแล้ว 300 วินาที (5 นาที)
  createdAt: { type: Date, default: Date.now, expires: 300 } 
});

const PendingUserSchema: Schema = new Schema<IPendingUser>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
})

// --- 3. Models ---

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Badge: Model<IBadge> = mongoose.models.Badge || mongoose.model<IBadge>('Badge', BadgeSchema);
export const BadgeCategory: Model<IBadgeCategory> = mongoose.models.BadgeCategory || mongoose.model<IBadgeCategory>('BadgeCategory', BadgeCategorySchema);
export const Otp: Model<IOtp> =  mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);
export const PendingUser: Model<IPendingUser> =  mongoose.models.PendingUser || mongoose.model<IPendingUser>('PendingUser', PendingUserSchema);