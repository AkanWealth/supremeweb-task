import mongoose from 'mongoose';
import { UserModel } from '../models/user';
import { Request, Response } from 'express';
import { WalletModel, IWallet } from '../models/wallet';

export const getAllWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await WalletModel.find();
    if (wallets.length == 0) {
      return res.status(200).send({
        message: `No user found`,
        data: wallets,
      });
    }
    res.status(200).send({
      message: `Success`,
      data: wallets,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWalletDetail = async (req: Request, res: Response) => {
  const walletId = req.params.id;
  try {
    const wallet = await WalletModel.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const owner = await UserModel.findById(wallet.ownerId);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    const walletDetail = {
      id: wallet.id,
      owner: owner.name,
      type: wallet.type,
      balance: wallet.balance,
    };

    res.json(walletDetail);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMoney = async (req: Request, res: Response) => {
  const { senderId, receiverId, amount } = req.body;

  try {
    const senderWallet = await WalletModel.findById(senderId);
    const receiverWallet = await WalletModel.findById(receiverId);

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    return res.status(201).json({ message: 'Money sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createWallet = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const existingWallet = await WalletModel.findOne({ ownerId: user._id });

    if (existingWallet) {
      return res.status(400).json({ message: 'User already has a wallet' });
    }

    const walletId = new mongoose.Types.ObjectId();
    const ownerId = user._id;

    const newWalletData = {
      _id: walletId,
      ownerId: ownerId,
      type: 'standard',
      balance: amount,
    };

    const createdWallet = await WalletModel.create(newWalletData) as IWallet;
    return res.status(201).json({
      message: 'Wallet created successfully',
      data: createdWallet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

