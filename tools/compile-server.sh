#!/usr/bin/env bash

externalModules="express argon2 sequelize sequelize/types" # These modules can't be fully bundled.

if [ ! -d "tools" ]; then cd ..; fi
. tools/colors.sh
. tools/utils.sh

mkdir -p build/
if [ "$1" == "--production" ]; then
    extraFlags="--minify"

    tsc -p tsconfig.json --noEmit
    if [ $? != 0 ]; then
        echo ${red}${bold}; echoDivider
        echo ERROR: ${reset}${red}There were errors during typechecks. Please fix them and try again. \(Note: no files were emitted.\)
        echo ${reset}
        exit 1
    fi
fi

for module in $externalModules; do
    externalFlags="--external:$module $externalFlags"
done

content=$(esbuild $extraFlags $externalFlags --platform=node --bundle src/main.ts)
echo "$content" > build/server.js
