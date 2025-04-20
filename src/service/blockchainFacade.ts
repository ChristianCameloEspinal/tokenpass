// src/services/blockchainFacade.ts
import { UserType, EventType, TicketType } from "../utils/types";
import { users as mockUsers, events as mockEvents, tickets as mockTickets } from "../utils/examples";

type WalletAddress = string;

let ticketIdCounter = mockTickets.length ? Math.max(...mockTickets.map(ticket => ticket.id)) + 1 : 1;

export const BlockchainAPI = {
  // Simula la conexión de la billetera y la creación de un usuario si no existe
  connectWallet: async (address: WalletAddress): Promise<UserType> => {
    let user = mockUsers.find(u => u.id.toString() === address);
    if (!user) {
      // Si el usuario no existe, lo creamos y lo agregamos
      user = { 
        id: "fake_wallet_id", 
        name: `User_fake_name`, 
        email: `fake_email@example.com`, 
        phone: "123456789", 
        dob: "1990-01-01", 
        token: `token_fake` 
      };
      mockUsers.push(user);
    }
    return user;
  },

  // Obtiene todos los eventos disponibles
  getAvailableEvents: async (): Promise<EventType[]> => {
    return mockEvents;
  },

  // Simula la compra de un ticket
//   purchaseTicket: async (eventId: number, buyerAddress: WalletAddress): Promise<TicketType> => {
//     const event = mockEvents.find(event => event.id === eventId);
//     if (!event) throw new Error("Event not found");

//     // Crear un nuevo ticket y agregarlo
//     const newTicket: TicketType = {
//       id: ticketIdCounter++,
//       event: eventId,
//       price: event.currentPrice,
//       purchasedDate: new Date().toISOString(),
//       owner: buyerAddress,
//     };
//     mockTickets.push(newTicket);
//     return newTicket;
//   },

  // Obtiene los tickets de un usuario
  getMyTickets: async (walletAddress: WalletAddress): Promise<TicketType[]> => {
    return mockTickets.filter(ticket => ticket.owner === walletAddress);
  },

  // Simula la transferencia de un ticket
  transferTicket: async (ticketId: number, toAddress: WalletAddress): Promise<boolean> => {
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (ticket && ticket.owner !== toAddress) {
      ticket.owner = toAddress;
      return true;
    }
    return false;
  },

  // Simula la firma de una transacción
  signTransaction: async (address: WalletAddress, data: string): Promise<string> => {
    return `signature_of_${data}_by_${address}`;
  }
};
