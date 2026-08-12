import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard-entry.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Rodriguez', email: 'maya.rodriguez@example.com', points: 1240 },
      { name: 'Ethan Chen', email: 'ethan.chen@example.com', points: 1085 },
      { name: 'Priya Shah', email: 'priya.shah@example.com', points: 970 },
      { name: 'Noah Williams', email: 'noah.williams@example.com', points: 815 },
    ]);

    await Team.create([
      {
        name: 'Summit Striders',
        description: 'A weekend running group training for local trail races.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Collective',
        description: 'Strength and mobility enthusiasts building consistent habits.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'Trail run',
        durationMinutes: 52,
        caloriesBurned: 610,
        completedAt: new Date('2026-08-10T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Indoor cycling',
        durationMinutes: 45,
        caloriesBurned: 480,
        completedAt: new Date('2026-08-10T18:15:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Strength training',
        durationMinutes: 40,
        caloriesBurned: 360,
        completedAt: new Date('2026-08-11T06:45:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'Yoga flow',
        durationMinutes: 35,
        caloriesBurned: 180,
        completedAt: new Date('2026-08-11T19:00:00Z'),
      },
    ]);

    await LeaderboardEntry.create(users.map((user) => ({ userId: user._id, score: user.points })));

    await Workout.create([
      {
        title: 'Morning Mobility Reset',
        description: 'A gentle full-body routine to improve range of motion before a busy day.',
        category: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        title: 'Hill Strength Circuit',
        description: 'A lower-body circuit designed to build power for hilly runs and hikes.',
        category: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 35,
      },
      {
        title: 'Endurance Intervals',
        description: 'Structured intervals that develop aerobic capacity and pacing control.',
        category: 'Cardio',
        difficulty: 'advanced',
        durationMinutes: 45,
      },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard entries, and workouts created.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
