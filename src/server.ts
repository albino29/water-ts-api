import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import * as database from '@src/database';
import { ForecastController } from './controllers/Forecast';
import { Application } from 'express';

export class SetupServer extends Server {
  constructor(private port = 3333) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupComtrollers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupComtrollers(): void {
    const forecastController = new ForecastController();

    this.addControllers([forecastController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}
