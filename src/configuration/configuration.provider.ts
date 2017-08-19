import { Provider } from '@angular/core';

import { Configuration } from './configuration';
import { ConfigurationFactory } from './configuration.factory';

export class ConfigurationProvider {
    static provide(configuration: any | Configuration): Provider {
        return {
            provide: Configuration,
            useValue: ConfigurationFactory.create(configuration)
        };
    }
}
