# NodeJsServiceTemplate

### Setup Repo Hooks
Add the local `.gitconfig` file

```shell
git config --local include.path ../.gitconfig
```

### Run the app

Before running the app, ensure you have create an application environment variables file named ```.env``` in the root of your application. you can copy the sample variables from the ```.env.example``` file.

- Use ```yarn run start:dev``` to start the application in development (watch) mode.

### Migrations

The database config can be found in the config folder that lives src directory ```src/config/database.ts```

- Generate - ```yarn run migration:generate src/migrations/migration-name```

- Run - ```yarn run migration:run```

- Revert - ```yarn run migration:revert```

### Configuration

All config files have been stored in the config folder, see ```src/config```. This config has been injected into the ```app.module.ts``` so the config values can be called globally throughout the app. 

You can access config values like this ```this.configService.get('services.any_property.another_property')``` (it allows for nested object values), remember to import the ```ConfigService``` from ```@nestjs/config``` before use.

### Tests

### NOTES
1. Make sure to turn off sql logging in production. see ```src/config/database```, set the logging value to false ```logging: false```