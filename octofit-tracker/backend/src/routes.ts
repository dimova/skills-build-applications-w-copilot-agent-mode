import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboard-entry.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const createCollectionRoutes = <T>(resource: Router, Model: Model<T>) => {
  resource.get('/', async (_request, response, next) => {
    try {
      response.json(await Model.find().sort({ createdAt: -1 }));
    } catch (error) {
      next(error);
    }
  });

  resource.post('/', async (request, response, next) => {
    try {
      response.status(201).json(await Model.create(request.body));
    } catch (error) {
      next(error);
    }
  });
};

export const apiRouter = Router();

const usersRouter = Router();
createCollectionRoutes(usersRouter, User);
apiRouter.use('/users', usersRouter);

const teamsRouter = Router();
createCollectionRoutes(teamsRouter, Team);
apiRouter.use('/teams', teamsRouter);

const activitiesRouter = Router();
createCollectionRoutes(activitiesRouter, Activity);
apiRouter.use('/activities', activitiesRouter);

const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().populate('userId', 'name email').sort({ score: -1 }));
  } catch (error) {
    next(error);
  }
});
leaderboardRouter.post('/', async (request, response, next) => {
  try {
    const entry = await LeaderboardEntry.findOneAndUpdate(
      { userId: request.body.userId },
      { score: request.body.score },
      { new: true, upsert: true, runValidators: true },
    );
    response.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});
apiRouter.use('/leaderboard', leaderboardRouter);

const workoutsRouter = Router();
createCollectionRoutes(workoutsRouter, Workout);
apiRouter.use('/workouts', workoutsRouter);