export const mockMessages = [
  {
    id: 1,
    doctorId: 1,
    messages: [
      {
        id: 1,
        sender: "doctor",
        text: "Assalomu alaykum! Sizga qanday yordam bera olaman?",
        time: "10:30 AM",
        date: "2023-05-15",
      },
      {
        id: 2,
        sender: "patient",
        text: "Vaalaykum assalom. Mening yurak sohasida og'riq bor.",
        time: "10:32 AM",
        date: "2023-05-15",
      },
      {
        id: 3,
        sender: "doctor",
        text: "Tushunarli. Iltimos, ECG natijalaringizni yuboring.",
        time: "10:33 AM",
        date: "2023-05-15",
        attachment: {
          type: "text",
          content: "",
        },
      },
    ],
  },
  {
    id: 2,
    doctorId: 2,
    messages: [
      {
        id: 1,
        sender: "doctor",
        text: "Salom! Qanday yordam kerak?",
        time: "09:15 AM",
        date: "2023-05-16",
      },
    ],
  },
];
