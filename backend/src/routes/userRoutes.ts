import express, { Request, Response } from 'express';
import supabase from '../supabaseClient'; // Import supabase client (ทางที่ดีควรย้ายมาที่ src/supabaseClient.ts)
import { User, } from '../types/types';
import { PostgrestError } from '@supabase/supabase-js';

const router = express.Router();

/**
 * @swagger
 * /api/user/getUsername:
 *   get:
 *     summary: Get the name of user
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/getId', async (_: Request, res: Response) => {
  supabase
    .from('users')
    .select('id')
    .limit(1)
    .single<User>()
  .then(({ data, error }: { data: User | null; error: PostgrestError | null }) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (data) {
      res.json({ message: data.id });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

/**
 * @swagger
 * /api/user/createAccount:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
// router.post('/createAccount', (req, res) => {
//   // TODO
// });

export default router;