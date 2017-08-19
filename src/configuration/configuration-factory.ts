import { Configuration } from './configuration';

export class ConfigurationFactory {
    static create(configuration: any | Configuration): Configuration {
        if (configuration instanceof Configuration) {
            return configuration;
        }

        return new Configuration(configuration);
    }
}
