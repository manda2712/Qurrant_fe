const juzContent = [
    {
      id: 1,
      title: "Juz 1",
      surah: ["Surat Al-Fatihah", "Surat Al-Baqarah ayat 1-141"],
      ayat: ["1", "2"],
    },
    {
      id: 2,
      title: "Juz 2",
      surah: ["Surat Al-Baqarah Ayat 142 - Al-Baqarah Ayat 252"],
    },
    {
      id: 3,
      title: "Juz 3",
      surah: ["Surat Al-Baqarah Ayat 253-286", "Surat Ali Imran ayat 1-91"],
    },
    {
        id: 4,
        title: "Juz 4",
        surah: ["Surat Ali Imran ayat 92 - 200", "Surat An-Nisa ayat 1-23"],
      },
      {
        id: 5,
        title: "Juz 5",
        surah: ["Surat An-Nisa ayat 24-147"],
      },
      {
        id: 6,
        title: "Juz 6",
        surah: ["Surat An-Nisa ayat 148-176", "Surat Al-Ma'idah ayat 1-82"],
      },
      {
        id: 7,
        title: "Juz 7",
        surah: ["Surat Al-Ma'idah ayat 83-120", "Surat Al-An'am ayat 1-110"],
      },
      {
        id: 8,
        title: "Juz 8",
        surah: ["Surat Al-An'am ayat 111-165", "Surat Al A’raf ayat 1-87"],
      },
      {
        id: 9,
        title: "Juz 9",
        surah: ["Surat Al A’raf Ayat 88-206", "Surat Al-Anfal Ayat 1-40"],
      },
      {
          id: 10,
          title: "Juz 10",
          surah: ["Surat Al-Anfal Ayat 41-75", "Surat At-Taubah Ayat 1-92"],
        },

        // JUZ 11 - 20
        {
            id: 11,
            title: "Juz 11",
            surah: ["Surat At-Taubah Ayat 93-129","Surat Yunus Ayat 1-109", "Surat Hud Ayat 1-5"],
          },
          {
            id: 12,
            title: "Juz 12",
            surah: ["Surat Hud Ayat 6-123", "Surat Yusuf Ayat 1-52"],
          },
          {
            id: 13,
            title: "Juz 13",
            surah: ["ASurat Yusuf Ayat 53-111","Surat Ar Ra'd Ayat 1-43", "Surat Ibrahim Ayat 1-52"],
          },
          {
              id: 14,
              title: "Juz 14",
              surah: ["Surat Al-Hijr Ayat 1-99", "An-Nahl Ayat 1-128"],
            },
            {
              id: 15,
              title: "Juz 15",
              surah: ["Surat Al-'Isra Ayat 1-111", "Surat Al-Kahf Ayat 1-74"],
            },
            {
              id: 16,
              title: "Juz 16",
              surah: ["Surat Al-Kahf Ayat 75-110","Surat Maryam Ayat 1-98", "Surat Ta-Ha Ayat 1-135"],
            },
            {
              id: 17,
              title: "Juz 17",
              surah: ["Surat Al-Anbiya Ayat 1-112", "Surat Al Hajj Ayat 1-78"],
            },
            {
              id: 18,
              title: "Juz 18",
              surah: ["Surat Al-Mu’minun Ayat 1-118","Surat An Nur Ayat 1-64", "Surat Al-Furqan Ayat 1-20"],
            },
            {
              id: 19,
              title: "Juz 19",
              surah: ["Surat Al-Furqan Ayat 21-77", "Surat Asy Syu'ara Ayat 1-227", "Surat An-Naml Ayat 1-55"],
            },
            {
                id: 20,
                title: "Juz 20",
                surah: ["Surat An-Naml Ayat 56-93","Surat Al Qasas Ayat 1-88", "Al-Ankabut Ayat 1-45"],
              },

        // JUZ 21 - 30
        {
            id: 21,
            title: "Juz 21",
            surah: ["Surat Al-Ankabut Ayat 46-69","Surat Ar Rum Ayat 46","Surat Luqman", "Surat As Sajdah", "Surat Al-Ahzab Ayat 1-30"],
        },
          {
            id: 22,
            title: "Juz 22",
            surah: ["Surat Al-Ahzab Ayat 31-73","Surat Saba'", "Surat Fatir", "Surat Yasin Ayat 1-27"],
          },
          {
            id: 23,
            title: "Juz 23",
            surah: ["Surat Yasin Ayat 28-83", "Surat As Saffat", "Surat Sad", "Surat Az-Zumar Ayat 1-31"],
          },
          {
              id: 24,
              title: "Juz 24",
              surah: ["Surat Az-Zumar Ayat 32-75", "Surat Ghafir", "Surat Fussilat Ayat 1-46"],
            },
            {
              id: 25,
              title: "Juz 25",
              surah: ["Surat Fussilat Ayat 47-54","Surat Asy Syura", "Surat Az Zukhruf", "Surat Ad Dukhan", "Surat Al-Jatsiyah"],
            },
            {
              id: 26,
              title: "Juz 26",
              surah: ["Surat Al-Ahqaf", "Surat Muhammad", "Surat Al Fath", "Surat Al Hujurat","Surat Qaf", "Surat Adz Dzariyat Ayat 30"],
            },
            {
              id: 27,
              title: "Juz 27",
              surah: ["Surat Adz Dzariyat Ayat 31-60", "Surat At Tur", "Surat An Najm", "Surat Al Qamar", "Surat Ar Rahman", "Surat Al Waqiah", "Surat Al Hadid"],
            },
            {
              id: 28,
              title: "Juz 28",
              surah: ["Surah Al-Mujadala","Surah Al-Hasyr", "Surah Al-Mumtahanah", "Surah As-Shaff", "Surah Al-Jumu'ah", "Surah Al-Munafiqun", "Surah At-Tagobun", "Surah At-Thalaq", "Surah At-Tahrim"],
            },
            {
              id: 29,
              title: "Juz 29",
              surah: ["Surat Al Mulk", "Surat Al Qalam", "Surat Al Haqqah", "Surat Al Ma’arij", "Surat Nuh", "Surat Al Jinn", "Surat Al Muzzamil", "Surat Al Muddatsir", "Surat Al Qiyamah", "Surat Al Insan", "Surat Al Mursalat"],
            },
            {
                id: 30,
                title: "Juz 30",
                surah: ["Surah An-Naba'","Surah An-Nazi'at", "Surah 'Abasa", "Surah At-Takwir", "Surah Al-Infitar", "Surah Al-Mutaffifin", "Surah Al-Insyiqaq", "Surah Al-Buruj", "Surah At-Tariq","Surah Al-A'la","Surah Al-Ghashiyah", "Surah Al-Fajr", "Surah Al-Balad", "Surah Ash-Shams", "Surah Al-Lail", "Surah Ad-Duha", "Surah Ash-Sharh", "Surah At-Tin",
                "Surah Al-Alaq","Surah Al-Qadr", "Surah Al-Bayyinah", "Surah Az-Zalzalah", "Surah Al-Adiyat", "Surah Al-Qari'ah", "Surah At-Takathur", "Surah Al-Asr", "Surah Al-Humazah","Surah Al-Fil","Surah Quraisy", "Surah Al-Ma'un", "Surah Al-Kausar", "Surah Al-Kafirun", "Surah An-Nasr", "Surah Al-Lahab", "Surah Al-Ikhlas", "Surah Al-Falaq", "Surat An-Nas"
                ],
              },
  ];
  
  export default juzContent;
  