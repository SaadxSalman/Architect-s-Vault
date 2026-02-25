import { Router } from 'express';
import { handleSearchQuery } from '../controllers/searchController';

const router = Router();

router.post('/query', handleSearchQuery);

export default router;