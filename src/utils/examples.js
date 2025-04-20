export const events = [
    {
        id: 1,
        eventName: "Electronic Nights Festival",
        eventDate: "2025-06-15",
        type: "Music",
        lastPrice: 50.0,    // Precio anterior
        currentPrice: 45.0, // Precio actual con descuento
        location: "Madrid, Spain",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 2,
        eventName: "Tech World Expo",
        eventDate: "2025-05-21",
        type: "Technology",
        lastPrice: 35.0,
        currentPrice: 30.0,
        location: "Berlin, Germany",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 3,
        eventName: "Jazz & Wine Evening",
        eventDate: "2025-07-04",
        type: "Music",
        lastPrice: 55.0,
        currentPrice: 50.0,
        location: "Lisbon, Portugal",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 4,
        eventName: "Urban Art Show",
        eventDate: "2025-04-22",
        type: "Art",
        lastPrice: 20.0,
        currentPrice: 15.0,
        location: "Barcelona, Spain",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 5,
        eventName: "Indie Film Premiere",
        eventDate: "2025-06-01",
        type: "Cinema",
        lastPrice: 25.0,
        currentPrice: 20.0,
        location: "Paris, France",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 6,
        eventName: "Startup Pitch Day",
        eventDate: "2025-05-10",
        type: "Business",
        lastPrice: 10.0,
        currentPrice: 0.0, // Gratis
        location: "London, UK",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 7,
        eventName: "Fashion Forward 2025",
        eventDate: "2025-09-12",
        type: "Fashion",
        lastPrice: 70.0,
        currentPrice: 60.0,
        location: "Milan, Italy",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 8,
        eventName: "VR Gaming Con",
        eventDate: "2025-08-03",
        type: "Gaming",
        lastPrice: 40.0,
        currentPrice: 35.0,
        location: "Amsterdam, Netherlands",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 9,
        eventName: "Contemporary Dance Gala",
        eventDate: "2025-07-20",
        type: "Dance",
        lastPrice: 30.0,
        currentPrice: 25.0,
        location: "Vienna, Austria",
        image: "https://picsum.photos/300",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    },
    {
        id: 10,
        eventName: "Live Podcast Night",
        eventDate: "2025-06-25",
        type: "Talk",
        lastPrice: 15.0,
        currentPrice: 10.0,
        location: "Copenhagen, Denmark",
        image: "/images/placeholder.jpg",
        eventDescription: "A night of electronic music with top DJs from around the world. Dance, enjoy, and celebrate the beats all night long."
    }
];
export const users = [
    {
        id: "0xa000sysadmin",
        name: "Sysadmin",
        email: "sysadmin@example.com",
        phone: "+5491133344455",
        dob: "1995-06-12",
        token: "token-sysadmin-abc123"
    },
    {
        id: "0xabc123456789",
        name: "Sofia Martínez",
        email: "sofia@example.com",
        phone: "+5491133344455",
        dob: "1995-06-12",
        token: "token-sofia-abc123"
    },
    {
        id: "0xdef456789012",
        name: "Lucas Fernández",
        email: "lucas@example.com",
        phone: "+5491144455566",
        dob: "1990-03-25",
        token: "token-lucas-def456"
    },
    {
        id: "0xghi789123456",
        name: "Valentina Gómez",
        email: "valentina@example.com",
        phone: "+5491122233344",
        dob: "1998-11-07",
        token: "token-valentina-ghi789"
    },
    {
        id: "0xjkl012345678",
        name: "Mateo Torres",
        email: "mateo@example.com",
        phone: "+5491177788899",
        dob: "1992-01-19",
        token: "token-mateo-jkl012"
    },
    {
        id: "0xmno345678901",
        name: "Emma López",
        email: "emma@example.com",
        phone: "+5491199911122",
        dob: "1997-09-30",
        token: "token-emma-mno345"
    }
];
export const tickets = [
    {
        id: 1,
        event: 0,
        price: 45.0,
        purchasedDate: "2025-05-15",
        owner: "0xa000sysadmin"
    },
    {
        id: 2,
        event: 1,
        price: 30.0,
        purchasedDate: "2025-04-20",
        owner: "0xa000sysadmin"
    },
    {
        id: 3,
        event: 2,
        price: 50.0,
        purchasedDate: "2025-06-25",
        owner: "0xa000sysadmin"
    },
    {
        id: 4,
        event: 3,
        price: 15.0,
        purchasedDate: "2025-04-22",
        owner: "0xa000sysadmin"
    },
    {
        id: 5,
        event: 4,
        price: 20.0,
        purchasedDate: "2025-06-01",
        owner: "0xa000sysadmin"
    },
    {
        id: 6,
        event: 5,
        price: 0.0,
        purchasedDate: "2025-05-10",
        owner: "0xa000sysadmin"
    },
    {
        id: 7,
        event: 6,
        price: 60.0,
        purchasedDate: "2025-09-12",
        owner: "0xmno345678901"
    },
    {
        id: 8,
        event: 7,
        price: 35.0,
        purchasedDate: "2025-08-03",
        owner: "0xghi789123456"
    },
    {
        id: 9,
        event: 5,
        price: 25.0,
        purchasedDate: "2025-07-20",
        owner: "0xabc123456789"
    },
    {
        id: 10,
        event: 1,
        price: 10.0,
        purchasedDate: "2025-06-25",
        owner: "0xabc123456789"
    },
    {
        id: 11,
        event: 0,
        price: 45.0,
        purchasedDate: "2025-05-16",
        owner: "0xghi789123456"
    },
    {
        id: 12,
        event: 1,
        price: 30.0,
        purchasedDate: "2025-05-22",
        owner: "0xjkl012345678"
    },
    {
        id: 13,
        event: 2,
        price: 50.0,
        purchasedDate: "2025-06-28",
        owner: "0xghi789123456"
    },
    {
        id: 14,
        event: 3,
        price: 15.0,
        purchasedDate: "2025-04-25",
        owner: "0xghi789123456"
    },
    {
        id: 15,
        event: 4,
        price: 20.0,
        purchasedDate: "2025-06-05",
        owner: "0xabc123456789"
    },
    {
        id: 16,
        event: 1,
        price: 45.0,
        purchasedDate: "2025-05-15",
        owner: "0xa000sysadmin"
    },
    {
        id: 17,
        event: 1,
        price: 45.0,
        purchasedDate: "2025-05-15",
        owner: "0xa000sysadmin"
    },
];
