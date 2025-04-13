import express from 'express';
import {
    getAllTransactions,
    addTransaction,
    deleteTransaction
} from '../Controllers/ExpenseController.js';

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', addTransaction);
router.delete('/:expenseId', deleteTransaction);

export default router;
