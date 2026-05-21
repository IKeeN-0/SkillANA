export type ResumeData = {
    firstName: string,
    lastName: string,
    email: string,
    aboutMe: string,
    contact: {
      phoneNumber: string, // หรือใส่แค่ default: ""
      address: string
    },
    education: {
    level: string,
    major: string,
    university: string
  },
    profileImg : string
    ,
    experience ?:
      {
        title: string,
        startDate: string,
        endDate: string,
        description: string
      }[];
    badges ?:
      {
        badgeName : string,
        imgUrl: string,
      }[];
}

  