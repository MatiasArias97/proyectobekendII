import TicketDAO from '../dao/mongo/ticket.dao.js';

class TicketRepository {
  constructor() {
    this.dao = new TicketDAO();
  }

  async create(ticketData) {
    return await this.dao.create(ticketData);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }
}

export default TicketRepository;