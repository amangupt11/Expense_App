import { Router } from 'express';
import ensureAuthenticated from '../Middlewares/Auth.js';

const router = Router();

router.get('/', ensureAuthenticated)
    
export default router;
