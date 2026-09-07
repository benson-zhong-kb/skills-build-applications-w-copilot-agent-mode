import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    recommendedForGoal: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);