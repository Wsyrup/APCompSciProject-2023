#!/usr/bin/env bash

# use correct Node version
source ~/.nvm/nvm.sh
nvm use

if [ "$1" == "lite" ]
then
    echo 'Lite setup. Skipping NPM packages installation.'
else
    # install Node packages
    if cmp -s "package-lock-ci-install-copy.json" "package-lock.json"; then
        echo 'Skipping NPM packages installation. package-lock.json is not modified since the last installation.'
    else
        echo 'Using NPM CI to install the packages'

        # install Node packages
        npm ci

        rm package-lock-ci-install-copy.json || true
        cp package-lock.json package-lock-ci-install-copy.json
    fi

    npm install chromedriver@latest --no-save
    npm install geckodriver@latest --no-save
fi
