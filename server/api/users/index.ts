import express, { Router } from 'express';
import { insertFilm } from './controller';
import { authService } from '../../middleware/auth/auth-service';

const router: Router = express.Router();

router.post('/add/film', [authService.verifyToken], insertFilm);

export default router;
