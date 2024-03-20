# Aval Harry Potter
This project was written by Nestor Fabian Jaramillo Gutierrez

## Start Project
- Run: npm i
- Run: npm run dev
- Run (>80%): npm run test

## Some examples

### Get spells with filters
1. OK - Only type
```
curl --location 'localhost:8080/harrypotter/spells?type=charm'
```

2. OK - type+light
```
curl --location 'localhost:8080/harrypotter/spells?type=charm&light=blue'
```

3. Error - bad type
```
curl --location 'localhost:8080/harrypotter/spells?type=badtype'
```

4. Error - without type
```
curl --location 'localhost:8080/harrypotter/spells'
```

### Add spell with validations


- Add spell
1. OK - Add
```
curl --location 'localhost:8080/harrypotter/spells' \
--header 'Content-Type: application/json' \
--data '{
    "id": "aaa3cb46-c174-4843-a07e-fd83545dce58",
    "name": "Cry Charm",
    "incantation": "Aberto",
    "effect": "Cry",
    "canBeVerbal": true,
    "type": "Charm",
    "light": "Blue",
    "creator": "Nestor Fabian Jaramillo Gutierrez"
}
'
```

2. OK - Duplicate name
```
curl --location 'localhost:8080/harrypotter/spells' \
--header 'Content-Type: application/json' \
--data '{
    "id": "aaa3cb46-c174-4843-a07e-fd83545dce58",
    "name": "Opening Charm",
    "incantation": "Aberto",
    "effect": "Cry",
    "canBeVerbal": true,
    "type": "Charm",
    "light": "Blue",
    "creator": "Nestor Fabian Jaramillo Gutierrez"
}
'
```

2. Error - Duplicate name
```
curl --location 'localhost:8080/harrypotter/spells' \
--header 'Content-Type: application/json' \
--data '{
    "id": "aaa3cb46-c174-4843-a07e-fd83545dce58",
    "name": "Opening Charm",
    "incantation": "Aberto",
    "effect": "Cry",
    "canBeVerbal": true,
    "type": "Charm",
    "light": "Blue",
    "creator": "Nestor Fabian Jaramillo Gutierrez"
}
'
```

3. Error - Bad light
```
curl --location 'localhost:8080/harrypotter/spells' \
--header 'Content-Type: application/json' \
--data '{
    "id": "aaa3cb46-c174-4843-a07e-fd83545dce58",
    "name": "Cry Charm",
    "incantation": "Aberto",
    "effect": "Cry",
    "canBeVerbal": true,
    "type": "Charm",
    "light": "Green"
}
'
```

4. Error - canBeVerbal not boolean
```
curl --location 'localhost:8080/harrypotter/spells' \
--header 'Content-Type: application/json' \
--data '{
    "id": "aaa3cb46-c174-4843-a07e-fd83545dce58",
    "name": "Cry Charm",
    "incantation": "Aberto",
    "effect": "Cry",
    "canBeVerbal": "true",
    "type": "Charm",
    "light": "Blue",
    "creator": "Nestor Fabian Jaramillo Gutierrez"
}
'
```

5. Error - Min params
```
curl --location 'localhost:8080/harrypotter/spells' \
--header 'Content-Type: application/json' \
--data '{
    "id": "aaa3cb46-c174-4843-a07e-fd83545dce58",
    "name": "Cry Charm",
    "incantation": "Aberto",
    "effect": "Cry",
    "canBeVerbal": true,
    "type": "Charm"
}
'
```

## Project commands
Environments config are in env folder.
- Run: npm i

> Develop environment
- Check: dev.env
- Run: npm run dev
- Test: npm run test

> Production environment
- Check: prd.env
- Run: npm run prd

## Dependencies
- [x] npm i -D eslint: to lint and clean code
- [x] npm i dotenv --save: for multiple environments
- [x] npm install --save express: for APIs
- [x] npm install --save-dev @babel/preset-env
- [x] npm install axios: for request external API (heroku)
