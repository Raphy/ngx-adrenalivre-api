# Adrenaline API for Angular

A simple SDK allowing to use the Adrenalivre API

# Installation

In your project just run the following command to add the package:

```bash
npm install -S @adrenalivre/ngx-api
```

# Configuration

Import the module in your `AppModule` and provide the configuration using the `ConfigurationProvider`::

```typescript
import { AdrenalivreAPIModule, ConfigurationProvider } from '@adrenalivre/ngx-api';

@NgModule({
    imports: [
        // ...
        AdrenalivreAPIModule
        // ...
    ],
    providers: [
        ConfigurationProvider.provide()
    ],
})
```

You are now able to use the Adrénalivre API.

# Documentation

The detailed documentation is lcoated in [doc](./doc) directory.

**/!\ Under development**