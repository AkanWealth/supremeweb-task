import { Router } from 'express';
import { getAllUsers } from './controllers/userController';
import { getAllWallets, getWalletDetail, sendMoney, createWallet } from './controllers/walletController';

const router: Router = Router();

router.get('/users', getAllUsers);
router.get('/wallets', getAllWallets);
router.get('/wallets/:id', getWalletDetail);
router.post('/send-money', sendMoney);
router.post('/create-wallet', createWallet);

export default router;
