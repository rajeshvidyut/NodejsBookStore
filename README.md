# Book Store

"# Developed By Nodejs, ExpressJs, Mysql, KnexJs, Passport oauth2, Facebook oauth, Dockerized and Deploy to Heroku"

## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/install) to install node packages.

```bash
npm install
```

## Usage

Make Sure to create Facebook api key and secret key and just copy the code and paste here ```config/config.js``` here ie:
```Nodejs
module.exports={
  "facebook_api_key"      :     "Your Key",
  "facebook_api_secret"   :     "Secret Key",
  "callback_url"          :     "http://localhost:2000/auth/facebook/callback",
  "use_database"          :      true
}	
```
And Also you will be able to create new user and just login to add books



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

