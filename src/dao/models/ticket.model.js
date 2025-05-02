import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});

// Middleware para generar el code automáticamente antes de guardar
ticketSchema.pre('save', function (next) {
  if (!this.code) {
    this.code = uuidv4();
  }
  next();
});

const TicketModel = mongoose.model('Ticket', ticketSchema);
export default TicketModel;
