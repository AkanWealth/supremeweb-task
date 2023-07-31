import { Document, Schema, model, Types } from "mongoose";

export interface IWallet extends Document {
  ownerId: Types.ObjectId;
  type: string;
  balance: number;
}

const walletSchema = new Schema<IWallet>({
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

export const WalletModel = model<IWallet>("Wallet", walletSchema);