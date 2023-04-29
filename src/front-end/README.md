## Agro Help Frontend

# Install the depencies with
```
npm install --save --force
```


# Build the app for development

install eas with 
```
npm install --global eas-cli
```

login
```
eas login
```

Configure eas build
```
eas build:configure
```

Build for development
```
eas build --profile=development --platform android
```

Build for production
```
eas build  --platform android
```