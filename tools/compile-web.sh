#!/usr/bin/env bash

if [ ! -d "tools" ]; then cd ..; fi
. tools/colors.sh
. tools/utils.sh

env="development"
if [ "$1" == "--production" ]; then
    env="production"
    extraFlags="--minify"

    tsc -p tsconfig.json --noEmit
    if [ $? != 0 ]; then
        echo ${red}${bold}; echoDivider
        echo ERROR: ${reset}${red}There were errors during typechecks. Please fix them and try again. \(Note: no files were emitted.\)
        echo ${reset}
        exit 1
    fi
fi

mkdir -p public/js

for page in src/web/pages/*.tsx
do
    filename=$(basename -- "$page")
    pagename="${filename%.*}"
    content=$(esbuild --external:react --define:process.env.NODE_ENV=\"$env\" --global-name=__page $extraFlags --bundle $page)
    echo "$content" > public/js/$pagename.js
done
