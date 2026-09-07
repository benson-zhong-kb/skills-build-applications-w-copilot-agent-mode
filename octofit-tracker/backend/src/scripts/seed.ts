import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    username: 'alex-runner',
    email: 'alex.runner@example.com',
    displayName: 'Alex Rivera',
    fitnessGoal: 'Run a first half marathon',
    joinedAt: new Date('2026-01-12'),
  },
  {
    username: 'maya-lifts',
    email: 'maya.lifts@example.com',
    displayName: 'Maya Chen',
    fitnessGoal: 'Build full-body strength',
    joinedAt: new Date('2026-02-03'),
  },
  {
    username: 'sam-cycles',
    email: 'sam.cycles@example.com',
    displayName: 'Sam Patel',
    fitnessGoal: 'Improve cycling endurance',
    joinedAt: new Date('2026-03-21'),
  },
];

const teams = [
  { name: 'Trail Blazers', mascot: 'Comet', city: 'Seattle', memberCount: 12 },
  { name: 'Core Crushers', mascot: 'Atlas', city: 'Austin', memberCount: 9 },
  { name: 'Spin Squad', mascot: 'Bolt', city: 'Denver', memberCount: 15 },
];

const activities = [
  {
    username: 'alex-runner',
    activityType: 'Outdoor run',
    durationMinutes: 46,
    caloriesBurned: 520,
    activityDate: new Date('2026-09-01'),
  },
  {
    username: 'maya-lifts',
    activityType: 'Strength training',
    durationMinutes: 55,
    caloriesBurned: 410,
    activityDate: new Date('2026-09-02'),
  },
  {
    username: 'sam-cycles',
    activityType: 'Indoor cycling',
    durationMinutes: 60,
    caloriesBurned: 690,
    activityDate: new Date('2026-09-03'),
  },
];

const leaderboard = [
  { username: 'sam-cycles', teamName: 'Spin Squad', points: 1840, rank: 1 },
  { username: 'alex-runner', teamName: 'Trail Blazers', points: 1715, rank: 2 },
  { username: 'maya-lifts', teamName: 'Core Crushers', points: 1630, rank: 3 },
];

const workouts = [
  {
    title: 'Tempo Builder Run',
    focusArea: 'Cardio',
    difficulty: 'Intermediate',
    durationMinutes: 35,
    recommendedForGoal: 'Run a first half marathon',
  },
  {
    title: 'Foundational Strength Circuit',
    focusArea: 'Strength',
    difficulty: 'Beginner',
    durationMinutes: 40,
    recommendedForGoal: 'Build full-body strength',
  },
  {
    title: 'Endurance Spin Intervals',
    focusArea: 'Cycling',
    difficulty: 'Advanced',
    durationMinutes: 50,
    recommendedForGoal: 'Improve cycling endurance',
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      LeaderboardEntry.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
