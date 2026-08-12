import { model, Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);