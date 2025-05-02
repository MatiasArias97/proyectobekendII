import TicketDAO from '../dao/mongo/tickets.dao.js';

class TicketService {
  constructor() {
    this.ticketDao = new TicketDAO();
  }

  async getAllTickets(filters = {}, options = {}) {
    return await this.ticketDao.getAll(filters, options);
  }

  async getTicketById(tid) {
    return await this.ticketDao.getById(tid);
  }

  async createTicket(ticketData) {
    return await this.ticketDao.create(ticketData);
  }

  async updateTicket(tid, updateData) {
    return await this.ticketDao.update(tid, updateData);
  }

  async deleteTicket(tid) {
    return await this.ticketDao.delete(tid);
  }
}

export default TicketService;