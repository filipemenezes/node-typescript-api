import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import express from 'express';
import * as database from '@src/database';

import { BeachesController } from './controllers/beaches';
import { ForecastController } from './controllers/forecast';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupControllers(): void {
    const beachesController = new BeachesController();
    const forecastController = new ForecastController();

    this.addControllers([beachesController, forecastController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }
}
